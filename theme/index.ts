import { extendTheme, theme as base } from '@chakra-ui/react';

const customTheme = extendTheme({
  fonts: {
    heading: `Maven Pro, ${base.fonts?.heading}`,
    body: `Noto Sans, ${base.fonts?.body}`,
  },
});

export default customTheme;
