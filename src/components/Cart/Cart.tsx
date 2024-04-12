"use client"

import { useAppDispatch, useAppSelector } from '@/hooks/appHooks';
import styles from './Cart.module.scss'
import { calcTotal } from '@/utils/helpers/calcTotal';
import { calcSum } from '@/utils/helpers/calcSum';
import InputMask from 'react-input-mask';
import { useState } from 'react';
import { savePhoneNumber, submitOrder } from '@/redux/slices/userSlice';
import { getCleanedPhoneNumber } from '@/utils/helpers/getCleanedPhoneNumber';

export const Cart = () => {

    const { cart, phoneNumber: phone } = useAppSelector((state) => state.user);

    const [ phoneNumber, setPhoneNumber ] = useState(phone);

    const dispatch = useAppDispatch();

    const makeOrder = (phoneNumber:number) => {
        let cleanedPhoneNumber = getCleanedPhoneNumber(phoneNumber);
    
        if (!cleanedPhoneNumber) {
            alert('Проверьте номер, который вы набрали!');
            return;
        }
    
        dispatch(savePhoneNumber(cleanedPhoneNumber));
        // store.dispatch(submitOrder());
    }

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>Добавленные товары</h2>
            { cart.length <= 0  ?   <span>Товары не добавлены</span>
                                        :   <>
                                            <ul className={styles.list}>
                                                {cart.map((cartProduct) => {
                                                    return  <li className={styles.item} key={cartProduct.id}>
                                                                <span className={styles.name}>{cartProduct.title}</span>
                                                                <span className={styles.quantity}>x{cartProduct.quantity}</span>
                                                                <span className={styles.sum}>{calcSum(cartProduct.price, cartProduct.quantity)} &#8381;</span>
                                                            </li>
                                                })}
                                            </ul>
                                            <div className={styles.total}>
                                                 <strong>Total price: {calcTotal(cart)} &#8381;</strong>
                                            </div>
                                            </>
                                        }
            <form className={styles.actions}>
                <label className={styles.telephone}>
                    <InputMask 
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        mask="+7(999)-999-99-99" 
                        maskChar="_" 
                        placeholder="+7(___)-___-__-__" />
                </label>
                <div className={styles.buttonsWrapper}>
                    <button
                        onClick={() => makeOrder(phoneNumber)}
                        className={styles.button}
                        type='button'
                    > 
                        Заказать
                    </button>
                </div>
            </form>
        </section>
    )
}