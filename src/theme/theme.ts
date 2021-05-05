import get from 'lodash/get'
import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'

import { colors } from './colors'

export const GlobalStyle = createGlobalStyle`
	${normalize}

	.ReactModal__Body--open {
        overflow: hidden;
        position: fixed;
        width: 100%;
        height: 100%;
    }
`


export const AppTheme = {
	fontSizes: [10, 12, 14, 16, 18, 20, 24, 32],
	lineHeights: [16,17,20, 21, 22, 23,24, 28, 30],

	colors,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const theme = (path: string): any => get(AppTheme, path, null)
