import { useEffect } from 'react'
import axios from 'axios'
import { useStateVal } from './StateProvider'


export default function useAuth(code) {
    const {
        accessToken,
        refreshToken,
        expireIn,
        setAccessToken,
        setRefreshToken,
        setExpiresIn,
        dispatch
    } = useStateVal()




console.log("stored refreshToken", refreshToken);


    //i want to send back the refresh token i got from my server to the backend



    useEffect(() => {
        const getToken = async () => {
            try {
                const { data } = await axios.post("http://localhost:5000/login", { code })
                console.log(data);
                setAccessToken(data.accesstoken)
                setRefreshToken(data.refreshtoken)
                setExpiresIn(data.expiresin)
                dispatch({ type: 'ADD_TOKEN', payload: data.accesstoken })
                // console.log('useauth accesstoken', data.accesstoken);
                // console.log('useauth expiresin', data.expiresin);
                localStorage.setItem("accessToken", data.accesstoken)
                localStorage.setItem("refreshtoken", data.refreshtoken)
                localStorage.setItem("expiresin", data.expiresin)
                window.history.pushState({}, null, '/') // to clear the url

            } catch (error) {
                window.location = "/"
                console.log(error);
            }

        }

        getToken()
    }, [code, setAccessToken, setRefreshToken, setExpiresIn])


    useEffect(() => {
        if (!refreshToken || !expireIn) return;

        const interval = setInterval(() => {
            // axios.post(`${process.env.REACT_APP_URI}/refresh`, { refreshToken })
            axios.post("http:localhost:5000/refresh", { refreshToken })
                .then(response => {
                    console.log(response.data)
                    // window.history.pushState({}, null, '/') // to clear the url
                    setAccessToken(response.data.newAccessToken)
                    setExpiresIn(response.data.newExpiresIn)
                    console.log('refreshToken exires in ', response.data.newExpiresIn);
                    localStorage.setItem("accessToken", response.data.newAccessToken)
                    localStorage.setItem("expiresin", response.data.newExpiresIn)
                })
                .catch(err => {
                    window.location = "/"
                    console.log(err);
                })
        },20000)

        return () => clearInterval(interval)

    }, [])

 // (expireIn - 60) * 1000)
// (expireIn - 1800) * 1000)

    // console.log(accessToken);   //setAccessToken(response.data.accesstoken) has set the value of accessToken in my usestate
    
    
    
    return accessToken


}

