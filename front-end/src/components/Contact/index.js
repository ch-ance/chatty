import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
}))

const Contact = ({ contact, history, setFriendID }) => {
    const classes = useStyles()

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={contact.name} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={contact.nickname}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}

export default Contact
