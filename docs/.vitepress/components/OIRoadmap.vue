<script setup>
import { ref } from 'vue'

const expandedIndex = ref(-1)

function toggleExpand(index) {
  expandedIndex.value = expandedIndex.value === index ? -1 : index
}

const stages = [
  {
    title: 'CSP-J 入门组',
    desc: '零基础起步，培养编程思维。掌握 C++ 基础语法，学习简单算法，为信息学竞赛打下坚实基础。',
    tags: ['C++ 语法基础', '数组与函数', '简单模拟', '枚举算法'],
    details: {
      goals: [
        '熟练掌握 C++ 基础语法（变量、循环、条件判断）',
        '理解数组、字符串的基本操作',
        '学会编写简单的函数和递归',
        '掌握枚举、模拟等基础算法思想'
      ]
    }
  },
  {
    title: 'CSP-S 提高组',
    desc: '进阶算法，提升解题能力。系统学习基础算法和数据结构，培养解决复杂问题的能力。',
    tags: ['排序与二分', '递归与贪心', '栈、队列、链表', 'DFS / BFS'],
    details: {
      goals: [
        '掌握各种排序算法及其应用',
        '理解二分查找和二分答案',
        '学会使用栈、队列、链表等线性结构',
        '掌握 DFS、BFS 等搜索算法'
      ]
    }
  },
  {
    title: 'NOIP 全国联赛',
    desc: '省级比赛，争取奖项。NOIP 是省级比赛，成绩优秀者可获得省一、省二、省三奖项。',
    tags: ['树与图基础', '最短路 / 最小生成树', '基础动态规划', '简单数论'],
    details: {
      goals: [
        '掌握树和图的基本存储与遍历',
        '学会最短路、最小生成树等图论算法',
        '理解动态规划的基本思想',
        '掌握质数、GCD、快速幂等数论基础'
      ],
      awards: [
        '一等奖（省一）：约前 10%',
        '二等奖（省二）：约前 30%',
        '三等奖（省三）：约前 60%'
      ]
    }
  },
  {
    title: '省选 / 省队选拔',
    desc: '竞争省队名额，通往 NOI。省选是选拔省队成员的比赛，每个省选拔 5-15 名选手组成省队。',
    tags: ['线段树 / 树状数组', '高级动态规划', '数论进阶'],
    details: {
      goals: [
        '掌握线段树、树状数组等高级数据结构',
        '学会区间 DP、树形 DP、状态压缩 DP',
        '理解扩展欧几里得、逆元等进阶数论',
        '提升代码速度和调试能力'
      ],
      selection: [
        '结合 NOIP 成绩和统一省选成绩',
        '每个省选拔 5-15 人组成省队',
        'A/B 类名额，部分省份有 E 类'
      ]
    }
  },
  {
    title: 'NOI 全国决赛',
    desc: '国内最高水平，争夺金牌。NOI 是国内最高水平的比赛，金牌获得者可直接保送名校。',
    tags: ['网络流 / 图论进阶', '高级数据结构', 'DP 优化技巧'],
    details: {
      goals: [
        '掌握网络流、二分图匹配等高级图论',
        '学会平衡树、可持久化数据结构',
        '理解斜率优化、四边形不等式等 DP 优化',
        '具备解决复杂综合性问题的能力'
      ],
      awards: [
        '金牌（约前 50 名）：直接保送清北',
        '银牌：强基计划优惠',
        '铜牌：名校自主招生资格'
      ],
      format: '两天，每天 5 小时，3-4 道题'
    }
  },
  {
    title: 'IOI 国际奥赛',
    desc: '代表国家出战，世界巅峰。IOI 是全球最高水平的比赛，每个国家 4 名选手参赛。',
    tags: ['字符串高级算法', '多项式算法', '可持久化数据结构', '计算几何'],
    details: {
      goals: [
        '掌握后缀数组、后缀自动机等字符串算法',
        '学会 FFT、NTT 等多项式算法',
        '理解计算几何基础算法',
        '具备世界顶级竞赛的解题能力'
      ],
      selection: [
        'NOI 后选拔 50 人进入国家集训队',
        '经过多轮选拔，最终选出 4 人',
        '代表中国参加 IOI'
      ],
      stage: '与全球顶尖选手同台竞技，争夺世界金牌'
    }
  }
]

const colors = [
  { dot: '#42b883', border: '#42b883', bg: 'rgba(66, 184, 131, 0.1)', text: '#42b883' },
  { dot: '#3498db', border: '#3498db', bg: 'rgba(52, 152, 219, 0.1)', text: '#3498db' },
  { dot: '#9b59b6', border: '#9b59b6', bg: 'rgba(155, 89, 182, 0.1)', text: '#9b59b6' },
  { dot: '#e67e22', border: '#e67e22', bg: 'rgba(230, 126, 34, 0.1)', text: '#e67e22' },
  { dot: '#e74c3c', border: '#e74c3c', bg: 'rgba(231, 76, 60, 0.1)', text: '#e74c3c' },
  { dot: '#7b1f1f', border: '#7b1f1f', bg: 'rgba(123, 31, 31, 0.1)', text: '#7b1f1f' }
]
</script>

