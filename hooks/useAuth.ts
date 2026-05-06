'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        const storedFirstName = localStorage.getItem('firstName');

        if (loggedIn === 'true' && storedFirstName) {
            setIsLoggedIn(true);
            setFirstName(storedFirstName);
        }

        setLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
        setFirstName('');
        router.push('/login');
    };

    return { isLoggedIn, firstName, loading, logout };
}
