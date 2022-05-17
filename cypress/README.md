### Setup for Cypress tests

1. Please install dependencies with \
   `yarn` or `yarn install`
2. Create file with environment variables \
   `BASIC_URL` \
   `BASIC_AUTH_USERNAME` \
   `BASIC_AUTH_PASSWORD`

All test files are located in cypress/integration

### How to run Cypress tests headless

If you've created `.env.development.local` file with environment variables then run as following: \
`NODE_ENV=development.local yarn cy:run`

### How to run one specific test file

`NODE_ENV=development.local yarn cy:run --spec "path-to-spec-file"`

### How to run one specific browser

`NODE_ENV=development.local yarn cy:run --browser chrome`
