import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { styled } from "styled-components"
import { useEffect, useState } from "react"

const StyleAppLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows:auto 1fr;
  


`

const Main = styled.main`
  background-color:var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

`

const Container=styled.div`
  max-width: 120rem;
  margin:0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

`

const CheckScreen=styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
font: 2rem bold;
`
const AppLayout = () => {
const [widthWindow, setWidthWindow]=useState(1500)

 useEffect(()=>{
  function handleResize(){
   
    setWidthWindow(window.innerWidth)
   
  }
   
  handleResize()

   window.addEventListener('resize',handleResize)
 },[widthWindow])
 if(widthWindow<1100)return<CheckScreen>Please increase the screen width</CheckScreen>
  
 
 
 return (
    <StyleAppLayout>
        <Header/>
        <Sidebar/>
        <Main>
          <Container>
            <Outlet/>
          </Container>
        </Main>
    </StyleAppLayout>
  )
}

export default AppLayout