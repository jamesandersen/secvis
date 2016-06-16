import { Filing } from './filing';

export class SetTickersAction {
    constructor(public ticker1: string, public ticker2: string) {}
}

export class SetFilingAction {
    constructor(public ticker: string, public filing : Filing) {}
}

export class ClearTickersAction { constructor() {} }

export type Action = SetTickersAction | SetFilingAction | ClearTickersAction;
