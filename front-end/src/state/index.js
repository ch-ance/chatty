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

        default:
            return state
    }
}
