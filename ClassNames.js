// @flow

const toModifiers = function(modifiersList: string[]): {[string]: boolean} {
  return modifiersList.reduce(
    (res: {[string]: boolean}, modifier: string) => ({
      ...res,
      [modifier]: true
    }),
    {}
  );
};

export default function(
  element: string,
  modifiers?: string | string[] | {[string]: boolean},
  qaClassName?: string
) {
  return {
    element,
    modifiers: Array.isArray(modifiers) ? toModifiers(modifiers) : modifiers,
    _qaClassName: qaClassName
  };
}
