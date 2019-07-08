import React from 'react'
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles, fade } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: '8vh',
        position: 'sticky',
        top: 0,
        zIndex: 5,
    },
    appBar: {
        height: '100%',
    },
    menuButton: {
        marginRight: '2rem',
    },
    title: {
        fontSize: '2rem',
        // display: 'block',
    },
    search: {
        position: 'relative',
        borderRadius: '2%',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        ['@media (max-width: 600px)']: {
            right: 5,
            position: 'fixed',
            width: '20%',
        },
    },
}))

export default function TopNav({ chattingWith, history }) {
    const classes = useStyles()

    const view = window.location.pathname

    if (view === '/') {
        return <HomeView />
    } else if (view === '/chat') {
        return <ChatView chattingWith={chattingWith} history={history} />
    }

    function HomeView() {
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={e => {
                                e.preventDefault()
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            Chatty
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'Search' }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    function ChatView({ chattingWith }) {
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={e => {
                                e.preventDefault()
                                history.push('/')
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            {chattingWith !== null && chattingWith.nickname}
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'Search' }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
