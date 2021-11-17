/// <reference types="cypress" />

const dotenv = require('dotenv')

export default (on, config) => {
  dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

  config.env.basic_username = process.env.BASIC_AUTH_USERNAME
  config.env.basic_password = process.env.BASIC_AUTH_PASSWORD

  return config
}
