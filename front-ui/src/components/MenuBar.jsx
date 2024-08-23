import { removeStorage } from "@/lib"
import { clearUser } from "@/store"
import { useDispatch, useSelector } from "react-redux"

export const MenuBar = () => {
    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch()


    const handleLogout = () => {
        removeStorage('430fronttoken')
        dispatch(clearUser())
        
    }

    return user && <></>
}