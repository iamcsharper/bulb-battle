import { ECommonTags } from '../engine/models/common-tags';

export enum MyTags {
    save = ECommonTags.__LATEST,
    character,
    networkObject,
}

export const ETags = {
    ...ECommonTags,
    ...MyTags,
}