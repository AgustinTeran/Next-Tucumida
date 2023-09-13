import CategoriesCard from '@/components/customs/categoriesCard'
import SearchInput from '@/components/customs/searchInput'
import { back } from '@/config'
import backRoutes from '@/config/backRoutes'

function getCategorias(){
  var categorias = back.get(`${backRoutes.CATEGORIAS}?order=ASC`)
  .then(data => data.data)
  .catch(err => err)

  return categorias
}

export default async function Home() {
  var categorias = await getCategorias()
  return (
    <div className='max-w-5xl mx-auto'>
      <SearchInput/>
    
      <h4 className='text-3xl ml-7 my-3'>Categorias</h4>
      <div className='flex flex-wrap py-4 gap-3 justify-center'>
        {
          categorias?.rows?.map(e => <CategoriesCard key={e.id} nombre={e.nombre} id={e.id} color={e.color} imagen={e.imagen}/>)
        }
      </div>
    </div>
  )
}
