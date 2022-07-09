import styled from "styled-components"
import { Player, useStateVal, Volume } from "../imports"
import useEndpoint from "../utils/Endpoint"
import { useEffect, useRef } from "react"
import { Link } from 'react-router-dom'

const Container = styled.section`
width:100%;
height: 100%;
border: 1px solid black;
background: #181818;



@media (max-width: 700px){
   height: 3rem;

`

const Content = styled.div`
margin: 0.5rem 1rem;
display: grid;
grid-template-columns: 1fr 2fr 1fr;
align-items: center;

.first {
    // border: 2px solid blue;
    .first__content{
        display: flex;
        align-items: center;
        gap: 1rem;

        .img{
            width: 5rem;
            height:5rem;

            img{
                width:100%;
                height:100%;
            }
        }

        .name{
            display: flex;
            flex-direction: column;
            gap: .5rem;
            .title{
                color: white;
                font-size: .8rem;
            }
            
            .artist{
                display: flex;
                align-items: center;
                gap: .5rem;
                a{
                    color: grey;
                    font-size: .7rem;
                    text-decoration: none;

                }


            }
        }

      

    }
}

@media (max-width:700px){
    grid-template-columns: 2fr 1fr;

    .first{
        display:none
    }
}

`


function Footer() {
    const { currentPlaying, playerState } = useStateVal()
    const { getCurrentPlayed } = useEndpoint()

    // const onceRef =useRef(false)

    useEffect(() => {
        // if(onceRef.current) return; 

        getCurrentPlayed()

        // return () => onceRef.current = true
    }, [playerState])


    // console.log("currentPlaying", currentPlaying);


    return <Container>
        <Content>




            <div className="first">
                {currentPlaying &&
                    <div className="first__content" key={currentPlaying.id}>
                        <div className="img">
                            <img src={currentPlaying.image} alt="" />
                        </div>
                        <div className="name">
                            <p className="title">{currentPlaying.name}</p>
                            <div className="artist">
                                {currentPlaying.artists && currentPlaying.artists.map((artist,id) => {
                                    return (
                                        <Link to={`artists/${artist.id}`} key={id}>
                                            <p>{artist.name}</p>
                                        </Link>

                                    )

                                })

                                }
                            </div>
                        </div>
                        <div className="like">
                            +
                        </div>

                    </div>
                }





                {/* <div className="first__content" >
                        <div className="img">
                            <img src={image} alt="" />
                        </div>
                        <div className="name">
                            <p className="title">currentPlaying.name</p>
                            <div className="artist">
                                <p>currentPlaying.artists</p>
                            </div>
                        </div>
                        

                    </div> */}

            </div>


            <div className="player">
                <Player />
            </div>

            <div className="control">
                <Volume />
            </div>

        </Content>
    </Container>
}

export default Footer