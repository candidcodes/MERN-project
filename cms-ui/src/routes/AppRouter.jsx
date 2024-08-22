import { Layout } from "@/components"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import * as Pages from "@/pages"
import { PrivateRoute } from "./PrivateRoute"
import { AdminRoute } from "./AdminRouter"
import { CmsRoute } from "./CmsRouter"

export const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}> 
                <Route index element={ <PrivateRoute element={<Pages.Dashboasrd.Home />}/>} />
                <Route path="/profile/edit" element={<PrivateRoute element={<Pages.Profile.Edit />}/>} />
                <Route path="/profile/password" element={<PrivateRoute element={<Pages.Profile.Password />}/>} />

                <Route path="staffs" element={<PrivateRoute element={<AdminRoute element={<Outlet />}/>} />}>
                    <Route index element={<Pages.Staffs.List />} />
                    <Route path=":id" element={<Pages.Staffs.Edit />} />
                    <Route path="create" element={<Pages.Staffs.Create />} />
                </Route>

                <Route path="customers" element={<PrivateRoute element={<CmsRoute element={<Outlet />}/>} />}>
                    <Route index element={<Pages.Customers.List />} />
                    <Route path=":id" element={<Pages.Customers.Edit />} />
                    <Route path="create" element={<Pages.Customers.Create />} />
                </Route>

                <Route path="categories" element={<PrivateRoute element={<CmsRoute element={<Outlet />}/>} />}>
                    <Route index element={<Pages.Categories.List />} />
                    <Route path=":id" element={<Pages.Categories.Edit />} />
                    <Route path="create" element={<Pages.Categories.Create />} />
                </Route>

                <Route path="Brands" element={<PrivateRoute element={<CmsRoute element={<Outlet />}/>} />}>
                    <Route index element={<Pages.Brands.List />} />
                    <Route path=":id" element={<Pages.Brands.Edit />} />
                    <Route path="create" element={<Pages.Brands.Create />} />
                </Route>
                
                <Route path="products" element={<PrivateRoute element={<CmsRoute element={<Outlet />}/>} />}>
                    <Route index element={<Pages.Products.List />} />
                    <Route path=":id" element={<Pages.Products.Edit />} />
                    <Route path="create" element={<Pages.Products.Create />} />
                </Route>

            </Route>
            <Route path="login" element={<Pages.Auth.Login />} />
        </Routes>
    </BrowserRouter>
}