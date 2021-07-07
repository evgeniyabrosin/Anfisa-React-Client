import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { RouterBase } from '@router/router'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <RouterBase />
  </React.StrictMode>,
  document.querySelector('#root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
