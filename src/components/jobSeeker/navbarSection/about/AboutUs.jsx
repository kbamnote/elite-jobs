import React from "react";

import WorkingWithTheBest from "./WorkingWithTheBest";
import NewsBlogSection from "../../landingPage/NewsBlog";
import Header from "../../commonSeeker/Header";
import Footer from "../../commonSeeker/Footer";
import Work from "./Work";
import SectionAbout from "./SectionAbout";
import Question from "./Question";

const AboutUs = () => (
  <>
    <SectionAbout />
    <Work />
    <Question />
    <WorkingWithTheBest />
    <NewsBlogSection />
   
  </>
);

export default AboutUs;