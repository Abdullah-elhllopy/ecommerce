import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../state";


export const useProducts = () => {
    const dispatch = useDispatch();
    const fetchProducts = async () => {
        const items = await fetch('https://fakestoreapi.com/products')
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson)) ;
    };
    const products = useSelector((state) => state.cart.items);
    useEffect(() => {
        fetchProducts();
    }, []);
    return { products };
};
