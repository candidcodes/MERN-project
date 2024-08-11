import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css"
import "react-toastify/dist/ReactToastify.min.css"
import "./Layout.css"
import { Outlet } from "react-router-dom"
import { MenuBar } from "./MenuBar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fromStorage, removeStorage } from "@/lib"
import { setUser } from "@/store"
import { Loading } from "."
import http from "@/http"

export const Layout = () => {
    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!user){
            setLoading(true)
            const token = fromStorage('430cmstoken')

            if(token){
                http.get('/profile/detail')
                    .then(({ data }) => {
                        dispatch(setUser(data))
                    })
                    .catch(() => {
                        removeStorage('430cmstoken')
                    })
            }else{
                setLoading(false)
            }
        }else{
            setLoading(false)
        }
    }, [user])

    return loading ? <Loading /> : <> 

        <MenuBar /> 
        <Outlet />
        
    </>
}