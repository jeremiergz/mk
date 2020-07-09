import { green, grey, orange, red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const black = '#000000';
const primary = '#00cdcd';
const secondary = '#93f1ff';
const white = '#ffffff';

const theme = createMuiTheme({
  overrides: {
    MuiBreadcrumbs: { root: { color: black } },
    MuiFormControlLabel: { root: { marginRight: 0 } },
    MuiPaper: { root: { backgroundColor: grey[900] } },
    MuiSnackbar: { root: { width: 'calc(100vw - 192px)' } },
  },
  palette: {
    background: { default: black },
    error: { main: red.A400 },
    primary: { main: primary },
    secondary: { main: secondary },
    success: { main: green.A700 },
    text: {
      primary: white,
      secondary: grey.A100,
    },
    type: 'dark',
    warning: { main: orange.A700 },
  },
  typography: {
    allVariants: { fontWeight: 'bolder' },
  },
});

export default theme;
