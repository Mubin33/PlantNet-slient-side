import Card from './Card'
import Container from '../Shared/Container'
import axios from 'axios'
import { 
  useQuery,
} from '@tanstack/react-query'

const Plants = () => {

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_API_URL}/plants`)
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const allPlants = data.data
  console.log(data.data)

  return (
    <Container>
      <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {
          allPlants?.map(item=> <Card key={item._id} item={item}/>)
        } 
      </div>
    </Container>
  )
}

export default Plants
