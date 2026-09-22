<template>
  <div style="flex: 1; height: 100%; overflow-y: auto; background: var(--bg-main); padding: 1.5rem; display: flex; justify-content: center;">
    <!-- Phone Container or Full Width Container -->
    <div 
      :style="{
        width: isMobileView ? '395px' : '100%',
        maxWidth: isMobileView ? '395px' : '880px',
        background: '#ffffff',
        borderRadius: isMobileView ? '16px' : '8px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        transition: 'width 0.2s ease'
      }"
    >
      <!-- Simulated Phone Status Bar for Mobile View -->
      <div 
        v-if="isMobileView" 
        style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 0.6rem 1rem; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b;"
      >
        <span>9:41</span>
        <span style="font-weight: 600;">微信公众号文章效果</span>
        <span>100% 🔋</span>
      </div>

      <!-- Main Rendered Content -->
      <div 
        ref="contentRef"
        :style="{
          padding: '1.25rem 1.25rem 3rem 1.25rem',
          flex: 1,
          color: '#1e293b',
          fontSize: fontSize
        }"
        v-html="renderedHtml"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  renderedHtml: { type: String, required: true },
  isMobileView: { type: Boolean, default: true },
  fontSize: { type: String, default: '15px' }
});

const contentRef = ref(null);
</script>
