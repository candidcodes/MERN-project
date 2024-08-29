import { Layout } from "@/components"
import * as Pages from "@/pages"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}> 
                <Route index element={<Pages.Dashboasrd.Home />}/>

                <Route path="categories/:id" element={<Pages.Dashboasrd.Categories />}/>
                <Route path="brands/:id" element={<Pages.Dashboasrd.Brands />}/>

                <Route path="search" element={<Pages.Dashboasrd.Search />}/>

                <Route path="products/:id" element={<Pages.Dashboasrd.Detail />}/>

                <Route path="cart" element={<PrivateRoute element={<Pages.Dashboasrd.Cart />}/>}/>
                
                <Route path="login" element={<Pages.Auth.Login />} />
                <Route path="register" element={<Pages.Auth.Register />} />
            </Route>
        </Routes>
    </BrowserRouter>
}