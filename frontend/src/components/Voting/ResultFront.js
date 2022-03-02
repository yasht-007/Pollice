import styled from "styled-components";
import voteImg from "./vote.png";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { ElectionState } from "../../ElectionContext";
import web3 from "../../config/web3";

const ResultFront = () => {
  const { _id } = useParams();
  const { winnerId,winnerName } = ElectionState();
  

  return (
    <Front>
      <Debit>Pollice Election</Debit>
      <Bank>#result</Bank>
      <Chip src={voteImg}></Chip>
      <Number>{_id}</Number>
      <Valid>
        <Typography
          variant="h6"
          style={{
            fontFamily: "Orbitron, sans-serif",
            letterSpacing: "2px",
          }}
        >
          Winner Id:-
        </Typography>
        <Typography variant="h6">&nbsp;&nbsp;{winnerId}</Typography>
      </Valid>
      <CardHold>{winnerName}</CardHold>
    </Front>
  );
};

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
  bottom: 120px;
  left: 40px;
  letter-spacing: 6px;
  color: #fff;
  font-size: 18px;
  font-family: "Orbitron", sans-serif;
  width: auto;
  font-weight: 100;
  max-width: 39ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Valid = styled.h5`
  position: absolute;
  bottom: 70px;
  left: 40px;
  display: flex;
  justify-content: baseline;
  align-items: center;
  color: #fff;
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
  bottom: 30px;
  left: 40px;
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  text-shadow: 0 2px 1px #0005;
  letter-spacing: 2px;
`;

export default ResultFront;
