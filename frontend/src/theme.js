import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const decovar = {
  fontFamily: 'Decovar Alpha Regular24',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: '100 1000',
  src: `
    local('Decovar'),
    url('https://joel-oe-lacey-resources.s3.amazonaws.com/DecovarAlpha-VF.ttf') format ('truetype')
  `,
}
// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [decovar],
      },
    },
  },
});

export default theme;
