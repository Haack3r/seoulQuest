import { FaArrowUp } from "react-icons/fa"; 
import React from 'react'

const ScrollTopButton = () => {

    const handleClickTopButton = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div>
            <button 
                onClick={handleClickTopButton} 
                title="going to the top"
                className='
                    opacity-80 z-50 fixed bottom-10 right-9 
                    border border-stone-200 bg-stone-50 
                    p-2 rounded-full 
                    hover:bg-stone-100 hover:border-stone-300 
                    hover:opacity-100 hover:scale-105 
                    transition-all duration-300
                '>
                <FaArrowUp className="w-6 h-6 text-stone-600 hover:text-stone-700" />
            </button>
        </div>
    )
}

export default ScrollTopButton;
