### install all dependencies of a project, e.g. Cypress
`yarn` or `yarn install`

### All test files are located in cypress/integration
### Env variables are: 
`BASIC_URL`
`BASIC_AUTH_USERNAME`
`BASIC_AUTH_PASSWORD`

### to run Cypress tests headless
`yarn cy:run`
### to run one specific test file
`yarn cy:run --spec "path-to-spec-file"`

### to run one specific browser
`yarn cy:run --browser chrome`
