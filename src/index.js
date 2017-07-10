import { css } from 'styled-components';
import mq from './media-queries';

export default data =>
  (...args) => css`
    ${ mq(data) } {
      ${ css(...args) }
    }
  `;
