# Plan
These are just my own notes on direction. Partly a rubber-ducking exercise.

## Brief
Let's see if I can write something for tracking my hours that is more usable than my current pen + paper solution!

1. **Must** allow me to enter project, task, day and time started.
2. **Must** calculate daily sums for me, grouped by project then task.
3. _Should_ be available on my desktop and on my mobile device (e.g. as browser plugin, offline web app).
4. _Should_ be power-user friendly (keyboard shortcuts, smart focusing).
5. _Should_ be attractive (just CSS).
6. Might have some nice visualizations of where all that time is going.

My current pen + paper solution actually works really well:
- write the date as a header
- fill in three unmarked columns: project, task and time started
- time finished is inferred from the time the following task is started
- home and lunch are two special projects
- it's possible to go back and edit the items if a mistake is spotted

The downsides are:
- having to sum the times manually when a task is revisited
- bits of dead tree everywhere

## Roadmap
I'm going to tackle the targets in order, so v0.0 will be target 1, etc..

### Progress status:
* v0.0 *Input* - done
* v0.1 *Sums* - done
* v0.3 *Multi-device layout* - done
* v0.4 *Power-user-friendly* - done
* v0.5 *Prettification* - done, if you like default colors
* v0.6 *Unnecessary cool visualizations* - got one
* v1.0 (all of the above, plus manual testing) - done! Time to start using!
* v1.1 *Issue fixes* - done.


## Technical choices
* Bower seems to be THE package manager for a web app.
* Bootstrap - what else?
* TypeScript - because I think I'm going to fall in love with it.
* Flux architecture appeals to my engineering instincts, but no appetite for React today.
* QUnit - not likely to need much testing, mind.
* Blanket - not sure this is going to get complex enough to require code coverage, but if it does.

## Review at v1.0
* Hit all the original targets!
    \(^_^)/
* Flux architecture worked well, I feel the data flow is clean and robust. But templating would have made life easier. May consider a framework next time.
* Bootstrap rocks, the ease with which I put together something that looks neat on multiple platforms is delightful.
* TypeScript is a very tasteful augmentation of JavaScript. It pulls off the neat trick of being robust without being restrictive. I'm already using TypeScript on my other projects.
* QUnit is simple, but does its job well.
Okay, time to see how Montgomery holds up in daily use. I have it installed as an offline web app on my phone, so in theory this should be a significant improvement over the pen + paper time tracking. We shall see...

### Issues from dogfooding

#### Closed
* Tedious to write date, should be auto-populated.
* Auto-populated date should give today's date.
* Having time next to date would be more natural.
* Undefined data error when entries cross date boundaries.
* Clear task history should clear page also.
* Bug: sum table randomly ordered.
* Sum table should show hours not minutes.
* D3 is too OP for a simple pie chart. Replace?
* Old charts not cleared properly.

#### Open (roughly in priority order)
* Auto-populated date breaks updating old entries (causes validation error)
* Tedious to correctly capitalize everything, should normalize on save.
* Should automatically time-sort entries.
* Code style: explicit public, explicit return types.
* Strongly-typed views possible?
* Should namespace code.
* Code coverage < 100%.

## Version 2.0
_Always throw away the prototype_ - J. Atwood?

### Targets
* Add ability to hide (e.g. fold up) entire days.
* Add ability to delete entire days.
* Each entry to display time spent as soon as closed off.
* Fix all open issues from 1.0.

### Implementation plans
#### Re-write
Never re-write your code. Instead, declare your code a prototype and throw it away. Just kidding. But I am going to re-write. Conventional wisdom/Spolsky suggests that the existing codebase is battle-hardened, full of fixes to problems lost in the mists of time. But for a one-person project this isn't such a big deal.

#### NPM
I was wrong about Bower. It didn't offer me any advantages over NPM. I'm also about to chuck out a load of dependencies, so I might as well switch to the package manager I'm already familiar with.

#### Mithril.js
[Mithril.js](https://lhorie.github.io/mithril) looks fantastic. I've done some work on the .d.ts and I think it should allow me to do strongly-typed views. This may involve migrating to more of a MVC architecture rather than Flux.

#### Data structure
I've gone back on the idea that entries should be a flat list. Having a heirarchy where entries belong to a day makes more sense. I'd also like to start using the command/event sourcing pattern; I found it very nice to work with in other projects.

#### Foundations for storing data on server
It would be good to open the door to storing the data on a server at some point (current all in local storage - a totally independant app). So all retrieved data should be treated as potentially asynchronous. Mithril's request function may help here.
