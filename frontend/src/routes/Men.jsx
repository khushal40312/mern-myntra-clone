import React from 'react'
import MenItems from '../components/MenItems'
import { useSelector } from 'react-redux'

export default function Men() {
    const items = useSelector(store => store.items)

    return (
        <>
            <div style={{ marginTop: '100px' }} className='d-flex justify-content-center'> <h2 >Men's Items</h2> </div>
<img id='Pc' src="images/men.webp" alt="" />
<img id="mobileImage" src="images/menbanner.jpeg" alt="Mobile Image" />

        
            <div className="items-container">
                {items.filter(item => item.category === 'Man').map(items => <MenItems key={items.id} items={items} />)}

            </div>
        </>
    )
}
