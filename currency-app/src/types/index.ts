export interface CurrenciesDataType {
  key: string;
  Cur_ID: string;
  Cur_Name: string;
  Cur_Scale: number;
  Cur_Abbreviation: string;
  Cur_OfficialRate: string;
}

export interface DynamicsDataType {
  key: string;
  Cur_Name: string;
  Cur_Scale: number;
  Cur_Abbreviation: string;
  Cur_Exchange: string;
  Cur_OfficialRate: number;
}
