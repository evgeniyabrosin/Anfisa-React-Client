import { ReactElement } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { QueryParamProvider } from 'use-query-params'

import { GlobalStyle } from '@theme'
import { Routes } from '@router/routes.enum'
import { DtreePage } from '@pages/filter/dtree'
import { RefinerPage } from '@pages/filter/refiner'
import { IgvPage } from '@pages/igv'
import { MainPage } from '@pages/main'
import { NotFoundPage } from '@pages/not-found'
import { WSPage } from '@pages/ws'
import { wrapWithErrorBoundary } from './router.utils'

const pages = wrapWithErrorBoundary({
  [Routes.Root]: MainPage,
  [Routes.WS]: WSPage,
  [Routes.Dtree]: DtreePage,
  [Routes.Refiner]: RefinerPage,
  [Routes.IGV]: IgvPage,
})

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
          {Object.entries(pages).map(([path, component]) => (
            <Route key={path} path={path} exact component={component} />
          ))}
          <Route component={NotFoundPage} />
        </Switch>
      </QueryParamProvider>
    </Router>
  )
}
