import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import TopNav from '../TopNav/'

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.primary.main,
        height: '100vh',
    },
    signInText: {
        fontSize: '3rem',
    },
}))

const InvitePage = () => {
    const classes = useStyles()

    return (
        <>
            <TopNav />
            <div className={classes.container}>
                <Typography variant="h2" className={classes.signInText}>
                    Sign In
                </Typography>
            </div>
        </>
    )
}

export default InvitePage