<template>
  <div class="oi-roadmap">
    <div class="roadmap-header">
      <h2 class="roadmap-title">🏆 信奥晋级路径</h2>
      <p class="roadmap-subtitle">从入门到国际赛场，一步步走向编程巅峰</p>
    </div>
    
    <div class="timeline">
      <div
        v-for="(stage, index) in stages"
        :key="index"
        class="timeline-item"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="timeline-dot" :style="{ background: colors[index].dot, boxShadow: `0 0 0 4px ${colors[index].dot}` }"></div>
        <div 
          class="timeline-content" 
          :class="{ expanded: expandedIndex === index }"
          :style="{ borderLeftColor: colors[index].border }"
          @click="toggleExpand(index)"
        >
          <h3>{{ stage.title }}</h3>
          <p>{{ stage.desc }}</p>
          <div class="timeline-tags">
            <span 
              v-for="tag in stage.tags" 
              :key="tag"
              class="timeline-tag"
              :style="{ background: colors[index].bg, color: colors[index].text }"
            >
              {{ tag }}
            </span>
          </div>
          <button class="expand-btn">
            {{ expandedIndex === index ? '收起详情' : '查看详情' }}
            <span class="arrow" :class="{ rotated: expandedIndex === index }">▼</span>
          </button>
          <div class="expand-content" :class="{ show: expandedIndex === index }">
            <div class="detail-section">
              <h4>🎯 学习目标</h4>
              <ul>
                <li v-for="goal in stage.details.goals" :key="goal">{{ goal }}</li>
              </ul>
              <template v-if="stage.details.awards">
                <h4>🏆 奖项设置</h4>
                <ul>
                  <li v-for="award in stage.details.awards" :key="award">{{ award }}</li>
                </ul>
              </template>
              <template v-if="stage.details.selection">
                <h4>🏆 选拔方式</h4>
                <ul>
                  <li v-for="item in stage.details.selection" :key="item">{{ item }}</li>
                </ul>
              </template>
              <template v-if="stage.details.format">
                <h4>⏱️ 比赛形式</h4>
                <p>{{ stage.details.format }}</p>
              </template>
              <template v-if="stage.details.stage">
                <h4>🌍 国际舞台</h4>
                <p>{{ stage.details.stage }}</p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.oi-roadmap {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.roadmap-header {
  text-align: center;
  margin-bottom: 40px;
}

.roadmap-title {
  font-size: 2em;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.roadmap-subtitle {
  color: #666;
  font-size: 1.1em;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, 
    #42b883 0%,
    #3498db 20%,
    #9b59b6 40%,
    #e67e22 60%,
    #e74c3c 80%,
    #7b1f1f 100%
  );
  border-radius: 2px;
}

.timeline-item {
  display: flex;
  margin-bottom: 25px;
  position: relative;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  left: 14px;
  top: 8px;
  border: 3px solid white;
  transition: all 0.3s ease;
  z-index: 2;
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.2);
}

.timeline-content {
  margin-left: 50px;
  background: #f8f9fa;
  padding: 15px 20px;
  border-radius: 10px;
  flex: 1;
  border-left: 4px solid;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.timeline-content:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.12);
  background: #fff;
}

.timeline-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.2em;
  color: #2c3e50;
}

.timeline-content p {
  margin: 0 0 12px 0;
  color: #666;
  line-height: 1.5;
  font-size: 0.95em;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.timeline-tag {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  transition: all 0.2s ease;
}

.timeline-tag:hover {
  transform: scale(1.05);
}

.expand-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border: none;
  background: rgba(0,0,0,0.05);
  color: #666;
  font-size: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.expand-btn:hover {
  background: rgba(0,0,0,0.1);
}

.arrow {
  transition: transform 0.3s ease;
  font-size: 10px;
}

.arrow.rotated {
  transform: rotate(180deg);
}

.expand-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease;
  opacity: 0;
}

.expand-content.show {
  max-height: 400px;
  opacity: 1;
  margin-top: 15px;
}

.detail-section {
  padding-top: 10px;
  border-top: 1px dashed #ddd;
}

.detail-section h4 {
  margin: 12px 0 8px 0;
  font-size: 14px;
  color: #333;
}

.detail-section ul {
  margin: 0;
  padding-left: 20px;
}

.detail-section li {
  margin: 4px 0;
  color: #555;
  font-size: 13px;
}

.detail-section p {
  margin: 0;
  color: #555;
  font-size: 13px;
}

@media (max-width: 600px) {
  .timeline::before {
    left: 15px;
  }
  
  .timeline-dot {
    left: 9px;
    width: 14px;
    height: 14px;
  }
  
  .timeline-content {
    margin-left: 40px;
    padding: 12px 15px;
  }
  
  .roadmap-title {
    font-size: 1.6em;
  }
}
</style>
