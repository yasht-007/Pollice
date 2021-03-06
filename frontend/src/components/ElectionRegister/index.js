import React, { useState } from "react";
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
  Item,
  RadioButton,
  RadioButtonLabel,
} from "./RegisterElements";

import { ElectionState } from "../../ElectionContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [resultdate, setResultDate] = useState("");
  const [address, setAddress] = useState("");
  const [purpose, setPurpose] = useState("");
  const { setAlert } = ElectionState();
  const [select, setSelect] = useState("");

  const goHome = useNavigate();

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelect(value);
  };

  function validatePhone() {
    if (phoneNo.length !== 10) {
      return false;
    }
    return true;
  }

  function validateDetails(event) {
    event.preventDefault();
    if (
      email === "" ||
      name === "" ||
      phoneNo === "" ||
      startdate === "" ||
      enddate === "" ||
      resultdate === "" ||
      address === ""
    ) {
      setAlert({
        open: true,
        type: "error",
        message: "Please fill all the details",
        time: 2000,
      }); // eslint-disable-next-line
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setAlert({
        open: true,
        type: "error",
        message: "Email is invalid",
        time: 2000,
      });
    } else if (validatePhone() === false) {
      setAlert({
        open: true,
        type: "error",
        message: "Contact number is invalid",
        time: 2000,
      });
    } else {
      axios
        .post("https://pollice-elections.herokuapp.com/api/election/host", {
          name: name,
          email: email,
          regNo: regNo === "" ? "NA" : regNo,
          phoneNo: phoneNo,
          startdate: startdate,
          enddate: enddate,
          resultdate: resultdate,
          address: address,
          typeoforg: select,
          purpose: purpose,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            setAlert({
              open: true,
              type: "success",
              message:
                "Your Request is sent successfully to admin. Once you get approved you will get an email",
              time: 8000,
            });

            goHome("/");
          } else {
            setAlert({
              open: true,
              type: "error",
              message: res.data.error,
              time: 8000,
            });
          }
        })
        .catch((err) => {
          setAlert({
            open: true,
            type: "error",
            message: err.message,
            time: 8000,
          });
        });
    }
  }

  return (
    <>
      <Container>
        <FormWrap>
          <br />
          <Icon to="/">pollice.</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Want to Host a Election?</FormH1>
              <FormLabel htmlFor="for">Name of Organization:</FormLabel>
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
              <FormLabel htmlFor="for">Contact number: </FormLabel>
              <FormInput
                type="text"
                maxLength="10"
                required
                onWheel={(e) => e.target.blur()}
                onChange={(e) => setPhoneNo(e.target.value)}
              />

              <FormLabel htmlFor="for">Registration number: </FormLabel>
              <FormInput
                type="text"
                required
                onWheel={(e) => e.target.blur()}
                onChange={(e) => setRegNo(e.target.value)}
              />

              <FormLabel htmlFor="for">Type of Organization: </FormLabel>
              <Item>
                <RadioButton
                  type="radio"
                  name="radio"
                  value="school/college"
                  checked={select === "school/college"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <div>School/College</div>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="radio"
                  value="company/business"
                  checked={select === "company/business"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <div>Company/Business</div>
              </Item>

              <Item>
                <RadioButton
                  type="radio"
                  name="radio"
                  value="personal"
                  checked={select === "personal"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <div>Personal</div>
              </Item>
              <br />
              <FormLabel htmlFor="for">Election Start Date : </FormLabel>
              <FormInput
                type="date"
                required
                onChange={(e) => setStartDate(e.target.value)}
              />
              <FormLabel htmlFor="for">Election End Date : </FormLabel>
              <FormInput
                type="date"
                required
                onChange={(e) => setEndDate(e.target.value)}
              />

              <FormLabel htmlFor="for">Election Result Date : </FormLabel>
              <FormInput
                type="date"
                required
                onChange={(e) => setResultDate(e.target.value)}
              />

              <FormLabel htmlFor="for">Purpose of Election : </FormLabel>
              <FormInput
                type="text"
                required
                onChange={(e) => setPurpose(e.target.value)}
              />
              <br />
              <FormLabel htmlFor="for">Address of Organization:</FormLabel>
              <FormInput
                type="address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />
              <FormButton type="submit" onClick={validateDetails}>
                Submit
              </FormButton>
              <br />
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default Register;
