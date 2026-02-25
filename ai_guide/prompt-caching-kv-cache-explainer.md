---
title: Prompt Caching: Why Cached Tokens Are 10× Cheaper and Faster
source: https://medium.com/coding-nexus/prompt-caching-why-cached-tokens-are-10-cheaper-and-faster-cf3c5cefd4c5
published: 2025-12-22
created: 2025-12-22
author:
  - Code Coup
tags:
  - clippings
description: Prompt Caching: Why Cached Tokens Are 10× Cheaper and Faster As I’m writing this, cached input tokens are roughly 10× cheaper than regular input tokens on both the OpenAI and Anthropic …
summary: ""
---
[Sitemap](https://medium.com/sitemap/sitemap.xml)

![](https://miro.medium.com/v2/da:true/92cfe795cfd308c048a6fbeb60faaa515aba89f12bee45f1d96fffc6af10f974) 

The perfect gift for readers and writers.

[Give the gift of Medium](https://medium.com/gift-plans?source=-276614ad1d3e--gift2025-----banner------------------------------------)## [Coding Nexus](https://medium.com/coding-nexus?source=post_page---publication_nav-16e3527896e0-cf3c5cefd4c5---------------------------------------)



Coding Nexus is a community of developers, tech enthusiasts, and aspiring coders. Whether you’re exploring the depths of Python, diving into data science, mastering web development, or staying updated on the latest trends in AI, Coding Nexus has something for you.

As I’m writing this, **cached input tokens are roughly 10× cheaper** than regular input tokens on both the **OpenAI** and **Anthropic** APIs.

Anthropic even claims that prompt caching can reduce latency **by up to 85% for long prompts**. In practice? That checks out. When you send long prompts repeatedly, the time-to-first-token drops dramatically.

But that raises the fundamental question:

> ***What exactly is a “cached token”?****  
> What are providers actually saving inside their GPU clusters to justify a 10× discount?*

It’s *not* saved responses. Send the same prompt 10 times, and you’ll still get different answers — even when the usage section shows “cached input tokens.”

To understand what’s really happening, we need to go beyond vendor docs — down to how transformers actually operate.

By the end of this article, you’ll:

- Understand how LLMs process text step by step
- Build intuition for why prompt caching works
- Know **exactly which numbers (1s and 0s)** get cached — and why that makes inference cheaper and faster

Let’s start at the beginning.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*KkumK1f5lvVkvT0kM_ympg.png)

## LLMs, in One Mental Model

At their core, large language models are **giant mathematical functions**.

They take:

- a sequence of numbers (your prompt)
- run them through billions of learned operations
- output one new number (the next token)

Then they repeat.

A very simplified inference loop looks like this:

```c
prompt = "What is the meaning of life?"

tokens = tokenize(prompt)
while (true) {
  embeddings = embed(tokens)
  for ([attention, feedforward] of transformers) {
    embeddings = attention(embeddings)
    embeddings = feedforward(embeddings)
  }
  nextToken = output(embeddings)
  if (nextToken === END_TOKEN) break
  tokens.push(nextToken)
}
print(decode(tokens))
```

Each iteration produces **one token**, appends it to the input, and repeats the process.

This detail is crucial for understanding caching.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*WjsMNTbam7jKuKupTaGKnA.png)

## Step 1: Tokenization (Text — Numbers)

Before an LLM can “think,” your text must be turned into integers.

For example:

```c
"Check out ngrok.ai"
```

might become something like:

```c
[4383, 842, 1657, 17690, 75584]
```
![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*E7FKU3b2dihGfgK__CwEFQ.png)

Key points:

- Tokenization is **deterministic**
- Tokens are **case-sensitive**
- Different models use different tokenizers

Tokens are the atomic unit of cost, latency, and caching.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*NbtmS30NDhP-oG7ZY5-pdQ.png)

## Step 2: Embeddings (Numbers — Meaning)

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*XtwEyPe9KOVA1QZmVBVr-w.png)

The **tokens** produced by the tokenizer are now passed to the **embedding** stage. To understand what embedding involves, it's useful to consider the model's ultimate goal.

Humans solve problems with code by writing functions that accept input and produce output—for example, converting Fahrenheit to Celsius.

```c
function fahrenheitToCelsius(fahrenheit) {
 return ((fahrenheit - 32) * 5) / 9;
}
```
![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*HPEdPXQv1QNBROXQ9geqSA.png)

