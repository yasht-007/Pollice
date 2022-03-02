import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { ElectionState } from "../../ElectionContext";

const ResultBack = () => {
  const { winnerAddress, winnerVotes, totalvotes } = ElectionState();

  return (
    <Back>
      <Debit>Pollice Election</Debit>
      <Bank>#result</Bank>
      <Number>{"Winner Address:- " + winnerAddress}</Number>

      <Valid>
        <Typography
          variant="h6"
          style={{
            letterSpacing: "2px",
            fontFamily: `Orbitron, sans-serif`,
          }}
        >
          Winner Votes:-
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontFamily: `Orbitron, sans-serif`,
            letterSpacing: "2px",
          }}
        >
          &nbsp;&nbsp;{winnerVotes}
        </Typography>
      </Valid>

      <CardHold>
        {"Winner Voting Percentage:- " +
          Math.round((winnerVotes / totalvotes) * 100) +
          "%"}
      </CardHold>
    </Back>
  );
};

const Back = styled.div`
  /* ::before {
    content: "";
    position: absolute;
    bottom: 40px;
    right: 40px;
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    opacity: 0.5;
  }
  ::after {
    content: "";
    position: absolute;
    bottom: 40px;
    right: 80px;
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    opacity: 0.7;
  } */
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

const Number = styled.h3`
  position: absolute;
  bottom: 130px;
  left: 40px;
  letter-spacing: 6px;
  color: #fff;
  font-size: 18px;
  text-shadow: 0 2px 1px #0005;
  font-family: "Orbitron", sans-serif;
  width: auto;
  max-width: 45ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Valid = styled.h5`
  position: absolute;
  bottom: 80px;
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

export default ResultBack;
