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

export const defaultUser = (userId: string): UserData => {
  return {
    userId,
    ducks: [],
    concentration: { work: 25, break: 5 },
    finance: {
      total: 0,
      week1: 0,
      week2: 0,
      week3: 0,
      week4: 0,
      weekly: 0
    },
    amountSpent: 0,
    weekNumber: 1
  };
};
