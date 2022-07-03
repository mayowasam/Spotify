import styled from "styled-components"
import logo from '../assets/image1.jpeg'
import { Link, NavLink } from 'react-router-dom'
import { CgHome } from 'react-icons/cg'
import { BsSearch } from 'react-icons/bs'
import { BiLibrary } from 'react-icons/bi'
import { BiHeartSquare } from 'react-icons/bi'
import { useStateVal } from "../imports"

const Container = styled.nav`
width:100%;
height: 100%;
// border: 2px solid red;
background: black;
color:white;
padding: 1rem;
overflow: hidden;

`
const Content = styled.div`
// border: 2px solid green;
display: flex;
flex-direction: column;
width: 80%;
height: 100%;
overflow: hidden;
gap: .5rem;

@media (max-width:700px){
    width: 100%;
    justify-content: end;
   
}


`
const Top = styled.div`
height: 10%;
// border: 2px solid yellow;
img{
    max-width: 100%;
   max-height: 100%
}

@media (max-width:700px){
display:none;
}

`
const Middle = styled.div`
height: 50%;
// border: 2px solid yellow;
display: flex;
flex-direction: column;
width:100%;
border-bottom: 1px solid grey;





@media (max-width:700px){
    flex-direction: row;
    // justify-content: space-between;
    height: auto;
 
    
}


`
const Box = styled.div`
//  border: 2px solid blue;
 display: flex;
 flex-direction: column;
 width:100%;


ul{
    padding:0;
    margin:0;
    list-style-type: none;
    display:flex;
    flex-direction: column;
    gap: 1rem;


    @media (max-width:700px){
        flex-direction: row;
        justify-content: space-between;

    
    }

    li{
        // border: 2px solid purple;

        a{
            width: 100%;
            display:flex;
            align-items: center;
            gap:1rem;
            padding: .5rem 0;
            color: grey;
            text-decoration: none;

            &:hover{
                color: white;
            }

            @media (max-width:700px){
                flex-direction: column;
                gap: .5rem;
                font-size: .8rem;

                
            }
        

        }
    }

   

}

`

const Bottom = styled.div`
height: 40%;
// border: 2px solid yellow;
overflow: scroll;
overflow-x: hidden; 
    




ul{
    padding:0;
    margin:0;
    list-style-type: none;
    display:flex;
    flex-direction: column;

    li{

        a{
            width: 100%;
            display: inline-block;
            // border: 2px solid red;
            padding: .5rem 0;
            color: grey;
            text-decoration: none;
            cursor: pointer;
            &:hover{
                color: white;
            }
                   

        }
        
       
    }

}
&::-webkit-scrollbar{
    width:0;
 
}

@media (max-width:700px){
    display: none;
}

`


function Sidebar() {

    const {playlists} =useStateVal()
    // console.log(playlists);

   
    return <Container>
        <Content>
            <Top>
                <Link to="/">
                    <img src={logo} alt="spotify" />

                </Link>
            </Top>

            <Middle>
                <Box>
                    <ul>
                        <li><NavLink to="/"><CgHome />Home</NavLink></li>
                        <li><NavLink to="/search"> <BsSearch /> Search</NavLink></li>
                        <li><NavLink to="/library"><BiLibrary />Your Library</NavLink></li>
                        <li><NavLink to="/recent"><BiHeartSquare />Recently Played</NavLink></li>
                    </ul>
                </Box>
            </Middle>

            <Bottom>

                <ul>
                    {
                       playlists &&  playlists?.items.map((playlist,id) => (
                            <li key={id} ><NavLink to={`/playlist/${playlist.id}`}>{playlist?.name}</NavLink></li>
                            // <li key={id} onClick={() => handleClick(playlist.id)}>{playlist?.name}</li>

                        )) 
                    }
                    
                </ul>
            </Bottom>

        </Content>

    </Container>
}

export default Sidebar