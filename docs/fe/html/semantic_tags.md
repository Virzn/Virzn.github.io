# 语义化标签

HTML 中的语义化标签是指具有明确含义的标签，这些标签的名称能够清晰地表达它们所包含内容的意义。语义化标签有助于提高页面的可读性、可访问性和 SEO（搜索引擎优化），并且可以帮助开发者更好地理解和维护代码。

为了便于使用，HTML设计了非常多的标签供我们选择，这里我们只是列举了一小部分。具体列表可以参照[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)。尽管如此，但是实际开发的大部分场景中并不需要过分注重语义化标签，块用`div`,行内用`span`是开发的万金油。

以下是部分 HTML 语义化标签及其用途：

1. `<header>`：定义页面或者区块的页眉，通常包含导航链接、网站标志或者其他相关信息。

    ```html
    <header>
      <a class="logo" href="#">Cute Puppies Express!</a>
    </header>
    
    <article>
      <header>
        <h1>Beagles</h1>
        <time>08.12.2014</time>
      </header>
      <p>I love beagles <em>so</em> much! Like, really, a lot. They’re adorable and their ears are so, so snugly soft!</p>
    </article>
    ```

2. `<nav>`：定义导航链接的容器，通常用于包含网站的主要导航菜单。

    ```html
    <nav class="crumbs">
      <ol>
        <li class="crumb"><a href="#">Bikes</a></li>
        <li class="crumb"><a href="#">BMX</a></li>
        <li class="crumb">Jump Bike 3000</li>
      </ol>
    </nav>
    
    <h1>Jump Bike 3000</h1>
    <p>
      This BMX bike is a solid step into the pro world. It looks as legit as it rides and is built to polish your skills.
    </p>
    ```

3. `<main>`：定义页面的主要内容区域，包含除页眉、页脚和导航之外的主要内容。

    ```html
    <header>Gecko facts</header>
    
    <main>
      <p>
        Geckos are a group of usually small, usually nocturnal lizards. They are found on every continent except Antarctica.
      </p>
    
      <p>Many species of gecko have adhesive toe pads which enable them to climb walls and even windows.</p>
    </main>
    ```

4. `<article>`：定义页面中的一篇独立的内容，如一篇博客文章、新闻报道等，应该具有独立于页面其他部分的意义。

    ```html
    <article class="forecast">
      <h1>Weather forecast for Seattle</h1>
      <article class="day-forecast">
        <h2>03 March 2018</h2>
        <p>Rain.</p>
      </article>
      <article class="day-forecast">
        <h2>04 March 2018</h2>
        <p>Periods of rain.</p>
      </article>
      <article class="day-forecast">
        <h2>05 March 2018</h2>
        <p>Heavy rain.</p>
      </article>
    </article>
    ```

5. `<section>`：定义文档中的一个区块或部分，通常用于将页面内容组织成相关主题或主题组。

    ```html
      <h1>Choosing an Apple</h1>
      <section>
        <h2>Introduction</h2>
        <p>This document provides a guide to help with the important task of choosing the correct Apple.</p>
      </section>
      
      <section>
        <h2>Criteria</h2>
        <p>
          There are many different criteria to be considered when choosing an Apple — size, color, firmness, sweetness,
          tartness...
        </p>
      </section>
    ```

6. `<aside>`：定义页面的侧边栏或者附属内容，通常包含与页面主要内容相关但不是必须的信息。

    ```html
      <p>
        Salamanders are a group of amphibians with a lizard-like appearance, including short legs and a tail in both larval
        and adult forms.
      </p>
      
      <aside>
        <p>The Rough-skinned Newt defends itself with a deadly neurotoxin.</p>
      </aside>
      
      <p>
        Several species of salamander inhabit the temperate rainforest of the Pacific Northwest, including the Ensatina, the
        Northwestern Salamander and the Rough-skinned Newt. Most salamanders are nocturnal, and hunt for insects, worms and
        other small creatures.
      </p>
    ```

7. `<footer>`：定义页面或者区块的页脚，通常包含版权信息、联系方式等。

    ```html
      <article>
        <h1>How to be a wizard</h1>
        <ol>
          <li>Grow a long, majestic beard.</li>
          <li>Wear a tall, pointed hat.</li>
          <li>Have I mentioned the beard?</li>
        </ol>
        <footer>
          <p>© 2018 Gandalf</p>
        </footer>
      </article>
    ```

