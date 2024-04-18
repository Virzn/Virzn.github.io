### H5新特性

语义化标签

语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。通俗来讲就是用正确的标签做正确的事情。语义化的优点如下：

​	对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于SEO。
​	对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能更清晰容易看出网页的结构，便于团队的开发与维护。

```html
<header></header>  头部
<nav></nav>  导航栏
<section></section>  区块（有语义化的div）
<main></main>  主要区域
<article></article>  主要内容
<aside></aside>  侧边栏
<footer></footer>  底部
```

媒体标签

```html
controls 控制面板				autoplay 自动播放					loop="true" 循环播放
<audio src='' controls autoplay loop='true'></audio>
poster：还没有完全下载完毕或点击播放前显示的封面。默认显示视频文件的第一帧画面，可用poster指定。
controls 控制面板
width
height
<video src='' poster='imgs/aa.jpg' controls></video>
因为浏览器对视频格式支持程度不一样，为了能够兼容不同的浏览器，可以通过source来指定视频源。
<video>
 	<source src='aa.flv' type='video/flv'></source>
 	<source src='aa.mp4' type='video/mp4'></source>
</video>
```

表单

```html
<input type="email"/>能够验证当前输入的邮箱地址是否合法
<input type="url"/>验证URL
<input type="number"/>只能输入数字，自带增大减小箭头，max为最大值，min为最小值，value为默认值。
<input type="search"/>输入框后面会给提供一个小叉，可以删除输入的内容，更加人性化。
<input type="range"/>提供给一个范围，设置max和min以及value，其中value属性可以设置为默认值
<input type="color"/>提供了一个颜色拾取器
<input type="time"/>时分秒
<input type="data"/>日期选择年月日
<input type="datatime"/>时间和日期(目前只有Safari支持)
<input type="datatime-local"/>日期时间控件
<input type="week"/>周控件
<input type="month"/>月控件
```

表单属性

- placeholder ：提示信息
- autofocus ：自动获取焦点
- autocomplete="on"或者 autocomplete= "off"使用这个属性需要有两个前提： 表单必须提交过；必须有name属性。
- required：要求输入框不能为空，必须有值才能够提交。
- pattern=" " 里面写入想要的正则模式，例如手机号pattern="^(+86)?\d{10}$"
- multiple：可以选择多个文件或者多个邮箱。
- form=" form表单的ID"。

表单事件

- oninput 每当input里的输入框内容发生变化都会触发此事件。
- oninvalid 当验证不通过时触发此事件。

进度条标签

```html
progress标签：用来表示任务的进度（IE、Safari不支持），max用来表示任务的进度，value表示已完成多少
<progress max="100" value="22" ></progress>
```

画布标签

```html
canvas 元素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，可以控制其每一像素
<canvas id="myCanvas" width="200" height="100"></canvas>
```

拖放

```html
任何元素都能添加 draggable="true"属性
HTML5 的drag相关的事件
dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发，。
darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。
dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。
dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
dragend：事件主体是被拖放元素，在整个拖放操作结束时触发
```

DOM操作

- document.querySelector()	返回满足条件的第一个元素
- document.querySelectorAll()	返回满足条件的所有元素

Web存储

- localStorage - 没有时间限制的数据存储
- sessionStorage - 针对一个 session 的数据存储

web worker

HTML5 允许在浏览器中创建多线程的 Web Worker，使得 JavaScript 可以在后台进行计算密集型任务，不会阻塞主线程，提高了网页的响应速度和性能。



### iframe是什么？优缺点？

iframe元素会创建包含另一个文档的内联框架，就是能够将另一个HTML页面嵌入到当前页面中。

优点：

1. 1. 原封不动的把嵌入的网页展现出来
   2. 解决加载缓慢的第三方内容如图标和广告
   3. 使脚本可以并行下载
   4. 修    改比较方便

缺点：

