import {ITransitionActions, Query, SerialFormat, TGroupHandle, WithTag} from "sim-ecs";
import {ETags} from "../models/tags";


const saveKey = 'save';

export function load(actions: ITransitionActions): TGroupHandle {
    const save = localStorage.getItem(saveKey);

    if (!save) {
        throw new Error('No save available. Cannot load!');
    }

    const handle = actions.commands.load(SerialFormat.fromJSON(save));

    return handle;
}

export function save(actions: ITransitionActions) {
    localStorage.setItem(saveKey, actions.save(new Query([WithTag(ETags.save)])).toJSON());
}
