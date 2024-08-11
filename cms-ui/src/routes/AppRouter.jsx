import { Layout } from "@/components"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import * as Pages from "@/pages"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}> 
                <Route index element={ <PrivateRoute element={<Pages.Dashboasrd.Home />}/>} />
                <Route path="/profile/edit" element={<PrivateRoute element={<Pages.Profile.Edit />}/>} />

                <Route path="login" element={<Pages.Auth.Login />} />

            </Route>
        </Routes>
    </BrowserRouter>
}