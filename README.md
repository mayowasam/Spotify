Spotify P
A web app for visualizing personalized Spotify data.View your top artists, top tracks, recently played tracks, and detailtrack. Also play and search for tracks and albums and more.


Built with a bunch of things, but to name a few:

Spotify Web API
Create React App
Express
Reach Router
Styled Components
npm Spotify-web-node


Setup
Register a Spotify App and add http://localhost:3000 as a Redirect URI in the app settings

Create an .env file inside root of both the client and server of the project respectively

client .env
REACT_APP_URI='http://localhost:5000'
REACT_APP_CLIENT_SECRET="your_spotify_secret"
REACT_APP_CLIENT_ID="your_spotify_id"

server .env
URI='http://localhost:3000'
PORT=5000
CLIENT_SECRET="your_spotify_secret"
CLIENT_ID="your_spotify_id"



cd client && npm install
cd server && npm install

cd server  && npm run dev

Deploying to Heroku
cd client && run npm build
drop the build folder in the server file

heroku create app-name
Set Heroku environment variables

heroku config:set REACT_APP_URI
heroku config:set REACT_APP_CLIENT_ID=XXXXX
heroku config:set REACT_APP_CLIENT_SECRET=XXXXX
heroku config:set CLIENT_ID=XXXXX
heroku config:set CLIENT_SECRET=XXXXX

Push to Heroku

git push heroku master
Add http://app-name.herokuapp.com/callback as a Redirect URI in the spotify application settings

Once the app is live on Heroku, hitting http://app-name.herokuapp.com/login should be the same as hitting http://localhost:5000/login