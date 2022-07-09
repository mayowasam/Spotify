import styled from 'styled-components'

const LoginContainer = styled.div`
    width:100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;


      

        a{
        background-color: #1db945;
        display: inline-block;
        padding: 1rem;
        border-radius: 5rem;
        font-weight: 800;
        color: white;
        text-decoration: none;
        }
`


// console.log(process.env.REACT_APP_URI);
// redirect_uri=http://localhost:3000&
// redirect_uri=${process.env.REACT_APP_URI}&




function Login() {
    const authEndPoint = `
    https://accounts.spotify.com/authorize?client_id=
${process.env.REACT_APP_CLIENT_ID}&
response_type=code&
redirect_uri=${process.env.REACT_APP_URI}&
scope=streaming%20
user-read-private%20
user-read-email%20
user-read-recently-played%20
user-top-read%20
user-follow-read%20
user-follow-modify%20
playlist-read-private%20
playlist-read-collaborative%20
playlist-modify-public%20
user-modify-playback-state%20
user-read-playback-state%20
user-read-playback-position%20
user-library-read%20
user-library-modify
    `
    return <>
        <LoginContainer>
            <a href={authEndPoint}>Login With Spotify</a>
        </LoginContainer>
    </>
}

export default Login