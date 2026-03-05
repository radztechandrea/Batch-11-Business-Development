import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Link,
  Box,
  Container,
  Collapse,
  useMediaQuery,
  useTheme,
  Avatar,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import UlapBizLogo from '../../images/ulapbiz.png';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: '#fff',
    height: 60,
  },
  container: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  biz: {
    color: '#FF7704',
    fontWeight: 900,
  },
  iconContainer: {
    display: 'flex',
    gap: '.3em',
    alignItems: 'center',
    filter: 'grayscale(10%)',
    transition: 'all 500ms ease-in-out',
    [theme.breakpoints.down('md')]: {
      flexGrow: 1,
    },
    '&:hover': {
      filter: 'grayscale(0)',
    },
  },
  activeLink: {
    color: '#DB6700',
    fontWeight: 600,
    borderBottom: '2px solid #FF7704',
  },
  navLink: {
    transition: 'color 0.25s ease',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isXs = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const getPathFromPage = (page) => {
    if (page === 'Home') return '/';
    if (page === 'Plan Recommendation') return '/plan-recommendation';
    if (page === 'Contact Us') return '/contact-us';
    return `/${page.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const isActive = (page) => {
    if (page === 'Home') {
      return location.pathname === '/' && (!location.hash || location.hash === '#hero');
    }
    return location.pathname === getPathFromPage(page);
  };

  return (
    <AppBar elevation={2} color="inherit">
      <Container maxWidth="lg" className={classes.container}>
        <Toolbar disableGutters className={classes.toolbar}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              [theme.breakpoints.up('md')]: {
                justifyContent: 'start',
                gap: '2rem',
              },
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Logo Section */}
            <Box className={classes.iconContainer}>
              <RouterLink to="/#hero">
                <Avatar src={UlapBizLogo} />
              </RouterLink>
              <Link
                component={RouterLink}
                variant="h6"
                to="/#hero"
                underline="none"
                color="textPrimary"
              >
                Ulap<span className={classes.biz}>Biz</span>
              </Link>
            </Box>

            {/* Mobile Menu Toggle Button */}
            {isXs && (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {open ? (
                  <CloseIcon
                    color="textPrimary"
                    onClick={() => setOpen(false)}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <MenuIcon
                    color="textPrimary"
                    onClick={() => setOpen(true)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </Box>
            )}

            {/* Desktop Navigation */}
            {!isXs && (
              <Box
                sx={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'space-between',
                  width: '100%',
                  '& :hover': {
                    color: '#FF7704',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                  }}
                >
                  <Link
                    component={RouterLink}
                    variant="h6"
                    to="/#hero"
                    underline="none"
                    color="textPrimary"
                    className={`${isActive('Home') ? classes.activeLink : ''} ${classes.navLink}`}
                    style={{ fontSize: '.8rem' }}
                  >
                    Home
                  </Link>
                  <Link
                    component={RouterLink}
                    variant="h6"
                    to="/plan-recommendation"
                    underline="none"
                    color="textPrimary"
                    className={`${isActive('Plan Recommendation') ? classes.activeLink : ''} ${classes.navLink}`}
                    style={{ fontSize: '.8rem' }}
                  >
                    Plan Recommendation
                  </Link>
                  <Link
                    component={RouterLink}
                    variant="h6"
                    to="/contact-us"
                    underline="none"
                    color="textPrimary"
                    className={`${isActive('Contact Us') ? classes.activeLink : ''} ${classes.navLink}`}
                    style={{ fontSize: '.8rem' }}
                  >
                    Contact Us
                  </Link>
                </Box>
              </Box>
            )}
          </Box>
        </Toolbar>

        {/* Mobile Collapse Menu */}
        <Collapse in={open}>
          {isXs && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                gap: '1rem',
                marginBottom: '1rem',
                paddingBottom: '2rem',
              }}
            >
              <Link
                component={RouterLink}
                variant="h6"
                to="/#hero"
                underline="none"
                color="textPrimary"
                onClick={() => setOpen(false)}
                className={`${isActive('Home') ? classes.activeLink : ''} ${classes.navLink}`}
                style={{ fontSize: '1rem' }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                variant="h6"
                to="/plan-recommendation"
                underline="none"
                color="textPrimary"
                onClick={() => setOpen(false)}
                className={`${isActive('Plan Recommendation') ? classes.activeLink : ''} ${classes.navLink}`}
                style={{ fontSize: '1rem' }}
              >
                Plan Recommendation
              </Link>
              <Link
                component={RouterLink}
                variant="h6"
                to="/contact-us"
                underline="none"
                color="textPrimary"
                onClick={() => setOpen(false)}
                className={`${isActive('Contact Us') ? classes.activeLink : ''} ${classes.navLink}`}
                style={{ fontSize: '1rem' }}
              >
                Contact Us
              </Link>
            </Box>
          )}
        </Collapse>
      </Container>
    </AppBar>
  );
};

export default Navbar;
