import styled from 'styled-components'
import { Container, Content } from './TopTracks'
// import user from '../assets/user.png'
import PImage from '../assets/Playlist.jpeg'
import { useStateVal, Loader } from '../imports'
import { Link } from 'react-router-dom'
import useEndpoint from '../utils/Endpoint'
import { useEffect, useState } from 'react'

// import { Link } from 'react-router-dom'

const LibraryBox = styled.div`
display: flex;
align-items: center;
// border: 2px solid red;
gap: 1rem;
overflow: hidden;
overflow-x: scroll;
&::-webkit-scrollbar{
    display: none;
}
a{
    text-decoration:none;
}



`
const BigBox = styled.div`
flex-shrink:0;
width: 25rem;
height: 20rem;
display: flex;
flex-wrap: wrap;
border: 2px solid black;
// border: 2px solid red;
position: relative;
    a{
        text-decoration: none;
        width: 50%;
        height:50%;
        flex-shrink: 0;
        // border: 2px solid yellow;

    }

   

    .title{
        position: absolute;
        // border: 2px solid red;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: yellow;
        mixBlendMode: diff;

        h3{
            font-size: 1.5rem;
            font-weight: small;
        }

    

        @media (max-width:700px){
        h3{
            font-size: 1rem
        }

        }
    }


    @media (max-width:700px){
        width: 15rem;
        height: 15rem; 
    }

  


`

const BigBoxItem = styled.div`
position: relative;
width: 100%;
height:100%;


img{
    width:100%;
    height:100%;
    object-fit:cover;
}





`

const Box = styled.div`
flex-shrink:0;
width: 15rem;
height: 20rem;
border: 2px solid #282828;
border-radius: 5px;
display: flex;
flex-direction: column;
padding: 1rem;

@media (max-width:700px){
    width: 10rem;
    height: 15rem; 
}


&:hover{
    border: 2px solid #282828;
    background: #282828

}

`
const Top = styled.div`
flex:.6;
// border: 1px solid blue;
width: 100%;
height: 12rem;

.container{
    width:100%;
    height:100%;

    
    .img{
        width:100%;
        height:100%;
        
        img{
            width:100%;
            height:100%;
            object-fit: cover;
        }
    }
}

`
const Bottom = styled.div`
// border: 1px solid yellow;
flex:.4;
height: 100%;

h4{
    color: white;
}

.container{
    padding: .5rem 0;
    display: flex;
    flex-direction:column;
    gap:.5rem 0 ;

    span{
        color: grey;
    }
}





@media (max-width:700px){
    h4{
        font-size: .8rem;
    }

    span{
        font-size: .8rem;
    }
}



`


function Library() {
    const { playlists, featuredSong } = useStateVal()
    const [loading, setLoading] = useState(true)
    const { Featured } = useEndpoint()
    console.log('playlists', playlists);
    console.log('featuredSong', featuredSong);

    useEffect(() => {
        Featured(setLoading)

    }, [])

    return <>
        {loading ? <Loader /> :


            <Container>
                <Content>
                    <LibraryBox>
                        <BigBox>
                            {featuredSong?.items.map(songs => (
                                <Link to={`/feature`}>



                                    <BigBoxItem key={songs.id}>
                                        <img src={songs.images[1].url} alt="playlist" />
                                    </BigBoxItem>
                                </Link>
                            ))}

                            {/* {[...Array(4)].map((x, id) => (
                                <Link to={`/feature`}>
                                    <BigBoxItem key={id}>
                                        <img src={user} alt="playlist" />
                                    </BigBoxItem>
                                </Link>
                            ))} */}

                            <div className='title'>
                                <h3>Featured songs</h3>
                            </div>
                        </BigBox>

                        {playlists && playlists.items.map(playlist => (
                            <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                                <Box >
                                    <Top>
                                        <div className="container">
                                            <div className='img'>
                                                <img src={playlist.imageurl ? playlist.imageurl: PImage } alt="playlist" />

                                            </div>

                                        </div>

                                    </Top>
                                    <Bottom>
                                        <div className="container">
                                            <h4>{playlist.name}</h4>
                                            <span>By {playlist.owner}</span>

                                        </div>
                                    </Bottom>



                                </Box>
                            </Link>
                        ))}

                    </LibraryBox>


                </Content>
            </Container>
        }
    </>
}

export default Library