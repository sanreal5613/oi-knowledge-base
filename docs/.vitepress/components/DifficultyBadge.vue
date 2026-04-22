<template>
  <span class="difficulty-badge" :class="`difficulty-${level}`">
    {{ text }}
  </span>
</template>

<script setup>
const props = defineProps({
  level: {
    type: String,
    required: true,
    validator: (value) => ['easy', 'medium', 'hard'].includes(value)
  }
})

const text = {
  easy: '入门',
  medium: '提高',
  hard: '省选'
}[props.level]
</script>

<style scoped>
.difficulty-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
}

.difficulty-easy {
  background-color: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.difficulty-medium {
  background-color: rgba(255, 193, 7, 0.2);
  color: #ff9800;
}

.difficulty-hard {
  background-color: rgba(244, 67, 54, 0.2);
  color: #f44336;
}
</style>
