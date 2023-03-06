interface ICommonData<T> {
  loading: boolean;
  loaded: boolean;
  data: T[];
}

export interface ITransaction {
  id: number;
  name: string;
  transactionType: "incoming" | "outgoing";
  transactionTitle: string;
  transactionMessage: string;
  amount: string;
  date: string;
}

export interface IUserState {
  loading?: boolean;
  loaded?: boolean;
  gender?: number;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  accountNumber: string;
  accountBalance: string;
  email: string;
  transactionHistory: ICommonData<ITransaction>;
}
