import { Container, Content } from './TopTracks'
import { useStateVal } from '../imports'
import styled from 'styled-components'
import useEndpoint from "../utils/Endpoint"
import PImage from '../assets/Playlist.jpeg'


const Middle = styled.div`

display: flex;
flex-direction: column;
gap: 1.5rem;

a{
    text-decoration: none; 
     &:hover{

        .title{
    
            &>:last-child{
                color: white;
               
            }
          
        }
    }


}

.middlecontent{
    // border: 1px solid yellow;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: .5rem 0;

    .first{
        flex:.5;
        display: flex;
        align-items: center;
    }

    .img{
        width: 3rem;
        height: 3rem;
        overflow:hidden;
        // border: 1px solid red;
        border-radius: 50%;

        img{
            width: 100%;
            height: 100%;
        }
    }

    p{
        font-size: .8rem;
        font-weight: 200px;
        text-transform: capitalize;
        margin-left: 1rem;

    }

   

    .title{
        &>:first-child{
        font-size: 1rem;
        padding: .3rem 0;
        }

        &>:last-child{
            display: flex;
            color: grey;
           
        }
      
    }

    .added{
        flex: .1;
    }

    .album{
        flex:.3;

    }

    .time{
        margin-left: auto;
        flex:.1;

    }

    &:hover{
        background: #282828
    
    }

}








`




function Search() {
    const { searchTracks, formatDuration } = useStateVal()
    const {  play } = useEndpoint()


    // console.log('searchTracks', searchTracks);

    return <Container>
        <Content>
            <Middle>

                {searchTracks.length > 0 && searchTracks.map(tracks => (
                    <div className="middlecontent" key={tracks.id} onClick={() => play(tracks.album.uri, "track", tracks.track_number -1)}>
                        <div className='first'>
                            <div className="img">
                                <img src={tracks.album.images.length > 0  ? tracks.album.images[1].url: PImage} alt="" />

                            </div>
                            <div className="title">
                                <p>{tracks.name}</p>
                                <div>
                                    {tracks.album.artists.map(artist => (
                                        <p>{artist.name}</p>

                                    ))}

                                </div>

                            </div>

                        </div>

                        <div className="album">
                            <p>{tracks.album.name}</p>
                        </div>
                        <div className="added">
                            <p>{tracks.album.release_date}</p>
                        </div>
                        <div className="time">
                            <p>{formatDuration(tracks.duration_ms)}</p>
                        </div>
                    </div>
                ))}
            </Middle>
        </Content>
    </Container>
}

export default Search