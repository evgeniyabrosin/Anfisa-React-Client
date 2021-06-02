import get from 'lodash/get'
import { createGlobalStyle } from 'styled-components'

import colors from './colors'

export const GlobalStyle = createGlobalStyle`
	.ReactModal__Body--open {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .react-switch-handle {
    width: 12px;
    height: 12px;
  }

  .Toastify__toast--info {
    background-color: #0C65FD;
    border-radius: 8px;
    height: 52px;
  }

  .Toastify__toast {
    max-height: 52px;
    min-height: auto;
    width: 266px;
  }

  .Toastify__toast-body {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #FFFFFF;
  }

  .Toastify__close-button {
    margin-top: auto;
    margin-bottom: auto;
  }
`

export const AppTheme = {
  fontSizes: [10, 12, 14, 16, 18, 20, 24, 32],
  lineHeights: [16, 17, 20, 21, 22, 23, 24, 28, 30],
  colors,
}

export const theme = (path: string): any => get(AppTheme, path, null)
