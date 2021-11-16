/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const dotenv = require('dotenv')

export default (on, config) => {
  dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

  config.env.basic_username = process.env.BASIC_AUTH_USERNAME
  config.env.basic_password = process.env.BASIC_AUTH_PASSWORD

  return config
}
