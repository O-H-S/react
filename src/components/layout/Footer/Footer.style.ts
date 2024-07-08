import { css } from '@emotion/react';

export const containerStyling = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',

  //width: '100vw',
  height: '164px',
  //margin : '0 0',
  padding: '0 64px',
  borderTop: `1px solid ${'#e8e8e8'}`,

  backgroundColor:  'white',

  '@media screen and (max-width: 600px)': {
    height: '124px',
  },

  '& *': {
    color: 'gray',
  },
});