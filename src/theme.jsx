import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        background: {
            default: '#ebeef0',
        },
        primary: {
            light: '#9be7ff',
            main: '#64b5f6',
            dark: '#2286c3',
            contrastText: '#fff',
        },
        secondary: {
            light: '#b085f5',
            main: '#7e57c2',
            dark: '#4d2c91',
            contrastText: '#000',
        },
    },
    typography: {
        fontSize: 18,
        fontFamily: [
            '"Segoe UI"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

export default theme;
