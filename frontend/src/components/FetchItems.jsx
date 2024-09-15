import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from '../store/itemsSlice';
import { fetchStatusActions } from '../store/fetchStatusSlice';
import itemContext from '../../context/Itemcontext';
import { bagActions } from '../store/BagSlice';

export default function FetchItems(props) {
    const fetchStatus = useSelector(store => store.fetchStatus);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);  // Get the login state from Redux
    const dispatch = useDispatch();

    // Fetch items when the login state changes
    useEffect(() => {
        const getitems = async () => {
            try {
                dispatch(fetchStatusActions.markFetchingStarted());
                const response = await fetch("https://myntra-clone-mern.onrender.com/api/items/allitems", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                dispatch(itemsActions.addInitialItems(json[0].items));
                dispatch(fetchStatusActions.markFetchDone());
            } catch (error) {
                console.error('Failed to fetch items:', error);
            } finally {
                dispatch(fetchStatusActions.markFetchingFinished());
            }
        };

        getitems();
    }, [dispatch, isLoggedIn]);  // Dependency on isLoggedIn

    // Add item to cart
    const AddToCart = async (items) => {
        try {
            const response = await fetch("https://myntra-clone-mern.onrender.com/api/items/addusercartItems", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify([items])
            });
            const json = await response.json();
        } catch (error) {
            console.error('Failed to add items to cart:', error);
        }
    };

    // Delete item from cart
    const deleteItem = async (id) => {
        try {
            const response = await fetch(`https://myntra-clone-mern.onrender.com/api/items/deleteitem/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
          
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    // Fetch cart items when the login state changes
    useEffect(() => {
        if (!isLoggedIn) return;  // Skip fetching if not logged in

        const getCarts = async () => {
            try {
                const response = await fetch("https://myntra-clone-mern.onrender.com/api/items/fetchallusercartItems", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                });
                const json = await response.json();
                console.log(json)
                dispatch(bagActions.cartItems(json));
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
            }
        };

        getCarts();
    }, [dispatch, isLoggedIn]);  // Dependency on isLoggedIn

  
    return (
        <itemContext.Provider value={{ AddToCart, deleteItem ,dispatch}}>
            {props.children}
        </itemContext.Provider>
    );
}
