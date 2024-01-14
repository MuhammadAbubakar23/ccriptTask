'use client'
import React, { useState, FC } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Auth from '../services/auth';
import { useAdmin } from '../context/auth';

const Login: FC = () => {

    const { login } = useAdmin();
    const { push } = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSignIn = async (e: any) => {
        e.preventDefault();
        try {
            const { token } = await Auth.loginWithEmail(username, password);
            login(token)
            push('/appointments')
        } catch (e) {
            console.log("Error while login", e)
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <div className="flex flex-center justify-center items-center min-h-screen w-full">
                <div className='flex flex-col gap-2'>
                    <Image
                        src={'/ccriptLogoGreen.svg'}
                        alt={'Ccript Logo Green'}
                        width={200}
                        height={50}
                        className='text-center mx-auto mb-4'
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="w-[400px] px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-[400px] px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <button type='submit' className="w-[400px] px-4 py-2 bg-[#0AA36E] text-white rounded-md">
                        Sign In
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Login;
