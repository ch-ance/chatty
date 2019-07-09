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
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'setInviteCode':
            return {
                ...state,
                inviteCode: action.payload,
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

        default:
            return state
    }
}
