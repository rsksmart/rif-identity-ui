<p align="middle">
  <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle"><code>@rsksmart/rif-theme</code></h3>
<p align="middle">
  RIF ThemeProvider
</p>

Work in progress and will be expanded and updated as the apps grow. Can be used with both React and React Native applications.

## Basic Use

Wrap your component with the RifThemeProvider and pass it the defaultTheme.

```
import { RifThemeProvider, defaultTheme } from '@rsksmart/rif-theme';

<RifThemeProvider value={theme}>
  <App />
</RifThemeProvider>
```

The theme value represents colors, typography, and layout styles that are shared in the RIF ID react apps. Wrapping the app with this provider allows the components inside access to these variables. 

## Modifying Styles:

Overwrite the styles as needed from the defaultTheme, or download the defaultTheme.ts file and change completely.

```
import { RifThemeProvider, defaultTheme } from '@rsksmart/rif-theme';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#ffcc33',
  },
};

<RifThemeProvider value={theme}>
  <App />
</RifThemeProvider>
```

## Developer implementation

The implementation uses hooks. In the past, there was a consumer node that would wrap a component and give access to the items via props. This is replaced with the useContext hook:

```
import React, { useContext }  from 'react';
import { View, Text } from 'react-native';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';

export const myComponent = () => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  return (
    <View style={layout.row}>
      <Text style={type.header1}>Hello</Text>
    </View>
  )
}
```

This component may be nested many levels down, but if the top app is wrapped with the Provider, it has access. 
