import { ReactElement } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { GlobalStyle } from '@theme'
import { Routes } from '@router/routes.enum'
import { FilterPage } from '@pages/filter/page'
import { MainPage } from '@pages/main/page'
import { WSPage } from '@pages/ws/page'

export const RouterBase = (): ReactElement => (
  <Router>
    <GlobalStyle />
    <ToastContainer />

    <Switch>
      <Route path={Routes.Root} exact component={MainPage} />
      <Route path={Routes.WS} exact component={WSPage} />
      <Route path={Routes.Filter} exact component={FilterPage} />
    </Switch>
  </Router>
)
