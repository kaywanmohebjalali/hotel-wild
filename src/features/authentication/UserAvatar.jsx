import styled from "styled-components";
import { useGetUser } from "./useGetUser";


const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media screen and (max-width:700px) {
     margin-left: auto;

  }

`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;



const UserAvatar = () => {

  const {user }=useGetUser()
  const isAuthenticated = user?.role
  // eslint-disable-next-line no-unsafe-optional-chaining
  const {fullName, avatar}=user?.user_metadata



  if(!isAuthenticated) return null

  return (
    <StyledUserAvatar>
      <Avatar src={avatar || './src/data/img/default-user.jpg'} 
  
      alt={`avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  )
}

export default UserAvatar