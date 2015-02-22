/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
export interface Entry {
    id: number;
    start: Moment;
    project: string;
    task: string;
    duration: Duration;
}

export interface Day {
    id: number;
    visible: boolean;
    entries: Entry[];
    add(entry: Entry): void;
    del(entry: Entry): void;
}

export class Store {
    load(): MithrilPromise<Day[]> { throw new Error("nyi"); }
    save(day: Day[]): void { throw new Error("nyi"); }
}

interface RawEntry {
    start: string;
    project: string;
    task: string;
}

module Commands {

    // Should be able to add and delete days
    class AddDay { addDay: Day; }
    class DeleteDay { deleteDay: Day; }

    // Should be able to add, update and delete entries
    class AddEntry { day: Day; addEntry: RawEntry; }
    class UpdateEntry { day: Day; updateEntry: Entry; newData: RawEntry }
    class DeleteEntry { day: Day; deleteEntry: Entry; }

    // Future commands: setting config?

    // TODO import tsmonad
    interface Either<L,R> { }
    type Errors = string[];
    interface CommandHandler {
        // Abusing union types as if ADT
        (cmd: AddDay|DeleteDay|AddEntry|UpdateEntry|DeleteEntry):
            Either<Errors,Day[]>
    }
}

