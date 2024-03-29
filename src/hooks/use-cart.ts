

import create from 'zustand';
import { ProductData } from '../../tp-kit/types';
import { Cartdata } from '../types';
import { ProductLineData } from '../types';
import { wait } from 'tp-kit/utils/wait';

export const useCart = create<Cartdata>(() => ({
  lines: [],
  count : 0,
}));


/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 * 
 * @param product 
 */
export async function addLine(product: ProductData) {
    await wait(1000);
    const cartItems = useCart.getState().lines;
    const productIndex = cartItems.findIndex((item) => item.product.id === product.id);
    let countt = useCart.getState().count;
    if (productIndex === -1) {
        cartItems.push({
        qty: 1,
        product,
        });
        countt += 1;
    } else {
        cartItems[productIndex].qty += 1;
        
    }
    useCart.setState({ 
        lines  : [... cartItems],
        count : countt,
    });

}

/**
 * Modifie une ligne produit du panier
 * 
 * @param line 
 */
export function updateLine(line: ProductLineData) {
    const cartItems = useCart.getState().lines;
    const productIndex = cartItems.findIndex((item) => item.product.id === line.product.id);
    if (productIndex === -1) {
        cartItems.push(line);
    } else {
        cartItems[productIndex] = line;

    }
    useCart.setState({ 
        lines: [... cartItems],
     });
}

/**
 * Supprime la ligne produit du panier 
 * 
 * @param productId 
 * @returns 
 */
export function removeLine(productId: number) {
    const cartItems = useCart.getState().lines;
    const productIndex = cartItems.findIndex((item) => item.product.id === productId);

    if (productIndex === -1) {
        return;
    }
    cartItems.splice(productIndex, 1);
    const countLines = 
    useCart.setState({ lines : [... cartItems],
        count : useCart.getState().count - 1,
        
     });
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
    useCart.setState({ lines: [],
        count : 0,

     });
}

/**
 * Calcule le total d'une ligne du panier
 */
export function computeLineSubTotal(line: ProductLineData): number {
    return line.product.price * line.qty;
}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {
    return lines.reduce((total, line) => total + computeLineSubTotal(line), 0);
}