import { fetchProducts } from '@/actions/fetchProducts';
import { Product } from './Product/Product';
import styles from './ProductsList.module.scss';
import { Spinner } from '../Spinner/Spinner';
import React from 'react';

export const ProductsList = async () => {

    const arr = await fetchProducts(1);

    const products = arr?.products;

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>Товары</h2>
            <div className={styles.gridContainer}>
                <React.Suspense fallback={<Spinner />}>
                    {products?.map((product) => (
                        <Product key={product.id} {...product} />
                    ))}
                </React.Suspense>
            </div>
        </section>
    )
}
