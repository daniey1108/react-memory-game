import React from 'react';
import * as R from 'ramda';

import MenuIcon from '@material-ui/icons/Menu';
import * as MaterialUi from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

import theme from './theme.jsx';
import Routes from './Routes.jsx';
const links = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Memory Game',
        href: '/memory-game',
    },
    {
        label: 'Github',
        href: 'https://github.com/daniey1108',
    },
    {
        label: 'Twitter',
        href: 'https://twitter.com/daniallan111',
    },
    {
        label: 'Linkedin',
        href: 'https://www.linkedin.com/in/dallan1108/',
    },
];

function App () {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState(window.location.pathname);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="App">
            <header className="App-header">
                <MaterialUi.ThemeProvider theme={theme}>
                    <SnackbarProvider
                        maxSnack={1}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <CssBaseline />
                        <MaterialUi.AppBar position="static">
                            <MaterialUi.Toolbar>
                                <MaterialUi.IconButton
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={handleClick}
                                >
                                    <MenuIcon />
                                </MaterialUi.IconButton>
                                <MaterialUi.Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {R.map(
                                        (link) => (
                                            <MaterialUi.MenuItem
                                                component="a"
                                                key={link.href}
                                                href={link.href}
                                            >
                                                {link.label}
                                            </MaterialUi.MenuItem>
                                        ),
                                        links
                                    )}
                                </MaterialUi.Menu>
                                <MaterialUi.Typography variant="h6">
                                  Danielle Allan
                                </MaterialUi.Typography>
                            </MaterialUi.Toolbar>
                        </MaterialUi.AppBar>
                        <Routes />
                        <MaterialUi.BottomNavigation
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            showLabels
                        >
                            {R.map(
                                (link) => (
                                    <MaterialUi.BottomNavigationAction
                                        key={`${link.href} + bottom nav`}
                                        component="a"
                                        href={link.href}
                                        label={link.label}
                                    />
                                ),
                                links
                            )}
                        </MaterialUi.BottomNavigation>
                    </SnackbarProvider>
                </MaterialUi.ThemeProvider>
            </header>
        </div>
    );
}

export default App;
