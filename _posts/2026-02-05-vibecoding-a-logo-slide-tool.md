---
layout: post
title: "Vibecoding a Logo Slide Tool"
date: 2026-02-05
categories: [essays]
---

My coworker mentioned a tool he used to have—something that made building logo slides painless. Search for logos, drag them into a grid, done. He missed it. I decided to build it.

## The Annoyance

Aligning logos to a grid: it sounds like a small thing, but it's a constant distraction—a reminder of the tedium that can creep into the job. If you’ve ever experienced it, you know the pain instantly. Why is it so difficult? Why is it so tedious?

It's simple: no logos are uniform. They have different backgrounds, sizes, and shapes. You spend your life either hunting for the "perfect" version (right size, right color, transparent background) or paying for a service to do it for you. Then, once you finally have them, you have to position them perfectly. If one logo sits even slightly higher than the others, someone in the room will be staring at it instead of listening to you. See what I mean?

## What "Vibecoding" Means to Me

I define "vibecoding" as the act of building software by feel rather than spec. It’s less about writing every line of code and more about letting the AI handle the heavy lifting while you iterate with it. This is especially useful for those of us who don't have the time—or the desire—to write detailed specs and documentation.

My own process is pretty straightforward. I have a CS degree, but I’ve always been a hobbyist rather than a professional developer. Formal documentation and rigid specs aren’t my forte, so I let the AI bridge that gap. I ask it to interview me, let it write the spec, and then I refine it. From there, the AI does the coding while I review the output. 

I’ll be honest: I don’t always know if the AI is writing *good* code, or just code that happens to work. To me, vibecoding is about trusting the AI to handle the technical kinks while I provide the guardrails. I usually instruct the AI to write a PRD (Product Requirement Document) first, then have it write tests to verify its work along the way. It’s not a perfect system—AI makes assumptions and doesn't always choose the best frameworks—but with some fundamental knowledge and the right tests, it’s a powerful way to build. 

So, with all of that in mind, and having set the stage, this is what I'm building and how I'm building it, so you can see the process.

## The Build

I started like I typically do: by asking the AI to interview me, letting it write the spec, and then refining it. From there, the AI handles the coding while I review the output. In this case, I explained the problem and my vision, then let the AI interview me to build out the plan. The questions were pretty typical: *What frameworks do you want? Where should we get logos? (It actually provided some great suggestions). What does the output look like? What sort of exporting is required? Are some features needed for v1, or can they wait for v2?*

I answered the questions as best as I could, sometimes admitting I didn't know and telling it to use industry best practices or asking, "What do you think?" You’d be surprised how well that works. I don’t spend my days thinking about matching frameworks, API endpoints, or keys, so I let the AI handle that while I focus on the big picture: the desired outcome, the look and feel, and the secondary features that should be prioritized.

The AI came up with a plan, and it sounded solid. It would be a simple tool with pre-built grid layouts (out-of-the-box ones for v1, custom for v2), a search box for logos by company name, background options (white, black, transparent), and export functionality (PDF, PNG, JPG). We kept it lean for v1—fewer choices, but meeting the most common needs—leaving the custom options for a future version or a "premium" layer.

I approved the plan and let the AI write the code, approving the commands it ran in VS Code (using the Codex extension). After about 20-30 minutes, it was essentially done. I hit some "Node package drama" with dependencies that wouldn't install, but eventually, I got it running—and it worked!

I did notice that searching for company names wasn't working at first because the AI had used hardcoded values. I had to go fetch some API keys and client IDs from a few services to bridge the gap. Otherwise, the UI and core functionality were exactly what I had in mind. It even looked good—something I didn't have to specifically ask for or even really think about.

## What Worked

For the most part, I didn't need to micromanage the AI. It handled the coding, the UI, and the core functionality on its own. It even came up with some great suggestions, like the pre-built grid layouts and the export functionality. It didn't ask me for a color scheme or a UI layout—it just delivered. I really appreciated not having to think like a designer. Honestly, that’s probably for the best; I’d likely end up with something spartan and plain. For the designers out there with true vision, my hat is off to you.

The AI's ability to suggest APIs, find free tiers, and provide guidance was a huge time saver. I didn't have to stress over which service was better or whether I’d need to pay. Codex even pointed me directly to the signup URLs and gave me instructions, which saved me from having to Google my way through it like it’s 2019.

## What Didn't

In this particular case, there wasn't a whole lot that *didn't* work. With Claude Code and OpenAI's Codex, AI coding has gotten leaps and bounds better. I remember trying to build a gym journal app a while back; I went back and forth with the AI for hours, fixing one bug only to introduce two more. It was maddening.

This time, the friction was minimal. There was one issue with Node.js on my MacBook Pro where I had Node installed via Homebrew. Codex suggested an upgrade, which I did, but it didn't immediately solve the problem. It turned out to be an issue with how dependencies were being referenced, and Codex had to try a different approach. It seemed like Codex was looking for a version of Node that wasn't actually there, but eventually, we worked through it.

## The Tool So Far

Here is a screenshot of the tool in its current state:

![Logo Slide Tool](/assets/images/logo_grid_v1_feb2026.png)

What's working now:

1. You can pick your grid layout.
2. You can export to SVG, PPTX, PNG, and PDF.
3. You can search for company names (currently hardcoded as I polish the logo fetching).
4. You can choose the resolution of the export (1080p is the default for presentations).
5. You can choose the background color (white, black, or transparent).

Next steps:

1. Get the logo fetching working via API.
2. Add custom grid layouts.
3. Add the backend API for logos (thanks to Codex for the recommendations).
4. Full end-to-end testing (I know, I should have done this earlier, but I was in the flow).

## Why Small Tools Matter

When I started vibecoding, my goals were huge. I was going to build massive SaaS projects, make a fortune, and have a million concurrent users. But I soon realized I lack the engineering experience and the cash lying about to just quit my job, buy "Claude Max," and vibe away. So, I started with small tools—things that were annoying and time-consuming but manageable. Sometimes it’s the things that are too stupid to exist yet too expensive to buy that are the most satisfying to build yourself.

The moral of the story is: small tools matter. They make life better and people happy. They don't require a million concurrent users or a million dollars in marketing. They just require a little time, a little focus, and the right "vibe."
---

*This is part of my ongoing exploration of how AI is reshaping how we build software. More at [lab.knoxanalytics.com](https://lab.knoxanalytics.com).*
