import { authApi } from '@/api/auth';
import CustomInput from '@/components/login/CustomInput';
import { ls, ss } from '@/utils/stroage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [loginForm, setLoginForm] = useState({
        loginId: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm({
            ...loginForm,
            [name]: value,
        });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await authApi.login(loginForm);
        console.log(res);
        ls.set('accessToken', res.object.token);
        ls.set('name', res.object.name);
        ls.set('position', res.object.position);
        ls.set('role', res.object.role);
        navigate('/dispatch');
    };

    return (
        <div className="w-screen h-screen grid place-items-center">
            <section className="w-[480px] h-[520px] p-20 border-[3px] border-black rounded-lg flex flex-col items-center">
                <h1 className="text-4xl text-[#19289A] font-bold">로그인</h1>
                <form onSubmit={handleLogin} className="mt-14 flex flex-col gap-10">
                    <CustomInput
                        type="text"
                        name="loginId"
                        value={loginForm.loginId}
                        placeholder="사원번호"
                        onChange={handleInputChange}
                    />
                    <CustomInput
                        type="password"
                        name="password"
                        value={loginForm.password}
                        placeholder="비밀번호"
                        onChange={handleInputChange}
                    />
                    <button className="px-8 py-2 mt-10 bg-black rounded-[24px] text-white text-md" onClick={() => {}}>
                        로그인하기
                    </button>
                </form>
            </section>
        </div>
    );
}
