import { type Helpers } from '../utils/bdd';
import { mergeSpecs } from '../utils/mergeSpecs';
import { getModeSpecs } from './mode';
import { getRouteSpecs } from './route';
import { getUserSpecs } from './user';

export const getCommonSpecs = (helpers: Helpers) =>
  mergeSpecs(getUserSpecs(helpers), getRouteSpecs(helpers), getModeSpecs(helpers));

export type CommonSpecs = ReturnType<typeof getCommonSpecs>;
