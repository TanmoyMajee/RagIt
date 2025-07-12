import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './landigPage/Header'
import Footer from '../components/landigPage/Footer'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1"> 
        {/* flex 1 as it takes rest of the mid area */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
