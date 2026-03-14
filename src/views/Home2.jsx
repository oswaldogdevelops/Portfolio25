import React from 'react'

import HomePagept from '../components/HomeComponents/HomePagept'
import About from '../components/HomeComponents/about'
import  Contact  from '../components/HomeComponents/contact'
import Services from '../components/HomeComponents/services'
import FAQ from '../components/HomeComponents/faq'





const HomeTwo = () => {
  
  return (
    <>
    <HomePagept />
    <About />
     <Services />
      <FAQ />
 <Contact />
    {/* <HomeSectionOne />
    <HomeSectionTwo />
    <HomeSectionThree />
    <Footer /> */}
      </>
  )
}

export default HomeTwo
