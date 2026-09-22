<template>
  <div class="app-wrapper">
    <Navbar 
      :themes="THEMES"
      :current-theme-id="currentThemeId"
      :font-size="fontSize"
      :is-mobile-view="isMobileView"
      :word-count="wordCount"
      :read-time="readTime"
      :copied="copied"
      @update:theme="currentThemeId = $event"
      @update:font-size="fontSize = $event"
      @toggle-view="isMobileView = $event"
      @copy-wechat="handleCopyWechat"
      @export-html="handleExportHtml"
    />

    <div style="flex: 1; display: grid; grid-template-columns: 1fr 1fr; height: calc(100vh - 54px); overflow: hidden;">
      <EditorPane 
        v-model="markdownText"
        @load-demo="loadDemo"
        @clear="clearContent"
      />

      <PreviewPane 
        :rendered-html="renderedHtml"
        :is-mobile-view="isMobileView"
        :font-size="fontSize"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import EditorPane from './components/EditorPane.vue';
import PreviewPane from './components/PreviewPane.vue';
import { THEMES, THEME_MAP } from './themes';
import { compileMarkdown } from './utils/markdownCompiler';
import { copyWechatHtml } from './utils/clipboardUtils';

const DEFAULT_DEMO = `# 架构师手记：现代高可靠微服务设计的 5 条准则

> “架构的本质不是为了把系统搞得多么复杂，而是在最极端的情况下，系统依然能体面地存活。”

在过去的十几年企业级技术改造中，我们见过了太多因为**外部依赖雪崩**、**慢查询拖垮连接池**以及**缺乏灰度回滚机制**导致的系统瘫痪事故。今天总结 5 条经过生产实战检验的高可靠设计军规。

---

## 一、防御性编程与超时边界控制

任何对外部第三方接口或下游数据库的调用，**必须且只能**存在明确的超时断路配置。

以下是标准的异步重试与熔断配置模板：

\`\`\`java
@Bean
public RestTemplate restTemplate() {
    SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
    factory.setConnectTimeout(3000); // 连接超时 3 秒
    factory.setReadTimeout(5000);    // 读取超时 5 秒
    return new RestTemplate(factory);
}
\`\`\`

### 关键控制指标对照表

| 监控维度 | 正常阈值 | 熔断阈值 | 处置策略 |
| :--- | :--- | :--- | :--- |
| P99 响应耗时 | < 200ms | > 1500ms | 降级返回本地缓存 |
| 错误率占比 | < 0.1% | > 5.0% | 熔断切流并告警 |
| 线程池排队数 | < 50 | > 500 | 拒绝新请求（快速失败） |

---

## 二、配置与代码彻底解耦

任何涉及环境切换的密钥、数据库密码与业务开关，绝对禁止硬编码在源码中。推荐采用统一配置中心（如 Nacos、Apollo），并配合本地密文脱敏机制。

关于密码安全加密规范，可以深入参考 [阿里巴巴 Java 开发手册](https://github.com/alibaba/p3c) 以及 [OWASP Top 10 安全规范](https://owasp.org/www-project-top-ten/)。

---

## 三、结语

高可靠架构不是一蹴而就的，而是在一次次故障演练中反复捶打出来的。希望以上原则能为你的系统设计带来启发！
`;

const markdownText = ref('');
const currentThemeId = ref('techBlue');
const fontSize = ref('15px');
const isMobileView = ref(true);
const copied = ref(false);

const activeTheme = computed(() => THEME_MAP[currentThemeId.value] || THEMES[0]);

const renderedHtml = computed(() => {
  return compileMarkdown(markdownText.value, activeTheme.value, {
    convertLinksToFootnotes: true
  });
});

const wordCount = computed(() => {
  return (markdownText.value.match(/[\u4e00-\u9fa5\w]/g) || []).length;
});

const readTime = computed(() => {
  return Math.max(1, Math.ceil(wordCount.value / 350));
});

// Auto-save draft in localStorage
watch(markdownText, (val) => {
  localStorage.setItem('wechat_md_draft', val);
});

watch(currentThemeId, (val) => {
  localStorage.setItem('wechat_md_theme', val);
});

function loadDemo() {
  markdownText.value = DEFAULT_DEMO;
}

function clearContent() {
  markdownText.value = '';
}

async function handleCopyWechat() {
  try {
    const success = await copyWechatHtml(renderedHtml.value);
    if (success) {
      copied.value = true;
      setTimeout(() => { copied.value = false; }, 2500);
    }
  } catch (err) {
    alert('复制失败，请手动全选复制：' + err.message);
  }
}

function handleExportHtml() {
  const fullHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>微信文章导出</title>
</head>
<body style="background:#f8fafc;padding:20px;display:flex;justify-content:center;">
  <div style="max-width:680px;background:#ffffff;padding:24px;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,0.1);">
    ${renderedHtml.value}
  </div>
</body>
</html>
  `.trim();

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wechat_article_${Date.now()}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

onMounted(() => {
  const savedDraft = localStorage.getItem('wechat_md_draft');
  const savedTheme = localStorage.getItem('wechat_md_theme');
  if (savedTheme && THEME_MAP[savedTheme]) {
    currentThemeId.value = savedTheme;
  }
  if (savedDraft !== null && savedDraft.trim()) {
    markdownText.value = savedDraft;
  } else {
    loadDemo();
  }
});
</script>
