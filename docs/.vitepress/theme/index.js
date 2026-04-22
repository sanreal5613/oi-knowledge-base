import DefaultTheme from 'vitepress/theme'
import './custom.css'
import './logo.css'
import CodeRunner from '../components/CodeRunner.vue'
import DifficultyBadge from '../components/DifficultyBadge.vue'
import AlgorithmCard from '../components/AlgorithmCard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('CodeRunner', CodeRunner)
    app.component('DifficultyBadge', DifficultyBadge)
    app.component('AlgorithmCard', AlgorithmCard)
  }
}
