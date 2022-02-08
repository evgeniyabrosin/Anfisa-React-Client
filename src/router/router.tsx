import { ReactElement } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { QueryParamProvider } from 'use-query-params'

import { GlobalStyle } from '@theme'
import { Routes } from '@router/routes.enum'
import FilterPage from '@pages/filter/page'
import IgvPage from '@pages/igv/igv.page'
import MainPage from '@pages/main/page'
import RefinerPage from '@pages/refiner/page'
import WSPage from '@pages/ws/page'

export const RouterBase = (): ReactElement => {
  let baseName = '/'
  const featureId = window.location.pathname.match(/FOROME-\d*/)

  if (featureId?.length) {
    baseName = `${baseName}${featureId[0]}`
  }

  return (
    <Router basename={baseName}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <GlobalStyle />
        <ToastContainer />

        <Switch>
          <Route path={Routes.Root} exact component={MainPage} />
          <Route path={Routes.WS} exact component={WSPage} />
          <Route path={Routes.Filter} exact component={FilterPage} />
          <Route path={Routes.Refiner} exact component={RefinerPage} />
          <Route path={Routes.IGV} exact component={IgvPage} />
        </Switch>
      </QueryParamProvider>
    </Router>
  )
}
