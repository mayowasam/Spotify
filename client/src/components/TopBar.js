import {useEffect, useState} from 'react'
import styled from "styled-components"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useStateVal } from "../imports"
import useEndpoint from '../utils/Endpoint'
import  avatar from '../assets/user.png'

const Container = styled.nav`
height: 5rem;
// border: 2px solid blue;
// border-bottom: 2px solid grey;
display: flex;
align-items: center;
justify-content: space-between;
padding: 1rem;
position: fixed;
top:0;
left: 300px;
right:20px;
// background: transparent;
background: black;
z-index: 2;




.arrow{
    width: 100%;
    // border: 2px solid red;
    flex: .1;
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    &>:first-child{
        span{
            display: inline-block;
            color: white;
            background:black;
            padding: 1rem;
            // border: 2px solid red;
            cursor: pointer;
        }

    }

    &>:last-child{
        span{
            display: inline-block;
            color: grey;
            background: rgb(25, 22, 22);           
            padding: 1rem;
            // border: 2px solid red;
            cursor: pointer;


         }
        
    };
   

    div{
        width: 3rem;
        height: 3rem;
        border: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        overflow:hidden;
        border-radius: 50%;

        

    }
}

.middle{
    flex:.5;
    // border: 2px solid green;

    input{
        padding: .5rem;
        width: 80%;
        border-radius: 5rem;
        outline: none;

    }

}

.name{
    flex: .3;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 2rem;
    height: 100%;
    a{
        // border: 2px solid blue;
        color: white;
        text-decoration: none;

    }

    div{

        background: black;
        // border: 2px solid green;
        border-radius: 2rem;
        padding: .3rem;
        // width:10%;
        height:100%;
        display: flex;
        align-items: center;
        // justify-content: space-between;
      

        .image{
            width:2rem;
            height:2rem;
            margin-right:  .5rem;
  
    
            img{
                width:100%;
                height:100%;
                border-radius: 100%;
                object-fit: cover;
            }
        }
    }

    
   
}


@media (max-width: 700px){
    left:0;
    right:0;

    .arrow{

        div{
            width: 2rem;
            height: 2rem;
            font-size: 1rem;
        }
    }

    .middle{
        input{
            width: 100%;
         
    
        }
    }

    .name{
        // flex:.6
    }
  
}

`




function TopBar() {
    const { setSearchTracks } = useStateVal()
   const {getSearch}= useEndpoint()

    const [search, setSearch] = useState("")

    useEffect(() => {
        if(search === "") return setSearchTracks("") 
        if(search){
            getSearch(search)

        }

    },[search])
    

    let navigate = useNavigate()
    let location = useLocation()

    const {user, } = useStateVal()
    // console.log('user', user);
    // console.log('location', location);
    return <Container>
        <div className="arrow">
            <div>
                <span onClick={() => navigate(-1)}> &#60;</span>

            </div>
            <div>
                <span onClick={() => navigate(1)}> &gt;</span>

            </div>

        </div>


        <div className="middle">
            {location.pathname === '/search' && <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>}
            {/* {location.pathname ===   '/search' && playbutton}  */}
        </div>

        <div className="name">
            <Link to="/" >
            <div>
                <div className="image">
                    <img src={user.img ? user.img : avatar} alt="avatar" />
                </div>
                <p>{user?.name}</p>

            </div>
            </Link>
        </div>
    </Container>
}

export default TopBar