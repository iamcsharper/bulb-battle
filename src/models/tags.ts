import { ECommonTags } from '../engine/';

export enum MyTags {
    save = ECommonTags.__LATEST,
    character,
    networkObject,
}

export const ETags = {
    ...ECommonTags,
    ...MyTags,
}