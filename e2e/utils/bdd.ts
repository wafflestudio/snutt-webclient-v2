import { type Browser, type Page } from '@playwright/test';

import { type CommonSpecs, getCommonSpecs } from '../common/index';
import { type MergedSpecs, mergeSpecs } from './mergeSpecs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SpecField = Record<string, (...args: any[]) => Promise<any>>;
export type Spec<G = SpecField, W = SpecField, T = SpecField> = {
  Given?: G;
  When?: W;
  Then?: T;
};

export type Helpers = {
  setLocalStorage: (key: string, value: string) => Promise<void>;
  page: Page;
};

export const bdd = <Specs extends Spec>(getSpecs: (helpers: Helpers) => Specs) => {
  return async (
    { browser }: { browser: Browser },
    callback: (args: MergedSpecs<Specs, CommonSpecs>) => Promise<void>,
  ) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const helpers: Helpers = {
      setLocalStorage: (key, value) =>
        page.evaluate(({ key, value }) => localStorage.setItem(key, value), { key, value }),
      page,
    };
    const commonSpecs = getCommonSpecs(helpers);
    const steps = getSpecs(helpers);

    await callback(mergeSpecs(commonSpecs, steps));
  };
};
