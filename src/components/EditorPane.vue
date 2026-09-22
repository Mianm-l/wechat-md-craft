<template>
  <div style="display: flex; flex-direction: column; height: 100%; border-right: 1px solid var(--border-color); background: var(--bg-card);">
    <!-- Markdown Formatting Toolbar -->
    <div style="background: var(--bg-input); border-bottom: 1px solid var(--border-color); padding: 0.45rem 0.75rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.35rem;">
      <div style="display: flex; align-items: center; gap: 0.2rem; flex-wrap: wrap;">
        <button class="btn-icon" @click="insertText('# ', '')" title="一级标题"><Heading1 :size="16" /></button>
        <button class="btn-icon" @click="insertText('## ', '')" title="二级标题"><Heading2 :size="16" /></button>
        <button class="btn-icon" @click="insertText('### ', '')" title="三级标题"><Heading3 :size="16" /></button>
        <div style="width: 1px; height: 16px; background: var(--border-color); margin: 0 4px;"></div>
        <button class="btn-icon" @click="insertText('**', '**')" title="加粗"><Bold :size="15" /></button>
        <button class="btn-icon" @click="insertText('*', '*')" title="斜体"><Italic :size="15" /></button>
        <button class="btn-icon" @click="insertText('> ', '')" title="引用"><Quote :size="15" /></button>
        <button class="btn-icon" @click="insertText('`', '`')" title="行内代码"><Code2 :size="15" /></button>
        <button class="btn-icon" @click="insertCodeBlock" title="代码块"><FileCode :size="15" /></button>
        <button class="btn-icon" @click="insertTable" title="插入表格"><TableIcon :size="15" /></button>
        <button class="btn-icon" @click="insertLink" title="插入超链接"><LinkIcon :size="15" /></button>
      </div>

      <div style="display: flex; gap: 0.4rem;">
        <button class="btn-ghost" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;" @click="$emit('load-demo')">
          <BookOpen :size="13" />
          <span>范文</span>
        </button>
        <button class="btn-ghost" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;" @click="$emit('clear')">
          <Trash2 :size="13" />
          <span>清空</span>
        </button>
      </div>
    </div>

    <!-- Textarea Editor -->
    <div style="flex: 1; position: relative;">
      <textarea
        ref="textareaRef"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keydown.tab.prevent="handleTab"
        style="width: 100%; height: 100%; border: none; outline: none; resize: none; background: var(--bg-card); color: var(--text-main); font-family: 'Fira Code', Consolas, Monaco, monospace; font-size: 14px; line-height: 1.7; padding: 1.25rem; tab-size: 2;"
        placeholder="在此处开始编写或粘贴 Markdown 原文..."
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  Bold, 
  Italic, 
  Quote, 
  Code2, 
  FileCode, 
  Table as TableIcon, 
  Link as LinkIcon, 
  BookOpen, 
  Trash2 
} from 'lucide-vue-next';

const props = defineProps({
  modelValue: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue', 'load-demo', 'clear']);
const textareaRef = ref(null);

function insertText(before, after) {
  const el = textareaRef.value;
  if (!el) return;

  const start = el.selectionStart;
  const end = el.selectionEnd;
  const val = el.value;
  const selected = val.substring(start, end);

  const newVal = val.substring(0, start) + before + (selected || '文本内容') + after + val.substring(end);
  emit('update:modelValue', newVal);

  setTimeout(() => {
    el.focus();
    el.setSelectionRange(start + before.length, start + before.length + (selected ? selected.length : 4));
  }, 0);
}

function insertCodeBlock() {
  insertText('```javascript\n', '\n```');
}

function insertTable() {
  const tableTpl = '\n| 模块名称 | 技术栈 | 状态 |\n| :--- | :--- | :--- |\n| 认证授权 | OAuth2 / JWT | 已完成 |\n| 数据导出 | 批量 SQL | 运行中 |\n';
  insertText(tableTpl, '');
}

function insertLink() {
  insertText('[文章标题描述](', 'https://example.com)');
}

function handleTab() {
  insertText('  ', '');
}
</script>
