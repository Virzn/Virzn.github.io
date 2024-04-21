# CSS简介

## CSS定义介绍

CSS（Cascading Style Sheets）是一种用于描述网页样式和布局的语言。它与HTML结合使用，用于控制网页的外观和排版，使得网页具有更加美观和易读的视觉效果。以下是CSS的主要特点和用法：

1. **样式定义**：CSS通过选择器（selector）和声明（declaration）的组合来定义样式。选择器用于选取要应用样式的HTML元素，而声明则定义了选中元素的具体样式属性和值。例如，设置段落文本的颜色为红色：

   ```css
   p {
       color: red;
   }
   ```

2. **层叠规则**：CSS具有层叠（cascading）的特性，即多个样式规则同时作用于同一个元素时，浏览器会按照一定的优先级和规则来确定最终的样式。这使得开发者能够通过简单的方式控制网页的样式，并在需要时进行覆盖或继承。

3. **选择器**：CSS提供了丰富的选择器，用于选择不同类型的HTML元素，以及根据元素的属性、类名、ID等进行选择。常见的选择器包括元素选择器、类选择器、ID选择器、后代选择器、子元素选择器等。

4. **盒模型**：CSS中的元素都被视为一个矩形的盒子，称为盒模型。盒模型由内容区、内边距、边框和外边距组成，开发者可以通过CSS来控制这些部分的大小、颜色和样式，实现网页布局和排版的设计。

5. **布局和定位**：CSS提供了丰富的布局和定位属性，包括浮动（float）、定位（position）、弹性盒子（flexbox）和网格布局（grid），用于实现响应式设计、多栏布局、居中对齐等各种布局效果。

6. **响应式设计**：随着移动设备的普及，响应式设计变得越来越重要。CSS通过媒体查询（media queries）和流式布局等技术，使得网页能够根据不同设备和屏幕尺寸的特点自动调整布局和样式，以提供更好的用户体验。

7. **模块化和复用**：CSS支持样式的模块化和复用，开发者可以将样式定义在单独的文件中，并通过链接或导入的方式在HTML文档中引用，从而实现样式的分离和重用。

总的来说，CSS是一种强大的样式表语言，与HTML和JavaScript一起构成了现代网页开发的三大核心技术之一。通过灵活运用CSS，开发者可以创建出美观、响应式和易于维护的网页，为用户提供更好的浏览体验。


## CSS基本语法

### 一、编写位置

CSS可以在HTML文档中的不同位置编写，通常有三种主要的编写位置：

1. **内联样式（Inline Styles）**：
   在HTML元素的`style`属性中直接编写CSS样式。这种方式适用于对单个元素应用特定样式的情况，但不推荐在整个网页中广泛使用，因为会导致HTML与CSS的耦合度增加，不利于样式的统一管理和维护。

示例：

```html
<p style="color: red; font-size: 16px;">这是一个红色的段落。</p>
```

2. **内部样式表（Internal Styles）**：
   在HTML文档的`<head>`标签中使用`<style>`标签来编写CSS样式。这种方式将CSS样式直接嵌入到HTML文档中，作用于整个文档内的元素，适用于小型网页或者特定页面需要的样式。

