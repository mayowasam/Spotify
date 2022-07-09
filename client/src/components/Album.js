import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Container, Content } from './TopTracks'
import {BsFillPlayBtnFill, BsShuffle,  } from "react-icons/bs"
import avatar from "../assets/Playlist.jpeg"
import {useStateVal, Loader} from '../imports'
import useEndpoint from '../utils/Endpoint'

const Top = styled.div`
width: 100%;
display: flex;

`

const Box = styled.div`
width: 50%;
height: 20rem;
// border: 2px solid red;

.img{
    // border: 5px solid black;
    text-align: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    img{
        width: 100%;
        max-height: 100%;
        height:100%;
    }

}

.container{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    // border: 2px solid blue;

    .link{
        color: grey;
    }

    button{
        padding: .5rem;
    }


}
`

const Middle = styled.div`
display: flex;
align-items: center;
width: 100%;
// border: 2px solid yellow;
margin: 2rem 0;
gap: 2rem;
button{
    cursor:pointer;
    width: 8rem;
    padding: 1rem;
    background: grey;
    color: white;
    &:hover{
        border: 2px solid #282828;
        background: #282828;

    
    }
}


`

const Bottom = styled.div`
display: flex;
flex-direction: column;
gap: 1.5rem;
// margin-bottom: 3rem;

`
export const TrackContent = styled.div`
display: flex;
justify-content: space-between;
padding: .5rem 0;
&>:first-child{
    display: flex;
    gap: 1rem;
    align-items: center;

    div{
        span{
            font-size: .8rem;
            color: grey;
        }
    }
}

&:hover{
    background: #282828;
    cursor:pointer;


}

`

function Album() { 
    const {album, formatDuration} = useStateVal()
    const [loading, setLoading] = useState(true)
    const {getAnAlbum, play} = useEndpoint()
    const {id} =useParams()

    useEffect(() => {
        getAnAlbum(id, setLoading)
       

    }, [id])
 

    return <Container>
        {
            loading ? <Loader/> :
       
        <Content>
            <Top>
                <Box>
                    <div className="img">
                        <img src={album.images.length > 0 ? album.images[1].url : avatar} alt="" />

                    </div>

                </Box>
                <Box>
                    <div className="container">
                        <h1>{album.name}</h1>
                        <h3>by <Link to={`/artists/${album.artists[0].id}`} className='link'>{album.artists[0].name}</Link></h3>
                        <h3>Album . {new Date(album.release_date).getFullYear()}</h3>
                     

                    </div>

                </Box>

            </Top>
            <Middle>
                <button onClick={() => play(album.uri, "album")}><BsFillPlayBtnFill/></button>
                <button><BsShuffle/></button>

            </Middle>

            <Bottom>

                {album && album.tracks.items.map(track => (
                    <TrackContent key={track.id} onClick={() => play(album.uri, "track", (track.track_number - 1))}>
                        <div>
                            <span>{track.track_number}</span>
                            <div>
                                <p>{track.name}</p>
                                <span>{track.artists[0].name}. {formatDuration(track.duration_ms)}</span>
                            </div>

                        </div>
                        <span>:</span>
                    </TrackContent>
                ))}
            </Bottom>
        </Content>

    
    } 
    </Container>
}

export default Album