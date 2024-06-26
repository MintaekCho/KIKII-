import React, { useEffect, useRef, useState } from 'react';

interface CustomInputProps {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomInput({ name, value, type, placeholder, onChange }: CustomInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        if (isFocused && !value) {
            setIsFocused(false);
        } else {
            setIsFocused(true);
        }
    };

    useEffect(() => {
        if (isFocused) {
            inputRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="w-40 relative cursor-pointer" onClick={handleFocus}>
            <span
                className={`w-full absolute ${isFocused ? 'left-1 bottom-4 text-[12px] text-[#017574] font-bold' : 'left-2 bottom-1 text-[16px] text-gray-400'} duration-300 ease-in-out `}
            >
                {placeholder}
            </span>
            <div>
                <input
                    ref={inputRef}
                    type={type}
                    name={name}
                    value={value}
                    className={`block w-full px-2 text-gray-700 bg-white border-b ${isFocused ? 'border-[#017574]' : 'border-black'} text-[12px] cursor-pointer  outline-none`}
                    disabled={isFocused ? false : true}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
