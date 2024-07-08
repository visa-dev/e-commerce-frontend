import React from 'react'
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent } from '../State/Restaurant/Action';
import Swal from 'sweetalert2';


const EventCard = ({ event }) => {
    const { restaurant } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");
    const dispatch = useDispatch();

    const handleDeleteEvent = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                
                dispatch(deleteEvent({
                    eventId: event?.id,
                    jwt: jwt
                }));
                Swal.fire({
                    title: "Deleted!",
                    text: "event has been deleted.",
                    icon: "success"
                });
            }
        });
       

    }


    return (
        <div>
            <Card sx={{ width: 345 }}>
                <CardMedia image={event.imageUrl}
                    sx={{ height: 345 }}
                />
                <CardContent>
                    <Typography variant='h5'>
                        {event.eventName}
                    </Typography>
                    <Typography variant='h5'>
                        {event?.restaurant.name}
                    </Typography>
                    
                    <Typography variant='body'>
                        50% off on your first order
                    </Typography>
                    <div className='py-2 space-y-2'>
                        <p>{event.location}</p>
                        <p className='text-sm text-blue-600'>{event.startDate}</p>
                        <p className='text-sm text-red-600'>{event.endDate}</p>
                    </div>
                </CardContent>
                <CardActions >
                    {restaurant?.usersRestaurant && (
                        <Box ml="auto">
                            <IconButton onClick={handleDeleteEvent}>
                                <DeleteIcon sx={{ color: 'red' }} />
                            </IconButton>
                        </Box>
                    )}
                </CardActions>
            </Card>
        </div>
    )
}

export default EventCard