1. 1. 阻塞主页面的onload事件（onload在文档加载完成后能立即触发）
   2. 设备兼容性差
   3. 个数多的话，可能会出现上下、左右滚动条，影响用户体验
   4. 会产生很多页面，不容易管理
   5. 增加服务器的 http 请求，影响性能
   6. 不利于SEO，搜索引擎可能无法正确索引iframe中的内容

### 浏览器间的跨窗口通信

1，websocket

能实现同源和非同源窗口之间的通信

2，定时器+客户端存储

能实现同源窗口之间的通信

3，postMessage

实现同源和非同源窗口之间的通信，**postMessage()** 提供了一种受控机制，可以安全地实现跨源通信，规避了同源策略的限制。

4，StorageEvent

实现同源窗口之间的通信。利用localStorage存储和监听storage事件进行通信。

### link标签和 @import标签的区别

所有者：link属于 html标签，而@import是 css提供的

加载时机：页面被加载时，link会同时被加载，而@import引用的 css会等到页面加载结束后加载。

兼容性：link是 html标签，因此没有兼容性，而@import只有 IE5以上才能识别。

样式权重：link方式样式的权重高于@import。

### src 和 href 的区别

src和href都是HTML中特定元素的属性，都可以用来引入外部的资源。两者区别如下：

src：全称*source*，它通常用于img、video、audio、script元素，通过src指向请求外部资源的来源地址。在请求src资源时，它会将资源下载嵌入并应用到文档内。当浏览器解析到该元素时，会暂停其它资源下载，直到将该资源加载、编译、执行完毕。

href：全称*hyper reference*，意味着超链接，指向网络资源，当浏览器识别到它指向的⽂件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理，通常用于a、link元素。

### meta标签

meta标签一般放在整个html页面的head部分，是**文档级元数据元素**，用来表示那些不能由其它 HTML 元相关元素之一表示的任何元数据。

meta 元素定义的元数据的类型：

1. 设置 name属性，meta 提供的是文档级别的元数据，应用于整个页面。**name设置键名，content设置键值**

author描述网页作者；description描述页面；keywords页面关键词；viewpoint窗口初始大小；

robotsSEO遵守的规则；renderer双核浏览器渲染方式；copyright标注页面版权信息;

generator标注开发网页的工具或软件；

1. 设置 http-equiv属性，meta 是编译指令。 **http-equiv设置键名，content设置键值**

content-type文档的字符编码；content-language标准页面语言；content-script-type标注页面脚本类型；

refresh刷新或跳转的页面；expires页面缓存时间；set-cookie设置cookie值及其有效时间；

1. 设置 charset属性，meta 元素是一个字符集声明，告诉文档使用哪种字符编码。
2. 设置 itemprop 属性，meta 元素提供用户定义的元数据。

### 前端浏览器兼容

指的是网站或应用程序在不同的网页浏览器中正常显示和运行的能力。由于不同的浏览器厂商实现了不同的标准和技术，以及存在不同的版本，因此在开发网站或应用程序时需要考虑这些差异，以确保用户在不同浏览器中都能够获得一致的体验。

1. **CSS 兼容性问题**：

不同浏览器对 CSS 样式的支持不一致，可能导致页面布局错乱或样式显示不正确。

**使用浏览器前缀**

```css
/* 样式 .box 应用了 border-radius 属性，为了兼容不同浏览器，添加了多个浏览器前缀 */
.box {
  border-radius: 5px;  /* 标准样式 */
  -webkit-border-radius: 5px;  /* Safari/Chrome */
  -moz-border-radius: 5px;  /* Firefox */
  -ms-border-radius: 5px;  /* IE */
  -o-border-radius: 5px;  /* Opera */
}
```

  **使用CSS Resets**

