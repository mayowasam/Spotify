import styled from 'styled-components'
import { Container, Content } from './TopTracks'
// import { Link } from 'react-router-dom'
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs"

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useEndpoint from "../utils/Endpoint";
import { useStateVal } from '../imports'
import Loader from './Loader'
import avatar from '../assets/user.png'
import pImage from '../assets/Playlist.jpeg'

const Top = styled.div`
display: flex;
    &>:first-child{
        flex: .3
   }

   &>:last-child{
    flex: .7
}

`
const Box = styled.div`
height: 40vh;
// border: 2px solid red;

.img{
    width: 100%;
    height: 100%;
    overflow: hidden;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.container{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0 0 1rem;

    h1{
        font-size: 1.3rem;
    }

    h2{
        font-size: 6rem;
    }

    .name{
        // border: 2px solid blue;
        color: white;
        display: flex;
        align-items: center;
    
        div{
    
            background: black;
            border-radius: 2rem;
            padding: .3rem;
            height:100%;
            display: flex;
            align-items: center;
          
    
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

            @media (max-width: 700px){

                p{
                    font-size: .8rem;
                }
               
            }
        }
    }
      
    @media (max-width: 700px){

        h1{
            font-size: 1rem;
        }
        h2{
            font-size: 2rem;
        }
    }
       
    

}

`

const Middle = styled.div`
width: 100%;
margin: 3rem 0;
// border: 2px solid blue;
svg{
    cursor: pointer;
    color: green;
    font-size:5rem;
    transition: 0.2s ease-in-out;
    &:hover{
        color:white;
    }
}

@media (max-width: 700px){
   
    margin: 2rem 0;

}

`


const Bottom = styled.div`
.bottomheader{
    display: flex;
    text-align: start;
    margin: 2rem 0;

    p:nth-of-type(1){
        flex:.1;

    }
    p:nth-of-type(2){
        flex:.4;

    }
    p:nth-of-type(3){
        flex:.2;
 
    }
    p:nth-of-type(4){
        flex:.2;

    }
    p:nth-of-type(5){
        flex:.1;

    }



}

.bottombody{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}


@media (max-width: 700px){

    .bottomheader{
        font-size: .8rem;
        p:nth-of-type(3){
            flex:.4;
     
        }

        p:nth-of-type(4){
            display: none;
    
        }
    }
    
  
}

`

const TrackContent = styled.div`
display: flex;
align-items: center;
padding: 1rem 0;

&>:first-child{
    flex:.1;
    // border: 2px solid yellow;
};

&>:last-child{
    flex:.1;
    // border: 2px solid yellow;
};

span:nth-of-type(2){
    flex:.2;
    // border: 2px solid blue;
}

span:nth-of-type(3){
    flex:.2;
    // border: 2px solid green;
};





.img{
    width: 2rem;
    height: 2rem;

    img{
        width:100%;
        height:100%;
        border-radius: 100%;
        object-fit: cover;
    }
}


@media (max-width: 700px){
    font-size: .8rem;

    span:nth-of-type(2){
        flex:.4;
    }
    span:nth-of-type(3){
        display: none;
    }; 
    
  
}

&:hover{
    cursor:pointer;
    background: #282828

}

`

const ImgContainer = styled.div`
display: flex;
align-items: center;
flex:.4;
gap: .5rem;

.title{
    display: flex;
    flex-direction: column;

    div{
        display: flex;
        gap:1rem;
        // border: 2px solid red;
        font-size: .8rem;
        color: grey;


        
        @media (max-width: 700px){
            font-size: .7rem;
            gap: .2rem;
            flex-direction: column


        }
    } 



    
}

`


function Playlist() {
    const { getPlaylist, pauseMusic, play } = useEndpoint()
    const { user, playlist, formatDuration } = useStateVal()
    const [loading, setLoading] = useState(true)
    const [playlistPlay, setPlaylistPlay] =useState(false)
    // console.log(playlist);

    const { id } = useParams()

    useEffect(() => {
        // console.log('getting playlist');
        getPlaylist(id, setLoading)
    }, [id])

    const changePlayState = (playlistid, type) => {
        setPlaylistPlay(!playlistPlay)
        // console.log(playlistid);
        if (type === "play") {
            play(playlistid, "album")

        } else {
            pauseMusic()
        }



    }

    return <>
        {loading ? <Loader /> : <Container>
            <Content>
                <Top>
                    <Box>
                        <div className="img">
                            <img src={playlist.image ? playlist.image : pImage} alt="playlist" />

                        </div>
                    </Box>
                    <Box>
                        <div className="container">
                            <h1>Playlist</h1>
                            <h2>{playlist.name}</h2>
                            <div className="name">
                                <div>
                                    <div className="image">
                                        <img src={user.img ? user.img : avatar} alt="" />
                                    </div>
                                    <p>{playlist.owner}</p>

                                    <div>
                                        <p>. {(playlist.tracksTotal <= 1) ? `${playlist.tracksTotal} songs` : `${playlist.tracksTotal} song`}</p>

                                    </div>

                                </div>
                            </div>

                        </div>

                    </Box>

                </Top>
                <Middle>
                    {
                        playlistPlay ? <BsFillPauseCircleFill onClick={() => changePlayState(playlist.uri, "pause")} /> : <BsFillPlayCircleFill  onClick={() => changePlayState(playlist.uri, "play")} />
                    }                </Middle>

                <Bottom>
                    <div className="bottomheader">
                        <p>#</p>
                        <p>TITLE</p>
                        <p>ALBUM </p>
                        <p>DATE ADDED</p>
                        <p>TIME</p>


                    </div>
                    <hr />
                    <div className="bottombody">

                        {playlist && playlist.item?.length > 0 && playlist.item.map((track, id) => {
                            // console.log('track', track);



                            return <>
                                <TrackContent key={id} onClick={() => play(track.track.album.uri, "track", (track.track.track_number -1) )}>
                                    <span>{id + 1}</span>
                                    <ImgContainer>
                                        <div className="img">
                                            <img src={track.track.album.images.length > 0 ? track.track.album.images[0].url: pImage} alt="playlist" />
                                        </div>
                                        <div className='title'>
                                            <p>{track.track.name}</p>
                                            <div>
                                                {
                                                    track.track.artists.map(artist => (
                                                        <p>{artist.name}</p> 
                                                    ))
                                                }
                                                </div>
                                        </div>

                                    </ImgContainer>
                                    <span>{track.track.album.name}</span>
                                    <span>{new Date(track.added_at).toLocaleDateString()}</span>
                                    <span>{formatDuration(track.track.duration_ms)}</span>
                                </TrackContent>
                            </>
                        })
                        }


                    </div>

                </Bottom>


            </Content>

        </Container>
        }
    </>
}

export default Playlist