import { OpaqueToken, provide, Inject } from '@angular/core';
import { SECCompare, AppState} from './model/AppState';
import { Action, SetSymbolAction, ClearTickersAction, SetFilingAction } from './model/Actions';

import { BehaviorSubject, Subject, Observable, Observer } from 'rxjs';

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
        symbol2: null,
        filing1: null,
        filing2: null
      }
    }
  }),
  provide(dispatcher, { useValue: new Subject<Action>(null) }),
  provide(state, { useFactory: stateFn, deps: [initState, dispatcher] })
];

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> {

  const compareToState = compare => (<AppState>{ compare: compare });

  const appStateObs: Observable<AppState> = generateState(initState.compare, actions).map(compareToState);

  return wrapIntoBehavior(initState, appStateObs);
}

// TODO: Not really doing anything here to enforce immutability
function generateState(initialState: SECCompare, actions: Observable<Action>): Observable<SECCompare> {
  return actions.scan((state, action) => {
    if (action instanceof SetSymbolAction) {
      const newCompare = {
        symbol1: action.symbolIndex === 1 ? action.symbol : state.symbol1,
        symbol2: action.symbolIndex === 2 ? action.symbol : state.symbol2,
        filing1: null,
        filing2: null
      };
      return newCompare;
    } else if (action instanceof ClearTickersAction) {
      const newCompare = {
        symbol1: null,
        symbol2: null,
        filing1: null,
        filing2: null
      };
      return newCompare;
    } else if (action instanceof SetFilingAction) {
      const newCompare = {
        symbol1: state.symbol1,
        symbol2: state.symbol2,
        filing1: state.symbol1 !== null && state.symbol1.Symbol === action.filing.TradingSymbol ? action.filing : state.filing1,
        filing2: state.symbol2 !== null && state.symbol2.Symbol === action.filing.TradingSymbol ? action.filing : state.filing2
      };
      return newCompare;
    } else {
      return state;
    }
  }, initialState).share();
}


function wrapIntoBehavior(init, obs) {
  const res = new BehaviorSubject(init);
  obs.subscribe(s => {
    res.next(s);
  });
  return res;
}