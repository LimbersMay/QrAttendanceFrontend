import { Middleware, Dispatch, AnyAction } from 'redux';

const socketMiddleware: Middleware = (store) => {

    return (next: Dispatch) => (action: AnyAction) => {
        next(action);
    }
}

export default socketMiddleware;

