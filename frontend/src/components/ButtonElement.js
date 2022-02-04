import styled from "styled-components";
import { Link } from "react-scroll";

export const Button = styled(Link)`
  border-radius: 50px;

  background: ${({ primary }) => (primary ? "#01BF71" : "#010606")};

  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};

  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#fff" : "#01BF71")};
  }
`;

export const Buttonsecond = styled(Link)`
  border-radius: 50px;

  background: #01bf71;

  white-space: nowrap;
  padding: 10px 18px;
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  width: 150px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    text-decoration: none;
    background: #fff;
    transition: all 0.2s ease-in-out;
    color: #000000;
  }
`;

export const Buttonthird = styled(Link)`
  border-radius: 10px;

  background: ${({ primary }) => (primary ? "#01BF71" : "#010606")};

  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#000" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};

  outline: none;
  border: none;
  width: 90px;
  height: 35px;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#fff" : "#01BF71")};
  }

  @media screen and (max-width: 768px) {
    text-decoration: none;
    display: none;
  }
`;

export const ButtonOutlined = styled(Link)`
  background: transparent;
  border: 1px solid #72f34b;
  color: #72f34b;
  padding: 2px 12px;
  margin-left: 12px;
  font-weight: 600;
  font-size: 12px;
  text-transform: none;
  cursor: pointer;
  outline: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: transparent;
  }

  @media screen and (max-width: 768px) {
    text-decoration: none;
    display: none;
  }
`;
