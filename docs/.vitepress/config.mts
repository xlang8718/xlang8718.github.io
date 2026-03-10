import { defineConfig } from 'vitepress'

// 侧边栏配置
const sidebar = [
  {
    text: 'Network',
    items: [
      { text: 'M-LAG链路聚合', link: '/M-LAG' }
    ]
  },
  {
    text: 'Docker',
    items: [
      { text: 'Docker 运维命令', link: '/docker-ops' },
      { text: 'Docker 镜像加速', link: '/docker-mirror' }
    ]
  },
  {
    text: 'Linux',
    items: [
      { text: 'Linux 系统恢复', link: '/linux-recovery' }
    ]
  },
  {
    text: 'Kubernetes',
    items: [
      { text: 'Kubectl 日常命令', link: '/kubctl-command' },
      { text: 'K8s 存储 (PV/PVC/SC)', link: '/k8s-storage' }
    ]
  }
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DevOps 知识库",
  description: "网络、Linux、云原生、云计算、DevOps、数据库、中间件、监控",
  themeConfig: {
    search: {
      provider: 'local'
    },
    
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🏠 首页', link: '/' },
      ...sidebar
    ],

    sidebar: sidebar,

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航',
      level: 'deep'
    },

    // lastUpdated: {
    //   text: '最后更新于',
    //   formatOptions: {
    //     dateStyle: 'short',
    //     timeStyle: 'medium'
    //   }
    // },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '浅色模式',
    darkModeSwitchTitle: '深色模式',
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xlang8718/xlang8718.github.io' }
    ],

    footer: {
      message: '基于 MIT 协议发行',
      copyright: 'Copyright © 2026-至今 DevOps 知识库'
    }
  }
})
