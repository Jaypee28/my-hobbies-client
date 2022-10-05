import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import setAuthToken from './utils/setAuthToken';

const initialState = {};

const middleware = [thunk];

export const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState();

store.subscribe(()=> {
    // keep track of the previous and current state to compare changes
    let previousState = currentState
    currentState = store.getState();
    // if the token changes set the value in localStorage and axios headers
    if(previousState.auth.token !== currentState.auth.token){
        const token = currentState.auth.token
        setAuthToken(token);
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store