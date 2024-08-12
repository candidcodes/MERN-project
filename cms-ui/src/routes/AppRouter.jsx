import { Layout } from "@/components"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import * as Pages from "@/pages"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}> 
                <Route index element={ <PrivateRoute element={<Pages.Dashboasrd.Home />}/>} />
                <Route path="/profile/edit" element={<PrivateRoute element={<Pages.Profile.Edit />}/>} />
                <Route path="/profile/password" element={<PrivateRoute element={<Pages.Profile.Password />}/>} />

                <Route path="staffs" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Pages.Staffs.List />} />
                    <Route path=":id" element={<Pages.Staffs.Edit />} />
                    <Route path="create" element={<Pages.Staffs.Create />} />
                </Route>

            </Route>
            <Route path="login" element={<Pages.Auth.Login />} />
        </Routes>
    </BrowserRouter>
}