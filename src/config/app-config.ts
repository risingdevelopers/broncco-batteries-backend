export default (): Record<string, any> => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10) || 587,
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAIL_USER,
      // If using Gmail, you need to use an App Password
      pass: process.env.MAIL_PASSWORD,
    },
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
  },
});
