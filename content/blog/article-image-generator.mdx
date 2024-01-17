---
title: Generating social preview images for your blog articles
draft: true
external: false
description: A Tailwind + fastify project to bring social discovery for your articles.
category:
  - Tinkering
tags:
  - javascript
  - node
  - fastify
  - tailwind
  - astrobuild

date: 2023-01-30
---

**Table of contents:**

- [Introduction](#introduction)
- [Template and server for generating and serving images](#template-and-server-for-generating-and-serving-images)
  - [Generate image](#generate-image)
  - [Retrieving the image](#retrieving-the-image)
- [Astro Component and logic to request the image](#astro-component-and-logic-to-request-the-image)
  - [Logic for equesting a file](#logic-for-equesting-a-file)
  - [Astro component](#astro-component)

## Introduction

My target for this blog is to quickly share discoveries or tips and tricks without investing so much time in organizing and stylizing the content.

Therefore I went the modern way for building a blog (the old way would be Worpdress) benefiting from the speed of static content. First I tried with nuxt but then a few days ago jumped head straight into [astrobuild](https://astro.build)

I managed to get quite quickly the migration and have a nice theme on it.

But i wanted a bit more. Images for each of my articles, how many there may be, to have a nice display on facebook/twitter/etc.

Of course I went on to build something ...

Well. I didn't know from the start. I was new to the framework and had to dig a bit. Quickly I found my source of inspiration [astro-social-image](https://github.com/Princesseuh/astro-social-images). Learned from this of how I can hook in astro process of generating tags.

At this point i knew for sure that I can do it so I went on to build the actual template and logic to generate the images

## Template and server for generating and serving images

[Here](https://github.com/andreitere/article-image-generator) you can find what I build for the server. See the readme file for more details.

*index.html* and *src* folder contain the tailwind based template used for development. There you will be able to configure the structure and content. Make sure you also visit `tailwind.config.cjs` for the full theme.

> Repository: [andreitere/article-image-generator](https://github.com/andreitere/article-image-generator)

Install the dependencies and run `pnpm run dev` to bring up the dev server and work on the template.

When done run `pnpm run build` to generate the *dist* folder used by the *fastify* server.

By default the server runs on port 3000. See *./server.js* *APP_PORT* variable. This can be configured also in the `./Dockerfile`

Start the server with `node server.js`

### Generate image

```js
await fetch(`http://0.0.0.0:3001`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title,
    description,
    slug
  }),
  json: true
});
```

Slug is the name under which the jpg file will pe saved.

As a response from this endpoints you will get back something like this:

```json
{
  "file": "filename"
}
```

All the generated files are *jpg*.

### Retrieving the image

To retrieve the image simply execute a GET request to

```
http://localhost:3000/screens/${file}
```

eg: http://localhost:3000/screens/filename.jpg

## Astro Component and logic to request the image

Basically what I need here is that for each loaded article

- to request the image to be generated with the title, description and slug pulled from the frontmatter section
- pull the image to the public folder (specifically my wish was a nested `article-image` folder)

To ignore the already generated images I am simply checking if the file exists already in that folder.

### Logic for equesting a file

```js
import { existsSync, createWriteStream } from "fs";
import { Readable } from "stream";
const downloadFile = async (url, path) => {
  const res = await fetch(url);
  let s = createWriteStream(path);
  await new Promise((resolve) => {
    Readable.from(res.body).pipe(s);
    s.on("close", resolve);
    s.on("error", (error) => {
      console.log(error);
    });
  });
};

export const grabImage = async (slug, title, description) => {
  if (existsSync(`public/article-image/${slug}.jpg`)) {
    console.log(`\tAlready have the image for article ${slug}`);
    return `article-image/${slug}.jpg`;
  }
  let response = await fetch(`http://0.0.0.0:3001`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      description,
      slug
    }),
    json: true
  });
  response = await response.json();
  let file = response.file;
  await downloadFile(
    `http://0.0.0.0:3001/screens/${file}`,
    `public/article-image/${file}`
  );
  return `article-image/${slug}.jpg`;
};
```

_of course it can be improved. I will do it... at some point_ ..

I placed this code in an `utils.js` file under a *lib* folder. Place it as you wish.

### Astro component

```astro
---
import {grabImage} from "../lib/utils"
export interface Props {
	slug: string;
	title: string;
	description: string;
}

const { slug, title, description } = Astro.props;
await grabImage(slug, title, description)
---
```

Looks kinda silly right? Almost like it's doing nothing. Well, is good enough the request and save the file locally and build time.

Then it's about filling the image path under the proper meta tags.

Something like this:

```astro
<Fragment slot="meta">
    <SocialImage slug={slug} title={post.data.title} description={post.data.description}></SocialImage>
    <SEO
      ...
      openGraph={{
        basic: {
          ...
          image: `../article-image/${slug}.jpg`,
        },
      }},
      ...
    />
  </Fragment>
```

That's it 😌. I hope you'll enjoy it.

🙏🏼
