import styled from 'styled-components'
import { Header, Container, Content } from './TopTracks'
import avatar from '../assets/user.png'
import { Middlecontent } from "./Index"
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useStateVal, Loader } from '../imports'
import useEndpoint from '../utils/Endpoint'
import PImage from '../assets/Playlist.jpeg'


const Top = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
// border: 1px solid red;
gap: 1rem;
.img{
    width: 15rem;
    height: 15rem;
    overflow: hidden;
    border-radius: 50%;

    img{
        width: 100%;
        height: 100%
    }
}

h2{
    font-size: 3rem;
}

@media (max-width:700px){
    h2{
        font-size: 2rem;
    }
}


`
const Stat = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 20rem;
// border: 2px solid red;

div{
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    text-transform: capitalize;
    padding: .5rem 0 ;

    &>:first-child{
        color: #3E82FC;
        font-size: 1.2rem;

    }

    &>:last-child{
        color: grey;
        text-transform: uppercase;
        font-size: .7rem;

    }

}

`

const Middle = styled.div`


`

export const Album = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
margin-top: 3rem;
h1{
    font-size: 1.3rem;
    padding: 1rem 0 ;
}

@media (max-width:700px){
    h1{
        font-size: 1rem;
    }
}

`

export const AlbumContent = styled.div`
display: flex;
gap: 2rem;
overflow: hidden;
overflow-x: scroll;

&::-webkit-scrollbar{
    display: none
    // width: .2rem;
    // &-thumb{
    //     background: rgba(255, 255, 255, 0.2);
    //     width: .1rem;


    // }
}

a{
    color: white;
    text-decoration: none;
}

@media (max-width:700px){
    gap: 1rem;

}
`

export const AlbumItem = styled.div`
    border: 2px solid #282828;
    border-radius: 5px;
    text-align: center;
    background: black;
    padding: 1rem;
    cursor: pointer;


    h3{
        padding: 1rem 0;

    }
    &:hover{
        border: 2px solid #282828;
        background: #282828
    
    }

    @media (max-width:700px){
        h3{
            font-size: .9rem;
        }
    }


`
export const AlbumContainer = styled.div`
flex-shrink: 0;
width: 20rem;
height: 15rem;
// border: 2px solid black; 
margin-bottom: 1rem;
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media (max-width:700px){
    width: 10rem;
    height: 10rem;
}



`

export const RecommendedItem = styled.div`
    border: 2px solid #282828;
    border-radius: 5px;
    text-align: left;
    background: black;
    padding: 1rem;
    cursor: pointer;

    h3{
        padding: 1rem 0;
        font-size: .9rem;

    }

    @media (max-width:700px){
        h3{
            font-size: .9rem;
        }
    }

    .artist{
        display: flex;
        gap: .5rem;
        color: grey;
    }

    &:hover{
        border: 2px solid #282828;
        background: #282828
    
    }

