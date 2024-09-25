import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from '../store/itemsSlice';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { VscRemoteExplorer } from "react-icons/vsc";

export default function AdminPanel() {
    const navigate = useNavigate()


    

    const items = useSelector(store => store.items);
    const isAdmin = useSelector((state) => state.admin.isAdmin);

    const dispatch = useDispatch();
    const largestId = items.reduce((max, item) => {
        const currentId = parseInt(item.id, 10); // Convert the id to a number
        return currentId > max ? currentId : max;
    }, 0); // Start with 0 as the initial max value

    const newId = (largestId + 1).toString().padStart(3, '0');

    const [itemData, setItemData] = useState({
        id: newId,
        image: "",
        company: "",
        item_name: "",
        original_price: "",
        current_price: "",
        discount_percentage: "",
        rating: {
            stars: "",
            count: ""
        }
    });

 const deleteItem = async (id) => {
    const removeItem = async () => {
        const response = await fetch(`https://myntra-clone-mern.onrender.com/api/items/deleteadmin/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const json = await response.json();
        if (json.message === 'Item deleted successfully') {
            dispatch(itemsActions.removeItem(id));
        } else {
            throw new Error('Failed to delete item');
        }
    };

    toast.promise(
        removeItem(),
        {
            loading: 'Deleting item...',
            success: <b>Item deleted successfully!</b>,
            error: <b>Failed to delete item.</b>,
        }
    );
};


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "stars" || name === "count") {
            setItemData(prevState => ({
                ...prevState,
                rating: {
                    ...prevState.rating,
                    [name]: value
                }
            }));
        } else {
            setItemData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


   const handleSubmit = (e) => {
    e.preventDefault();

    const addItem = async () => {
        await axios.post('https://myntra-clone-mern.onrender.com/api/items/admin', itemData);
        dispatch(itemsActions.addItem(itemData));

        setItemData({
            id: "",
            category: "",
            image: "",
            company: "",
            item_name: "",
            original_price: "",
            current_price: "",
            discount_percentage: "",
            rating: {
                stars: "",
                count: ""
            },
            description: ""
        });
    };

    toast.promise(
        addItem(),
        {
            loading: 'Adding item...',
            success: <b>Item added successfully!</b>,
            error: <b>Failed to add item.</b>,
        }
    );
};

    };
    useEffect(()=>{
        if (!isAdmin) {
            
            navigate("/")
        } 
    },[isAdmin])
    return (
        <>
      

            <div style={{ marginTop: "100px" }} className="container ">

                <div className="container h-100">
                <nav className="container w-25 d-flex flex-row justify-content-center border rounded btn btn-success my-2">
       
              <Link className="nav-link mx-2" to="/adminpanel2"><VscRemoteExplorer  size={30}/>  Handle Orders</Link>

              {/* <a className="nav-link mx-2" href="#!"><i className="fas fa-bell pe-2"></i>Alerts</a> */}
          
           
            
         
        
            </nav>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-lg-11">
                            <div className="card text-black" style={{ borderRadius: '25px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <h2>Add New Item</h2>
                                            <form onSubmit={handleSubmit}>
                                                {/* <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                       <strong className='id_warning'>ID must be unique</strong>  (Example: {newId})
                                                        <input 
                                                            type="text"
                                                            name="id"
                                                            placeholder="ID"
                                                            value={itemData.id}
                                                            onChange={handleChange}
                                                            required
                                                        /> 
                                                    </div>
                                                </div> */}
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            name="image"
                                                            placeholder="Image URL"
                                                            value={itemData.image}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className=" d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            name="company"
                                                            placeholder="Company"
                                                            value={itemData.company}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            name="item_name"
                                                            placeholder="Item Name"
                                                            value={itemData.item_name}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="number"
                                                            name="original_price"
                                                            placeholder="Original Price"
                                                            value={itemData.original_price}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="number"
                                                            name="current_price"
                                                            placeholder="Current Price"
                                                            value={itemData.current_price}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="number"
                                                            name="discount_percentage"
                                                            placeholder="Discount Percentage"
                                                            value={itemData.discount_percentage}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="number"
                                                            name="stars"
                                                            placeholder="Rating Stars"
                                                            value={itemData.rating.stars}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="number"
                                                            name="count"
                                                            placeholder="Rating Count"
                                                            value={itemData.rating.count}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            name="description"
                                                            placeholder="Item Description"
                                                            value={itemData.description}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            name="category"
                                                            placeholder="category(Women,Man,Beauty,Electronic,Kids)"
                                                            value={itemData.category}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <button className='btn btn-primary w-25' type="submit">Add Item</button>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <GrUserAdmin size={100} />
                                            <h1>Hello, ADMIN</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div style={{ width: '70vw' }} className="d-flex adminmobile flex-column justify-content-center my-4 ">
                    {items.map(item => (
                        <div key={item.id} className="d-flex align-items-center mx-4 border rounded my-2 columnadmin justify-content-center">
                            <img className="admin-item-image mx-2" src={item.image} alt="item image" />
                            <div className="rating mx-4">
                                Star: {item.rating.stars} ⭐ | Count: {item.rating.count}
                            </div>
                            <div className="company-name mx-4">Company: {item.company}</div>
                            <div className="item-name mx-4"><strong>Item Name:</strong> {item.item_name}</div>
                            <span className="current-price mx-4"><strong>Current Price:</strong> Rs {item.current_price}</span>
                            <span className="original-price mx-4"><strong>Original Price:</strong> Rs {item.original_price}</span>
                            <span className="discount mx-4"><strong>Discount:</strong> ({item.discount_percentage}% OFF)</span>
                            <span className="discount mx-4"><strong>ID:</strong> ({item.id})</span>
                            <button onClick={() => deleteItem(item.id)} className="butt btn btn-danger">
                                <MdDelete />
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
