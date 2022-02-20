import React, { useState } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import InfoSection from "../components/InfoSection";
import {
  home0bj0ne,
  home0bjThree,
  home0bjTwo,
} from "../components/InfoSection/Data";
import Services from "../components/Services";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Team from "../components/Team";
import Electionstats from "../components/Electionstats";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeroSection />
      <Electionstats />
      <InfoSection {...home0bj0ne} />
      <InfoSection {...home0bjTwo} />
      <Services />
      <InfoSection {...home0bjThree} />
      <Team />
      <Footer />
    </>
  );
};

export default Home;
