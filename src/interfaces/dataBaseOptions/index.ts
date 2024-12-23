import { DataSource, DataSourceOptions, EntitySchema } from 'typeorm';

export type Constructor<T = any> = new (...args: any[]) => T;

export type EntitiesArray = (Constructor | EntitySchema<any>)[];

export type DataSourceGetter = () => Promise<DataSource>;

export type PostgresDataSourceOptions = DataSourceOptions & {
  type: 'postgres';
  database: string;
};
