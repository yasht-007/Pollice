import React from "react";
import {
  ServicesContainer,
  ServicesH1,
  ServicesH2,
  ServicesWrapper,
  ServicesIcon,
  ServicesCard,
  ServicesP,
} from "./TeamElements";

import Icon1 from "../../images/team1.svg";
import Icon3 from "../../images/rishi.svg";

const Team = () => {
  return (
    <ServicesContainer id="team">
      <ServicesH1>Our Perfect Team</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Yash Tiwari</ServicesH2>
          <ServicesP>Developer + Designer.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Preet Mungra</ServicesH2>
          <ServicesP>Developer.</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Team;
