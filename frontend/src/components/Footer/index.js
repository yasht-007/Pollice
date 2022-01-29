import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import {
  SocialMedia,
  SocialIconLink,
  SocialIcons,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
} from "./FooterElement";

const Footer = () => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;

    window.location.reload();
  };

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer id="footer">
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink
                to=""
                onClick={() => openInNewTab("https://bit.ly/3r8KHst")}
              >
                How it works
              </FooterLink>
              <FooterLink to=" ">Testimonials</FooterLink>
              <FooterLink to="">Careers</FooterLink>
              <FooterLink to="">Terms of Service</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>

          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>Videos</FooterLinkTitle>
              <FooterLink to="/">About Pollice</FooterLink>
              <FooterLink
                to="/"
                onClick={() => {
                  openInNewTab("https://metamask.io/");
                }}
              >
                About Metamask
              </FooterLink>
              <FooterLink
                to="/"
                onClick={() => openInNewTab("https://bit.ly/3Gaqirt")}
              >
                Metamask Tutorial
              </FooterLink>
              <FooterLink
                to="/"
                onClick={() => openInNewTab("https://bit.ly/3G8QJxF")}
              >
                About Ethereum
              </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Social Media</FooterLinkTitle>
              <FooterLink
                to=""
                onClick={() => openInNewTab("https://bit.ly/3bgYbd5")}
              >
                Instagram
              </FooterLink>
              <FooterLink
                to="/"
                onClick={() => openInNewTab("https://bit.ly/3mlefRi")}
              >
                Facebook
              </FooterLink>
              <FooterLink
                to="/"
                onClick={() => openInNewTab("https://bit.ly/3GqZch4")}
              >
                Youtube
              </FooterLink>
              <FooterLink
                to="/"
                onClick={() => openInNewTab("https://bit.ly/3111frR")}
              >
                Github
              </FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>

        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              Pollice.
            </SocialLogo>
            <WebsiteRights>
              Preeya © {new Date().getFullYear()}
              &nbsp;All rights reserved.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink
                href="https://bit.ly/3mlefRi"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink
                href="https://bit.ly/3bgYbd5"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink
                href="https://bit.ly/3GqZch4"
                target="_blank"
                aria-label="Youtube"
              >
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink
                href="https://bit.ly/3pLn9dg"
                target="_blank"
                aria-label="Twitter"
              >
                <FaTwitter />
              </SocialIconLink>
              <SocialIconLink
                href="https://bit.ly/3nGgCO1"
                target="_blank"
                aria-label="Linkedin"
              >
                <FaLinkedin />
              </SocialIconLink>

              <SocialIconLink
                href="https://bit.ly/3111frR"
                target="_blank"
                aria-label="Github"
              >
                <FaGithub />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
