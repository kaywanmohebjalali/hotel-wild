/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useOutSideClickModal from "../hooks/useModalHook";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;

  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  &:hover {
    color: var(--color-brand-800);
  }
`;
// 1
const MenuContext = createContext();

// 2
const Menus = (props) => {
  const { children } = props;
  const [openId, setOPenId] = useState("");
  const [position, setPosition] = useState("");
  const close = () => setOPenId("");
  const open = setOPenId;

  return (
    <MenuContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
};



// 3
function Toggle(props) {
  const { id, children } = props;
  const { openId, open, close, setPosition } = useContext(MenuContext);
  
  function handleClickToggle(e) {
  
    e.stopPropagation()
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  
    if (!openId || id !== openId) {
      open(id);
    
    } else {
      close();
    }
  }

  return <StyledToggle onClick={handleClickToggle}>{children}</StyledToggle>;
}





function List(props) {
  const { id, children } = props;
  const { openId, position, close } = useContext(MenuContext);
  const ref = useOutSideClickModal(close);

  if (id != openId) return null;

  return createPortal(
    <StyledList 
    ref={ ref}
     position={position}>
      
      {children}
    </StyledList>,
    document.body
  );
}

function Button(props) {
  const { children, icon, onClick = null } = props;
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        <Span>
          {icon} {children}
        </Span>
      </StyledButton>
    </li>
  );
}

// 4
Menus.Toggle = Toggle;
Menus.Menu = Menu;
Menus.List = List;
Menus.Button = Button;
export default Menus;
