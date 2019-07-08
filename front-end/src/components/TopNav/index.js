import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles, fade } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import SearchIcon from '@material-ui/icons/Search'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/AddCircle'

import db from '../../db'
import AddFriend from '../AddFriend'

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
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolbar: {
        display: 'flex',
        width: '100vw',
        justifyContent: 'space-between',
    },
    backButton: {
        marginRight: '2rem',
    },
    settingsButton: {},
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
    dropDownHome: {
        width: '100vw',
        // height: '92vh',
    },
}))

export default function TopNav({ chattingWith, history }) {
    const classes = useStyles()

    const view = window.location.pathname

    const [drawer, toggleDrawer] = useState(false)

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
                                toggleDrawer(true)
                                console.log('DRAWER IS: ', drawer)
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                        <Drawer
                            anchor={'bottom'}
                            open={drawer}
                            onClose={() => toggleDrawer(false)}
                        >
                            {/* <DropDownHome /> */}
                            {DropDownHome()}
                        </Drawer>
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
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            className={classes.backButton}
                            color="inherit"
                            aria-label="Go Back"
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
                        <IconButton
                            edge="end"
                            className={classes.settingsButton}
                            color="inherit"
                            aria-label="Open Settings"
                            onClick={e => {
                                e.preventDefault()
                                history.push('/')
                            }}
                        >
                            <SettingsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    function DropDownHome() {
        return (
            <div
                className={classes.dropDownHome}
                role="presentation"
                onClick={e => {
                    e.preventDefault()
                    console.log('clickingggg')
                    toggleDrawer(false)
                }}
            >
                <AddFriend />
            </div>
        )
    }
    function AddFriend() {
        const [contactID, setContactID] = useState('')
        const [nickname, setNickname] = useState('')

        async function addContact(event) {
            event.preventDefault()
            console.log(db.contacts)
            // need some error handling for users that already exist
            await db.contacts.add({
                nickname,
                contactID,
                myID: localStorage.getItem('userID'),
            })
        }
        return (
            <form>
                <h2>Enter contact ID</h2>
                <input
                    type="text"
                    value={contactID}
                    onChange={e => setContactID(e.target.value)}
                />
                <h2>Enter a nickname for this contact</h2>
                <input
                    type="text"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                />
                <button onClick={addContact}>Add to Contacts</button>
            </form>
        )
    }
}
