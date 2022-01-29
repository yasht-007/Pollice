import React from "react";
import Icon1 from '../../images/tamper.svg';
import Icon2 from '../../images/svg-5.svg';
import Icon3 from '../../images/svg-6.svg';

import {
  ServicesContainer,
  ServicesH1,
  ServicesH2,
  ServicesWrapper,
  ServicesIcon,
  ServicesCard,
  ServicesP,
} from "./ServicesElement";

const Services = () => {
  return (
    <ServicesContainer id="aboutus">
      <ServicesH1>About Pollice</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Tamper less</ServicesH2>
          <ServicesP>
            As your votes are stored in blockchain no one can tamper it.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Transparency</ServicesH2>
          <ServicesP>
            You can publically see recent votes on blockchains.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>On Time</ServicesH2>
          <ServicesP>
            It guarantees that your votes are casted on time safely.
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
