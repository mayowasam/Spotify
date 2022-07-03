import { useEffect, useState } from "react";
import { useStateVal, Loader } from "../imports"
import useEndpoint from "../utils/Endpoint"
import { Container, Content } from './TopTracks'
import {Album, AlbumContainer, AlbumContent, AlbumItem} from './Artist'


function Recent() {
    const [loading, setLoading] = useState(true)

    const { myRecentlyPlayed, play } = useEndpoint()
    const { recent } = useStateVal()
    // console.log('recent', recent);
    useEffect(() => {
        myRecentlyPlayed(setLoading)

    }, [])


    return <>

    {loading ? <Loader/> :
        <Container>
            <Content>
                <Album>
                    <h1>Recently Played</h1>

                    <AlbumContent>
                        {recent.length > 0 && recent.map(track => {
                            //   const smallest = album.images.reduce((smallest, image) => {
                            //     if (image.height < smallest.height) return image
                            //     return smallest
                            // }, album.images[0]) 

                            return ( 
                                <AlbumItem key={track.track.id} onClick={() => play(track.track.album.uri, "track", track.track.track_number -1)}>
                                    <AlbumContainer>
                                        <img src={track.track.album.images[1].url} alt="avatar" />

                                    </AlbumContainer>
                                    <h3>{track.track.album.name}</h3>
                                </AlbumItem>

                          
                            )
                        })}
                    </AlbumContent>
                </Album>


            </Content>
        </Container>
}
    </>
}

export default Recent