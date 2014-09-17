# Montgomery - time tracker

_"I guess this is the end. I just wish I'd spent more time at the office."_ - C. M. Burns.

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

## Plans

### Roadmap
I'm going to tackle the targets in order, so v0.0 will be target 1, etc..

#### Progress status:
* v0.0 *Input* - done
* v0.1 *Sums* - done
* v0.3 *Multi-device layout* - done
* v0.4 *Power-user-friendly* - done
* v0.5 *Prettification* - done, if you like default colors
* v0.6 *Unnecessary cool visualizations* - got one
* v1.0 (all of the above, plus manual testing) - done! Time to start using!
* v1.1 *Issue fixes* - in progress


### Technical choices
* Bower seems to be THE package manager for a web app.
* Bootstrap - what else?
* TypeScript - because I think I'm going to fall in love with it.
* Flux architecture appeals to my engineering instincts, but no appetite for React today.
* QUnit - not likely to need much testing, mind.
* Blanket - not sure this is going to get complex enough to require code coverage, but if it does.

### Review at v1.0
* Hit all the original targets!
    \(^_^)/
* Flux architecture worked well, I feel the data flow is clean and robust. But templating would have made life easier. May consider a framework next time.
* Bootstrap rocks, the ease with which I put together something that looks neat on multiple platforms is delightful.
* TypeScript is a very tasteful augmentation of JavaScript. It pulls off the neat trick of being robust without being restrictive. I'm already using TypeScript on my other projects.
* QUnit is simple, but does its job well.
Okay, time to see how Montgomery holds up in daily use. I have it installed as an offline web app on my phone, so in theory this should be a significant improvement over the pen + paper time tracking. We shall see...

#### Issues from dogfooding
* Tedious to write date, should be auto-populated. [done]
    * Auto-populated date breaks updating old entries.
    * Auto-populated date should give today's date. [done]
* Having time next to date would be more natural. [done]
* Undefined data error when entries cross date boundaries.
* Tedious to correctly capitalize everything, should normalize on save.
* Clear task history should clear page also. [done]
* Code coverage < 100%.
* Should namespace code.

## License
GPLv3 baby
