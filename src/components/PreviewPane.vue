<template>
  <div style="flex: 1; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--bg-main); padding: 1rem; overflow: hidden;">
    
    <!-- Sleek Minimalist Mobile Frame (Pure WeChat Native App Style) -->
    <div 
      v-if="isMobileView" 
      class="phone-mockup"
      style="
        width: 395px;
        height: calc(100vh - 78px);
        max-height: 840px;
        background: #0b0f19;
        border: 9px solid #1e293b;
        border-radius: 36px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08);
        display: flex;
        flex-direction: column;
        position: relative;
        flex-shrink: 0;
        overflow: hidden;
      "
    >
      <!-- Phone Inner Screen -->
      <div 
        style="
          flex: 1;
          background: #ffffff;
          border-radius: 25px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        "
      >
        <!-- WeChat Official Top Navigation Bar (Clean & Professional) -->
        <div 
          style="
            background: #ffffff;
            height: 46px;
            padding: 0 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #f1f5f9;
            user-select: none;
            flex-shrink: 0;
          "
        >
          <div style="display: flex; align-items: center; gap: 2px; color: #1e293b; font-size: 13px; font-weight: 500;">
            <ChevronLeft :size="20" style="margin-left: -4px;" />
            <span>微信</span>
          </div>

          <div style="font-size: 13px; font-weight: 600; color: #0f172a; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            公众号文章预览
          </div>

          <div style="color: #64748b; display: flex; align-items: center;">
            <MoreHorizontal :size="20" />
          </div>
        </div>

        <!-- Internal Scrollable Article Body -->
        <div 
          class="phone-scroll-body"
          style="
            flex: 1;
            overflow-y: auto;
            padding: 1.25rem 1.25rem 3rem 1.25rem;
            color: #1e293b;
            -webkit-overflow-scrolling: touch;
          "
        >
          <div ref="contentRef" :style="{ fontSize: fontSize }" v-html="renderedHtml"></div>
        </div>

        <!-- Sleek Bottom Home Bar -->
        <div style="background: #ffffff; padding: 6px 0 8px 0; display: flex; justify-content: center; flex-shrink: 0; user-select: none;">
          <div style="width: 120px; height: 4px; background: #e2e8f0; border-radius: 2px;"></div>
        </div>
      </div>
    </div>

    <!-- Desktop Full-Width Reader Container -->
    <div 
      v-else 
      class="desktop-scroll-body"
      style="
        width: 100%;
        max-width: 880px;
        height: 100%;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        border: 1px solid var(--border-color);
        overflow-y: auto;
        padding: 2.5rem 3rem;
        color: #1e293b;
      "
    >
      <div ref="contentRef" :style="{ fontSize: fontSize }" v-html="renderedHtml"></div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChevronLeft, MoreHorizontal } from 'lucide-vue-next';

defineProps({
  renderedHtml: { type: String, required: true },
  isMobileView: { type: Boolean, default: true },
  fontSize: { type: String, default: '15px' }
});

const contentRef = ref(null);
</script>
