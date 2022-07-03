import { Outlet } from "react-router-dom"
import styled from "styled-components"
import {TopBar} from "../imports"

const Container = styled.main`
width:100%;
height: 100%;
// border: 2px solid red;
overflow-y:scroll;


`


function Main(){
    return <Container>
        <TopBar/>
        <Outlet/>
    </Container>
}

export default Main