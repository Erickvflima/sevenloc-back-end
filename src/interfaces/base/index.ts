export interface defaultTable {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
export interface defaultResponse {
  status: 'success' | 'error';
  message: string;
}

export interface listResponseDb<T = any, K = never> extends defaultResponse {
  document?: Array<T>;
  data?: K;
  rowsAffected?: number[];
}

export interface RequestEmail extends Request {
  email?: string;
  query?: string;
}
