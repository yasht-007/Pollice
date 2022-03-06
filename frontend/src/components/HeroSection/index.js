import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroH1,
  HeroContent,
  HeroP,
  HeroBtnWrapper,
  // ArrowForward,
  ArrowRight,
} from "./HeroElements";
import Video from "../../videos/video.mp4";
import { Button } from "../ButtonElement";
import { ElectionState } from "../../ElectionContext";

const HeroSection = () => {
  const { account, setAlert } = ElectionState();
  const [voter, setVoter] = useState(false);
  const [name, setName] = useState("");
  const history = useNavigate();
  const walletAddress = account.address;

  useEffect(() => {
    window.WriteItJS.startAnimationOfNode("#first");
  }, []);

  useEffect(() => {
    if (account.wallet) {
      checkVoterStatus();
    } // eslint-disable-next-line
  }, [account]);

  const checkVoterStatus = async () => {
    const response = await fetch("https://pollice-elections.herokuapp.com/api/voterstatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        walletAddress,
      }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      setVoter(true);
      setName(data.voterName);
    } else {
      setVoter(false);
    }
  };

  function gotToRegister() {
    if (account.wallet) history("/register");
    else
      setAlert({
        open: true,
        message: "Please first connect wallet to continue",
        type: "error",
        time: 6000,
      });
  }

  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="/video/mp4" />
      </HeroBg>

      <HeroContent>
        <HeroH1>
          <p
            id="first"
            writeit-animate="1"
            writeit-replace-next="Blockchain based Election"
          >
            Pollice
          </p>
        </HeroH1>
        {voter && account.wallet ? (
          <HeroP>
            Welcome {name} you are in the world of Blockchain based voting.
            Hurrah! You are now eligible to vote.
          </HeroP>
        ) : (
          <HeroP>
            Let's connect your metamask wallet to enter the world of Blockchain
            based voting.
          </HeroP>
        )}

        <HeroBtnWrapper>
          {voter && account.wallet ? (
            <Button
              to="campaigns"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
              primary="true"
              dark="true"
            >
              Vote Now {<ArrowRight />}
            </Button>
          ) : (
            <Button
              to="crypto"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
              onClick={gotToRegister}
              primary="true"
              dark="true"
            >
              Register to Vote {<ArrowRight />}
            </Button>
          )}
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
