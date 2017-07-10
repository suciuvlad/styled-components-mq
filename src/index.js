import { css } from 'styled-components';
import mediaqueries from './media-queries';

export default (breakpoints) => {
  const mq = mediaqueries(breakpoints);

  return data =>
    (...args) => css`
      ${ mq(data) } {
        ${ css(...args) }
      }
    `;
};
