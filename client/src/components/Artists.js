import { useEffect, useState } from "react";
import { Header, Container, Content } from './TopTracks'
import { Middle } from "./Index"
import { Link } from "react-router-dom"
import styled from 'styled-components'
import { useStateVal } from "../imports"
import useEndpoint from "../utils/Endpoint";


const Mid = styled(Middle)`
flex-wrap: wrap;
// justify-content: space-between;
gap:1.5rem;
// border: 2px solid blue;

a{
    // border: 2px solid yellow;

}



@media (max-width:700px){
    flex-direction: row;

}

`
const Art = styled.div`
width: 10rem;
height: 10rem;
// border: 2px solid red;
border-radius: 50%;
position: relative;
overflow:hidden;
.img{
    position: absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;

    img{
        width:100%;
        max-width: 100%;
    max-height: 100%;
    }

}
.title{
    display: none;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    color: white;
}
&:hover{
    .title{
        display: block;
        cursor: pointer;
    }
}




`

function Artist() {
    const { getMyTopArtists } = useEndpoint()
    const { myTopArtists } = useStateVal()
    // console.log('myTopArtists', myTopArtists);
    const [artistsState, setArtistsState] = useState(true)

    useEffect(() => {

        getMyTopArtists(setArtistsState)


    }, [])

    return <Container>
        <Content>
            <Header>
                <h1>Top Artists</h1>
                <div className="header">
                    <ul>
                        <li><Link to="">All time</Link></li>
                        
                    </ul>

                </div>

            </Header>

            <Mid>
            {myTopArtists.length > 0 && (myTopArtists.map((artist) => {
                        const smallest = artist.images && artist.images.reduce((smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        }, artist.images[0])

                        return (<Link to={`/artists/${artist.id}`} key={artist.id}>
                            <Art>
                                <div className="img">
                                    <img src={smallest.url} alt="avatar" />

                                </div>
                                <div className="title">
                                    <p>{artist.name}</p>

                                </div>
                            </Art>
                        </Link>)
                
                }))}





            </Mid>



        </Content>


    </Container>
}

export default Artist