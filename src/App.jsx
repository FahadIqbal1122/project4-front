import "./App.css"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Nav from "./components/Nav"
import Categories from "./components/Categories"
import Brands from "./components/Brands"
import RequestMed from "./pages/RequestMed"
import MyMedicines from "./pages/MyMedicines"
import Contact from "./pages/Contact"
import CartButton from "./components/CartButton"
import Add from "./pages/Add"
import Edit from "./pages/Edit"
import ProductBrand from "./pages/ProductBrand"
import Products from "./pages/products"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import Details from "./pages/Details"
import CartPro from "./pages/CartPro"
import RequestedProducts from "./components/RequestedProducts"
import React, { useState, useEffect } from "react"
import axios from "axios"
import ProductCate from "./pages/ProductCate"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile"
import Editprofile from "./pages/Editprofile"

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (user) return
    if (token) {
      const fetchUser = async (token) => {
        try {
          const response = await axios.get("http://localhost:5000/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response) {
            setUser(response.data)
          }
        } catch (error) {
          console.error(`Error fetching user ${error}`)
        }
      }
      fetchUser(token)
    }
  }, [user])

  return (
    <div>
      <body>
        <header>
          <Nav user={user} handleLogOut={handleLogOut} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home user={user} />} exact />
            <Route path="/Categories" element={<Categories />} exact />
            <Route path="/Brands" element={<Brands user={user} />} exact />
            <Route
              path="/RequestMed"
              element={<RequestMed user={user} />}
              exact
            />
            <Route
              path="/RequestedProducts"
              element={<RequestedProducts user={user} />}
              exact
            />
            <Route
              path="/MyMedicines"
              element={<MyMedicines user={user} />}
              exact
            />
            <Route path="/Contact" element={<Contact user={user} />} exact />
            <Route path="/Products" element={<Products user={user} />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
            <Route
              path="/Products/details/:productId"
              element={<Details user={user} />}
              exact
            />
            <Route path="/Add" element={<Add user={user} />} exact />
            <Route path="/Edit/:id" element={<Edit user={user} />} exact />
            <Route
              path="/ProductBrand/:brand"
              element={<ProductBrand setUser={setUser} />}
              exact
            />
            <Route path="/orders" element={<Orders user={user} />} />
            <Route path="/CartPro" element={<CartPro user={user} />}></Route>
            <Route path="/Profile" element={<Profile user={user} />}></Route>

            <Route
              path="/profile/edit/:id"
              element={<Editprofile user={user} />}
              exact
            />
            <Route
              path="/ProductCate/:category"
              element={<ProductCate setUser={setUser} />}
              exact
            />
          </Routes>
          <CartButton />
        </main>
      </body>
    </div>
  )
}

export default App
