
import Footer from '../commonSeeker/Footer'
import Header from '../commonSeeker/Header'
import About from '../landingPage/About'
import Categories from '../landingPage/Categories'
import CompanyLogos from '../landingPage/CompanyLogos'
import FeaturesSection from '../landingPage/FeaturesSection'
import Hero from '../landingPage/Hero'
import NewsBlog from '../landingPage/NewsBlog'
import RecentJobs from '../landingPage/RecentJobs'
import Testimonials from '../landingPage/Testimonials'
import TopCompany from '../landingPage/TopCompany'

function Home() {
  return (
    <>
     <Hero/>
     <CompanyLogos/>
     <RecentJobs/>
     <Categories/>
     <TopCompany/>
     <About/>
     <FeaturesSection/>
     <Testimonials/>
     <NewsBlog/>

    </>
  )
}

export default Home;