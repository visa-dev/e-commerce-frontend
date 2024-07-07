import React, { useEffect, useState } from 'react';
import './Home.css';
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getAllFoods, getAllRestaurantAction } from '../State/Restaurant/Action';
import EventCard from '../Profile/EventCard';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Home = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, loading, error } = useSelector(store => store);

    const images = [
        "https://img.freepik.com/free-vector/delivery-service-with-masks-concept_23-2148497067.jpg?t=st=1717260338~exp=1717263938~hmac=9442abfe0acd1f07dbae1ec13ee836842dd7f3754fa97b8dcd79472120f9509f&w=1060",
        "https://img.freepik.com/free-photo/paper-bag-full-vegetables-table_1220-5377.jpg?w=1060",
        "https://img.freepik.com/free-photo/close-up-hands-holding-delivery-boxes_23-2148892913.jpg?w=1060",
        "https://img.freepik.com/free-photo/delivery-man-wearing-mask-handling-paper-bag-with-food-us-customer-service-sign-delivery-service-concept_255994-876.jpg?w=1060",
        "https://img.freepik.com/free-photo/close-up-delivery-man-mask-giving-orders_23-2148855210.jpg?w=1060"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
                setFadeIn(true);
            }, 1000); // Match the duration of the transition
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        dispatch(getAllFoods());
        dispatch(getAllRestaurantAction());
        if (jwt) {
            dispatch(getAllEvents());
        }
    }, [dispatch, jwt]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='pb-10'>
            <TransitionGroup>
                <CSSTransition
                    key={currentImageIndex}
                    timeout={1000}
                    classNames="fade"
                >
                    <section
                        className={`relative flex flex-col items-center justify-center banner -z-50 ${fadeIn ? 'fade-enter' : 'fade-exit'}`}
                        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
                    >
                        <div className='w-[50vw] z-10 text-center text-black'>
                            <p className='z-10 py-5 text-2xl font-bold lg:text-7xl'>
                                Fast Food
                            </p>
                            <p className='z-10 text-xl text-red-90 lg:text-5xl'>
                                Taste the Convenience Food, Fast and Delivered.
                            </p>
                        </div>
                    </section>
                </CSSTransition>
            </TransitionGroup>

            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='py-3 pb-5 text-2xl font-semibold text-gray-400'>Top Meals</p>
                <MultiItemCarousel foods={restaurant?.foods} />
            </section>
            <Divider />

            <section className='px-5 pt-10 lg:px-20'>
                <h1 className='pb-8 text-2xl font-semibold text-gray-400'>Restaurants</h1>
                <div className='flex flex-wrap items-center justify-around gap-5'>
                    {restaurant?.restaurants?.map((item) => (
                        <RestaurantCard key={item?.id} item={item} />
                    ))}
                </div>
            </section>

            <Divider className='pt-10' />

            {jwt && (
                <div>
                    <Divider />
                    <section className='px-5 pt-10 lg:px-20'>
                        <h1 className='pb-8 text-2xl font-semibold text-gray-400'>Events</h1>
                        <div className='flex flex-wrap items-center justify-around gap-5'>
                            {restaurant?.restaurantsEvents?.map((item) => (
                                <EventCard key={item?.id} event={item} />
                            ))}
                        </div>
                        <Divider className='pt-10' />
                    </section>
                </div>
            )}
        </div>
    );
};

Home.propTypes = {
    restaurant: PropTypes.shape({
        foods: PropTypes.array,
        restaurants: PropTypes.array,
        restaurantsEvents: PropTypes.array,
    }),
    loading: PropTypes.bool,
    error: PropTypes.string,
};

export default Home;
