import { OpaqueToken, provide, Inject } from '@angular/core';
import { SECCompare, AppState} from './model/AppState';
import { Action, SetTickersAction, ClearTickersAction } from './model/Actions';

import { BehaviorSubject, Subject } from 'rxjs';

export const initState = new OpaqueToken('initState');
export const dispatcher = new OpaqueToken('dispatcher');
export const state = new OpaqueToken('state');

export const stateAndDispatcher = [
    provide(initState, {
        useValue: {
            compare: {
                ticker1: null,
                ticker2: null,
                symbol1: null,
                symbol2 : null,
                filing1: null,
                filing2: null
            }
        }
    }),
    provide(dispatcher, { useValue: new Subject<Action>(null) } ),
    provide(state, { useFactory: stateFn, deps: [ initState, dispatcher]})
];

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> {
  const compareToState = compare => ({ compare: compare } );

  const appStateObs: Observable<AppState> = generateState(initState.compare, actions).map(compareToState);

  return wrapIntoBehavior(initState, appStateObs);
}

function generateState(initialState: SECCompare, actions: Observable<Action>): Observable<SECCompare> {
  return actions.scan((state, action) => {
    if (action instanceof SetTickersAction) {
        console.log('Got SetTickersAction');
      const newCompare = {
                ticker1: action.ticker1,
                ticker2: action.ticker2,
                symbol1: null,
                symbol2 : null,
                filing1: null,
                filing2: null
            };
      return newCompare;
    } else if (action instanceof ClearTickersAction) {
      const newCompare = {
                ticker1: null,
                ticker2: null,
                symbol1: null,
                symbol2 : null,
                filing1: null,
                filing2: null
            };
      return newCompare;
    }
  }, initialState);
}

function updateTodo(todo: Todo, action: Action): Todo {
  if (action instanceof ToggleTodoAction) {
    // merge creates a new object using the properties of the passed in objects
    return (action.id !== todo.id) ? todo : merge(todo, {completed: !state.completed});

  } else {
    return todo;
  }
}

function wrapIntoBehavior(init, obs) {
  const res = new BehaviorSubject(init);
  obs.subscribe(s => res.next(s));
  return res;
}