Tokens are just IDs. They have no semantic meaning.

So each token is mapped to a **vector** — called an **embedding** — with thousands of dimensions.

Conceptually:

```c
const EMBEDDINGS = [...] // learned during training

function embed(tokens) {
  return tokens.map((token, position) => {
    return encodePosition(EMBEDDINGS[token], position)
  })
}
```

You can think of embeddings as **points in very high-dimensional space**, where:

- Similar words live near each other
- Syntax, tone, and meaning all influence position

Now we’re finally in a form the transformer can work with.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*74yoGb8CqJT0saxsk2agVw.png)

**tokens**

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*0Qwc2VpAMMCEMu4kcNWetQ.png)

Embeddings

## Step 3: Attention (Where Prompt Caching Happens)

This is the important part.

The **attention mechanism** decides:

> *“How much should each previous token matter when predicting the next one?”*

To do this, embeddings are transformed into three matrices:

- **Q** (Query)
- **K** (Key)
- **V** (Value)

Using learned weights:

```c
Q = embeddings * WQ
K = embeddings * WK
V = embeddings * WV
```

Then attention scores are computed:

```c
scores = Q * transpose(K)
weights = softmax(mask(scores))
output = weights * V
```

This lets the model say things like:

- “The word *Mary* matters more than *a* ”
- “Earlier tokens matter less than recent ones”

## The Transformer: Where Meaning Gets Mixed (and Why Caching Is Possible)

Before we can discuss caching, we need to understand **what happens inside the transformer** — specifically, the *attention* mechanism. This section builds directly on everything we’ve covered so far and uses the same ideas, just one layer deeper.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*-KLtKFQXmbzzGCI-ClPkew.png)

## What the Transformer Really Does

At a high level, the transformer takes **embeddings** as input and outputs **new embeddings**.

Not text.  
Not tokens.  
Just vectors moving around in very high-dimensional space.

Inside each transformer block, this happens in two major steps:

1. **Attention** — tokens look at each other and decide what matters
2. **Feedforward** — tokens are individually refined (we’ll skip this part for now)

This article focuses entirely on **attention**, because that’s where prompt caching lives.

### Attention in One Sentence

> ***Attention lets each token decide how much every other token should influence it.***

If your prompt is:

```c
"Mary had a little"
```

Then when the model is about to generate the next token, it might internally decide:

- Mary matters **63%**
- had matters **16%**
- a matters **12%**
- little matters **9%**

Those percentages are called **attention weights**.

### Why Attention Needs Math

Attention sounds intuitive, but implementing it requires matrix math.

Don’t panic — you don’t need to *do* the math. You just need to understand **what is multiplied by what, and why**.

Here’s the simplified version of how attention weights are computed

```c
// Similar to EMBEDDINGS from the pseudocode
// earlier, WQ and WK are learned during 
// training and do not change during inference.
// 
// These are both n*n matrices, where n is the
// number of embedding dimensions. In our example
// above, n = 3.
const WQ = [[...], [...], [...]];
const WK = [[...], [...], [...]];

// The input embeddings look like this:
// [
//   [-0.1, 0.1, -0.3], // Mary
//   [1.0, -0.5, -0.6], // had
//   [0.0, 0.8, 0.6],   // a
//   [0.5, -0.7, 1.0]   // little
// ]
function attentionWeights(embeddings) {
 const Q = embeddings * WQ;
 const K = embeddings * WK;
 const scores = Q * transpose(K);
 const masked = mask(scores);
 return softmax(masked);
}
```

Three important things to notice already:

1. **WQ and WK never change during inference**
2. **All tokens are processed together**
3. **This produces a matrix of token-to-token relevance**

### Q, K, and V

Every token embedding is projected into **three different spaces**:

- **Q (Query)** — what this token is looking for
- **K (Key)** — what this token offers
- **V (Value)** — what information this token carries forward

They’re all derived from the *same embeddings*, just transformed differently:

```c
Q = embeddings * WQ
K = embeddings * WK
V = embeddings * WV
```

Why not just use embeddings directly?

Because embeddings contain *everything* about a token:

- meaning
- tone
- alternative context
- unrelated associations

The model needs a way to:

- decide **relevance** (Q × K)
- then decide **what information is worth carrying forward** (V)

That’s why WV exists — it filters signal from noise before mixing.

### Turning Scores Into Probabilities

After computing relevance scores, we run into two problems

1. **Future tokens shouldn’t influence the past**
2. **Raw scores aren’t useful as-is**

