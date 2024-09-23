import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bagActions } from '../store/BagSlice';
import itemContext from '../../context/Itemcontext';
import toast from 'react-hot-toast';
import { Modal, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HomeItems({ items, allItems }) {
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to store clicked item details
  
  const bagItems = useSelector((store) => store.bag);
  const context = useContext(itemContext);
  const { AddToCart, deleteItem } = context;
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const elementFound = Array.isArray(bagItems[0]) && bagItems[0].some((item) => item.id === selectedItem?.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleItem = () => {
    dispatch(bagActions.addToBag(selectedItem));
    AddToCart(selectedItem);
    toast.success(`${selectedItem.item_name} added to cart successfully`);
  };

  const handleRemoveItem = () => {
    dispatch(bagActions.removeToBag(selectedItem.id));
    deleteItem(selectedItem.id);
    toast.success("Removed from cart successfully");
  };

  const Loginfirst = () => {
    navigate("/login");
    toast.error("Please Log-in First");
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);  // Set the clicked item
    setShowModal(true);  // Keep the modal open
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  useEffect(() => {
    const scrollToItem = () => {
      const itemId = location.hash.replace('#', '');
      if (itemId) {
        const itemElement = document.getElementById(itemId);
        if (itemElement) {
          itemElement.scrollIntoView({ behavior: 'smooth' });
          itemElement.classList.add('blink');
          setTimeout(() => itemElement.classList.remove('blink'), 1000);
        }
      }
    };
    scrollToItem();
  }, [location]);

  // Filter similar items based on the selected item category
  const similarItems = allItems.filter((itm) => itm.category === selectedItem?.category && itm.id !== selectedItem?.id);

  return (
    <>
      <div id={items.id} className="item-container" onClick={() => handleItemClick(items)}>
        <img id={items.id} className="item-image" src={items.image} alt="item image" />
        <div className="rating">
          {items.rating.stars} ⭐ | {items.rating.count}
        </div>
        <div className="company-name">{items.company}</div>
        <div className="item-name">{items.item_name}</div>
        <div className="price">
          <span className="current-price">Rs {items.current_price}</span>
          <span className="original-price">Rs {items.original_price}</span>
          <span className="discount">({items.discount_percentage}% OFF)</span>
        </div>
      </div>

      {/* Modal for showing product details */}
      <Modal show={showModal} onHide={closeModal} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.item_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row gx-5">
              <aside className="col-lg-6">
                <div className="border rounded-4 mb-3 d-flex justify-content-center ">
                  <img style={{ maxWidth: "100%", maxHeight: "100vh", margin: 'auto' }} className="rounded-4 fit" src={selectedItem?.image} alt={selectedItem?.item_name} />
                
                </div>
              </aside>
              <main className="col-lg-6">
                <h4>{selectedItem?.company} - {selectedItem?.item_name}</h4>
                <div className="rating">
                  {selectedItem?.rating.stars} ⭐ | {selectedItem?.rating.count} reviews
                </div>
                <div className="current-price">
                  Rs {selectedItem?.current_price} <span className="text-muted">({selectedItem?.discount_percentage}% OFF)</span>
                </div>
                <p className='text-muted'>{selectedItem?.description}</p>
            
                
              </main>
            </div>
          </div>

          {/* Similar items */}
          <div style={{ width: "20vw" }} className="col-lg-4">
            <div style={{ width: "21vw" }} className="similar px-0 border rounded-2 shadow-0">
              <div style={{ width: "21vw" }} className="similar card ">
                <div style={{ width: "21vw" }} className="card-body similar">
                  <h5 className="card-title">Similar items</h5>
                  {similarItems.length ? similarItems.map((item) => (
                    <div style={{border:"2px solid black", borderRadius:"6px"}} className="d-flex mb-3 " key={item.id} onClick={() => handleItemClick(item)}>
                      <img src={item.image} style={{ minWidth: '50px', height: "110px",objectFit:'cover',  borderRadius:"3px" }} className="" alt={item.item_name} />
                      <div className="info mx-2">
                        <span className='item-name'>{item.item_name}</span> <br />
                        <span className='company-name'>{item.company}</span>
                        <strong className="current-price mx-2">Rs {item.current_price}</strong>
                      </div>
                    </div>
                  )) : <p>No similar items found.</p>}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button className='btn-add-bag' onClick={closeModal}>Close</Button>
          {elementFound && isLoggedIn ? (
            <Button className='btn-add-bag btn-danger' onClick={handleRemoveItem}>
              Remove from cart
            </Button>
          ) : (
            <Button className='btn-add-bag' onClick={!localStorage.getItem('token') ? Loginfirst : handleItem}>
              Add to Cart
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
