export type TProducts = {
    page: number
    amount: number
    total: number
    products: TProduct[]
}
  
export type TProduct = {
    id: number
    image_url: string
    title: string
    description: string
    price: number
}

export type TReview = {
    id: number
    text: string
}

export type TCartProduct = {
    quantity: number;
} & TProduct;