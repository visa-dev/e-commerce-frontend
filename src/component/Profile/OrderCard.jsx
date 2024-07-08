import React from 'react'
import { Button, Card } from '@mui/material'
import { format, parseISO } from 'date-fns';


const OrderCard = ({ item, order }) => {

    const originalDateStr = order?.createdAt;
    const dateObj = parseISO(originalDateStr);
    const formattedDate = format(dateObj, "dd/MM/yyyy hh:mm a");
    
    return (
        <Card className='flex items-center justify-between p-4'>
            <div className='flex items-center justify-between p-4'>
                <img className='w-16 h-16 ' src={item.food.images[0]} alt="" />
            </div>
            <div>
                <p>Item : {item?.food.name}</p>
                <p>Total : Rs {item?.totalPrice}.00</p>
                <p>CreatedAt : {formattedDate}</p>
            </div>
            <div>
                <Button className='cursor-not-allowed'>{order.orderStatus}</Button>
            </div>
        </Card>
    )
}

export default OrderCard