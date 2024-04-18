import nav from './nav'
import sidebar from './sidebar'

const base = '/';
const giteeFavicon = '<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" fill="#c71d23" r="16"/><path d="m24.0987698 14.2225144h-9.0863697c-.4362899.000207-.7900048.3538292-.790326.7901191l-.0005173 1.9752185c-.0003277.4363707.353328.7902117.7896987.790326.0000712 0 .0001424 0 .0002135-.0002135l5.5317648-.0000461c.4363708-.0000102.7901221.3537352.7901257.790106 0 .0000022 0 .0000044-.0000066.0000066v.1975077.1975318c0 1.3091122-1.0612451 2.3703573-2.3703573 2.3703573h-7.5067195c-.4363081-.0000218-.790009-.353713-.7900429-.7900211l-.0002069-7.5059917c-.0001014-1.3091122 1.0611145-2.3703865 2.3702267-2.3704226.0000217 0 .0000435 0 .0000653.0000653h11.0602463c.4361793-.0004902.7898484-.35394.7906091-.79011894l.0012251-1.97521881c.0007606-.43637034-.3527683-.79033806-.7891389-.79060871-.0001634-.0000001-.0003268-.00000015-.0004901.00048976h-11.0617654c-3.27278051 0-5.92589329 2.65311278-5.92589329 5.9258933v11.0612755c0 .4363707.35374837.7901191.7901191.7901191h11.65447149c2.9454379 0 5.3331872-2.3877493 5.3331872-5.3331872v-4.5430682c0-.4363707-.3537484-.7901191-.7901191-.7901191z" fill="#fff"/></g></svg>';
const CSDNFavicon = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">  <image id="image0" width="32" height="32" x="0" y="0"
    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABMlBMVEX8VTH8dFf9pZL9xLf+
0cf+zsP9uar8knv8Xjz8g2n+29P////+9vX9rpz8Wzj8Wjf9vrD+/v7+4tz8ZUX8XTv+187+5+L9
sJ/9wLL+7er9vK78VjP9zsT+6+f8iG/8VzT9mYT+9fP+z8X9pJD+4dv8ZEP8b1H+6+b8jnb8ZkX+
+Pf+9PH8aUr8Xz38cFL9sqL9nYj+8u/+7+z8WTb8f2T9taX8h239v7H8Z0f+zsT+/f3+0sn++/v9
y7/9tqb8eVz9q5r8YUD++/r8Y0L8bE38iXH8VjL+1s78YT/8gGX+9PL8Zkb+8/D9m4b8YkD8WDX9
w7b+9vT8hGr++vr+6OP+2dH+1Mv+4Nr++ff+7+v8fmP9sKD+8/H+7ur9qpn9qpj9wrb+zMH9u639
oY38el78VzOb/PDuAAAAAWJLR0QLH9fEwAAAAAd0SU1FB+cEEAM2G2MzlgUAAAEASURBVDjLY2AY
dICRiZmFlY2dA4c0Jxc3BPDw8mGR5hcQ5IYDIWEMeRFRkISYgLiEJIghhS4vLQMUlZUDMeUVFLm5
ldAVKAPlVVShHDV1QQ00eU0tbm5tHThXVw/dAH2gAQZ4/C9vyM1tZIxHgQnQAFN8IcgEVGCGT4E5
UIEFPgWW3NxW0vgUWHNz2+CTZ7AFWiGCT4EdUIE9PgXsQAUO+BQ4OnFzGzojCbi4uqGqEAAa4e4B
53p6cYujKvD2AcW2rx+I7W8SYMXNHYhmSVAwKJkIhoSGhUeA01QIujM8I7mRgVEUhkM9omPg0rFx
utj8wh8Un6BknZiUnJLKMJgAAK9gG/sHs2daAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA0LTE2
VDAzOjU0OjI3KzAwOjAwSk898gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNC0xNlQwMzo1NDoy
NyswMDowMDsShU4AAAAASUVORK5CYII=" />
</svg>
`

export default {
  // 自定义网站 favicon
  head: [
    // 打包后使用
    ['link', { rel: 'icon', href: `${base}Licon.svg` }],
    // 本地开发用
    ['link', { rel: 'icon', href: '/Licon.svg' }],
  ],
  // 根路径，和仓库名一致
  base,
  // 左上角标题
  title: 'LeoBlog',
  // 爬虫爬取的内容
  description: '笔记记录',
  // 设置展示最后修改时间
  lastUpdated: true,
  // markdown 相关配置
  markdown: {
    // 代码块行号
    lineNumbers: true,
  },
  // 默认主题相关配置 [https://vitepress.dev/reference/default-theme-config]
  themeConfig: {
    // 配置左上角的 logo
    logo: '/Licon.svg',
    // 导航栏
    nav,
    // 侧边栏
    sidebar,
    // 标题深度，[2,3] 表示提取 h2 和 h3 标题
    outline: [2, 3],
    // 目录标题
    outlineTitle: '本页目录',
    // 设置社交链接
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Virzn'
      },
      {
        icon: { svg: giteeFavicon, },
        link: 'https://gitee.com/Vireoz'
      },
      { icon: { svg: CSDNFavicon }, link: 'https://blog.csdn.net/leoz1' },
      // { icon: 'facebook', link: 'https://www.facebook.com' },
      // { icon: 'youtube', link: 'https://www.youtube.com/' },
    ],
    // 最后更新时间
    lastUpdatedText: 'Last updated',
    // 设置底部的版权声明，只有左边侧边栏不存在才会展示
    footer: {
      message: 'If there is any reprint or CV, please mark the original address of this website',
      copyright: 'Copyright © 2023-present LeoBlog'
    },
    // 设置编辑页面链接
    editLink: {
      pattern: 'https://github.com/LeoCQM/Leoblog',
      text: 'Edit this page on GitHub'
    },
    // 设置上下篇文字
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },
    // 仅移动端生效
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    algolia: {
      appId: 'GQLGTK0PME',
      apiKey: 'd29b0bacbd90da87fe49bb4ec89f707b',
      indexName: 'virznio',
      placeholder: '输入关键字',
      translations: {
        button: {
          buttonText: '搜索',
          buttonAriaLabel: '搜索'
        },
        modal: {
          searchBox: {
            resetButtonTitle: '清除查询条件',
            resetButtonAriaLabel: '清除查询条件',
            cancelButtonText: '取消',
            cancelButtonAriaLabel: '取消'
          },
          startScreen: {
            recentSearchesTitle: '搜索历史',
            noRecentSearchesText: '没有搜索历史',
            saveRecentSearchButtonTitle: '保存至搜索历史',
            removeRecentSearchButtonTitle: '从搜索历史中移除',
            favoriteSearchesTitle: '收藏',
            removeFavoriteSearchButtonTitle: '从收藏中移除'
          },
          errorScreen: {
            titleText: '无法获取结果',
            helpText: '你可能需要检查你的网络连接'
          },
          footer: {
            selectText: '选择',
            navigateText: '切换',
            closeText: '关闭',
            searchByText: '搜索提供者'
          },
          noResultsScreen: {
            noResultsText: '无法找到相关结果',
            suggestedQueryText: '你可以尝试查询',
            reportMissingResultsText: '你认为该查询应该有结果？',
            reportMissingResultsLinkText: '点击反馈'
          }
        }
      }
    }
  },
}