import React from 'react'
import MenItems from '../components/MenItems'
import { useSelector } from 'react-redux'

export default function Men() {
    const itemsm = useSelector(store => store.items)

    return (
        <>
            <div style={{ marginTop: '100px' }} className='d-flex justify-content-center'> <h2 >Men's Items</h2> </div>
            <img id='Pc' src="images/men.webp" alt="" />
            <img id="mobileImage" src="images/menbanner.jpg" alt="Mobile Image" />


            <div className="items-container">
                {itemsm.filter(item => item.category === 'Man').map(items => <MenItems key={items.id} items={items} allItems={itemsm} />)}

            </div>
        </>
    )
}
