<template>
  <div class="algorithm-card">
    <div class="algorithm-card-title">{{ title }}</div>
    <div class="algorithm-card-desc">{{ description }}</div>
    <div class="algorithm-card-footer">
      <span class="complexity" v-if="timeComplexity">
        时间: {{ timeComplexity }}
      </span>
      <span class="complexity" v-if="spaceComplexity">
        空间: {{ spaceComplexity }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timeComplexity: {
    type: String,
    default: ''
  },
  spaceComplexity: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.algorithm-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  transition: all 0.3s ease;
  background: white;
}

.dark .algorithm-card {
  background: #1e1e1e;
  border-color: #404040;
}

.algorithm-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.algorithm-card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #42b883;
}

.algorithm-card-desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
}

.dark .algorithm-card-desc {
  color: #aaa;
}

.algorithm-card-footer {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.complexity {
  display: inline-block;
  background-color: rgba(33, 150, 243, 0.1);
  color: #2196f3;
  padding: 4px 10px;
  border-radius: 8px;
  font-family: 'Consolas', monospace;
  font-size: 13px;
}

.dark .complexity {
  background-color: rgba(33, 150, 243, 0.2);
}
</style>
