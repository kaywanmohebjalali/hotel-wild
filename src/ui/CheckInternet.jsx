import styled from "styled-components"

const Main=styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const Text=styled.p`
text-align: center;
font: 1.5rem bold;

`
const Link=styled.a`
border-radius: 10px;
padding:0.6rem 1rem;
background-color: #4338ca;
color: #fff;
font: 1.2rem bold;
cursor: pointer;
list-style: none;
text-decoration: none;
`



const CheckInternet = () => {
  return (
    <Main>
      <Text>Please Check Your Internet Connection </Text>
      <Link href="/">Try again</Link>
    </Main>
  )
}


export default CheckInternet