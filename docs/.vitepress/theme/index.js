import DefaultTheme from 'vitepress/theme'
import './custom.css'
import './logo.css'
import CodeRunner from '../components/CodeRunner.vue'
import DifficultyBadge from '../components/DifficultyBadge.vue'
import AlgorithmCard from '../components/AlgorithmCard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('CodeRunner', CodeRunner)
    app.component('DifficultyBadge', DifficultyBadge)
    app.component('AlgorithmCard', AlgorithmCard)

    // 平滑滚动处理
    if (typeof window !== 'undefined') {
      // 处理页面加载完成后的平滑滚动
      router.onAfterRouteChanged = (to) => {
        // 等待 DOM 更新
        setTimeout(() => {
          const hash = window.location.hash
          if (hash) {
            const element = document.querySelector(hash)
            if (element) {
              // 平滑滚动到锚点
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              })
            }
          }
        }, 100)
      }
    }
  },
  setup() {
    // 客户端初始化
    if (typeof window !== 'undefined') {
      // 监听页面滚动，增强目录高亮效果
      let ticking = false

      const updateActiveLink = () => {
        const scrollPosition = window.scrollY + 100

        // 获取所有标题元素
        const headings = document.querySelectorAll('.vp-doc h2, .vp-doc h3, .vp-doc h4')
        const outlineLinks = document.querySelectorAll('.VPDocAsideOutline .outline-link')

        if (headings.length === 0 || outlineLinks.length === 0) return

        // 找到当前可见的标题
        let currentHeading = null
        for (const heading of headings) {
          const headingTop = heading.offsetTop
          if (headingTop <= scrollPosition) {
            currentHeading = heading
          } else {
            break
          }
        }

        // 更新目录高亮
        if (currentHeading) {
          const id = currentHeading.id
          outlineLinks.forEach(link => {
            const href = link.getAttribute('href')
            if (href === `#${id}`) {
              link.classList.add('active')
            } else {
              link.classList.remove('active')
            }
          })
        }

        ticking = false
      }

      // 节流滚动事件
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateActiveLink)
          ticking = true
        }
      }, { passive: true })

      // 处理侧边栏链接点击
      document.addEventListener('click', (e) => {
        const link = e.target.closest('.VPSidebarItem .link')
        if (link) {
          const href = link.getAttribute('href')
          if (href && href.startsWith('#')) {
            e.preventDefault()
            const target = document.querySelector(href)
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              })
              // 更新 URL
              history.pushState(null, '', href)
            }
          }
        }
      })

      // 处理目录大纲链接点击
      document.addEventListener('click', (e) => {
        const link = e.target.closest('.VPDocAsideOutline .outline-link')
        if (link) {
          e.preventDefault()
          const href = link.getAttribute('href')
          if (href) {
            const target = document.querySelector(href)
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              })
              // 更新 URL
              history.pushState(null, '', href)
            }
          }
        }
      })
    }
  }
}
