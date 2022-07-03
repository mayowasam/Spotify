import styled from "styled-components"
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from "react-icons/bs"
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg"
import { FiRepeat } from 'react-icons/fi'
import { useStateVal } from "../imports"
import useEndpoint from "../utils/Endpoint"

const Container = styled.div`
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

    const { playerState, setPlayerState, shuffle, setShuffle } = useStateVal()
    const { playerNext, playerPrev, playMusic, pauseMusic, RepeatMusic, shuffleMusic } = useEndpoint()


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

    // const changeTracks = (trackid) => {

    // }





    return <Container>
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



    </Container>
}

export default Player