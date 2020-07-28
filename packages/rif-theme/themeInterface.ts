export interface ThemeInterface {
  colors: {
    primary: string,
    inverse: string,
    white: string,
    black: string,
    gray: string,
    lightGray: string,
    darkGray: string,
    error: string,
  },
  type: {
    header1: {},
    header2: {},
    paragraph: {},
    paragraphBold: {},
    bold: {},
    error: {},
  },
  layout: {
    container: {},
    row: {},
    column1: {},
    column2: {},
    column3: {},
    textInput: {},
  }
}