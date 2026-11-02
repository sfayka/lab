---
title: "Your Agent Is Signed In as You"
date: 2026-11-02
tags: [ai, agents, identity, audit, email, smb, operations]
categories: [essays]
layout: post
published: false
---

The customer got the email. The sent folder says you wrote it. You were on a job, or in the truck, or asleep. The agent was the one that hit send. A week later nobody can prove which of you did it, because the login was yours.

That is a bookkeeping problem until it is a customer problem. A wrong price, a wrong day, a reply that sounds like a promise. The thread has your name on it. The argument starts there.

## The survey, and who it actually describes

Nylas asked 1,030 U.S. professionals who build, buy, or influence AI systems, between August 26 and September 12, 2026. In the [H2 2026 write-up](https://www.nylas.com/blog/pr/ai-agent-mistakes-survey-state-of-agentic-ai-h2-2026/), 26% said their agents authenticate with a dedicated identity of their own. At roughly one organization in four, agents send email and manage calendars through an employee's login or a shared inbox.

Where agents had their own identity, 66% of teams said they could fully audit what agents did. Where agents acted through an employee's account, 51% said the same. Nylas also found that 53% of the whole sample could produce a full audit log of what their agents did last week and which agent did it. Another 10% could not audit agent activity, or do not.

Read the sample before you borrow the number. Software and SaaS companies are 48% of respondents. Founders and executives are 7%. These are people already close to the tools. Nylas sells email and calendar infrastructure, including accounts meant for agents, so this is a vendor survey. The direction still matters. If the people nearest the software are letting agents wear an employee login, a ten-person shop will do it faster. The owner's Google account already has the calendar, the customers, and the signature. The setup screen says Connect. Somebody connects.

<!-- SEAN: optional — if you have a real case of an agent sending from a personal or shared login, one or two sentences here. Skip if you would be reconstructing it. -->

## A shared inbox still hides the actor

A shared inbox feels like the responsible version. The mail comes from office@. The password sits in the team vault. That beats borrowing the owner's login, and it still fails the question that matters after something goes wrong.

The log names the mailbox. The actor stays off the row unless the tool records it separately from the account. A person answering a lead at 4pm and an agent answering a lead at 9pm leave the same kind of row. Two agents on one inbox do too. Mail went out. The row still cannot say which agent wrote it.

Nylas's CTO put the same point in plain language in that release: when the agent runs on a person's credentials, the log shows the person. The 66% versus 51% gap is an association in their survey. A dedicated mailbox gives the log a name that can be the agent's. Someone still has to open the row and check.

I wrote about a related failure in [Done According to What](/posts/done-according-to-what/). A system that reports on itself is narration. An audit log that can only say "this mailbox sent mail" is the same shape. You want a record that a second person can check without asking the agent what it remembers.

## What breaks when the name on the send is yours

Three ordinary messes follow from a shared login.

The customer cannot tell who they are talking to. They reply as if a person at the company made the commitment. You find out when they show up, or when they quote your price back to you. By then the thread is the evidence, and the thread says you.

Offboarding gets dangerous. The office manager leaves. Her login is also the agent's login. You reset the password and the agent stops, or you leave the password alone and a former employee still has the credential that sends to customers. In both cases the identity belonged to her, and it walked when she did.

Review gets fuzzy. In [Where Human Review Actually Belongs](/posts/where-human-review-belongs/) the useful gate is the state boundary, the moment a draft becomes a message a customer can read. If the send already happened under your name, the review step has nothing left to catch. You are writing an apology, which is a different job, and it belongs on the cost line I described in [Agent ROI Is Missing a Line Item](/posts/agent-roi-is-missing-a-line-item/).

## The cheap fix

Separate the actor from the person with three ordinary things: a mailbox the agent owns, a name the customer can see, and one test that proves the log agrees.

**Give the role its own mailbox.** scheduling@ or office-assistant@ on your existing Google Workspace or Microsoft 365 plan. A person can have delegate access, so a human can read the thread and answer when it matters. The agent gets its own grant. The owner's password stays with the owner. Skip any option that signs the agent in as a person.

**Put the agent in the from-line and the signature.** "Scheduling assistant at [Company]" is enough. Add one sentence: "This note was sent by our office assistant. A person reads the thread." Customers can still be confused. They are less confused than when the mail looks exactly like the owner typed it.

**One mailbox per sending agent, if you have more than one.** If the quote agent and the review-reply agent share office@, you are back to a log that shows the mailbox. If the product can record the actor on every send, one mailbox can work. Check that recording before you believe the brochure.

**Run one test before you allow real sends.** Have the agent send a message to you. Then look at three places: the customer's view, the sent folder, and whatever audit log the tool keeps. All three should let a person who was not in the room say the assistant sent it. If any of the three shows your name as the actor, the agent is still signed in as you. Turn send off and leave it on drafts.

**Do the same for the calendar.** An event the agent creates on your personal calendar, through your login, looks like you booked it. The organizer, or a field you can filter on, should name the assistant. If the only history is "you created an event," the calendar still says you booked it.

That test is the whole fix. A vendor feature called "agent identity" helps when the product supports it. Send one message. Find the row. Read the name.

## What I would refuse

I would let an agent draft from a shared inbox all day. Drafts are cheap. I would not let it send, book, or reply on a public page until the test above passes.

If the only connection the product offers is "sign in with Google" on a human account, that product is asking you to be the identity. Use it for drafts, or do not use it for customer-facing mail. Waiting a week to set up scheduling@ is cheaper than explaining a promise you did not make.

The rule I would write on the wall is short. Before an agent is allowed to send, a stranger should be able to look at the message and the log and come to the same answer: the assistant sent it. If the two disagree, the agent is still you.

<!-- SEAN: optional — Knox mailbox naming or the exact test you want owners to run in a working session. Keep it to a real setup. -->
