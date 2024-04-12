import { fetchReviews } from '@/actions/fetchReviews';
import { Review } from './Review/Review';
import styles from './ReviewsList.module.scss'
import { Spinner } from '../Spinner/Spinner';
import React from 'react';

export const ReviewsList = async () => {

    const reviews = await fetchReviews();
    
    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>Отзывы</h2>
            <div className={styles.gridContainer}>
                <React.Suspense fallback={<Spinner />}>
                    { reviews?.map((review) => {
                            return <Review {...review} key={review.text}/>
                    }) }
                </React.Suspense>
            </div>
        </section>
    )
}