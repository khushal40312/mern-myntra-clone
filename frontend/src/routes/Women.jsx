import React from 'react'
import WomenItems from '../components/WomenItems'
import { useSelector } from 'react-redux'
export default function Women() {
  const itemsw = useSelector(store => store.items)

  return (
    <>
            <div style={{ marginTop: '100px' }} className='d-flex justify-content-center'> <h2 >Women's Items</h2> </div>
    <img id='Pc' src="images/women.webp" alt="" />
    <img id="mobileImage" src="images/womenBanner.jpg" alt="Mobile Image" />

            <div className="items-container">
                {itemsw.filter(item => item.category === 'Women').map(items => <WomenItems key={items.id} items={items} allItems={itemsw}  />)}

            </div>
        </>
  )
}
