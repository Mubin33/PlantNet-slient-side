import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user, loading} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const {data:role, isPending} = useQuery({
        queryKey:['role', user?.email], 
        enabled:!loading,
        queryFn: async()=>{
            const {data} = await axiosSecure(`/users/role/${user?.email}`)
        return data.role
        }
    })

    return [role, isPending]
};

export default useRole;