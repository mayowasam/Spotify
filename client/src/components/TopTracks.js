import { Link } from "react-router-dom"
import styled from "styled-components"
import { useStateVal } from "../imports"
import { Middlecontent } from "./Index"
import { useState, useEffect } from "react"
import useEndpoint from "../utils/Endpoint"

export const Container = styled.div`
width:100%;
// height: 300vh;
padding: 1rem 0;
margin: 5rem 0;
color: white;
// border: 2px solid green;
`

export const Content = styled.div`
width:90%;
margin: auto;
// border: 2px solid blue;
position:relative;

`
export const Header = styled.div`
// width:60vw;
// position:fixed;
top: 5rem;
background: rgba(34, 34, 34);
display:flex;
align-items: center;
// border: 2px solid red;
padding: 1.5rem 1rem;
margin-bottom: 1rem;

    h1{
        font-size: 1.3rem;
    }

    .header{
        margin-left: auto;
        width: calc(5rem + 15vw);
        // border: 2px solid green;


     
    
        ul{
            display:flex;
            list-style-type:none;
            padding:0;
            margin:0;
            // border: 2px solid red;
            justify-content: flex-end;

        
            li{
        
                a{
                    text-decoration: none;
                    color: white;
                    font-size: .9rem;

                }

                &:hover{
                    text-decoration: underline;
    
                }

            }
        }
    }






    @media (max-width: 700px){
       h1{
           font-size: 1rem;
       }

       .header{
           width: calc(12rem + 10vh)
       }
    }





`




function TopTracks() {
    const { getMyTopTracks, play } = useEndpoint()
    const { formatDuration } = useStateVal()
    const [tracksState, setTracksState] = useState(true)

    useEffect(() => {
        getMyTopTracks(setTracksState)

    }, [])

    const { topTracks } = useStateVal()
    return <Container>
        <Content>
            <Header>
                <h1>Top Tracks</h1>
                <div className="header">
                    <ul>
                        <li><Link to="">All time</Link></li>

                    </ul>

                </div>

            </Header>

            <Middlecontent>
                {topTracks.map(track => (


                    <div className="middlecontent" key={track.id} onClick={() => play(track.uri, "track", track.track_number)}>
                        {/* to play track.external_urls */}
                        <div className="img">
                            <img src={track.img} alt="" />

                        </div>
                        <p>{track.name}</p>
                        {/* <div className="title">
        <p>sundown</p>
        <p>zara larsson</p>

    </div> */}

                        <div className="time">
                            <p>{formatDuration(track.duration)}</p>
                        </div>
                    </div>
                ))}
            </Middlecontent>



        </Content>


    </Container>
}

export default TopTracks