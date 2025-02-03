'use client';

import React, {useState} from "react";
import {motion, AnimatePresence} from 'motion/react'
import { useCart } from "./cart-context";
import { usePathname } from "next/navigation";
import Link from "next/link";

enum MenuState {
    CLOSED,
    OPEN,
    BACK,
}

const topBarVariants = {
    closed: {
      rotate: 0,
      translateY: 0,
      width: '16px',
    },
    open: {
      rotate: 45,
      translateY: 4,
      width: '16px',
    },
    back: {
      rotate: 45,
      translateY: 7,
      width: '10px',
    },
};
  
const bottomBarVariants = {
closed: {
    rotate: 0,
    translateY: 0,
    width: '16px',
},
open: {
    rotate: -45,
    translateY: -4,
    width: '16px',
},
back: {
    rotate: -45,
    translateY: -7,
    width: '10px',
},
};
  
interface MainMenuProps {
    isBackVisible: boolean;
    onBack: any;
}


export default function MainMenu({isBackVisible, onBack}: MainMenuProps){
    const pathname = usePathname();
    const defaultMenuState =
        isBackVisible || pathname.startsWith('/p/')
        ? MenuState.BACK
        : MenuState.CLOSED;

    const [menuState, setMenuState] = useState<MenuState>(defaultMenuState);
    return (
        <div className="relative flex items-center">
            <button>
                <span>
                    {menuState === MenuState.BACK ? 'Back' : 'Menu'}
                </span>
            </button>
        </div>
    )

}