import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { SideNav } from './cmps/SideNav'


export function RootCmp() {

    return (
        <section className='root-cmp'>
            <AppHeader />
            <main>
                <SideNav />
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                </Routes>
            </main>
            <AppFooter />
        </section>
    )
}


