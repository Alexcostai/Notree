import {createContext} from 'react'

const UserSessionContext = createContext({
    isLogged: false,
    handleIsLogged: () => {}
})

export {UserSessionContext}