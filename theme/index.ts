import { extendTheme, theme as base } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#76DDFF',
      100: '#5BD6FF',
      200: '#24C8FF',
      300: '#00B2ED',
      400: '#0089B6',
      500: '#006080',
      600: '#005976',
      700: '#00526D',
      800: '#004B64',
      900: '#00445B',
    },
  },

  fonts: {
    heading: `Maven Pro, ${base.fonts?.heading}`,
    body: `Noto Sans, ${base.fonts?.body}`,
  },

  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#111111' : 'white',
      },
    }),
  },
});

export default customTheme;
