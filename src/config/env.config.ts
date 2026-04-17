export const EnvConfig = () => ({
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: Number(process.env.DB_PORT ?? '5432'),
  DB_USER: process.env.DB_USER ?? 'user',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'password',
  DB_NAME: process.env.DB_NAME ?? 'mydb',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_EXPIRED: Number(process.env.JWT_EXPIRED ?? '3600'),
  EMAIL_USER: process.env.EMAIL_USER ?? 'example@gmail.com',
  EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ?? '',
});
