import { type Spec, type SpecField } from './bdd';

export function mergeSpecs<G1 extends SpecField, W1 extends SpecField, T1 extends SpecField>(s1: {
  Given?: G1;
  When?: W1;
  Then?: T1;
}): { Given: G1; When: W1; Then: T1 };
export function mergeSpecs<
  G1 extends SpecField,
  W1 extends SpecField,
  T1 extends SpecField,
  G2 extends SpecField,
  W2 extends SpecField,
  T2 extends SpecField,
>(
  s1: { Given?: G1; When?: W1; Then?: T1 },
  s2: { Given?: G2; When?: W2; Then?: T2 },
): { Given: G1 & G2; When: W1 & W2; Then: T1 & T2 };
export function mergeSpecs<
  G1 extends SpecField,
  W1 extends SpecField,
  T1 extends SpecField,
  G2 extends SpecField,
  W2 extends SpecField,
  T2 extends SpecField,
  G3 extends SpecField,
  W3 extends SpecField,
  T3 extends SpecField,
>(
  s1: { Given?: G1; When?: W1; Then?: T1 },
  s2: { Given?: G2; When?: W2; Then?: T2 },
  s3: { Given?: G3; When?: W3; Then?: T3 },
): { Given: G1 & G2 & G3; When: W1 & W2 & W3; Then: T1 & T2 & T3 };
export function mergeSpecs(...specs: Spec[]) {
  return specs.reduce((acc, cur) => {
    ['Given', 'When', 'Then'].forEach((field) => {
      if (Object.keys(cur[field] ?? {}).some((key) => Object.keys(acc[field] ?? {}).includes(key)))
        throw new Error('Duplicated Spec Definition');
    });

    return {
      Given: { ...acc.Given, ...cur.Given },
      When: { ...acc.When, ...cur.When },
      Then: { ...acc.Then, ...cur.Then },
    };
  }, {});
}

export type MergedSpecs<S1 extends Spec, S2 extends Spec> = {
  Given: S1['Given'] & S2['Given'];
  When: S1['When'] & S2['When'];
  Then: S1['Then'] & S2['Then'];
};
