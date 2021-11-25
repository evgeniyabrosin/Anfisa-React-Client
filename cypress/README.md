#install Cypress
`yarn add cypress --dev`

#All test files are located in cypress/integration
#Env variables are: 
`baseUrl`
`BASIC_AUTH_USERNAME`
`BASIC_AUTH_PASSWORD`

#to run Cypress tests headless
`npm cy:run`
#to run one specific test file
`npm cy:run --spec "path-to-spec-file"`