`

function Artist() {
    const { id } = useParams()
    const { getAnArtist, getArtistTopTracks,getAlbumByArtist, getRelatedArtists, getPlaylistArtistAppear, play } = useEndpoint()
    const { artist, artistTopTracks, formatDuration, artistAlbum , relatedartists, playlistArtistsAppear} = useStateVal()
    const [loading, setLoading] = useState(true)

    // console.log('artistTop', artistTopTracks);
    // console.log('artistAlbum', artistAlbum);
    // console.log('id', id);
    // console.log('playlistArtistsAppear', playlistArtistsAppear);

    const smallest = artist && artist.images && artist.images.reduce((smallest, image) => {
        if (image.height < smallest.height) return image
        return smallest
    }, artist.images[0])





    useEffect(() => {
        getAnArtist(id, setLoading)
        getArtistTopTracks(id)
        getAlbumByArtist(id)
        getRelatedArtists(id)
        getPlaylistArtistAppear(id, setLoading)

    }, [id])
    return <>
        {
            loading ? <Loader /> : <Container>
                <Content>
                    <Top>
                        <div className='img'>
                        {/* <img src={smallest.url} alt="avatar" /> */}
                        <img src={artist.images ? artist.images[0].url : avatar} alt="avatar" />
                        </div>
                        <h2>{artist.name}</h2>
                        <Stat>
                            <div>
                                <span>{artist?.followers.total}</span>
                                <p>followers</p>
                            </div>
                            <div>
                                {artist.genres.map((genre, id) => (
                                    <span key={id}>{genre}</span>

                                ))}
                                <p>Genres</p>
                            </div>
                            <div>
                                <span>{artist.popularity}%</span>
                                <p>Popularity</p>
                            </div>
                        </Stat>

                    </Top>

                    <Middle>

                        <Header>
                            <h1>Top Songs</h1>
                        </Header>

                        <Middlecontent>

                            {artistTopTracks.length > 0 && artistTopTracks.map(track => {


                                const smallest = track.album.images.reduce((smallest, image) => {
                                    if (image.height < smallest.height) return image
                                    return smallest
                                }, track.album.images[0])

                                return (

                                
                                // <Link to={`/tracks/${track.id}`}>
                                    <div className="middlecontent" key={track.id} onClick={() => play(track.album.uri, "track", track.track_number -1)}>
                                        <div className="img">
                                         
                                        {/* <img src={smallest.url} alt="" /> */}
                                            <img src={track.album.images ? track.album.images[0].url : PImage} alt="" />

                                        </div>
                                        <div className="title">
                                            <p>{track.name}</p>
                                            <div className='artistname'>
                                            {
                                                track.artists.map(artist => (
                                                        <p>{artist.name}</p>


                                                ))
                                            }
                                            </div>

                                        </div>
                                        <div className="time">
                                            <p>{formatDuration(track.duration_ms)}</p>
                                        </div>
                                    </div>

                                // </Link>
                                )
                            })}
                        </Middlecontent>

                        <Album>
                            <h1>Albums</h1>

                            <AlbumContent>
                            {artistAlbum.length > 0 && artistAlbum.map(album => {   
                                //   const smallest = album.images.reduce((smallest, image) => {
                                //     if (image.height < smallest.height) return image
                                //     return smallest
                                // }, album.images[0]) 
                                
                                return (<Link to={`/album/${album.id}`} key={album.id}>
                                        <AlbumItem>
                                            <AlbumContainer>
                                                <img src={album.images ? album.images[1].url: PImage} alt="avatar" />

                                            </AlbumContainer>
                                            <h3>{album.name}</h3>
                                        </AlbumItem>

                                    </Link>
                                )})}
                            </AlbumContent>
                        </Album>


                        <Album>
                            <h1>Recommendations</h1>

                            <AlbumContent>
                                {playlistArtistsAppear.map((recommended) => (
                                        <RecommendedItem key={recommended.id} onClick={() => play(recommended.album.uri, "track", recommended.track_number -1)}>
                                            <AlbumContainer>
                
                                                <img src={recommended.album.images? recommended.album.images[0].url : PImage} alt="avatar" />

                                            </AlbumContainer>
                                            <h3>{recommended.name}</h3>
                                            <div className='artist'>
                                                {recommended.artists.map(artist => (
                                                        <p>{artist.name} .</p>
                                                ))}

                                               

                                            </div>
                                        </RecommendedItem>

                                ))}
                            </AlbumContent>
                        </Album>

                        <Album>
                            <h1>Similar Artists</h1>

                            <AlbumContent>
                                {relatedartists.length > 0 && relatedartists.map(artist => (
                                    <Link to={`/artists/${artist.id}`} key={artist.id}>
                                        <AlbumItem>
                                            <AlbumContainer>
                                                <img src={artist.images[1].url} alt="avatar" />

                                            </AlbumContainer>
                                            <h3>{artist.name}</h3>
                                        </AlbumItem>

                                    </Link>
                                ))}
                            </AlbumContent>
                        </Album>
                    </Middle>


                </Content>
            </Container>
        }
    </>
}

export default Artist