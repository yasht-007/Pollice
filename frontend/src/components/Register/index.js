import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  FormContent,
  FormH1,
  FormLabel,
  FormWrap,
  Icon,
  FormInput,
  FormButton,
  Text,
} from "./RegisterElements";

import { ElectionState } from "../../ElectionContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const { account, setAlert } = ElectionState();
  const goHome = useNavigate();

  const registerVoter = async (e) => {
    e.preventDefault();
    if (account.wallet === false) {
      setAlert({
        open: true,
        type: "error",
        message: "Wallet not connected! Please connect your wallet",
        time: 4000,
      });

      goHome("/");
    } else {
      const walletAddress = account.address;

      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          aadharNumber,
          walletAddress,
        }),
      });
      const data = await response.json();
      if (data.status === "ok") {
        setAlert({
          open: true,
          type: "success",
          message:
            "Registeration succesfully done & wallet linked successfully",
          time: 4000,
        });

        goHome("/");
      } else {
        setAlert({
          open: true,
          type: "error",
          message: "You are already registered! Please connect your wallet.",
          time: 4000,
        });
        goHome("/");
      }
    }
  };

  return (
    <>
      <Container>
        <FormWrap>
          <br />
          <Icon to="/">pollice.</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Register to Vote</FormH1>
              <FormLabel htmlFor="for">Full Name: </FormLabel>
              <FormInput
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <FormLabel htmlFor="for">Email: </FormLabel>
              <FormInput
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel htmlFor="for">Aadhaar number: </FormLabel>
              <FormInput
                type="number"
                required
                onWheel={(e) => e.target.blur()}
                onChange={(e) => setAadharNumber(e.target.value)}
              />
              <FormLabel htmlFor="for">Wallet Address: </FormLabel>
              <Text>{account.address}</Text>
              <br />
              <FormButton type="submit" onClick={registerVoter}>
                Register
              </FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default Register;
