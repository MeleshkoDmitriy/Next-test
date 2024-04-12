"use client"

import Image from 'next/image'
import styles from './Product.module.scss'
import { FC, useState } from 'react';
import { TProduct } from '@/types/types';
import { useAppDispatch, useAppSelector } from '@/hooks/appHooks';
import { addProductToCart, changeProductQuantity, minusProductFromCart, removeProductFromCart } from '@/redux/slices/userSlice';

export const Product:FC<TProduct> = ( product ) => {

    const { 
        image_url,
        title,
        description,
        price,
    } = product;

    const { cart } = useAppSelector((state) => state.user);

    const thisProduct = cart.find((item) => item.id === product.id);

    const [ isProductAdded, setProductAdded ] = useState(cart.includes(thisProduct));

    const dispatch = useAppDispatch();

    const increaseProduct = () => {
        dispatch(addProductToCart(product));
        setProductAdded(true);
    }

    const decreaseProduct = () => {
        if (thisProduct.quantity <= 1) {
            setProductAdded(false);
            dispatch(removeProductFromCart(product));
        } else {
            dispatch(minusProductFromCart(product));
        }
    }

    const handleChangeQuantity = (newQuantity: number) => {
        dispatch(changeProductQuantity({ productId: thisProduct?.id, quantity: newQuantity }));
    } 

    return (
        <div className={styles.wrapper}>
            <div className={styles.imgContainer}>
                <Image 
                    src={image_url}
                    width={280}
                    height={420}
                    alt={title}
                    loading='lazy'
                />
            </div>
            <h3 className={styles.title}>
                {title}
            </h3>
            <article className={styles.description}>
                {description}
            </article>
            <p className={styles.price}>Цена:<strong><span>{price}</span>&#8381;</strong></p>
            <div className={styles.actions}>
                { isProductAdded    ?  <div className={styles.buttons}>
                                            <label>
                                                <button
                                                    className={styles.button} 
                                                    onClick={decreaseProduct}
                                                >
                                                    -
                                                </button>
                                            </label>
                                            <label>
                                                <input 
                                                    className={styles.counter}
                                                    type="number" 
                                                    min={1}
                                                    max={100}
                                                    onChange={(e) => handleChangeQuantity(e.target.value)}
                                                    value={thisProduct ? thisProduct.quantity : undefined} />
                                            </label>
                                            <label>
                                                <button
                                                    className={styles.button} 
                                                    onClick={increaseProduct}
                                                >
                                                    + 
                                                </button>                                            
                                            </label>
                                        </div>

                                    :   <label className={styles.buttonBuy}>
                                            <button
                                                className={styles.button} 
                                                onClick={increaseProduct}
                                            >Купить</button>
                                        </label>}
            </div>
        </div>
    )
}