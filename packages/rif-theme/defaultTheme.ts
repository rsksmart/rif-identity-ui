const colors = {
  primary: '#50555C',
  inverse: '#DADADA',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#CCCCCC',
  lightGray: '#e1e1e1',
  darkGray: '#909090',
  red: '#BD0000',
  blue: '#008FF7',
  yellow: '#FFB800',
  green: '#008000',
}

const typeSettings = {
  margin: {
    marginTop: 10,
    marginBottom: 10,
  }
}
const typography = {
  header1: {
    ...typeSettings.margin,
    fontSize: 30,
    color: colors.primary,
  },
  header2: {
    ...typeSettings.margin,
    fontSize: 25,
    color: colors.primary,
  },
  paragraph: {
    ...typeSettings.margin,
    fontSize: 16,
  },
  paragraphBold: {
    ...typeSettings.margin,
    fontSize: 16,
    fontWeight: 'bold'
  },
  bold: {
    fontWeight: 'bold',
  },
  error: {
    ...typeSettings.margin,
    fontSize: 20,
    backgroundColor: colors.red,
    color: colors.white,
    padding: 10,
    textAlign: 'center',
    borderRadius: 8,
  },
}

const layoutSettings = {
  columnGutter: {
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
  }
}
const layout = {
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  column1: {
    width: '100%',
    ...layoutSettings.columnGutter,
  },
  column2: {
    width: '50%',
    ...layoutSettings.columnGutter,
  },
  column3: {
    width: 100 / 3 + '%',
    ...layoutSettings.columnGutter,
  },

  borderRow: {
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 8,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.darkGray,
    height: 55,
    paddingLeft: 10,
    paddingRight: 10,
  },
}

export const theme = {
  name: 'Jesse Default',
  colors: colors,
  typography: typography,
  layout: layout,
};

export default theme;