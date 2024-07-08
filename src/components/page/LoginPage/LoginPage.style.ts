import { css } from "@emotion/react";
import { Theme } from "@/styles/Theme";

export const backgroundImageStyling = css({
    position: 'absolute',
    bottom: Theme.spacer.spacing4,
    left: 0,
    zIndex: -1,
  
    '@media screen and (max-width: 600px)': {
      display: 'none',
    },
  });