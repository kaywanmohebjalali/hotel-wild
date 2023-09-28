import styled, { css } from "styled-components";

const Row = styled.div`
display: flex;
  ${(props) => props.type == "h" && css`
  justify-content: space-between;
  align-items: center;
  `}

  ${(props) => props.type == "v" && css`
   flex-direction: column;
   gap: 1rem;
  `}
`;

Row.defaultProps={
    type:'v'
}

export default Row;
