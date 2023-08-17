// TopNav, NavBar and Footer sections
import { Outlet } from 'react-router-dom'
import TopNav from './includes/TopNav'
import NavBar from './includes/NavBar'
import { FooterContainer } from './includes/Footer'
import {AuthProvider} from './utils/AuthContext'
import Cart from './components/homeScreen/Cart/Cart'

const Root = () => {
  return (
    <AuthProvider>
      <Cart onClose={function (): void {
        throw new Error('Function not implemented.')
      } } />
        <TopNav/>        
        <NavBar/>
            <Outlet/>
        <FooterContainer />       
    </AuthProvider>
  )
}

export default Root