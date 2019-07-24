import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext()
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)
export const useStateValue = () => useContext(StateContext)

export const initialState = {
    inviteCode: null,
    messages: [],
    chattingWith: null,
    user: null,
    view: 'Login',
    addingContact: false,
    ws: null,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'setInviteCode':
            return {
                ...state,
                inviteCode: action.payload,
            }
        case 'setUser':
            return {
                ...state,
                user: action.payload,
            }
        case 'addMessage':
            console.log('addding a message from the states place!!!')
            return {
                ...state,
                messages: [...state.messages, action.payload],
            }
        case 'setChattingWith':
            return {
                ...state,
                chattingWith: action.payload,
            }
        case 'setView':
            return {
                ...state,
                view: action.payload,
            }
        case 'toggleAddingContact':
            return {
                ...state,
                addingContact: !state.addingContact,
            }
        case 'setWebSocket':
            return {
                ...state,
                ws: action.payload,
            }
        case 'getMessages':
            return {
                ...state,
                messages: action.payload,
            }

        default:
            return state
    }
}
