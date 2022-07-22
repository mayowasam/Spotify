require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')
const path = require('path')

app.use(cors({
    origin: ['http://localhost:3000'],
    // origin: "https://mayowaspotify.herokuapp.com",

    credentials: true
}))


app.use(express.json({ urlencoded: false }))

// app.get('/', (req, res) =>{
//     res.send("working")
// })

app.use(express.static(path.join(__dirname, "build")))

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "build", "index.html"))
})


app.post('/login', async (req, res) => {
console.log("login server running");
    const { code } = req.body
    console.log('code', code);
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.URI
    });
    try {
        const data = await spotifyApi.authorizationCodeGrant(code) 
        // console.log('author', data);
        res.json({
            accesstoken: data.body.access_token,
            expiresin: data.body.expires_in,
            refreshtoken: data.body.refresh_token
            

        })

    } catch (error) {
        // console.log(error);
    }


})


app.post('/refresh', (req, res) => {
    const { refreshToken } = req.body
    console.log("refreshToken", refreshToken);
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.URI,
        refreshToken 
    });

    spotifyApi.refreshAccessToken().then((data) => {
        console.log('data body with refresh', data.body);
        res.json({
            newAccessToken: data.body.access_token,
            newExpiresIn: data.body.expires_in
        })

    }).catch(err => {
        res.send(err)
    });
})





app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`))