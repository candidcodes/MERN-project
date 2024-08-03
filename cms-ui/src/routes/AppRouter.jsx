import { Layout } from "@/components"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import * as Pages from "@/pages"

export const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}> 
                <Route index element={<Pages.Dashboasrd.Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
}