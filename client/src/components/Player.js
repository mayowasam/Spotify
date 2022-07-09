import styled from "styled-components"
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from "react-icons/bs"
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg"
import { FiRepeat } from 'react-icons/fi'
import { useStateVal } from "../imports"
import useEndpoint from "../utils/Endpoint"
import { useState } from "react"

const Container = styled.div`
width: 100%;
height:100%;
display:flex;
align-items: center;
flex-direction: column;
gap: .5rem;
// border: 2px solid red;







@media (max-width:700px){
    
  
}

`

const Progress = styled.div`
display:flex;
align-items: center;
justify-content: center;
gap: .2rem;
color: white;
font-size: .8rem;
width: 100%;

div{
    width: 80%;

    .range {
        -webkit-appearance: none;
        // margin: 18px 0;
        width: 100%;
    }
    .range:focus {
        outline: none;
    }
    .range::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        background: white;
        border-radius: 1.3px;
        border: 0.2px solid #010101;
    }
    .range::-webkit-slider-thumb {
        // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        // border: 1px solid #000000;
        height: 15px;
        width: 15px;
        border-radius: 3px;
        // background: #ffffff;
        background: transparent;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -5px;   
     }
   

}



@media (max-width:700px){
  display: none;  
  
}




`



const Content = styled.div`
width: 100%;
height:100%;
display:flex;
align-items:center;
justify-content: center;
// border: 2px solid blue;

gap: 2rem;



svg{
    color: #b3b3b3 ;
    cursor: pointer;
    font-size:2rem;
    transition: 0.2s ease-in-out;
    &:hover{
        color:white;
    }
}



@media (max-width:700px){
    gap: 1rem;
    svg{
        font-size:1rem;
       
    }
  
}



`

const Shuffled = styled.div`
// svg {
//     color: ${props => props.shuffle === false ? "red" : "blue"} ;

// };


`

function Player() {

    const { playerState, currentPlaying, setPlayerState, shuffle, setShuffle, formatDuration } = useStateVal()
    const { playerNext, playerPrev, playMusic, pauseMusic, RepeatMusic, shuffleMusic, seekPosisition } = useEndpoint()
    const [position, setPosition] = useState(100)

    // console.log("currentPlaying", currentPlaying);
    
    const ToggleShuffle = () => {
        setShuffle(!shuffle)
        if (!shuffle) {
            shuffleMusic(true)

        }
    }

    const Repeat = (track) => {
        RepeatMusic(track)
        // shuffleMusic(shuffle)
    }

    const DirectionTrack = (direction) => {
        // console.log(direction);
        // console.log('prev', direction ==="prev");
        // console.log('next', direction ==="next");
        if (direction === "prev") {
            playerPrev()

        } else {
            playerNext()

        }



    }

    // console.log('playState', playerState);
    // console.log("shuffle val", shuffle);


    const changePlayState = () => {
        setPlayerState(!playerState)
        console.log('playerState inside', playerState);

        if (playerState) {
            console.log('playerState inside', playerState);
            pauseMusic()


        } else {
            playMusic()

        }



    }

    const seekPosition = (e, time) => {
        console.log(e.target.value);
        console.log(time);

        let val = ((time * e.target.value)/ 100).toFixed(0)
        console.log("val", val);
        seekPosisition(val)
        // seekPosisition(Number(val))

    }





    return <Container>
        {
            playerState &&
            <Progress>
                <p>0.00</p>
          
                <div >
                    <input className="range" type="range" name="" min={0} max={100} value={position} onChange={e => seekPosition(e, currentPlaying.time)}/>

                </div>
                <p>{currentPlaying && formatDuration(currentPlaying.time)}</p>
            </Progress>
        }
        <Content>

            <Shuffled className="shuffle" onClick={ToggleShuffle} shuffle={shuffle}>
                <BsShuffle />

            </Shuffled>
            <div className="prev">
                <CgPlayTrackPrev onClick={() => DirectionTrack("prev")} />

            </div>
            <div className="state">
                {
                    playerState ? <BsFillPauseCircleFill onClick={changePlayState} /> : <BsFillPlayCircleFill onClick={changePlayState} />
                }

            </div>
            <div className="next">
                <CgPlayTrackNext onClick={() => DirectionTrack("next")} />

            </div>

            <div className="repeat">
                <FiRepeat onClick={() => Repeat()} />

            </div>


        </Content>

    </Container>
}

export default Player