
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'

import { Outlet } from 'react-router-dom'
import FetchItems from '../components/FetchItems'
import { useSelector } from 'react-redux'


function App() {

  const fetchStatus = useSelector(store => store.fetchStatus);

  return (
    <>
     
    <FetchItems>
      <Header />
      
      {fetchStatus.currentlyFetching ? <LoadingSpinner /> :
        <Outlet />
      }

      <Footer />
      </FetchItems>
    </>
  )
}

export default App
