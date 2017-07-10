// @flow

const baseFontSize: string = '16px';

const defaultBreakpoints = {
  xs: 0,
  sm: 544,
  md: 768,
  lg: 992
};

const pxToEm = (value: string | number): string => {
  const compute = parseFloat(value) / parseFloat(baseFontSize);
  return `${ compute }em`;
};

const findNextBreakpoint = (breakpoints, needle) => {
  const keys = Object.keys(breakpoints);
  const current = keys.find(val => val === needle);
  const index = keys.indexOf(current);

  const key = keys[index + 1];
  if (key) return breakpoints[key];

  return undefined;
};

const parseBreakpoints = (breakpoints): Object =>
  Object.entries(breakpoints).reduce((acc, breakpoint) => {
    if (!breakpoint[0]) return acc;
    acc[breakpoint[0]] = parseFloat(breakpoint[1]);
    return acc;
  }, {});

export default (userBreakpoints: {} = defaultBreakpoints) => {
  const breakpoints = parseBreakpoints(userBreakpoints);

  const validateBreakpoint = (breakpoint) => {
    const key = Object.keys(breakpoints).find(val => val === breakpoint);
    if (!key) throw new Error(`Breakpoint ${ breakpoint } not found.`);
    return breakpoints[key];
  };

  return (props: { name?: string, from?: string, until?: string }): string => {
    if (!props)
      throw new Error('At least one of `name`, `from` or `until` is required.');

    const { name, from, until } = props;

    let media = '';
    let minWidth = 0;
    let maxWidth = 0;

    // inclusive
    if (from) {
      minWidth = validateBreakpoint(from);
      media = `${ media } and (min-width: ${ pxToEm(minWidth) })`;
    }

    // exclusive
    if (until) {
      maxWidth = validateBreakpoint(until) - 0.1;
      media = `${ media } and (max-width: ${ pxToEm(maxWidth) })`;
    }

    media = media.slice(5, media.length);

    let next;

    if (name && !from && !until) {
      next = findNextBreakpoint(breakpoints, name);
      minWidth = validateBreakpoint(name);

      if (next) {
        maxWidth = next - 0.1;
        media = `(min-width: ${ pxToEm(minWidth) }) and (max-width: ${ pxToEm(maxWidth) })`;
      } else
        media = `(min-width: ${ pxToEm(minWidth) })`;
    }

    return `@media ${ media }`;
  };
};
