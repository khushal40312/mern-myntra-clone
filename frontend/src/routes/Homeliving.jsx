import React from 'react'
import HomeLivings from '../components/HomeLivings'
import { useSelector } from 'react-redux'

export default function Homeliving() {
  const items = useSelector(store => store.items)

  return (
    <>

    <div style={{ marginTop: '100px' }} className='d-flex justify-content-center'> <h2 >Home & Livings Items</h2> </div>
    <img id='Pc' src="images/home.webp" alt="" />
<img id="mobileImage" src="images/homelivingbanner.jpg" alt="Mobile Image" />

    <div className="items-container">
        {items.filter(item => item.category === 'Home & Living').map(items => <HomeLivings key={items.id} items={items} />)}

    </div>
</>
  )
}
