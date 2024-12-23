/* eslint-disable no-undef */
import { dataBaseList } from '@enums/dataBase';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: dataBaseList.sevenloc,
  entities: [`${__dirname}/../**/*sevenloc.entity.{js,ts}`],
  migrations: [`${__dirname}/../migrations/sevenloc/*.{js,ts}`],
  synchronize: false,
  logging: ['error'],
  extra: {
    trustServerCertificate: true,
  },
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
