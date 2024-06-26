import React, { useEffect, useState } from 'react';
import { HEADER_CATEGORY } from '../constant';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Profile} from '@/assets/icons/ic_profile.svg';
import { ls, ss } from '@/utils/stroage';

export default function Header() {
    const [selectCategory, setSelectCategory] = useState(HEADER_CATEGORY[2]);

    const navigate = useNavigate();

    const handleNavigate = (category: any) => {
        setSelectCategory(category);
        navigate(category.path);
    };

    const handleLogout = () => {
        ss.clear();
        ls.clear();
        navigate('/login');
    }

    useEffect(() => {
        if(location.pathname === '/login') return;
        if(!ls.get('accessToken')) {
            window.location.href = '/login';
        } 
    }, [location])

    return (
        <header className="w-full h-20 bg-[#EBECFC] flex items-center justify-center gap-28 relative">
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
            <div className='absolute flex items-center gap-5 right-20'>
                <Profile />
                <span>{`${ss.get('name')} 님`}</span>
                <button className='px-6 py-1 text-lg bg-[#19289A] rounded-[24px] text-white font-semibold' onClick={handleLogout}>로그아웃</button>
            </div>
        </header>
    );
}