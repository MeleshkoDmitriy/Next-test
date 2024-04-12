"use client"

import { TProduct } from "@/types/types";
import { useEffect, useState } from "react"
import { Spinner } from "../Spinner/Spinner";
import { useInView } from "react-intersection-observer";
import { fetchProducts } from "@/actions/fetchProducts";
import { Product } from "../ProductsList/Product/Product";
import styles from './LoadMore.module.scss'

export const LoadMore = () => {

    const [ products, setProducts ] = useState<TProduct[]>([]);
    const [ loadedPages, setLoadedPages ] = useState(1);
    const { ref, inView } = useInView();

    const loadMoreProducts = async () => {
            const nextPage = loadedPages + 1;
            const res = await fetchProducts(nextPage);
            const newProducts = res?.products;
    
    
            if (Array.isArray(newProducts)) {
                setProducts((prevProducts: TProduct[]) => [...prevProducts, ...newProducts]);
                setLoadedPages(nextPage);
    
    
            } else {
                console.log('Fetch error: returned data is not an array');
            }

    }

    useEffect(() => {
        if (inView) {
            const timerId = setTimeout(() => {
                loadMoreProducts()
            }, 1500)

            return () => clearTimeout(timerId);
        }
    }, [inView, ref])

    return (
        <>
        <div className={styles.gridContainer}>
            {products?.map((product) => (
                <Product key={product.id} {...product} />
            ))}
        </div>
        <section ref={ref}>
            <Spinner />
        </section>
        </>
    )
}