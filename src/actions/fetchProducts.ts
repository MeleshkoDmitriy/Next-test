"use server"
import { TProducts } from "@/types/types";

export async function fetchProducts(page:number) {
    const pageSize = 20;
    const URL = `http://o-complex.com:1337/products?page=${page}&page_size=${pageSize}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data as TProducts;
    } catch (error) {   
        console.log('Something went wrong', error);
        return null;
    }
}