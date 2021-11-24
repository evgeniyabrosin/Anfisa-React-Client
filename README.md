# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).

## Available Scripts
`yarn start`, `yarn test`, `yarn build`, `yarn eject`

### Environment configuration
- `REACT_APP_PROXY_AUTH` - at local development we use `src/setupProxy.js` with `http-proxy-middleware` and `auth` setting (basic auth). For fast automatic authorization you can create `.env.development.local` at root folder with following strings:
- REACT_APP_PROXY_AUTH=login:password

