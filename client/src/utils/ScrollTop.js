import { useEffect } from "react"
import { useLocation } from "react-router-dom"


const ScrollTop = ({ children }) => {

    let location = useLocation()
    useEffect(() => {
        // console.log('path changed');
        // console.log(location.pathname);
        window.scrollTo(0, 0)

    }, [location.pathname])

    return children
}

export default ScrollTop