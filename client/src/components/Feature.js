import { useEffect, useState } from "react";
import { useStateVal, Loader } from "../imports"
import useEndpoint from "../utils/Endpoint"
import { Container, Content } from './TopTracks'
import {Album, AlbumContainer, AlbumContent, AlbumItem} from './Artist'


function Feature() {
    const { featuredAllSong } = useStateVal()
    const [loading, setLoading] = useState(true)

    const { FeaturedAll, play } = useEndpoint()
    useEffect(() => {
        FeaturedAll(setLoading)

    }, [])


    return <>
    {loading ? <Loader /> :
        <Container>
            <Content>
                <Album>
                    <h1>Recently Played</h1>

                    <AlbumContent>
                        {featuredAllSong?.items.length > 0 && featuredAllSong.items.map(track => {
                            //   const smallest = album.images.reduce((smallest, image) => {
                            //     if (image.height < smallest.height) return image
                            //     return smallest
                            // }, album.images[0]) 

                            return ( 
                                
                                <AlbumItem key={track.id} onClick={() => play(track.uri, "album")}>
                                    <AlbumContainer>
                                        <img src={track.images[1].url} alt="avatar" />

                                    </AlbumContainer>
                                    <h3>{track.name}</h3>
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

export default Feature