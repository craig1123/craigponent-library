/* eslint-disable import/no-extraneous-dependencies */
import { css } from 'docz-plugin-css';

export default {
  title: 'craig Component Library',
  description:
    'React Component Library for UI consistency between repositories',
  src: './documentation',
  dest: './docz_dest',
  port: 4000,
  themeConfig: {
    codemirrorTheme: 'oceanic-next',
    colors: {
      white: '#FFFFFF',
      grayExtraLight: '#E7E8EA',
      grayLight: '#CED1D5',
      gray: '#8A8F9C',
      grayDark: '#2F3337',
      grayExtraDark: '#080808',
      dark: '#17181A',
      skyBlue: '#1FB6FF',
      blue: '#389BFF',
      background: '#080808',
      border: '#545658',
    },
    mode: 'dark',
    /** Styles */
    styles: {
      body: {
        fontFamily: "Roboto, 'Source Sans Pro', Helvetica, sans-serif",
      },
    },
  },
  htmlContext: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://codemirror.net/theme/oceanic-next.css',
        },
      ],
    },
  },
  plugins: [
    css({
      preprocessor: 'sass',
      cssmodules: true,
    }),
  ],
};
