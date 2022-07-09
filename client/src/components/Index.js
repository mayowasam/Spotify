import { Link } from "react-router-dom"
import styled from "styled-components"
import {useStateVal } from "../imports"
import  avatar from '../assets/user.png'
import useEndpoint from "../utils/Endpoint"


export const Container = styled.nav`
width:100%;
padding: 1rem;
margin-top: 5rem;
color: white;

@media (max-width: 700px){
    margin: 5rem 0;
 
}
`
const Top = styled.div`
width: 100%;
// border: 2px solid green;
display: flex;
flex-direction: column;
align-items: center;
gap: .5rem;
margin-bottom: 1rem;

`
const Avatar = styled.div`
width: 8rem;
height: 8rem;
// border: 2px solid red;
border-radius: 50%;
overflow: hidden;

img{
    max-width: 100%;
    max-height: 100%;
}
`

const Name = styled.h1`
font-size: 2.5rem;
text-transform: capitalize;

`

const FollowStats = styled.div`
display: flex;
width: 15rem;
margin: 1rem 0;
// border: 2px solid red;
justify-content: space-between;
align-items: center;

div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    span{
        color: #1db945;
        font-weight: bold;
        font-size: 1.2rem;
    }


    p{
        text-transform: uppercase;
        font-size: .7rem;
        color: grey;

    }
}
`

const Button = styled.button`
margin: 1rem 0;
text-transform: uppercase;
font-size: .6rem;
color: white;
background: rgb(0, 0, 0, .4);
border: .1em solid white;
// padding .5rem 1rem;
outline: none;
border-radius: 20px;
cursor: pointer;

a{
    text-decoration: none;
    display: inline-block;
    color: white;
    padding .5rem 1rem;

    &:hover{
        color: grey;
    
    }

}



`

const LogoutButton = styled.button`
margin: 1rem 0;
text-transform: uppercase;
font-size: .6rem;
color: white;
background: rgb(0, 0, 0, .4);
border: .1em solid white;
padding .5rem 1rem;
outline: none;
border-radius: 20px;
cursor: pointer;


    &:hover{
        color: grey;
    
    }





`
export const Middle = styled.section`
display: flex;
width: 100%;

@media (max-width: 700px){
   flex-direction: column;
   gap:1rem;
 
}




`

const MiddleContainer = styled.div`
width: 50%;
display: flex;
flex-direction: column;
// border: .5px solid white;
padding:0 2rem;


.middleheader{
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border: 2px solid red;
    margin-bottom: 2rem;

    h1{
        font-size: 1rem;
    }

}

@media (max-width: 700px){
    width: 100%;

    .middleheader{ 
        h1{
            font-size: .8rem;
        }
    }
 
}

`
export const Middlecontent = styled.div`
display: flex;
flex-direction: column;
gap: 1.5rem;

a{
    text-decoration: none; 
    color: white;

     &:hover{

        .title{
    
            &>:last-child{
                color: grey;
               
            }
          
        }
    }


}

.middlecontent{
    // border: 1px solid yellow;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    .img{
        width: 3rem;
        height: 3rem;
        overflow:hidden;
        // border: 1px solid red;
        border-radius: 50%;

        img{
            width: 100%;
            height: 100%;
        }
    }

    p{
        font-size: .8rem;
        font-weight: 200px;
        text-transform: capitalize;
        margin-left: 1rem;

    }

    .time{
        margin-left: auto;
    }

    .title{
        &>:first-child{
        font-size: 1rem;
        padding: .3rem 0;

        @media (max-width: 700px){
                font-size: .8rem;
        }
    }

        // &>:last-child{
            
        // }
        .artistname{
            color: grey;
            display: flex;
            align-items: center;
        }

    
      
    }


    &:hover{
        color: grey;
    
    }

    


}






`


function Index() {
    const { user, playlists, topTracks, myTopArtists, formatDuration } = useStateVal()
    const {play} =useEndpoint()

    const logOut = () => {
        localStorage.removeItem("accessToken");
        window.location.assign('/')

    }

    // console.log(myTopArtists);
    // console.log(playlists);
    // console.log('index topTracks', topTracks);
    return <Container>
        <Top>
            <Avatar>
                <img src={user.img ? user.img : avatar} alt="" />
            </Avatar>

            <Name>{user.name}</Name>

            <FollowStats>
                <div>
                    {/* <span>1</span> */}
                    <span>{user.followers}</span>
                    <p>followers</p>
                </div>
                <div>
                    {/* <span>1</span> */}
                    <span>{user.following}</span>
                    <p>following</p>
                </div>
                <div>
                    {/* <span>1</span> */}
                    <span>{playlists.number}</span>
                    <p>playlists</p>
                </div>


            </FollowStats>

            <LogoutButton onClick={logOut}>Logout</LogoutButton>


        </Top>
        <Middle>
            <MiddleContainer>
                <div className="middleheader">
                    <h1>Top Artists of All Time</h1>
                    <Button><Link to='artists'> see More</Link> </Button>

                </div>

                <Middlecontent>
                    {myTopArtists.length > 0 && (myTopArtists.map((artist) => {
                        const smallest = artist.images && artist.images.reduce((smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        }, artist.images[0])

                        return (
                            <Link to={`artists/${artist.id}` } key={artist.id}>
                            <div className="middlecontent" >
                                <div className="img">
                                    <img src={smallest.url} alt="" />

                                </div>
                                <div className="title">
                                    <p>{artist.name}</p>

                                </div>

                            </div>

                            </Link>

                        )
                    }))}
                </Middlecontent>

            </MiddleContainer>

            <MiddleContainer>

                <div className="middleheader">
                    <h1>Top Tracks of All Time</h1>
                    <Button><Link to='tracks'> see More</Link> </Button>

                </div>
                <Middlecontent>



                    {topTracks.map(track => (


                        <div className="middlecontent" key={track.id} onClick={() => play(track.uri, "track", (track.track_number-1))}>
                            {/* to play track.external_urls */}
                            <div className="img">
                                <img src={track.img} alt="" />

                            </div>
                            <p>{track.name}</p>
                            {/* <div className="title">
                                <p>sundown</p>
                                <p>zara larsson</p>

                            </div> */}

                            <div className="time">
                                <p>{formatDuration(track.duration)}</p>
                            </div>
                        </div>
                     ))}
                </Middlecontent>

            </MiddleContainer>


        </Middle>

    </Container>
}

export default Index