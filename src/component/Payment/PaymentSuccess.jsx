import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress } from '@mui/material';
import { createOrder as createOrderAction } from '../State/Order/Action';
import { clearCartAction } from '../State/Cart/Action';

// Import your success image
import successImage from '../../assets/payment_success.png';

// Import SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const PaymentSuccess = () => {
    const address = JSON.parse(localStorage.getItem("selectedAddress"));
    const dispatch = useDispatch();
    const { cart, auth } = useSelector(store => store);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const navigator=useNavigate();
    const handleCreateOrder = async () => {
        setIsCreatingOrder(true);

        try {
            // Create orders for each item in the cart
            await Promise.all(cart.cartItems.map(async (item) => {
                const data = {
                    jwt: localStorage.getItem("jwt"),
                    restaurantId: item.food?.restaurant.id,
                    deliveryAddress: {
                        fullName: auth.user?.fullName,
                        streetAddress: address['streetAddress'],
                        city: address['city'],
                        mobile: address['mobile'],
                        locationType: address['location']
                    }
                };
                await dispatch(createOrderAction(data));
            }));

            // Clear the cart after all orders are successfully created
            dispatch(clearCartAction());

            
            localStorage.setItem("orderCreated", true);
            // Show success alert with animation
            MySwal.fire({
                icon: 'success',
                title: 'Order Created!',
                text: 'Your order has been placed successfully.',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
               
                didOpen: () => {
                    MySwal.showLoading();
                }
                
               

            });
            
        } catch (error) {
            console.error("Error creating order:", error);
            // Handle error scenarios (e.g., show error message to user)
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to create order. Please try again later.',
            });
        } finally {
            localStorage.clear();
            setIsCreatingOrder(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="border rounded-lg shadow-sm p-auto b-white mx--auto px-[100px] py-[50px]">
                <img src={successImage} alt="Success" className="w-24 mx-auto mb-4" />
                <h2 className="mb-2 text-2xl font-bold text-green-600">Payment Successful!</h2>

                {!localStorage.getItem("orderCreated") && <Button onClick={handleCreateOrder}  >
                    {isCreatingOrder ? <CircularProgress size={24} /> : 'click hear to place order'}
                </Button>}
                
            </div>
        </div>
    );
};

export default PaymentSuccess;
