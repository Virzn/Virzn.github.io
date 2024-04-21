export default [
  {
    text: '前端学习',
    items: [
      {
        text: '基础知识',
        items: [
          { text: 'HTML', link: '/fe/html/html_intro', activeMatch: '^/fe/html', },
          { text: 'CSS', link: '/fe/css/css', activeMatch: '^/fe/css', },
          { text: 'JavaScript', link: '/fe/js/what_is_js', activeMatch: '^/fe/js', },
          { text: 'Vue', link: '/fe/vue/vue_core_basis', activeMatch: '^/fe/vue', },
          { text: 'React', link: '/fe/react/react_pre', activeMatch: '^/fe/react', },
          { text: 'Nodejs', link: '/fe/nodejs/node_basis', activeMatch: '^/fe/nodejs', },
          { text: 'Git', link: '/fe/git/git', activeMatch: '^/fe/html', },
          { text: 'Webpack', link: '/fe/webpack/webpack_basis', activeMatch: '^/fe/webpack', },
          { text: 'Vscode', link: '/fe/ide/vscode', activeMatch: '^/fe/vscode', },
        ]
      },
      {
        text: '项目',
        items: [
          // { text: 'COVID-19', link: '/projects/covid19/headline' },
          // { text: 'Echarts', link: '/projects/echarts/headline' },
        ]
      },
    ],
    activeMatch: '^/fe'
  },
  {
    text: '面试宝典',
    link: '/interview/netCalcInter',
    activeMatch: '^/interview'
  },
  // {
  //   text: '知也无涯',
  //   items: [
  //     { text: '计算机基础', link: '/cs/network' },
  //     { text: 'Python', link: '/lang/python/crawler' }
  //   ]
  // },
  {
    text: '高效搬砖',
    items: [
      { text: '那些年, Antd 坑我的地方', link: '/work/antd' },
      { text: 'Error 虐我千百遍', link: '/work/errors' },
      { text: '富文本编辑器', link: '/work/editor' },
      { text: '开发工具', link: '/work/tools' },
      {
        text: '微信小程序',
        items: [
          { text: '小程序开发之坑', link: '/work/wx/wx_points' },
          { text: '微信小程序地图开发', link: '/work/wx/wx_map' },
        ]
      },
    ]
  },
  {
    text: '站点分享',
    link: '/resources/navigation/nav'
  },
]