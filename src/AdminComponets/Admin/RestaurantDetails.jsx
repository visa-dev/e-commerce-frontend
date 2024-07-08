import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRestaurant, updateRestaurantStatus } from '../../component/State/Restaurant/Action';
import Swal from 'sweetalert2';
import { logout } from '../../component/State/Authentication/Action';

const RestaurantDetails = () => {

  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleRestaurntStatus = () => {

    dispatch(updateRestaurantStatus({ restaurantId: restaurant?.usersRestaurant?.id, jwt }));

  }

  const handleRestuarntDelete = async () => {
    alert("Not devloped yet... soon");
    // try {
    //   const result = await Swal.fire({
    //     title: "Are you sure?",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Delete"
    //   });
  
    //   if (result.isConfirmed) {
    //     await dispatch(deleteRestaurant({ restaurantId: restaurant?.usersRestaurant?.id, jwt }));
    //     await navigator('/');
    //     await dispatch(logout());
  
    //     Swal.fire({
    //       title: "Deleted!",
    //       text: "Restaurant has been deleted.",
    //       icon: "success"
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error deleting restaurant:", error);
    //   Swal.fire({
    //     title: "Error",
    //     text: "Failed to delete restaurant.",
    //     icon: "error"
    //   });
    // }
  };
  


  return (
    <div className='px-5 pb-10 lg:px-20 '>
      <div className='flex items-center justify-center gap-5 py-5'>
        <h1 className='p-5 text-2xl font-bold text-center lg:text-7xl'>{restaurant?.usersRestaurant?.name}</h1>
        <div>
          <Button color={restaurant?.usersRestaurant?.open ? "primary" : "green"} className='py-[1rem] px-[2rem]' variant='contained' onClick={handleRestaurntStatus} size='large'>
            {restaurant?.usersRestaurant?.open ? "Close" : "Open"}
          </Button>
        </div>
      </div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Restaurnat</span>} />
            <CardContent className='space-y-4 text-gray-200'>
              <div className='flex'>
                <p className='w-48'>Owner</p>
                <p className='text-gray-400'>
                  <span className='pr-5'>-</span>
                  {restaurant?.usersRestaurant?.owner?.fullName}
                </p>
              </div>
              <div className='flex'>
                <p className='w-48'>Restaurant Name</p>
                <p className='text-gray-400'>
                  <span className='pr-5'>-</span>
                  {restaurant?.usersRestaurant?.name}
                </p>
              </div>
              <div className='flex'>
                <p className='w-48'>Cusine Type</p>
                <p className='text-gray-400'>
                  <span className='pr-5'>-</span>
                  {restaurant?.usersRestaurant?.cuisineType}
                </p>
              </div>
              <div className='flex'>
                <p className='w-48'>Opening Hours</p>
                <p className='text-gray-400'>
                  <span className='pr-5'>-</span>
                  {restaurant?.usersRestaurant?.openingHours}
                </p>
              </div>
              <div className='flex'>
                <p className='w-48'>Status</p>
                <p className='text-gray-400'>
                  <span className='pr-5'>-</span>
                  {restaurant?.usersRestaurant?.open ? <span className='px-5 py-2 bg-green-400 rounded-full text-gray-950'>Open
                  </span> : <span className='px-5 py-2 bg-red-400 rounded-full text-gray-950'>Closed</span>}
                </p>
              </div>
            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Address</span>} />
            <CardContent className='space-y-4 text-gray-200'>
              <div className='flex'>
                <p className='w-48'>Country</p>
                <p className='text-gray-400'>
                  <span className='pr-5'>-</span>
                  {restaurant?.usersRestaurant?.country}
                </p>
              </div>
              <div className='flex'>
                <p className='w-48'>City</p>
                <p className='text-gray-400'>
                  <span className='pr-5'>-</span>
                  {restaurant?.usersRestaurant?.address?.city}
                </p>
              </div>
              <div className='flex'>
                <p className='w-48'>Postal Code</p>
                <p className='text-gray-400'>
                  <span className='pr-5'>-</span>
                  {restaurant?.usersRestaurant?.postalCode}
                </p>
              </div>
              <div className='flex'>
                <p className='w-48'>Street Address</p>
                <p className='text-gray-400'>
                  <span className='pr-5'>-</span>
                  {restaurant?.usersRestaurant?.postalCode?.streetAddress}
                </p>
              </div>

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Contact</span>} />
            <CardContent className='space-y-4 text-gray-200'>
              <div className='flex'>
                <p className='w-48'>Email</p>
                <p className='text-gray-400'>
                  <span className='pr-5'>-</span>
                  {restaurant?.usersRestaurant?.contactInformation.email}
                </p>
              </div>
              <div className='flex'>
                <p className='w-48'>Mobile</p>
                <p className='text-gray-400'>
                  <span className='pr-5'>-</span>
                  {restaurant?.usersRestaurant?.contactInformation.mobile}
                </p>
              </div>
              <div className='flex'>
                <p className='w-48'>Social</p>
                <div className='flex items-center gap-2 pb-4'>
                  <span className='pr-5'>-</span>
                  <a href={restaurant?.usersRestaurant?.contactInformation?.instagram}><InstagramIcon sx={{ fontSize: "3rem" }} /></a>
                  <a href={restaurant?.usersRestaurant?.contactInformation?.facebook}><FacebookIcon sx={{ fontSize: "3rem" }} /></a>
                </div>
              </div>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className='py-2'>
        <Button
          onClick={handleRestuarntDelete}
          sx={{ p: '10px' }}
          variant='contained'
          color='primary'
        >Delete restaurant</Button>
      </div>
    </div>
  )
}

export default RestaurantDetails