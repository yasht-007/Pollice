import styled from "styled-components";
import chipImg from "./chip.png";
import voteImg from "./vote.png";
import React from "react";

export default function FrontSide() {
  return (
    <Front>
      <Debit>Pollice Election Service</Debit>
      <Bank>#verified</Bank>
      <Chip src={voteImg}></Chip>
      <Number>621081b397bcb57b59d38407</Number>
      <Valid>
        <span>Reg No</span>
        <span>78955</span>
      </Valid>
      <CardHold>DDU Organization</CardHold>
    </Front>
  );
}

const Front = styled.div`
  ::after {
    content: "";
    position: absolute;
    bottom: 40px;
    right: 80px;
    width: 60px;
    height: 60px;
    background: #01bf71;
    border-radius: 50%;
    opacity: 0.7;
  }
`;

const Debit = styled.h3`
  position: absolute;
  left: 40px;
  top: 30px;
  color: #fff;
  font-weight: 500;
`;

const Bank = styled.h3`
  position: absolute;
  right: 40px;
  top: 25px;
  color: #fff;
  font-weight: 500;
  font-style: italic;
  font-size: 24px;
`;

const Chip = styled.img`
  position: absolute;
  top: 80px;
  left: 50px;
  max-width: 64px;
`;

const Number = styled.h3`
  position: absolute;
  bottom: 130px;
  left: 40px;
  letter-spacing: 6px;
  color: #fff;
  font-size: 18px;
  text-shadow: 0 2px 1px #0005;
  font-family: "Orbitron", sans-serif;
`;

const Valid = styled.h5`
  position: absolute;
  bottom: 90px;
  left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 300;
  line-height: 1em;
  text-align: right;

  span:last-child {
    margin-left: 20px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 2px;
  }
`;

const CardHold = styled.h5`
  position: absolute;
  bottom: 40px;
  left: 40px;
  color: #fff;
  font-weight: 300;
  font-size: 16px;
  letter-spacing: 2px;
`;
