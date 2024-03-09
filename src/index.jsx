import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { store } from './store/store'
import { Routes, Route } from 'react-router'
import { BoardIndex } from "./pages/BoardIndex";
import { HomePage } from "./pages/HomePage";
import { BoardDetails } from './pages/BoardDetails';
import './assets/styles/main.scss'
import { SidePanelSlide } from './cmps/SidePanelSlide'
import { Login } from './cmps/Login'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      {/* <RootCmp /> */}
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/boards" element={<BoardIndex />}>
              <Route path="/boards/:id" element={<BoardDetails />}/>
          </Route>
      </Routes>
      <SidePanelSlide />
      {/* <UserMsg /> */}
    </Router>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
