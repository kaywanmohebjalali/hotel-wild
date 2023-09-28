import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyleLink = styled(NavLink)`
  cursor: pointer;

  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

import { HiOutlineHome} from "react-icons/hi";
import {  HiOutlineCalendarDays, HiOutlineCog6Tooth, HiOutlineHomeModern,HiUserGroup,HiUserPlus } from "react-icons/hi2";

const MainNav = () => {
  return (
    <nav>
      <NavList>
        <li>
          <StyleLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyleLink>
        </li>

        <li>
          <StyleLink to="/bookings">
          <HiOutlineCalendarDays />
            <span>booking</span>
          </StyleLink>
        </li>

        <li>
          <StyleLink to="/cabins">
          <HiOutlineHomeModern />
            <span>cabins</span>
          </StyleLink>
        </li>

        <li>
          <StyleLink to="/guests">
          <HiUserGroup />
            <span>Guests</span>
          </StyleLink>
        </li>
         
        <li>
          <StyleLink to="/users">
          <HiUserPlus />
            <span>Users</span>
          </StyleLink>
        </li>



        <li>
          <StyleLink to="/settings">
          <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyleLink>
        </li>



      </NavList>
    </nav>
  );
};

export default MainNav;
