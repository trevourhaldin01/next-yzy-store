"use client"

import React, {createContext, use,useState, useCallback} from "react"
import { type Product } from "@/lib/products"

interface cartItem extends Product {
    quantity: number,
    size: number
}

interface cartContextType {
    items: cartItem[],
    addToCart: (product: Product, size: number) => void,
    updateQuantity: (id: string, size: number, change: number) => void,
    total: number
}

const CartContext = createContext<cartContextType | undefined>(undefined)

export function CartProvider({children}: {children: React.ReactNode}) {
    const [items, setItems] = useState<cartItem[]>([])

    const addToCart = useCallback((product: Product, size: number) => {
        setItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id && item.size === size);
            //if item exists , it returns an index, otherwise -1
            if(existingItemIndex > -1 ){
                return prevItems.map((item, index) => {
                    if(index === existingItemIndex) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item
                })
            } else {
                return [...prevItems, {...product, quantity: 1, size}]
            }
        })

    },[])

    const updateQuantity = useCallback((id:string, size:number, change:number)=>{
        setItems((prevItems)=>
            prevItems.reduce((acc, item)=>{  //acc => accumulator for reduce function
                if(item.id === id && item.size === size){
                    const newQuantity = item.quantity + change

                    return newQuantity > 0 
                    ? [...acc, {...item, quantity: newQuantity}] //If newQuantity > 0, the updated item is added to acc
                    :acc; //
                }

                return [...acc, item] //If the item does not match, it is added to acc without modification.
            }, [] as cartItem[])

        )

    },[])

    const total = items.reduce((acc, item) => {
        const price = item.id.startsWith('sk')
          ? item.id.includes('gray')
            ? 40
            : 20
          : 20;
        return acc + price * item.quantity;
      }, 0);

    return (
        <CartContext.Provider value={{items, addToCart, updateQuantity, total}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = use(CartContext);
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  }