import environments from 'src/config/environments';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: environments().DB_HOST,
  port: +environments().DB_PORT,
  database: environments().DB_DATABASE,
  username: environments().DB_USERNAME,
  password: environments().DB_PASSWORD,
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/db/migrations/*js'],
  synchronize: +environments().TYPE_ORM_SYNCHORONIZE === 1,
  ...(+environments().TYPE_ORM_SSL
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
