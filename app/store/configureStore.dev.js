import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { useRouterHistory } from 'react-router';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export const browserHistory =  useRouterHistory(createBrowserHistory)({})

export default function configureStore(initialState = {}) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            DevTools.instrument(),
            routerMiddleware(browserHistory),
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
