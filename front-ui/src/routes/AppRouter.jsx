import { Layout } from "@/components"
import * as Pages from "@/pages"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}> 
                <Route index element={<Pages.Dashboasrd.Home />}/>

                <Route path="categories/:id" element={<Pages.Dashboasrd.Categories />}/>
                <Route path="brands/:id" element={<Pages.Dashboasrd.Brands />}/>

                <Route path="search" element={<Pages.Dashboasrd.Search />}/>

                <Route path="products/:id" element={<Pages.Dashboasrd.Detail />}/>
                
                <Route path="login" element={<Pages.Auth.Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
}