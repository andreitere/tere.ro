---
title: Pinia - You might want to use setup stores
draft: false
external: false
description: In Pinia you can define stores in two ways. Using the Options or Composition API. Depending how big your store can grow, you might want to go the Composition API way.
category:
  - Vue
  - Pinia
tags:
  - vuejs
  - vue3
  - pinia
  - wweb
  - javascript
date: 2023-02-15
---

In [Pinia](https://pinia.vuejs.org/) you can [define stores](https://pinia.vuejs.org/core-concepts/#defining-a-store) in two ways. 


These ways are similar to Vue's Options and Composition APIS. Depending how big your store can grow, you might want to go the Composition API way.

Let's break it down.

## The Options API Way

> Documentation: ["Option Store"](https://pinia.vuejs.org/core-concepts/#option-stores)

```js
export const useLoading = defineStore('loading', {
  state: () => ({ queue: [] }),
  actions: {
    add(el) {
      this.queue = [...this.queue, el]
    },
    stop(el) {
        this.queue = this.queue.filter(f => f != el)
    }
  },
})
```

## The Composition API Way

> Documentation: ["Setup Store"](https://pinia.vuejs.org/core-concepts/#setup-stores)

```js
export const useLoading = defineStore('loading', () => {
  const queue = ref([])
  function add(el) {
    queue.value = [...queue.value, el]
  }
  function stop(el) {
    queue.value = queue.value.filter(f => f != el)
  }
  return { queue, add }
})
```


The official documentation recommends starting  with the Option Store if you are undecided and that's perfectly fine. That's also what I did for a few of my apps and still finding it more comfortable if I may.

**But in some cases I, for one, wish I would've gone with the Setup Store.**

Let's see why.

I have a rather big store, multiple actions for which I need to track in a sepparate store when the api request is done and when it finishes.

This implies using a store in another store.


# How you do this?
## Option Store

For the option stores it can look something like this

```js
export const useDemo = defineStore('demo', {
  state: () => ({}),
  actions: {
    actionOne(el) {
        const $loading = useLoading()
        $loading.add("actionOne")
        /// await api call 
        $loading.stop("actionOne")
    },
    actionTwo(el) {
        const $loading = useLoading()
        $loading.add("actionTwo")
        /// await api call 
        $loading.stop("actionTwo")
    },
  },
})
```

Will work just fine but it bothers me a lot that i have to repeat the `const $loading = useLoading()` each time


## Setup Store to the rescue

Now this is the case where everything looks nicer.
You just do the `const $loading = useLoading()` only at the top and that's it


```js
export const useDemo = defineStore('demo', () => {
    const $loading = useLoading()
    function actionOne(el) {
        $loading.start("actionOne")
        /// await api call 
        $loading.stop("actionOne")
    }
    function actionTwo(el) {
        $loading.start("actionTwo")
        /// await api call 
        $loading.stop("actionTwo")
    }
    return { actionOne, actionTwo }
})
```

And looks already much cleaner.


So yeah, if you're into cleaner looking code you might want to got the "Setup" way when writing Pinia Stores.

BRB, refactoring. 🚀

Thank you.

