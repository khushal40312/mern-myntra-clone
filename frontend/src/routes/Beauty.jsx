import React from 'react'
import BeautyItems from '../components/BeautyItems'
import { useSelector } from 'react-redux'

export default function Beauty() {
  const itemsb = useSelector(store => store.items)

  return (
    <>

    <div style={{ marginTop: '100px' }} className='d-flex justify-content-center'> <h2 >Beauty Items</h2> </div>
    <img id='Pc'  src="images/beauty.webp" alt="" />
<img id="mobileImage" src="images/beautybanner.jpg" alt="Mobile Image" />

    <div className="items-container">
        {itemsb.filter(item => item.category === 'Beauty').map(items => <BeautyItems key={items.id} items={items} allItems={itemsb}  />)}

    </div>
</>
  )
}