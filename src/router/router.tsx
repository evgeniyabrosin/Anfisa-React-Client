import { ReactElement } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom'
import { MainPage } from '../main/main.page'
import { GlobalStyle } from '../theme/theme'
import { Routes } from './routes.enum'

export  const RouterBase = (): ReactElement => (
	<Router>
		<GlobalStyle />
		<Switch>
			<Route path={Routes.Root} component={MainPage} />
		</Switch>
	</Router>
)