### 1\. Causal Masking

We apply a triangular mask so tokens can only attend to themselves and earlier tokens:

```c
Mary     had      a      little
Mary     ✓        ✗      ✗      ✗
had      ✓        ✓      ✗      ✗
a        ✓        ✓      ✓      ✗
little   ✓        ✓      ✓      ✓
```

Instead of zeroing future values, we set them to **−∞**, which ensures they vanish after softmax.

### 2\. Softmax

Softmax converts arbitrary numbers into probabilities that sum to 1:

```c
function softmax(matrix) {
  return matrix.map(row => {
    const exps = row.map(x => Math.exp(x));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(e => e / sum);
  });
}
```

This is why `−Infinity` matters:

```c
Math.exp(-Infinity) === 0
```

Future tokens literally contribute **nothing**.

### Mixing the Tokens Together

Once we have attention weights, the rest is conceptually simple.

We:

1. Compute **V**
2. Multiply weights × V
3. Get new embeddings
```c
function attention(embeddings) {
  const V = embeddings * WV;
  const weights = attentionWeights(embeddings);
  return weights * V;
}
```

The output is a new embedding where:

- Information from all previous tokens
- has been blended in proportion to importance

## The Critical Detail Most People Miss

Even though we only care about **the final token**, the model must compute:

- Q, K, V for **every token**
- attention weights for **every token pair**
- mixed embeddings for **every token**

Every single step.

This is why inference is expensive.

And this is exactly why caching works.

## The Big Inefficiency (and the Key Insight)

Here’s the hidden inefficiency:

> ***Every time the model generates a new token, it recomputes attention for the entire prompt again.***

But most of that math **doesn’t change**.

If you’ve already processed:

```c
"Mary had a"
```

and you’re now generating the next token, the attention results for `"Mary"` and `"had"` are identical to the last step.

So why recompute them?

## KV Caching: The Actual Thing Being Cached

The fix is simple — and powerful:

1. **Cache the K and V matrices**
2. **Only compute Q for the newest token**

Instead of recomputing everything, inference becomes incremental.

Conceptually:

```c
// Previously cached
cachedK = [...]
cachedV = [...]

// New token only
Q_new = embedding_new * WQ
K_new = embedding_new * WK
V_new = embedding_new * WV
K = append(cachedK, K_new)
V = append(cachedV, V_new)
scores = Q_new * transpose(K)
weights = softmax(scores)
output = weights * V
```

That’s it.

## The cached data is:

- **K = embeddings × WK**
- **V = embeddings × WV**

These matrices are the *exact* 1s and 0s providers store in memory.

This is why prompt caching is more accurately called **KV caching**.

## Why This Is So Much Cheaper

Caching K and V:

- Avoids massive matrix multiplications
- Saves GPU compute
- Reduces memory bandwidth
- Shortens the critical path to first token

For long prompts, the savings compound quickly — hence:

- **Up to 10× lower token cost**
- **Up to ~85% latency reduction**

## Partial Cache Hits (Even Better)

Providers don’t need a perfect match.

If your new prompt starts with:

```c
"What is the red ring of death?"
```

and you previously cached:

```c
"What is the red ring"
```

they can reuse that prefix’s KV cache and only compute the rest.

This is why **stable prompt prefixes** matter in production.

## OpenAI vs Anthropic: Caching Philosophy

**OpenAI**

- Fully automatic
- Opportunistic routing
- Cache hit rates can vary (~50% in practice)

**Anthropic**

- Explicit cache control
- Predictable routing
- Near-100% hit rate when caching is enabled

If you care about **consistent latency with long contexts**, this difference matters.

## What About Temperature and Randomness?

Parameters like:

- `temperature`
- `top_p`
- `top_k`

Only affect **token sampling**, *after* attention has finished.

Since caching occurs **before sampling**, you can change these freely without invalidating cached prompts.

## Visual Intuition: Where KV Caching Lives

Think of KV caching as:

- **Pre-solving the past**
- Letting the model focus only on what’s new

## The Takeaway

Prompt caching isn’t magic.

It’s a straightforward optimization rooted in transformer mechanics:

- LLMs repeatedly recompute attention over unchanged tokens
- KV caching saves the expensive parts
- Providers pass the savings on to you

Once you understand that, the pricing — and the speedups — make perfect sense.

And the next time you see “cached input tokens” on your bill, you’ll know exactly what’s being reused within those GPUs.