```css
/* CSS Reset */
/* 这段代码将页面中所有元素的 margin 和 padding 设置为0，同时将 box-sizing 设置为 border-box */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

  **使用CSS Hacks**

```css
/* 仅对IE浏览器生效的样式 */
/* 这段代码针对IE浏览器生效，通过@media查询，对IE浏览器设置了特定的样式 */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  /* .box 的背景颜色设置为红色，仅在IE浏览器中生效 */
  .box {
    background-color: red;
  }
}
```

2. **JavaScript 兼容性问题**：

不同浏览器对 JavaScript 语法和 DOM API 的支持不一致，可能导致功能失效或页面崩溃。

 **使用现代JavaScript特性**

尽可能使用标准的、现代的 JavaScript 特性和语法，这样可以增加浏览器兼容性。避免使用过时的、不推荐的语法和特性。

```javascript
// 使用现代 JavaScript 特性
// 获取类名为 'example' 的元素，并为其添加点击事件监听器
const element = document.querySelector('.example');
element.addEventListener('click', () => {
  console.log('点击事件触发！');
});
```

**使用浏览器特定的前缀和检测**

在一些情况下，我们可能需要使用浏览器特定的前缀或进行浏览器检测，以确保代码在不同浏览器中的兼容性。

```javascript
// 使用浏览器特定的前缀和检测
// 使用webkit前缀设置元素的transform属性
element.style.webkitTransform = 'translateX(100px)';
// 检测浏览器类型，根据浏览器类型执行不同的代码
if (navigator.userAgent.indexOf('MSIE') !== -1) {
  // IE浏览器相关代码
} else {
  // 非IE浏览器相关代码
}
```

**使用 Polyfill 或垫片库**

Polyfill 是一种 JavaScript 代码片段，可以在旧版本的浏览器中模拟新的 Web API。使用 Polyfill 可以让不支持某些功能的浏览器也能够使用这些功能。

```javascript
<!-- 使用 Polyfill 或垫片库 -->
<!-- 引入 Polyfill 库，以提供对新 Web API 的支持 -->
<script src="https://cdn.polyfill.io/v3/polyfill.min.js"></script>
```

3. **HTML 兼容性问题**：

不同浏览器对 HTML 标签和属性的解释和渲染存在差异，可能导致页面结构不一致或功能异常。

- - 解决方案：遵循 HTML 标准，尽量使用标准的 HTML 标签和属性；避免使用过时的 HTML 特性；使用标准的 DOCTYPE 声明；确保页面结构清晰、语义化。

  **遵循标准的 HTML 规范**

编写符合 HTML 标准的代码，尽量避免使用过时的、不推荐的标签和属性，这样可以提高页面在不同浏览器中的兼容性。

  **使用浏览器前缀**

某些 CSS3 属性在不同浏览器中需要添加不同的前缀才能正常工作。你可以使用浏览器前缀来确保这些属性在不同浏览器中的兼容性。

```css
/* 使用浏览器前缀 */
.example {
  -webkit-border-radius: 5px; /* chrome */
  -moz-border-radius: 5px; /* firefox */
  border-radius: 5px;
}
```

  **使用Normalize.css**

Normalize.css 是一种用于标准化浏览器默认样式的 CSS 库。它消除了浏览器之间的默认样式差异，从而确保在不同浏览器中的一致性。

```html
<!-- 引入 Normalize.css -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
```

**使用Reset CSS**

Reset CSS 是一种用于重置浏览器默认样式的 CSS 技术。它将所有元素的内外边距、边框、列表样式等归零，从而避免浏览器之间的默认样式差异。

```css
/* Reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 重置其他样式 */
/* 例如：重置列表样式 */
ul, ol {
  list-style: none;
}
```



4. **响应式设计兼容性问题**：

不同浏览器对响应式设计的支持不一致，可能导致在某些浏览器中页面布局或元素缩放不正确。

   **使用流行的响应式框架**

使用流行的响应式框架如Bootstrap、Foundation等，它们提供了跨浏览器的响应式布局解决方案，可以确保在不同的浏览器中具有一致的表现。

   **使用CSS媒体查询**

使用CSS媒体查询可以根据不同的设备宽度和特性，为不同的屏幕尺寸和设备类型提供不同的样式。这样可以让页面在不同的浏览器和设备上都有良好的响应式体验。

```css
/* 媒体查询示例 */
@media screen and (max-width: 768px) {
  /* 在窄屏幕下应用的样式  屏幕宽度小于或等于768像素 */
  .container {
    width: 100%;
  }
}

