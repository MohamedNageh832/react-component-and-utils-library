import { Dispatch, Reducer, ReducerAction, useReducer } from "react";

type UseMiddleware = <IntialState>(
  reducer: Reducer<IntialState, any>,
  intialState: IntialState,
  middlewares?: Function[]
) => [state: IntialState, dispatch: Dispatch<any>];

export const useReducerWithMiddlewares: UseMiddleware = (
  reducer,
  intialState,
  middlewares
) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const dispatchWithMiddleware: Dispatch<any> = (
    action: ReducerAction<any>
  ) => {
    if (!middlewares || middlewares.length === 0) return dispatch(action);

    const boundMiddlewares = middlewares.map((middleware) => middleware(state));
    const resolvedMiddlewares = boundMiddlewares.reduce(
      (prevFn, currFn) => (next: Function) => prevFn(currFn(next))
    );

    resolvedMiddlewares(dispatch)(action);
  };

  return [state, dispatchWithMiddleware];
};
