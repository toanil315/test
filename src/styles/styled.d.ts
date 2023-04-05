import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      transparent: string;
      primary: string;
      secondary: string;
      danger: string;
      text: string;
      textLight: string;
      gray: string;
      lightGray: string;
      boxShadowPrimary: string;
      boxShadowDanger: string;
      yellow: string;
    };

    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };

    fontWeights: {
      regular: number;
      medium: number;
      bold: number;
      extraBold: number;
    };

    lineHeights: {
      small: string;
      normal: string;
      large: string;
      xl: string;
    };

    radii: {
      base: string;
      md: string;
      large: string;
      rounded: string;
    };
  }
}
