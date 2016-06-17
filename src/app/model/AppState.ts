import { Symbol } from './symbol.ts';
import { Filing } from './filing.ts';

export interface SECCompare {
    ticker1: string;
    ticker2: string;

    filing1 : Filing;
    filing2 : Filing;

    symbol1 : Symbol;
    symbol2 : Symbol;
}

export interface AppState {
    compare: SECCompare;
    visibilityFilter: string;
}