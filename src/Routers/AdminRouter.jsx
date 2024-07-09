import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import CreateRestaurantForm from '../AdminComponets/CreateAdminRestuarnt/CreateRestaurantForm'
import Admin from '../AdminComponets/Admin/Admin'
import { useSelector } from 'react-redux'
import Navbar from '../component/Navbar/Navbar'



const AdminRouter = () => {

  const { restaurant, auth } = useSelector((store) => store);

  const navigate = useNavigate();

  return (
    <div>
      
      <Routes>
        <Route>
          <Route path='/*' element={auth?.user?.role === "ROLE_RESTAURANT_OWNER" ? <Admin /> : (<CreateRestaurantForm /> )} />
        </Route>
      </Routes>
    </div>
  )
}

export default AdminRouter