示例：

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        p {
            color: blue;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <p>这是一个蓝色的段落。</p>
</body>
</html>
```

3. **外部样式表（External Styles）**：
   将CSS样式单独保存在一个独立的`.css`文件中，然后在HTML文档中使用`<link>`标签将其链接到文档中。这种方式使得CSS样式可以被多个HTML文档共享，提高了样式的重用性和可维护性，是实际开发中常用的方式。

示例（style.css）：

```css
/* style.css */
p {
    color: green;
    font-size: 18px;
}
```

HTML文档中的链接：

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <p>这是一个绿色的段落。</p>
</body>
</html>
```

总的来说，内联样式适用于个别元素的特殊样式需求，内部样式表适用于小规模的样式定义，而外部样式表则是更好的选择，可以提高代码的可维护性和重用性。

### 二、基本语法

1. **选择器（Selectors）**：

   - 选择器用于选择 HTML 元素，并将样式应用于这些元素。

   - 常见的选择器包括标签选择器、类选择器、ID 选择器、属性选择器等。

   - 例如：

     ```css
     p {
         color: blue;
     }
     .my-class {
         font-size: 16px;
     }
     #my-id {
         background-color: gray;
     }
     ```

2. **属性（Properties）**：

   - 属性是要设置的样式的名称。

   - 每个属性都有一个相关的值，表示要应用的样式的具体值。

   - 例如：

     ```css
     color: blue;
     font-size: 16px;
     background-color: gray;
     ```

3. **值（Values）**：

   - 值是属性的具体设置值。

   - 值可以是关键字、长度、颜色、URL 等。

   - 例如：

     ```css
     color: blue;
     font-size: 16px;
     background-color: gray;
     ```

4. **声明块（Declaration Blocks）**：

   - 一组属性及其对应的值被称为声明块，它们位于大括号 `{}` 中。

   - 例如：

     ```css
     p {
         color: blue;
         font-size: 16px;
     }
     ```

5. **注释（Comments）**：

   - 注释在 CSS 中以 `/* */` 的形式书写，用于添加注释性文字，不会影响样式的应用。

   - 例如：

     ```css
     /* 这是一个注释 */
     ```

6. **样式规则（Style Rules）**：

   - 样式规则由选择器和声明块组成，用于将样式应用于特定的 HTML 元素。

   - 例如：

     ```css
     p {
         color: blue;
         font-size: 16px;
     }
     ```

7. **样式表（Style Sheets）**：

   - 样式表是一组 CSS 规则的集合，用于定义页面或网站的整体样式。

   - 样式表可以嵌入到 HTML 中的 `<style>` 标签中，也可以作为外部 CSS 文件引入。

   - 例如：

     ```html
     <style>
         p {
             color: blue;
             font-size: 16px;
         }
     </style>
     ```

以上是 CSS 的基本语法，通过这些语法规则，可以定义和控制 HTML 元素的样式，实现页面的布局和美化。


## CSS选择器

CSS选择器是一种用于选择 HTML 元素的模式。它允许你根据元素的类型、属性、状态、位置等条件来选择要应用样式的元素。以下是一些常见的 CSS 选择器：

1. **元素选择器**：通过 HTML 元素的标签名称选择元素。

   ```css
   p {
       color: blue;
   }
   ```

2. **类选择器**：通过 HTML 元素的 class 属性选择元素。

   ```css
   .my-class {
       font-weight: bold;
   }
   ```

3. **ID 选择器**：通过 HTML 元素的 id 属性选择元素。

   ```css
   #my-id {
       background-color: yellow;
   }
   ```

4. **属性选择器**：根据 HTML 元素的属性值来选择元素。

   ```css
   input[type="text"] {
       border: 1px solid black;
   }
   ```

5. **后代选择器**：选择元素的后代元素。

   ```css
   div p {
       font-size: 16px;
   }
   ```

6. **子元素选择器**：选择元素的直接子元素。

   ```css
   ul > li {
       list-style-type: none;
   }
   ```

7. **相邻兄弟选择器**：选择紧跟在另一个元素后的元素。

   ```css
   h2 + p {
       margin-top: 20px;
   }
   ```

8. **通用选择器**：选择所有元素。

   ```css
   * {
       margin: 0;
       padding: 0;
   }
   ```

9. **伪类选择器**：根据元素的特殊状态来选择元素，比如链接的状态。

   ```css
   a:hover {
       color: red;
   }
   ```

10. **伪元素选择器**：用于选中元素的特定部分，比如元素的第一个字母或者某个元素之前的内容。

    ```css
    p::first-letter {
        font-size: 24px;
    }
    ```

