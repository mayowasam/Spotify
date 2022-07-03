import { useEffect, } from "react";
import { Route, Routes } from "react-router-dom";
import {Home, Recent, Index, Search, Library, Playlist, TopTracks, Artists, Artist, Album, Login, ScrollTop, useStateVal, Feature} from "./imports";
import { GlobalStyles } from "./styles/globalstyles";
import ArtistOulet from "./components/ArtistOutlet";
import useAuth from "./utils/useAuth";
import PlaylistOulet from "./components/PlaylistOutlet";




function App() {
  const { accessToken: token, spotifyApi } = useStateVal()
  // console.log(useStateVal());
  const code = new URLSearchParams(window.location.search).get('code')
  // console.log('code', code);

  const accessToken = useAuth(code)

  // console.log('app stateprovider token', token);
  // console.log(' app useAuth token', accessToken);

  useEffect(() => {

    if (accessToken) {
      // console.log('setting accessToken');
      spotifyApi.setAccessToken(accessToken)
    }

  }, [accessToken])








  return (
    <>
      <GlobalStyles />
      <ScrollTop>
        <Routes>


        <Route path="/" element={token ? <Home /> : <Login />}>
        {/* <Route path="/" element={<Home/>}> */}


            <Route index element={<Index />} />
            <Route path="search" element={<Search />} />
            <Route path="library" element={<Library />} />
            <Route path="recent" element={<Recent />} />
            <Route path="feature" element={<Feature />} />

            <Route path="tracks" element={<TopTracks />} />

            <Route path="album/:id" element={<Album />} />

            <Route path="playlist" element={<PlaylistOulet />} >
              <Route path=":id" element={<Playlist />} />

            </Route >

            <Route path="artists" element={<ArtistOulet />} >
              <Route index element={<Artists />} />
              <Route path=":id" element={<Artist />} />
            </Route>


          </Route>

        </Routes>
      </ScrollTop>

    </>
  );
}

export default App;
