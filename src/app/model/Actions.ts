export class SetTickersAction {
    constructor(public ticker1: string, public ticker2: string) {}
}

export class ClearTickersAction { constructor() {} }

export type Action = SetTickersAction | ClearTickersAction;
