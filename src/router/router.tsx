import 'react-toastify/dist/ReactToastify.css'

import { ReactElement } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { FilterPage } from '../filter/filter.page'
import { MainPage } from '../main/main.page'
import { GlobalStyle } from '../theme'
import { VariantPage } from '../variant/variant.page'
import { WSPage } from '../ws/ws.page'
import { Routes } from './routes.enum'

export const RouterBase = (): ReactElement => (
  <Router>
    <GlobalStyle />
    <ToastContainer />

    <Switch>
      <Route path={Routes.Root} exact component={MainPage} />
      <Route path={Routes.WS} exact component={WSPage} />
      <Route path={Routes.Variant} exact component={VariantPage} />
      <Route path={Routes.Filter} exact component={FilterPage} />
    </Switch>
  </Router>
)
