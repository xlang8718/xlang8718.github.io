import { defineConfig } from 'vitepress'

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
      {
        text: 'Docker',
        items: [
          { text: 'Docker 运维命令', link: 'docker-ops' }
        ]
      },
      {
        text: 'Linux',
        items: [
          { text: 'Linux 系统恢复', link: 'linux-recovery' }
        ]
      },
      {
        text: 'Kubernetes',
        items: [
          { text: 'Kubectl 日常命令', link: 'kubctl-command' }
        ]
      }
    ],

    sidebar: [
      {
        text: 'Docker',
        items: [
          { text: 'Docker 运维命令', link: 'docker-ops' }
        ]
      },
      {
        text: 'Linux',
        items: [
          { text: 'Linux 系统恢复', link: 'linux-recovery' }
        ]
      },
      {
        text: 'Kubernetes',
        items: [
          { text: 'Kubectl 日常命令', link: 'kubctl-command' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xlang8718/xlang8718.github.io' }
    ],

    footer: {
      message: '基于 MIT 协议发行',
      copyright: 'Copyright © 2026-至今 DevOps 知识库'
    }
  }
})
