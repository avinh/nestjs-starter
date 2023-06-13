
export default () => ({
    PORT: process.env.PORT,
    PSQL_HOST: process.env.PSQL_HOST,
    PSQL_PORT: process.env.PSQL_PORT,
    PSQL_DATABASE: process.env.PSQL_DATABASE,
    PSQL_USERNAME: process.env.PSQL_USERNAME,
    PSQL_PASSWORD: process.env.PSQL_PASSWORD,
    TYPE_ORM_SSL: process.env.TYPE_ORM_SSL,
    TYPE_ORM_SYNCHORONIZE: process.env.TYPE_ORM_SYNCHORONIZE,
    JWT_SECRECT_KEY: process.env.JWT_SECRECT_KEY,
    ENV: process.env.ENV,
});