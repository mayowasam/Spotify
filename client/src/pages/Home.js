import { useEffect, useState , useRef} from "react";
import styled from "styled-components"
import {
  Footer, Main, Sidebar, useStateVal, Loader
} from "../imports"
import useEndpoint from "../utils/Endpoint";

const HomeContainer = styled.div`
display: grid;
height: 100vh;
grid-template-columns: 300px 2fr;
// background: linear-gradient( rgb(91, 87,115), rgba(0, 0, 0, 1));
// background: rgb(0, 0, 0, .9);
background: #121212;
grid-template-rows: 2fr 100px;
position: relative;
&>:last-child{
  grid-column: 1/3
}

@media (max-width: 700px){
  grid-template-columns: 1fr;
  grid-template-rows: minmax(min-content(80%),1fr)  max-content(20%) ;

  &>:first-child{
  //  display:none;
  grid-area: 3/1/4/2
  }

  &>:nth-child(2){
   grid-area: 1/1/3/2
   }

  &>:last-child{
    //  display:none;
    // grid-area: 2/1/3/2
    position: absolute;
    bottom: 5rem;
    left: 0;
    right: 0;
    zindex: 2;
    background: black;

    }

}


`




function Home() {

  const {getuser, getMyPlaylists, getMyTopTracks, getMyTopArtists, getFollowing, getCurrentPlayed , myPlayingStatus} = useEndpoint()
  const { user, loading, accessToken, spotifyApi } = useStateVal()
  const [tracksState, setTracksState] = useState(true)
  const [artistsState, setArtistsState] = useState(true)
  const [playlistsState, setPlaylistsState] = useState(true)
  const [followingState, setFollowingState] = useState(true)

let openRef = useRef(false)

  useEffect(() => {
    if(openRef.current) return;

    if (accessToken){
      // console.log("running get me");
      // console.log("accessToken in get me", accessToken);
      // console.log("spotifyApi in get me", spotifyApi);
      // getMe();
      getuser()

    }

    openRef.current = true;
  }, [])

  useEffect(() => {
    if (loading) {
      // console.log('user is now available', user);
      // console.log('is user null ', user === "");
      getMyTopTracks(setTracksState)
      getMyTopArtists(setArtistsState)
      getMyPlaylists(user.id, setPlaylistsState)
      getFollowing(setFollowingState)
      getCurrentPlayed()
      myPlayingStatus()
      
    }

  }, [loading])












  return <>
    {(tracksState && artistsState && playlistsState && followingState) ? <Loader /> :
      <HomeContainer>
        <Sidebar />
        <Main />
        <Footer />


      </HomeContainer>
    }
  </>
}

export default Home