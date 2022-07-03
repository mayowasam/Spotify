import { useEffect, useState } from "react"
import styled from "styled-components"
import useEndpoint from "../utils/Endpoint"

const Container = styled.div`
width: 100%;
height:100%;
display:flex;
align-items:center;
justify-content: flex-end;
// border: 2px solid blue;

input[type=range]{
    cursor: pointer;
    // -webkit-appearance: none;

    @media (max-width:700px){
        width: 5rem;
    }
    
}

// input[type=range]::-webkit-slider-runnable-track{
//     width: 300px;
//     height: 5px;
//     border-radius: 3px
// };

// input[type=range]::-webkit-slider-thumb{
//     -webkit-appearance: none;
//     width: 16px;
//     height: 16px;
//     border-radisu: 100%;
//     background: goldenrod;
//     margintop:-4px;

// }

// input[type=range]:focus{
//     outline: none
// }

// input[type=range]:focus::-webkit-slider-runnable-track{
//     background: red;

// }



`
function Volume() {
    const [volume, setVolume] = useState(50)
    const { adjustVolume } = useEndpoint()

    useEffect(() => {
        adjustVolume(volume)
    }, [volume])
    // console.log("volume",volume);
    return <>
        <Container>

            <input type="range" name="" min={0} max={100} value={volume}  onChange={e => {
                console.log(e);
                setVolume(e.target.value)}} />
        </Container>

    </>
}

export default Volume