"use client"

import { useState } from "react"

import {MainMenu} from "./main-menu"
import { useCart } from "./cart-context"
import { Cart } from './cart';

interface HeaderProps {
    isBackVisible: boolean;
    onBack: any;
  }

export  function Header({isBackVisible, onBack}: HeaderProps){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { items } = useCart();
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    return (
        <nav className="flex justify-between fxed top-0 left-0 right-0 z-10">
            <div>
                <MainMenu isBackVisible={isBackVisible} onBack={onBack} />
            </div>
            <div>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="relative z-20 size-12 flex items-center justify-center"
                    aria-label="Cart"
                >
                    <svg
                        className="size-6"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                        x="6"
                        y="8"
                        width="12"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        ></rect>
                        <path
                        d="M9 7V7C9 5.34315 10.3431 4 12 4V4C13.6569 4 15 5.34315 15 7V7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        ></path>
                    </svg>
                    <span className="ml-1 font-semibold">{totalQuantity}</span>
                </button>
                <Cart isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            </div>
        </nav>
    )
}