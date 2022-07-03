import { useStateVal } from "./StateProvider";
import axios from 'axios'

function useEndpoint() {
    const { spotifyApi, dispatch, setTopTracks, setMyTopArtists, setPlayList, setArtist, setArtistAlbum, setArtistTopTracks, setAlbum, setRelatedArtists, setPlaylistArtistsAppear, setSearchTracks, setfeaturedSong, setfeaturedAllSong, setRecent, setCurrentlyPlaying, accessToken, setPlayerState } = useStateVal()

    const getMe = async () => {
        // console.log('getting user');

        try {
            const { body } = await spotifyApi.getMe()
            // console.log('Some information about the authenticated user', body);
            let uri = body.uri.split(':')[2];
            const smallest = body.images.reduce((smallest, image) => {
                if (image.height < smallest.height) return image
                return smallest
            }, body.images[0])
            // console.log('smallest', smallest);
            dispatch({
                type: "ADD_USER",
                payload: {
                    name: body.display_name,
                    followers: body.followers.total,
                    img: smallest?.url,
                    id: uri
                }
            })

        } catch (err) {
            // console.log('Something went wrong!', err);
            // console.log('Status', err.statusCode);
            // console.log('body', err.body);
            // console.log('message', err.message);
            if (err.statusCode === 401 && err.body.error.message === "The access token expired") {
                console.log("yea access token expired");
                localStorage.removeItem("accessToken");
            }

        }

    }

    const getMyPlaylists = async (id, setPlaylistsState) => {
        // console.log('getting playlist');
        // console.log('id', id);
        try {
            setPlaylistsState(true)
            const { body } = await spotifyApi.getUserPlaylists(id)
            // console.log('Retrieved playlists', body);
            if (body) setPlaylistsState(false)
            const playlists = body.items.map(({ name, id, images, owner, tracks }) => {

                const imageurl = images ? images.reduce((smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, images[0]) : ""

                return {
                    imageurl: imageurl ? imageurl.url : "",
                    name,
                    id,
                    tracks,
                    owner: owner.display_name
                }

            })
            // console.log('playlists', playlists);
            // setPlaylist(playlists)
            dispatch({
                type: "ADD_PLAYLISTS",
                payload: {
                    number: body.total,
                    items: playlists
                }
            })

        } catch (err) {
            console.log('Something went wrong!', err);
            // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {
            //     // console.log("access token expired");
            //     localStorage.removeItem("accessToken");
            // }

        }
    }


    const getMyTopTracks = (setTracksState) => {
        /* Get a User’s Top Tracks*/
        setTracksState(true)
        spotifyApi.getMyTopTracks()
            .then(function (data) {
                // console.log(data.body.items);
                // let topTracks = data.body.items;
                setTracksState(false)

                // const smallest = data.body.items.album.images.reduce((smallest, image) => {
                //     if (image.height < smallest.height) return image
                //     return smallest
                // },  data.body.items.album.images[0]) 
                // console.log('smallest', smallest.url);

                const tracks = data.body.items.map(({ name, id, external_urls, album, artists, duration_ms ,track_number}) => {
                    let artistName = artists.map(artist => {
                        return artist
                    })

                    return {
                        name,
                        id,
                        external_urls,
                        img: album.images[0].url,
                        artistName,
                        duration: duration_ms,
                        uri: album.uri,
                        track_number

                    }
                })

                // console.log(tracks);
                setTopTracks(tracks)


            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }

            });
    }




    const getMyTopArtists = (setArtistsState) => {
        /* Get a User’s Top Artists*/
        setArtistsState(true)
        spotifyApi.getMyTopArtists()
            .then(function (data) {
                setArtistsState(false)
                // console.log(data.body);
                setMyTopArtists(data.body.items)
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });

    }

    /* Get followed artists */
    const getFollowing = (setFollowingState) => {
        setFollowingState(true)
        spotifyApi.getFollowedArtists({ limit: 1 })
            .then(function (data) {
                setFollowingState(false)
                // 'This user is following 1051 artists!'
                // console.log('This user is following ', data.body.artists.total, ' artists!');
                dispatch({
                    type: "ADD_FOLLOWING",
                    payload: data.body.artists.total
                })
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });
    }


    // Get an album
    const getAnAlbum = (id, setLoading) => {
        setLoading(true)
        spotifyApi.getAlbum(id)
            .then(function (data) {
                console.log('Album information', data.body);
                setLoading(false)
                setAlbum(data.body)
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });

    }

    // Get an artist
    const getAnArtist = (id, setLoading) => {
        setLoading(true)
        spotifyApi.getArtist(id)
            .then(function (data) {
                setLoading(false)
                // console.log('Artist information', data.body);
                setArtist(data.body)
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });

    }
    // Get albums by a certain artist
    const getAlbumByArtist = (id) => {
        spotifyApi.getArtistAlbums(id)
            .then(function (data) {
                // console.log('Artist albums', data.body);
                setArtistAlbum(data.body.items)
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });

    }

    // Get tracks in an album
    const tracksInAlbum = () => {
        spotifyApi.getAlbumTracks('41MnTivkwTO3UUJ8DrqEJJ', { limit: 5, offset: 1 })
            .then(function (data) {
                // console.log(data.body);
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });

    }


    // Get an artist's top tracks
    const getArtistTopTracks = (id) => {
        spotifyApi.getArtistTopTracks(id, 'GB')
            .then(function (data) {
                // console.log('top artists', data.body);
                setArtistTopTracks(data.body.tracks)
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });

    }

    // Get artists related to an artist
    const getRelatedArtists = (id) => {
        spotifyApi.getArtistRelatedArtists(id)
            .then(function (data) {
                // console.log('related artist', data.body);
                setRelatedArtists(data.body.artists)
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });

    }

    const getPlaylist = (id, setLoading) => {
        setLoading(true)

        // Get a playlist

        spotifyApi.getPlaylist(id)
            .then(function (data) {
                // console.log('Some information about this playlist', data.body);
                setLoading(false)
                return setPlayList({
                    image: data.body.images ? data.body.images[0]?.url : "",
                    name: data.body.name,
                    tracksTotal: data.body.tracks.total,
                    item: data.body.tracks.items,
                    owner: data.body.owner.display_name,
                    uri: data.body.uri

                })
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });
    }

    const getPlaylistArtistAppear = (id) => {
        spotifyApi.getRecommendations({
            min_energy: 0.4,
            seed_artists: [id],
            min_popularity: 50
        })
            .then(function (data) {
                // let recommendations = data.body;
                // console.log('recommendations', recommendations);
                setPlaylistArtistsAppear(data.body.tracks)
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });

    }

    const getSearch = (id) => {
        spotifyApi.searchTracks(id)
            .then(function (data) {
                // console.log(`Search by ${id}`, data.body);
                setSearchTracks(data.body.tracks.items)
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });
    }





    // Get Current User's Recently Played Tracks
    const myRecentlyPlayed = (setLoading) => {
        setLoading(true)
        spotifyApi.getMyRecentlyPlayedTracks({
            limit: 20
        }).then(function (data) {
            setLoading(false)
            // Output items
            // console.log("Your 20 most recently played tracks are:");
            setRecent(data.body.items)
        }, function (err) {
            console.log('Something went wrong!', err);
            // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

            //     // console.log("access token expired");
            //     localStorage.removeItem("accessToken");
            // }
        });
    }

    const Featured = (setLoading) => {
        setLoading(true)
        spotifyApi.getNewReleases({ limit: 4, offset: 0, country: 'NG' })
            .then(function (data) {
                setLoading(false)
                // console.log('featured', data.body);
                setfeaturedSong(data.body.albums)
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });


    }

    const FeaturedAll = (setLoading) => {
        setLoading(true)
        spotifyApi.getNewReleases({ limit: 20, offset: 0, country: 'NG' })
            .then(function (data) {
                setLoading(false)
                // console.log('featured', data.body);
                setfeaturedAllSong(data.body.albums)
            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });


    }


    const myPlayingStatus = async () => {
        try {
            const data = await spotifyApi.getMyCurrentPlaybackState()
            if (data.body && data.body.is_playing) {
                // console.log('playingstatus', data.body.is_playing);
                setPlayerState(true)
                // console.log("User is currently playing something!");
            } else {
                setPlayerState(false)
                // console.log("User is not playing anything, or doing so in private.");
            }
        } catch (err) {
            console.log('Something went wrong!', err);

        }
    }

    const getCurrentPlayed = () => {
        spotifyApi.getMyCurrentPlayingTrack()
            .then(function (data) {

                // console.log('Now playing: ' + data.body);
                // console.log('Now playing: ' + data.body.item.name);
                setCurrentlyPlaying({

                    id: data.body.item.id,
                    name: data.body.item.name,
                    artists: data.body.item.artists.map(artist => artist.name),
                    image: data.body.item.album.images[1].url

                })

            }, function (err) {
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });
    }




    //Seek To Position In Currently Playing Track
    const seekPosisition = (positionMs) => {

        spotifyApi.seek(positionMs)
            .then(function () {
                // console.log('Seek to ' + positionMs);
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
            });
    }








    // // Skip User’s Playback To Next Track
    const playerNext = async () => {
        try {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            const data = await spotifyApi.skipToNext()
            // console.log(data);
            if (data.statusCode === 204) {
                // console.log("yea");
                getCurrentPlayed()
                myPlayingStatus()
            }

        } catch (err) {
            console.log('Something went wrong!', err);
            // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

            //     // console.log("access token expired");
            //     localStorage.removeItem("accessToken");
            // }

        }

    }

    // Skip User’s Playback To Previous Track 
    const playerPrev = async () => {
        try {
            const data = await spotifyApi.skipToPrevious()
            console.log(data);
            if (data.statusCode === 204) {
                console.log("yea");
                getCurrentPlayed()
                myPlayingStatus()

            }
            // console.log('Skip to previous');

        } catch (err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
            // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

            //     // console.log("access token expired");
            //     localStorage.removeItem("accessToken");
            // }

        }

    }


    //api calls


    const headers = {
        "Accept": "application/json",
        'Authorization': `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    }

    const play = async (track, type, number) => {
        // console.log("track", track);
        try {
            

            const data = await axios.put("https://api.spotify.com/v1/me/player/play", {
                // context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
                context_uri: track, 
                offset: {
                    position: type=== "album" ? 0 : number
                },
                position_ms: 0
            }, {
                headers
            })

            // console.log("now playing",data);
            if(data.status === 204){
                // console.log("yea");
                getCurrentPlayed()
                myPlayingStatus()

            }
        } catch (error) {
            console.log(error);

        }

    }






    // // Start/Resume a User's Playback 
    const playMusic = async () => {
        try {
            await spotifyApi.play()
            // console.log('play', data);


            // console.log('Playback started');

        } catch (err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
            // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

            //     // console.log("access token expired");
            //     localStorage.removeItem("accessToken");
            // }

        }
    }

    // Pause a User's Playback
    const pauseMusic = async () => {
        try {
            await spotifyApi.pause()
            // console.log('pause', data);


            // console.log('Playback paused');

        } catch (err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
            // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

            //     // console.log("access token expired");
            //     localStorage.removeItem("accessToken");
            // }

        }
    }




    // // Set Repeat Mode On User’s Playback
    const RepeatMusic = (track) => {
        spotifyApi.setRepeat(track)
            .then(function () {
                console.log('Repeat track.');
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });
    }

    // // Toggle Shuffle For User’s Playback
    const shuffleMusic = (val) => {
        spotifyApi.setShuffle(val)
            .then(function () {
                console.log('Shuffle is on.');
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });
    }

    // // Set Volume For User's Playback
    const adjustVolume = (vol) => {
        spotifyApi.setVolume(vol)
            .then(function () {
                // console.log('Setting volume to 50.');
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
                // if (err.statusCode === 401 && err.body.error.message === "The access token expired") {

                //     // console.log("access token expired");
                //     localStorage.removeItem("accessToken");
                // }
            });
    }


    return {
        getMe,
        getMyPlaylists,
        getMyTopTracks,
        getMyTopArtists,
        getAnAlbum,
        getAnArtist,
        getAlbumByArtist,
        tracksInAlbum,
        getArtistTopTracks,
        getRelatedArtists,
        getPlaylist,
        getFollowing,
        getPlaylistArtistAppear,
        getSearch,
        myRecentlyPlayed,
        Featured,
        FeaturedAll,
        getCurrentPlayed,
        playerNext,
        playerPrev,
        play,
        playMusic,
        pauseMusic,
        shuffleMusic,
        RepeatMusic,
        adjustVolume,
        seekPosisition,
        myPlayingStatus





    }


}

export default useEndpoint

