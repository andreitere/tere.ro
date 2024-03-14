---
external: false
draft: true
title: "Prism.js syntax highlighting for code blocks"
description: "Code blocks are syntax highlighted using Prism.js"
date: 2022-10-30
---


<section class="flex ">
    <div class="flex-1">left</div>
    <div>
        <p>simple text</p>
       <NuxtLink to="/guide/setup">
  back to setup page &rarr;
</NuxtLink>
    </div>
</section>


Syntax highlighting is done using [Prism.js](https://github.com/PrismJS/prism) with the default [nord theme](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-nord.css). You can customise to whichever theme you want from the [plenty available prism themes](https://github.com/PrismJS/prism-themes).



## JSX Code Block

An example *jsx* code block.

```jsx
const Greet = () => {
  const message = `Hello World!`;
  return <div>{message}</div>;
};
```

## CSS Code Block

An example *css* code block.

```css
.layout {
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr) 4rem;
}
```

...and many more. [Explore all the languages supported by Prism.js](https://prismjs.com/#supported-languages).
