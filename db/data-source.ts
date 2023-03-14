
import environments from "src/core/config/environments";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: environments().PSQL_HOST,
    port: +environments().PSQL_PORT,
    database: environments().PSQL_DATABASE,
    username: environments().PSQL_USERNAME,
    password: environments().PSQL_PASSWORD,
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
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;