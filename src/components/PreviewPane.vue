<template>
  <div style="flex: 1; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--bg-main); padding: 0.75rem 1rem; overflow: hidden;">
    
    <!-- Real Mobile Phone Mockup (iPhone with Dynamic Island & Internal Smooth Scrolling) -->
    <div 
      v-if="isMobileView" 
      class="phone-mockup"
      style="
        width: 395px;
        height: calc(100vh - 75px);
        max-height: 840px;
        background: #0f172a;
        border-radius: 48px;
        padding: 11px;
        box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 3px #334155, inset 0 0 6px rgba(255, 255, 255, 0.15);
        display: flex;
        flex-direction: column;
        position: relative;
        flex-shrink: 0;
      "
    >
      <!-- Phone Inner Screen -->
      <div 
        style="
          flex: 1;
          background: #ffffff;
          border-radius: 38px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        "
      >
        <!-- iPhone Dynamic Island & Status Bar -->
        <div 
          style="
            background: #ffffff;
            padding: 8px 20px 6px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            font-weight: 600;
            color: #0f172a;
            border-bottom: 1px solid #f1f5f9;
            user-select: none;
            flex-shrink: 0;
          "
        >
          <span style="font-family: -apple-system, sans-serif; font-weight: 700;">09:41</span>
          
          <!-- Dynamic Island Pill -->
          <div style="width: 90px; height: 22px; background: #0f172a; border-radius: 12px; display: flex; align-items: center; justify-content: flex-end; padding-right: 7px; box-shadow: inset 0 0 2px rgba(255,255,255,0.2);">
            <span style="width: 7px; height: 7px; border-radius: 50%; background: #1e293b; display: inline-block;"></span>
          </div>

          <div style="display: flex; align-items: center; gap: 4px; font-size: 11px;">
            <span>5G</span>
            <span>🔋</span>
          </div>
        </div>

        <!-- WeChat Article Top Header -->
        <div style="background: #f8fafc; border-bottom: 1px solid #f1f5f9; padding: 7px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #475569; flex-shrink: 0; user-select: none;">
          <span style="font-weight: 600; color: #1e293b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 250px;">微信公众号预览</span>
          <span style="font-size: 13px; letter-spacing: 2px; color: #64748b; font-weight: bold;">•••</span>
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

        <!-- iPhone Home Bar Indicator -->
        <div style="background: #ffffff; padding: 6px 0 8px 0; display: flex; justify-content: center; flex-shrink: 0; user-select: none;">
          <div style="width: 125px; height: 4px; background: #cbd5e1; border-radius: 2px;"></div>
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

defineProps({
  renderedHtml: { type: String, required: true },
  isMobileView: { type: Boolean, default: true },
  fontSize: { type: String, default: '15px' }
});

const contentRef = ref(null);
</script>
