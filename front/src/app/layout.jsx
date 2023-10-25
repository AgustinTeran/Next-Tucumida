import Nav from '@/components/layout/Nav'
import './globals.css'
import Provider from '@/redux/provider'
import { back } from '@/config'
import backRoutes from '@/config/backRoutes'
import {cookies} from "next/headers"
import BigLoader from '@/components/commons/bigLoader'
import Main from '@/components/layout/Main'

import 'react-toastify/dist/ReactToastify.css';

function getUser(){
  var token = cookies().get("token")?.value

  if(token){
    var user = back.get(`${backRoutes.USUARIOS}/profile`,{headers: {token}})
    .then(res => res.data)
    .catch(err => ({error: true, message: err.response.data}))

    return user
  }
}


export const metadata = {
  title: 'Tucumida | Restaurantes de Tucumán',
  description: 'Encuentra el mejor lugar para comer en Tucumán. ',
  keywords: ["sandwicherias tucuman","empanadas tucuman","pizzas tucuman","donde comer","restaurantes","sangucheria tucuman"],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
}

export default async function RootLayout({ children }) {
  var user = await getUser()


  if(user && user.error && user.message === "Acceso Denegado"){
    return (
      <html lang="es" data-theme="mytheme">
        <body>
          <Provider>
            <Nav user={user}/>
            <BigLoader/>
          </Provider> 
        </body>
      </html>
    )
  }
  return (
    <html lang="es">
      <body className='relative'>
        <Provider>
          <Nav user={user}/>
          <Main serverTheme={cookies().get("theme")?.value}>
            {children}
          </Main>
        </Provider>
      </body>
    </html>
  )
}
