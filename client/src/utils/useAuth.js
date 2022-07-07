import { useEffect } from 'react'
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




    console.log("stored refreshToken", refreshToken);


    //i want to send back the refresh token i got from my server to the backend
    const Time = 3600 * 1000
    const getTimeGotten = () => localStorage.getItem("timeGotten")
    const timeTrefresh = Date.now() - getTimeGotten() > Time



    useEffect(() => {
        const getToken = async () => {
            try {
                // const { data } = await axios.post("http://localhost:5000/login", { code })
                const { data } = await axios.post(`${process.env.REACT_APP_URI}/login`, { code })
                console.log(data);
                setAccessToken(data.accesstoken)
                setRefreshToken(data.refreshtoken)
                dispatch({ type: 'ADD_TOKEN', payload: data.accesstoken })
                // console.log('useauth accesstoken', data.accesstoken);
                localStorage.setItem("accessToken", data.accesstoken)
                localStorage.setItem("refreshtoken", data.refreshtoken)
                localStorage.setItem("timeGotten", Date.now())
                window.history.pushState({}, null, '/') // to clear the url

            } catch (error) {
                window.location = "/"
                console.log(error);
            }

        }

        getToken()
    }, [code, setAccessToken, setRefreshToken])


    useEffect(() => {
        if (!refreshToken) return;
        console.log("checking", Date.now() - getTimeGotten() > Time);

        if (timeTrefresh) {
            axios.post(`${process.env.REACT_APP_URI}/refresh`, { refreshToken })
                .then(response => {
                    console.log(response.data)
                    // window.history.pushState({}, null, '/') // to clear the url
                    setAccessToken(response.data.newAccessToken)
                    localStorage.setItem("accessToken", response.data.newAccessToken)
                    localStorage.setItem("timeGotten", Date.now())

                })
                .catch(err => {
                    window.location = "/"
                    console.log(err);
                })
        }

        // axios.post(`${process.env.REACT_APP_URI}/refresh`, { refreshToken })
    }, [timeTrefresh])




    return accessToken


}

