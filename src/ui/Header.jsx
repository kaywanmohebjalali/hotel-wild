import { styled } from "styled-components"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from '../features/authentication/UserAvatar'
const StyleHeader =styled.header`
  background-color: var(--color-grey-0);;
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: end;
  @media screen and (max-width:700px) {
    
    padding: 1.2rem 0.8rem;
    
  }

  @media screen and (max-width:600px) {
    flex-direction: column-reverse;
    padding: 1.2rem 2rem;

    
  }
`

const Header = () => {
  return (
    <StyleHeader>
      <UserAvatar/>
      <HeaderMenu/>
    </StyleHeader>
  )
}

export default Header