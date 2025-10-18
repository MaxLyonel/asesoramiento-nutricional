import 'dotenv/config'
import * as joi from 'joi'


interface EnvVars {
  PORT: number
  DB_NAME: string
  DB_HOST: string
  DB_PORT: number
  DB_USERNAME: string
  DB_PASSWORD: string
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_NAME: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
  })
  .unknown(true)

const { error, value } = envsSchema.validate({
  ...process.env,
})

if(error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const DbEnvs = {
  dbName: envVars.DB_NAME,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbUser: envVars.DB_USERNAME,
  dbPass: envVars.DB_PASSWORD
}


export const ownPort = {
  port: envVars.PORT
}
