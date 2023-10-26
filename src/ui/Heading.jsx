import  styled from "styled-components";

const textAlign =`
text-align:center;
`
const Heading=styled.h1`
    font-size: 2rem;
    line-height: 3rem;
    font-weight: 400;
    color: var(--color-grey-600);
    ${textAlign};
    padding: ${prop=>prop?.p};


    
`

export default Heading