import React from 'react'
import Nav from './Nav/Nav'
import Banner from './Banner/Banner'
import SmartBasket from './SmartBasket/SmartBasket'
import Menu from './Menu/Menu'
import Footer from './Footer/Footer'

const Main = () => {
  return (
    <div>
        <Nav/>
        <Banner/>
        <SmartBasket/>
        <Menu/>
        <Footer/>
    </div>
  )
}

export default Main