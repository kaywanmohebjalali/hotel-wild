import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
  @media screen and (max-width:600px) {
    text-align: left;
    padding-left: 0.4rem;
  }

`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  @media screen and (max-width:600px) {
   width: 100px; 
  }

`;

function Logo() {
  const {isDarkMode}=useDarkMode()
  const src = isDarkMode ? "/logo-dark.png" 
  :"/logo-light.png"
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
