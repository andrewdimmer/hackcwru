export interface UserData {
  userId: string;
  ducks: string[];
  concentration: ConcentrationSettings;
  finance: FinanceSettings;
  amountSpent: number;
  weekNumber: number;
}

export interface FinanceSettings {
  total: number;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
  weekly: number;
}

export interface ConcentrationSettings {
  work: number;
  break: number;
}
