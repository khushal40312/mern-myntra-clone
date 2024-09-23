import React from 'react'
// import MenItems from '../components/KidsItems'
import { useSelector } from 'react-redux'
import KidsItems from '../components/KidsItems'
export default function Kids() {
  const itemsk = useSelector(store => store.items)

  return (
    <>

            <div style={{ marginTop: '100px' }} className='d-flex justify-content-center'> <h2 >Kids Items</h2> </div>
<img id='Pc' src="images/kids.webp" alt="" />
<img id="mobileImage" src="images/kidsbanner.jpg" alt="Mobile Image" />

            <div className="items-container">
                {itemsk.filter(item => item.category === 'Kids').map(items => <KidsItems key={items.id} items={items} allItems={itemsk}  />)}

            </div>
        </>
  )
}
