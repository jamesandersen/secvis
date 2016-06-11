export interface Filing {
    EntityRegistrantName : string; // 3D SYSTEMS CORP
    CurrentFiscalYearEndDate : string; // --12-31
    EntityCentralIndexKey : string; // 0000910638
    EntityFilerCategory : string; // Large Accelerated Filer
    TradingSymbol : string; // DDD
    DocumentPeriodEndDate : string; // 2016-03-31,
    DocumentFiscalYearFocus : string; // 2016,
    DocumentFiscalPeriodFocus : string; // Q1,
    DocumentFiscalYearFocusContext : string; // Duration_1_1_2016_To_3_31_2016,
    DocumentFiscalPeriodFocusContext : string; //Duration_1_1_2016_To_3_31_2016,
    DocumentType : string; // 10-Q,
    BalanceSheetDate : string; // 2016-03-31,
    IncomeStatementPeriodYTD : string; //2016-01-01,
    ContextForInstants : string; //As_Of_3_31_2016,
    ContextForDurations : string; //Duration_1_1_2016_To_3_31_2016,
    Assets : number; // 896714000,
    CurrentAssets : number; // 432515000,
    NoncurrentAssets : number; // 464199000,
    LiabilitiesAndEquity : number; // 896714000,
    Liabilities : number; // 232243000,
    CurrentLiabilities : number; // 147985000,
    NoncurrentLiabilities : number; // 84258000,
    CommitmentsAndContingencies : number; // 0,
    TemporaryEquity : number; // 0,
    Equity : number; // 655599000,
    EquityAttributableToNoncontrollingInterest : number; // -1198000,
    EquityAttributableToParent : number; // 656797000,
    Revenues : number; // 152555000,
    CostOfRevenue : number; // 30881000,
    GrossProfit : number; // 77513000,
    OperatingExpenses : number; // 94272000,
    CostsAndExpenses : number; // 125153000,
    OtherOperatingIncome : number; // 0,
    OperatingIncomeLoss : number; // -16759000,
    NonoperatingIncomeLoss : number; // 0,
    InterestAndDebtExpense : number; // 0,
    IncomeBeforeEquityMethodInvestments : number; // -16633000,
    IncomeFromEquityMethodInvestments : number; // 0,
    IncomeFromContinuingOperationsBeforeTax : number; // -16633000,
    IncomeTaxExpenseBenefit : number; // 1179000,
    IncomeFromContinuingOperationsAfterTax : number; // -17812000,
    IncomeFromDiscontinuedOperations : number; // 0,
    ExtraordaryItemsGainLoss : number; // 0,
    NetIncomeLoss : number; // -17812000,
    NetIncomeAvailableToCommonStockholdersBasic : number; // -17788000,
    PreferredStockDividendsAndOtherAdjustments : number; // 0,
    NetIncomeAttributableToNoncontrollingInterest : number; // -24000,
    NetIncomeAttributableToParent : number; // -17788000,
    OtherComprehensiveIncome : number; // 7908000,
    ComprehensiveIncome : number; // -9904000,
    ComprehensiveIncomeAttributableToParent : number; // -9969000,
    ComprehensiveIncomeAttributableToNoncontrollingInterest : number; // 65000,
    NonoperatingIncomeLossPlusInterestAndDebtExpense : number; // 126000,
    NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments : number; // 126000,
    NetCashFlow : number; // 14131000,
    NetCashFlowsOperating : number; // 18118000,
    NetCashFlowsInvesting : number; // -4477000,
    NetCashFlowsFinancing : number; // -1072000,
    NetCashFlowsOperatingContinuing : number; // 18118000,
    NetCashFlowsInvestingContinuing : number; // -4477000,
    NetCashFlowsFinancingContinuing : number; // -1072000,
    NetCashFlowsOperatingDiscontinued : number; // 0,
    NetCashFlowsInvestingDiscontinued : number; // 0,
    NetCashFlowsFinancingDiscontinued : number; // 0,
    NetCashFlowsDiscontinued : number; // 0,
    ExchangeGainsLosses : number; // 1562000,
    NetCashFlowsContinuing : number; // 12569000,
    SGR : number; // -0.026450414382895436,
    ROA : number; // -0.0198636354512141,
    ROE : number; // -0.02716904693265243,
    ROS : number; // -0.11675789059683393,
    htmlURL : string; // http://www.sec.gov/Archives/edgar/data/910638/000091063816000020/0000910638-16-000020-index.htm,
    zipURL : string; // http://www.sec.gov/Archives/edgar/data/910638/000091063816000020/0000910638-16-000020-xbrl.zip,
    dateFiled : string; //ISODate(2016-05-05T00:00:00Z)
}

export interface Symbol {
    Symbol: string;
    Name: string;
    Sector: string;
    Industry: string;
    exchange: string;
    SymbolHREF: string;
}

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