import { useState, 
    useEffect, 
    createContext, useContext, useReducer } from "react";
import SpotifyWebApi from 'spotify-web-api-node'
import {initialState, reducer} from './reducer'




const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET
});



const StateContext = createContext()



function StateProvider({ children }) {
    const [accessToken, setAccessToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [expireIn, setExpiresIn] = useState()
    const [topTracks, setTopTracks] = useState([])    
    const [myTopArtists, setMyTopArtists] = useState([])    
    const [playlist, setPlayList] = useState({})    
    const [artist, setArtist] = useState()    
    const [artistAlbum, setArtistAlbum] = useState([])    
    const [album, setAlbum] = useState()    
    const [artistTopTracks, setArtistTopTracks] = useState([])    
    const [relatedartists, setRelatedArtists] = useState([])    
    const [playlistArtistsAppear, setPlaylistArtistsAppear] = useState([])    
    const [searchTracks, setSearchTracks] = useState([])    
    const [featuredSong, setfeaturedSong] = useState()    
    const [featuredAllSong, setfeaturedAllSong] = useState()    
    const [recent, setRecent] = useState([])    
    const [currentPlaying, setCurrentlyPlaying] = useState()    
    const [playerState, setPlayerState] = useState(false)    
    const [shuffle, setShuffle] = useState(false)    
// console.log('token', token);


// console.log('stateprovider expires', expireIn);

    useEffect(() => {
        setAccessToken(localStorage.getItem("accessToken"))
        setRefreshToken(localStorage.getItem("refreshtoken"))
        setExpiresIn(localStorage.getItem("expiresin"))
    }, [accessToken, refreshToken, expireIn])

    const formatDuration = (ms) => {
        const minutes = Math.floor(ms/60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds} `

    }

   



    const [state, dispatch] = useReducer(reducer, initialState)


    return <StateContext.Provider value={{
        ...state,
        spotifyApi,
        accessToken,
        refreshToken,
        expireIn,
        setAccessToken,
        setRefreshToken,
        setExpiresIn,
        dispatch, 
        topTracks, 
        setTopTracks,
        myTopArtists, 
        setMyTopArtists,
        playlist, 
        setPlayList,
        formatDuration,
        artist,
         setArtist,
         artistTopTracks, 
         setArtistTopTracks,
         artistAlbum, 
         setArtistAlbum,
         album, 
         setAlbum,
         relatedartists, 
         setRelatedArtists,
         playlistArtistsAppear, 
         setPlaylistArtistsAppear,
         searchTracks, 
         setSearchTracks,
         featuredSong, 
         setfeaturedSong,
         recent, 
         setRecent,
         currentPlaying, 
         setCurrentlyPlaying,
         featuredAllSong, 
         setfeaturedAllSong,
         playerState, 
         setPlayerState,
         shuffle, 
         setShuffle
    }}>
        {children}
    </StateContext.Provider>
}

export const useStateVal = () => useContext(StateContext)

export default StateProvider