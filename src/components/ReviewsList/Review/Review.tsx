"use client"
import styles from './Review.module.scss'

export const Review = ( rev ) => {

    const { text } = rev;

    const html = new DOMParser().parseFromString(text, 'text/html');
    const title = html.querySelector('h1').innerHTML;
    const body = html.querySelector('p').innerHTML;
  
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p  className={styles.body}>{body}</p>
      </div>
    );
}