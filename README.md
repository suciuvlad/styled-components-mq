[![NPM](https://img.shields.io/npm/v/styled-components-mq.svg)](https://www.npmjs.com/package/styled-components-mq)
[![Build Status](https://travis-ci.org/suciuvlad/styled-components-mq.svg?branch=master)](https://travis-ci.org/suciuvlad/styled-components-mq)
# styled-components-mq

Compose styled components 💅  media queries in an elegant way:
- provides a clean and intuitive API allowing you to create complex breakpoints without repeating yourself
- compiles to `em`-based queries

## Install

The easiest way to use **styled-components-mq** is to install it from NPM and include it in your own build process

```yarn add styled-components-mq```

## Usage

### Syntax
* mq($name: <$responsiveSuffix>)
* mq([$from: <$responsiveSuffix>], [$until: <$responsiveSuffix>])

> ```$from``` is inclusive while ```$until``` is exclusive. They can be chained together or used independently.

```js
import styled from 'styled-components';
import mediaQueries from 'styled-components-mq';
const mq = mediaQueries();

const Column = styled.div`
  width: 100

  /* Portrait Phones ONLY */
  ${ mq({ name: 'xs' })`
    width: 50%;
  ` }

  /* Landscape Phones(544px) and up  */
  ${ mq({ from: 'sm' })`
    width: 50%;
  ` }

  /* Landscape Phones up to Large Devices(excluding large devices) */
  ${ mq({ from: 'sm' })`
    width: 50%;
  ` }

  /* Smallest breakpoint(i.e. Portrait Phones) up to Large Devices(excluding large devices) */
  ${ mq({ until: 'lg' })`
    width: 50%;
  ` }
`;
```
### Recommended Usage
We can use the `<ThemeProvider>` wrapper component to pass the media query object down the tree.
```js
import mediaQueries from 'styled-components-mq';
const mq = mediaQueries();

const theme = {
	bodyColor: 'green',
  mq
};

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>


const Column = styled.div`
  width: 100;
  color: ${ props => props.theme.bodyColor };

  ${ props => props.theme.mq({ until: 'lg' })`
    width: 50%;
  `}
`;
```

## API
### `mediaQueries(breakpoints)`
You can easily customize the breakpoint names and values:

**Properties:**
- `breakpoints`: `Object` containing the breakpoints rules

##### Example:
```js
import styled from 'styled-components';
import mediaQueries from 'styled-components-mq';

const mq = mediaQueries({
  xs: '0px',
  sm: '544px',
  md: '768px',
  lg: '992px'
});

const Column = styled.div`
  width: 100;

  /* Landscape Phones up to Large Devices(excluding large devices) */
  ${ mq({ from: 'sm' })`
    width: 50%;
  ` }
`;
```

## Defaults
* **Portrait Phones:** ```0px``` up to ```543px```
* **Landscape Phones:** ```544px``` up to ```767px```
* **Tablets:** ```768px``` up to ```767px```
* **Large Devices:** ```992px``` and up

## Tests
```yarn run test```