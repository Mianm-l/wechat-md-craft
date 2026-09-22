<template>
  <div 
    class="preview-scroll-wrapper"
    style="flex: 1; height: 100%; overflow-y: auto; background: var(--bg-main); padding: 1.5rem 1rem 4rem 1rem;"
  >
    <!-- Phone Container or Full Width Container -->
    <div 
      :style="{
        width: isMobileView ? '410px' : '100%',
        maxWidth: isMobileView ? '410px' : '880px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: isMobileView ? '16px' : '8px',
        boxShadow: '0 10px 35px rgba(0,0,0,0.4)',
        border: '1px solid var(--border-color)',
        transition: 'width 0.2s ease',
        minHeight: 'min-content'
      }"
    >
      <!-- Simulated Phone Status Bar for Mobile View -->
      <div 
        v-if="isMobileView" 
        style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; border-radius: 16px 16px 0 0; padding: 0.6rem 1rem; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b;"
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
