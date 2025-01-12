 
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import useRole from '../hooks/useRole';

const AdminRoute = ({children}) => { 
    const [role, isPending] = useRole()
    const location = useLocation()
  
    if (isPending) return <LoadingSpinner />
    if (role === 'Admin') return children
    return <Navigate to='/' state={{ from: location }} replace='true' />
  }

export default AdminRoute;