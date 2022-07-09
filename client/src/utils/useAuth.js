import { useEffect, useState } from 'react'
import axios from 'axios'
import { useStateVal } from './StateProvider'


export default function useAuth(code) {
    const {
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        dispatch
    } = useStateVal()

    const [present, setPresent] = useState(false)




    // console.log("stored refreshToken", refreshToken);


    //i want to send back the refresh token i got from my server to the backend
    const Time = 3600 * 1000
    const getTimeGotten = localStorage.getItem("timeGotten")


    // console.log("newdate", (Date.now() - getTimeGotten));
    // console.log("time", Time);
    // console.log("present", present);


    useEffect(() => {
        if(getTimeGotten && getTimeGotten !== undefined){
            const Timer = setInterval(() => {
                setPresent((Date.now() - getTimeGotten) > Time)
                // setPresent(Date.now() )
    
            }, 1000)
            return () => clearInterval(Timer)

        }

    }, [])




    useEffect(() => {
        // console.log("building")
        // console.log("code", code)
        const getToken = async () => {
            try {
                // const { data } = await axios.post("http://localhost:5000/login", { code })
                const { data } = await axios.post(`${process.env.REACT_APP_URI}/login`, { code })
                // console.log('login data '.data);
                setAccessToken(data.accesstoken)
                setRefreshToken(data.refreshtoken)
                dispatch({ type: 'ADD_TOKEN', payload: data.accesstoken })
                // console.log('useauth accesstoken', data.accesstoken);
                localStorage.setItem("accessToken", data.accesstoken)
                localStorage.setItem("refreshtoken", data.refreshtoken)
                localStorage.setItem("timeGotten", Date.now())
                window.history.pushState({}, null, '/') // to clear the url

            } catch (error) {
                // window.location = "/"
                console.log(error);
            }

        }
        if (code) {
            // console.log("running login")
            getToken()
        }

    }, [code, setAccessToken, setRefreshToken])


    useEffect(() => {
        if (!refreshToken) return;
        // console.log("checking timeRefresh", present);
        axios.post(`${process.env.REACT_APP_URI}/refresh`, { refreshToken })
            .then(response => {
                // console.log(response.data)
                // window.history.pushState({}, null, '/') // to clear the url
                setAccessToken(response.data.newAccessToken)
                localStorage.setItem("accessToken", response.data.newAccessToken)
                localStorage.setItem("timeGotten", Date.now())

            })
            .catch(err => {
                // window.location = "/"
                console.log(err);
            })
        // axios.post(`${process.env.REACT_APP_URI}/refresh`, { refreshToken })
    }, [present])




    return accessToken


}

