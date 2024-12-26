import { DataSourceOptions } from 'typeorm';

export const commonOptionsGenerate = (database: string): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: database,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../migrations/*.{js,ts}`],
  synchronize: false,
  logging: ['error'],
  extra: {
    trustServerCertificate: true,
  },
});
