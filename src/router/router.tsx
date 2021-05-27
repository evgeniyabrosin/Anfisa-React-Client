import 'react-toastify/dist/ReactToastify.css'

import { ReactElement } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { FilterPage } from '../pages/filter/page'
import { MainPage } from '../pages/main/page'
import { GlobalStyle } from '@theme'
import { VariantPage } from '../pages/variant/page'
import { WSPage } from '../pages/ws/page'
import { Routes } from '@router/routes.enum'

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
