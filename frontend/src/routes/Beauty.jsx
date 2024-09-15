import React from 'react'
import BeautyItems from '../components/BeautyItems'
import { useSelector } from 'react-redux'

export default function Beauty() {
  const items = useSelector(store => store.items)

  return (
    <>

    <div style={{ marginTop: '100px' }} className='d-flex justify-content-center'> <h2 >Beauty Items</h2> </div>
    <img id='Pc'  src="images/beauty.webp" alt="" />
<img id="mobileImage" src="images/beautybanner.jpeg" alt="Mobile Image" />

    <div className="items-container">
        {items.filter(item => item.category === 'Beauty').map(items => <BeautyItems key={items.id} items={items} />)}

    </div>
</>
  )
}