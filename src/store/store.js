import { legacy_createStore as createStore, combineReducers } from 'redux'

import { boardReducer } from './reducers/board.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { systemReducer } from './reducers/system.reducer.js'
import { appReducer } from './reducers/app.reducer.js'

const rootReducer = combineReducers({
    boardModule: boardReducer,
    userModule: userReducer,
    appModule: appReducer,
    systemModule: systemReducer
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



