import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as LookIcon } from '@/assets/icons/ic_look.svg';

interface CustomInputProps {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    isLoginIdEntered?: boolean;
    isPw?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomInput({
    name,
    value,
    type,
    placeholder,
    isLoginIdEntered,
    isPw,
    onChange,
}: CustomInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [isPwType, setIsPwType] = useState(false);

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
                className={`w-full absolute ${isFocused || isLoginIdEntered ? 'left-1 bottom-4 text-[12px] text-[#017574] font-bold' : 'left-2 bottom-1 text-[16px] text-gray-400'} duration-300 ease-in-out z-10`}
            >
                {placeholder}
            </span>
            <div className="relative">
                <input
                    ref={inputRef}
                    type={isPwType ? 'pw' : type}
                    name={name}
                    value={value}
                    className={`block w-full px-2 text-gray-700 bg-white border-b ${isFocused || isLoginIdEntered ? 'border-[#017574]' : 'border-black'} text-[12px] cursor-pointer  outline-none`}
                    disabled={isFocused || isLoginIdEntered ? false : true}
                    onChange={onChange}
                />
                {(isPw && (isFocused || isLoginIdEntered )) && (
                    <div className="absolute right-0 top-0 z-50 cursor-pointer" onClick={() => setIsPwType((prev) => !prev)}>
                        <LookIcon />
                    </div>
                )}
            </div>
        </div>
    );
}
