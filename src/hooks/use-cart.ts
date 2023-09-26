

import create from 'zustand';
import { ProductData } from '../../tp-kit/types';
import { Cartdata } from '../types';
import { ProductLineData } from '../types';

const useCart = create<Cartdata>(() => ({
  cartItems: [],
}));


/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 * 
 * @param product 
 */
export function addLine(product: ProductData) {
    const cartItems = useCart.getState().cartItems;
    const productIndex = cartItems.findIndex((item) => item.product.id === product.id);
    if (productIndex === -1) {
        cartItems.push({
        qty: 1,
        product,
        });
    } else {
        cartItems[productIndex].qty += 1;
    }
    useCart.setState({ cartItems });
}

/**
 * Modifie une ligne produit du panier
 * 
 * @param line 
 */
export function updateLine(line: ProductLineData) {
    const cartItems = useCart.getState().cartItems;
    const productIndex = cartItems.findIndex((item) => item.product.id === line.product.id);
    if (productIndex === -1) {
        cartItems.push(line);
    } else {
        cartItems[productIndex] = line;
    }
    useCart.setState({ cartItems });
}

/**
 * Supprime la ligne produit du panier 
 * 
 * @param productId 
 * @returns 
 */
export function removeLine(productId: number) {
    const cartItems = useCart.getState().cartItems;
    const productIndex = cartItems.findIndex((item) => item.product.id === productId);
    if (productIndex === -1) {
        return;
    }
    cartItems.splice(productIndex, 1);
    useCart.setState({ cartItems });
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
    useCart.setState({ cartItems: [] });
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