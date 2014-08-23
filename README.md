# Montgomery - time tracker

_"I guess this is the end. I just wish I'd spent more time at the office."_ - C. M. Burns.

## Brief
Let's see if I can write something for tracking my hours that is more usable than my current pen + paper solution!

1. **Must** allow me to enter project, task, day and time started.
2. **Must** calculate daily sums for me, grouped by project then task.
3. _Should_ be available on my desktop and on my mobile device (e.g. as browser plugin, offline web app).
4. _Should_ be power-user friendly (keyboard shortcuts).
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
* v0.3 *Multi-device layout* - in progress
* v0.4 *Keyboard shortcuts* - not a high priority, since using the awesome Vimperator anyway
* v0.5 *Prettification*
* v0.6 *Unnecessary cool visualizations*

### Technical choices
* Bower seems to be THE package manager for a web app.
* Bootstrap - what else?
* TypeScript - because I think I'm going to fall in love with it.
* Flux architecture appeals to my engineering instincts, but no appetite for React today.
* QUnit - not likely to need much testing, mind.
* Blanket - not sure this is going to get complex enough to require code coverage, but if it does.

## License
GPLv3 baby
