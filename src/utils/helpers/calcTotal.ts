import { TCartProduct } from '@/types/types';

export const calcTotal = ( arr:TCartProduct[] ):number => {
    
    const total = arr.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0)

    return total;
}