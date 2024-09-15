import React from 'react'
import ElectronicsItems from '../components/ElectronicsItems'
import { useSelector } from 'react-redux'

export default function Electronics() {
    const items = useSelector(store => store.items)

    return (
      <>
  
              <div style={{ marginTop: '100px' }} className='d-flex justify-content-center'> <h2 >Electronics& Gagets </h2> </div>

              <img id='Pc' src="images/electronic.jpg" alt="" />
    <img id="mobileImage" src="images/gadgetbanner.avif" alt="Mobile Image" />
              <div className="items-container">
                  {items.filter(item => item.category === 'Electronic').map(items => <ElectronicsItems key={items.id} items={items} />)}
  
              </div>
          </>
    )
  }
