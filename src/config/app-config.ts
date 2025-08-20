export default (): Record<string, any> => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
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
  },
});
