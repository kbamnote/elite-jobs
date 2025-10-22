
import Footer from '../commonSeeker/Footer'
import Header from '../commonSeeker/Header'
import About from '../landingPage/About'
import Categories from '../landingPage/Categories'
import CompanyLogos from '../landingPage/CompanyLogos'
import Hero from '../landingPage/Hero'
import NewsBlog from '../landingPage/NewsBlog'
import RecentJobs from '../landingPage/RecentJobs'
import Testimonials from '../landingPage/Testimonials'
import TopCompany from '../landingPage/TopCompany'

function Home() {
  

  return (
    <>
     <Header/>
     <Hero/>
     <CompanyLogos/>
     <RecentJobs/>
     <Categories/>
     <TopCompany/>
     <About/>
     <Testimonials/>
     <NewsBlog/>
     <Footer/>



    </>
  )
}

export default Home;