import { Helmet } from 'react-helmet-async'
import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import useRole from '../../../hooks/useRole'
const Statistics = () => {
  const [role, isPending] = useRole()
if(isPending) return 'lol'

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {role === 'Admin' &&  <AdminStatistics />}
      {role === 'seller' &&  'seller'}
      {role === 'customer' &&  'customer'}
     
    </div>
  )
}

export default Statistics
