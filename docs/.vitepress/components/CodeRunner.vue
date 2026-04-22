<template>
  <div class="code-runner">
    <div class="code-runner-header">
      <span class="title">💻 在线代码运行器</span>
      <div class="actions">
        <button @click="runCode" :disabled="isRunning" class="run-button">
          {{ isRunning ? '运行中...' : '▶ 运行代码' }}
        </button>
        <button @click="resetCode" class="reset-button">🔄 重置</button>
      </div>
    </div>
    
    <div class="code-runner-editor">
      <textarea
        v-model="code"
        class="code-editor"
        spellcheck="false"
        placeholder="在这里编写你的 C++ 代码..."
      ></textarea>
    </div>
    
    <div class="code-runner-input" v-if="showInput">
      <div class="input-header">
        <span>📝 输入数据</span>
      </div>
      <textarea
        v-model="input"
        class="input-area"
        placeholder="输入测试数据（可选）"
      ></textarea>
    </div>
    
    <div class="code-runner-output" v-if="output">
      <div class="output-header">
        <span>📤 运行结果</span>
        <span class="status" :class="statusClass">{{ statusText }}</span>
      </div>
      <pre class="output-content">{{ output }}</pre>
      <div class="output-info" v-if="executionTime">
        <span>⏱️ 执行时间: {{ executionTime }}ms</span>
        <span v-if="memory">💾 内存: {{ memory }}KB</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  initialCode: {
    type: String,
    default: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, OI!" << endl;
    return 0;
}`
  },
  showInput: {
    type: Boolean,
    default: true
  }
})

const code = ref(props.initialCode)
const input = ref('')
const output = ref('')
const isRunning = ref(false)
const statusText = ref('')
const statusClass = ref('')
const executionTime = ref(null)
const memory = ref(null)

const runCode = async () => {
  if (!code.value.trim()) {
    output.value = '错误：代码不能为空'
    statusText.value = '错误'
    statusClass.value = 'error'
    return
  }
  
  isRunning.value = true
  output.value = '正在编译和运行...'
  statusText.value = '运行中'
  statusClass.value = 'running'
  executionTime.value = null
  memory.value = null
  
  try {
    // 这里调用 Judge0 API
    // 暂时使用模拟数据
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟成功输出
    output.value = 'Hello, OI!\n'
    statusText.value = '✓ 运行成功'
    statusClass.value = 'success'
    executionTime.value = 23
    memory.value = 1024
    
    // TODO: 实际实现
    // const response = await fetch('/api/execute', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     source_code: code.value,
    //     stdin: input.value,
    //     language_id: 54 // C++ (GCC 9.2.0)
    //   })
    // })
    // const result = await response.json()
    // output.value = result.stdout || result.stderr || result.compile_output
    // statusText.value = result.status.description
    // executionTime.value = result.time
    // memory.value = result.memory
    
  } catch (error) {
    output.value = `错误：${error.message}`
    statusText.value = '✗ 运行失败'
    statusClass.value = 'error'
  } finally {
    isRunning.value = false
  }
}

const resetCode = () => {
  code.value = props.initialCode
  input.value = ''
  output.value = ''
  statusText.value = ''
  executionTime.value = null
  memory.value = null
}
</script>

<style scoped>
.code-runner {
  margin: 20px 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.dark .code-runner {
  background: #1e1e1e;
  border-color: #404040;
}

.code-runner-header {
  background-color: #f6f8fa;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark .code-runner-header {
  background-color: #2d2d2d;
  border-bottom-color: #404040;
}

.title {
  font-weight: 600;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 8px;
}

.run-button,
.reset-button {
  padding: 6px 16px;
  border-radius: 6px;
  border: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.run-button {
  background-color: #42b883;
  color: white;
}

.run-button:hover:not(:disabled) {
  background-color: #35a372;
}

.run-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-button {
  background-color: #e5e7eb;
  color: #333;
}

.dark .reset-button {
  background-color: #404040;
  color: #ddd;
}

.reset-button:hover {
  background-color: #d1d5db;
}

.code-editor,
.input-area {
  width: 100%;
  min-height: 300px;
  padding: 16px;
  border: none;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  background: white;
  color: #333;
}

.dark .code-editor,
.dark .input-area {
  background: #1e1e1e;
  color: #d4d4d4;
}

.code-editor:focus,
.input-area:focus {
  outline: none;
}

.code-runner-input {
  border-top: 1px solid #e5e7eb;
}

.dark .code-runner-input {
  border-top-color: #404040;
}

.input-header,
.output-header {
  background-color: #f6f8fa;
  padding: 8px 16px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark .input-header,
.dark .output-header {
  background-color: #2d2d2d;
  border-bottom-color: #404040;
}

.input-area {
  min-height: 100px;
}

.code-runner-output {
  border-top: 1px solid #e5e7eb;
}

.dark .code-runner-output {
  border-top-color: #404040;
}

.output-content {
  padding: 16px;
  margin: 0;
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  white-space: pre-wrap;
  max-height: 300px;
  overflow-y: auto;
}

.output-info {
  padding: 8px 16px;
  background-color: #f6f8fa;
  border-top: 1px solid #e5e7eb;
  font-size: 12px;
  display: flex;
  gap: 20px;
  color: #666;
}

.dark .output-info {
  background-color: #2d2d2d;
  border-top-color: #404040;
  color: #aaa;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.status.success {
  background-color: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.status.error {
  background-color: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

.status.running {
  background-color: rgba(33, 150, 243, 0.2);
  color: #2196f3;
}
</style>
