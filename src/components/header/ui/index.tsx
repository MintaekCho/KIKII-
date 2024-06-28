import React, { useEffect, useState } from 'react';
import { HEADER_CATEGORY } from '../constant';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Profile } from '@/assets/icons/ic_profile.svg';
import { ls, ss } from '@/utils/stroage';

export default function Header() {
    const [selectCategory, setSelectCategory] = useState(HEADER_CATEGORY[0]);
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (category: any) => {
        setSelectCategory(category);
        navigate(category.path);
    };

    const handleLogout = () => {
        ss.clear();
        ls.clear();
        navigate('/login');
    };

    useEffect(() => {
        if (location.pathname === '/login') return;
        if (!ls.get('accessToken')) {
            window.location.href = '/login';
        }
    }, [location]);

    useEffect(() => {
        const currentCategory = HEADER_CATEGORY.find((category) => category.path === location.pathname);
        if (currentCategory) {
            setSelectCategory(currentCategory);
        }
    }, [location]);

    return (
        <header className="w-full min-w-[1280px] h-20 bg-[#EBECFC] flex items-center justify-around px-16">
            <div className="w-[200px]" />
            <div className="flex items-center gap-28">
                {HEADER_CATEGORY.map((category, index) => {
                    const isSelected = selectCategory.name === category.name;
                    return (
                        <div key={index} className="relative cursor-pointer" onClick={() => handleNavigate(category)}>
                            <span className={`text-xl font-semibold ${isSelected && 'text-[#4E59B3]'}`}>
                                {category.name}
                            </span>
                            {isSelected && <div className="w-full h-[3px] bg-[#4E59B3] absolute -bottom-2" />}
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center gap-4">
                <Profile />
                <span>{`${ls.get('name')} 님`}</span>
                <button
                    className="px-6 py-1 text-lg bg-[#19289A] rounded-[24px] text-white font-semibold"
                    onClick={handleLogout}
                >
                    로그아웃
                </button>
            </div>
        </header>
    );
}
