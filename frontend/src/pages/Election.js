import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ElectionChrono from "../components/Voting/ElectionChrono";
import HostDetails from "../components/Voting/HostDetails";
import Navbar from "../components/Voting/Navbar";
import TopCards from "../components/Voting/TopCards";
import VotingCandidate from "../components/Voting/VotingCandidate";

const Election = () => {
  const { _id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  

  return (
    <>
      <div
        style={{
          backgroundColor: "#111927",
          backgroundImage: `radial-gradient(at 47% 33%, hsl(162.00, 77%, 40%) 0,
         radial-gradient(at 82% 65%, hsl(218.00, 39%, 11%) 0`,
        }}
      >
        <Navbar toggle={toggle} />
        <TopCards />
        <ElectionChrono />
        <HostDetails />
        <VotingCandidate />
        <Footer />
      </div>
    </>
  );
};

export default Election;
