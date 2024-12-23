import { defaultTable } from '../base';

export interface UserI extends defaultTable {
  id: number;
  name: string;
  email: string;
  password: string;
  status: string;
}
