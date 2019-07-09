import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import App from './App'
import { blue } from '@material-ui/core/colors'

import { StateProvider, initialState, reducer } from './state/'

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue,
    },
    status: {
        danger: 'orange',
    },
})

ReactDOM.render(
    <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
            <CssBaseline>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </CssBaseline>
        </StateProvider>
    </Router>,
    document.getElementById('root'),
)
