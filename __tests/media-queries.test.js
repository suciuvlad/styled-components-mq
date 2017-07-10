import mediaqueries from '../src/media-queries';

const breakpoints = {};

test('throws an error with an invalid signature', () => {
  const mq = mediaqueries(breakpoints);
  expect(() => {
    mq();
  }).toThrow();
});

test('using #from returns the correct result', () => {
  const mq = mediaqueries();

  expect(
    mq({from: 'md'})
  ).toBe('@media (min-width: 48em)');
});

test('using #until returns the correct result', () => {
  const mq = mediaqueries();

  expect(
    mq({until: 'md'})
  ).toBe('@media (max-width: 47.99375em)');
});

test('using #from & #until returns the correct result', () => {
  const mq = mediaqueries();

  expect(
    mq({from: 'sm', until: 'md'})
  ).toBe('@media (min-width: 34em) and (max-width: 47.99375em)');
});

test('using #name returns the correct result', () => {
  const mq = mediaqueries();

  expect(
    mq({name: 'md'})
  ).toBe('@media (min-width: 48em) and (max-width: 61.99375em)');
});