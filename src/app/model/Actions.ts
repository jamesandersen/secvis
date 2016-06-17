import { Filing } from './filing';
import { Symbol } from './symbol';

export class SetTickersAction {
    constructor(public ticker1: string, public ticker2: string) {}
}

export class SetSymbolAction {
    constructor(public ticker: string, public symbol : Symbol) {}
}

export class SetFilingAction {
    constructor(public ticker: string, public filing : Filing) {}
}

export class ClearTickersAction { constructor() {} }

export type Action = SetTickersAction | SetSymbolAction | SetFilingAction | ClearTickersAction;
