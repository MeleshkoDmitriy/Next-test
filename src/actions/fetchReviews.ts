"use server"
import { TReview } from "@/types/types";
import { REVIEWS_URL } from "@/utils/api/api";

export async function fetchReviews() {
    try {
        const response = await fetch(REVIEWS_URL);
        const data = await response.json();
        return data as TReview[];
    } catch (error) {   
        console.log('Something went wrong', error);
        return null;
    }
}