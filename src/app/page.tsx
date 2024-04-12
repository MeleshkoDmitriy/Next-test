import Image from "next/image";
import styles from "./page.module.scss";
import { ReviewsList } from "@/components/ReviewsList/ReviewsList";
import { Cart } from "@/components/Cart/Cart";
import { ProductsList } from "@/components/ProductsList/ProductsList";
import { LoadMore } from "@/components/LoadMore/LoadMore";

export default function Home() {
  return (
      <main className={styles.main}> 
        <ReviewsList />
        <Cart />
        <ProductsList />
        <LoadMore />
      </main>
  );
}
