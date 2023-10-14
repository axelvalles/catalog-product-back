import * as Joi from 'joi';

export const enviromentConfig = () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  MONGO_DB_CONNECTION: process.env.MONGO_DB_CONNECTION,
});

export interface EnvironmentVariables {
  PORT: number;
  MONGO_DB_CONNECTION: string;
}

export const enviromentSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGO_DB_CONNECTION: Joi.string().required(),
});
