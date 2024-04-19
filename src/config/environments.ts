export default () => ({
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  TYPE_ORM_SSL: process.env.TYPE_ORM_SSL,
  TYPE_ORM_SYNCHORONIZE: process.env.TYPE_ORM_SYNCHORONIZE,
  JWT_SECRECT_KEY: process.env.JWT_SECRECT_KEY,
  ENV: process.env.ENV,
});
