<template>
  <header style="background: var(--bg-card); border-bottom: 1px solid var(--border-color); padding: 0.65rem 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
    <!-- Logo & Privacy Info -->
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <div style="background: linear-gradient(135deg, #07c160, #059669); width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 10px rgba(7, 193, 96, 0.35);">
        <Sparkles :size="20" />
      </div>
      <div>
        <h1 style="font-size: 1.05rem; font-weight: 700; display: flex; align-items: center; gap: 0.4rem; letter-spacing: -0.02em;">
          WechatMdCraft
          <span style="font-size: 0.7rem; font-weight: 600; padding: 0.1rem 0.4rem; border-radius: 4px; background: rgba(7, 193, 96, 0.15); color: var(--wechat-green); border: 1px solid rgba(7, 193, 96, 0.3);">本地零外发</span>
        </h1>
      </div>
    </div>

    <!-- Theme & Display Controls -->
    <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
      <!-- Theme Selector -->
      <div style="display: flex; align-items: center; gap: 0.4rem;">
        <Palette :size="15" style="color: var(--text-dim);" />
        <select 
          :value="currentThemeId" 
          @change="$emit('update:theme', $event.target.value)"
          class="btn-ghost"
          style="background: var(--bg-input); border-color: var(--border-color); color: var(--text-main); font-size: 0.8rem; padding: 0.35rem 0.65rem; cursor: pointer; outline: none;"
        >
          <option v-for="t in themes" :key="t.id" :value="t.id">
            🎨 {{ t.name }}
          </option>
        </select>
      </div>

      <!-- Device Frame Toggle -->
      <div style="display: flex; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: 6px; padding: 2px;">
        <button 
          :class="['btn-icon', { 'active-device': isMobileView }]" 
          @click="$emit('toggle-view', true)"
          title="手机宽度预览 (375px)"
        >
          <Smartphone :size="15" />
        </button>
        <button 
          :class="['btn-icon', { 'active-device': !isMobileView }]" 
          @click="$emit('toggle-view', false)"
          title="全宽自适应预览"
        >
          <Monitor :size="15" />
        </button>
      </div>

      <!-- Stats -->
      <span style="font-size: 0.75rem; color: var(--text-dim); padding: 0.2rem 0.5rem; background: var(--bg-input); border-radius: 4px; border: 1px solid var(--border-color);">
        {{ wordCount }} 字 · 约 {{ readTime }} 分钟
      </span>
    </div>

    <!-- Action Buttons -->
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <button class="btn-ghost" @click="$emit('export-html')" title="下载带完整内联样式的 HTML 文件">
        <Download :size="14" />
        <span>导出 HTML</span>
      </button>

      <button class="btn-wechat" @click="$emit('copy-wechat')">
        <Check v-if="copied" :size="16" />
        <Copy v-else :size="16" />
        <span>{{ copied ? '已复制到剪贴板！' : '一键复制到公众号' }}</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { 
  Sparkles, 
  Palette, 
  Smartphone, 
  Monitor, 
  Download, 
  Copy, 
  Check 
} from 'lucide-vue-next';

defineProps({
  themes: { type: Array, required: true },
  currentThemeId: { type: String, required: true },
  isMobileView: { type: Boolean, default: true },
  wordCount: { type: Number, default: 0 },
  readTime: { type: Number, default: 1 },
  copied: { type: Boolean, default: false }
});

defineEmits(['update:theme', 'toggle-view', 'export-html', 'copy-wechat']);
</script>

<style scoped>
.active-device {
  background-color: var(--accent) !important;
  color: white !important;
}
</style>