@media screen and (min-width: 768px) {
  /* 在宽屏幕下应用的样式  当屏幕宽度大于768像素时*/
  .container {
    width: 768px;
  }
}
```

  **使用Flexbox和grid布局**

Flexbox和Grid布局是现代 CSS 布局技术，它们可以更灵活地控制页面布局和元素排列，而且具有较好的跨浏览器支持。

  **使用js进行特性检测和修复**

在需要时，可以使用JavaScript进行浏览器特性检测，并根据不同的浏览器环境进行修复和兼容处理。通过特性检测，可以动态地为不同浏览器提供不同的解决方案。

### 性能优化

在前端开发中，性能优化是一个重要的方面，可以通过以下方法来提高前端应用的性能：

1. **减少 HTTP 请求**：

- - 将多个 CSS 文件合并成一个，减少页面的样式表请求。
  - 将多个 JavaScript 文件合并成一个，减少页面的脚本文件请求。
  - 使用 CSS Sprites 将多个小图标合并成一张大图，减少图片请求。
  - 使用字体图标（Font Icons）代替图片图标，减少图片请求。
  - 对于重复性的静态资源，可以考虑使用缓存，减少重复请求。

1. **使用 CDN 加速**：

- - 使用内容分发网络（CDN）来加速静态资源的传输，减少服务器响应时间和页面加载时间。
  - 将静态资源部署到全球各地的 CDN 节点上，使用户可以从最近的节点获取资源，加速资源加载速度。

1. **优化图片**：

- - 使用适当的图片格式（例如 JPEG、PNG、SVG）来优化图片大小。
  - 压缩图片文件大小，减少加载时间，可以使用工具如 ImageOptim、TinyPNG 等进行压缩。
  - 使用响应式图片（Responsive Images）来根据不同设备尺寸加载适当大小的图片，减少不必要的资源消耗。

1. **延迟加载（Lazy Loading）**：

- - 对于长页面或有大量图片的页面，可以将图片的加载延迟到它们即将出现在视口中时再加载，减少初始加载时间。
  - 使用 **loading="lazy"** 属性来延迟加载图片。

1. **减少重绘与重排**：

- - 避免频繁地修改 DOM 结构，可以使用 DocumentFragment 或一次性修改多个元素来减少重绘和重排。
  - 使用 CSS3 动画和 transform 属性来代替 JavaScript 实现动画效果，减少重绘和重排。

1. **使用缓存**：

- - 使用浏览器缓存来存储静态资源，减少资源的重复加载。
  - 使用 HTTP 缓存头（Cache-Control、Expires 等）来控制浏览器缓存行为。

1. **代码优化**：

- - 减少不必要的 JavaScript 和 CSS 文件大小，精简代码。
  - 使用异步加载 JavaScript，避免阻塞页面渲染。
  - 使用 Web Workers 来进行多线程处理，提高页面性能。

1. **使用合适的技术和框架**：

- - 选择合适的技术栈和框架，如 React、Vue.js 等，这些框架通常具有更好的性能优化和渲染性能。
  - 使用服务器端渲染（SSR）或静态网站生成器（SSG）来提高页面加载速度和 SEO。

1. **性能监控与分析**：

- - 使用性能监控工具（如 Chrome 开发者工具、Lighthouse、WebPageTest 等）来分析页面性能，及时发现并解决性能问题。

1. **优化首屏加载时间**：

- - 将页面关键资源放置在页面顶部，优先加载重要内容，提高用户体验。
  - 使用预加载（Preloading）和预渲染（Prerendering）技术来提前加载页面所需资源，加速页面渲染。