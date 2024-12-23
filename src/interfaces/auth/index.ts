import { listResponseDb } from '@interfaces/base';

export interface JwtPayloadI {
  email: string;
  grupo: string[];
  aplicacao: string;
}

export interface LoginI {
  email: string;
  password: string;
}

export interface TokensI {
  accessToken: string;
  refreshToken: string;
}

export interface userResponseSignin extends listResponseDb {
  document: Array<
    TokensI & { email: string; grupo: string[]; aplicacao: string }
  >;
}
