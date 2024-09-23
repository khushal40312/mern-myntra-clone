import React from 'react'
import HomeItems from '../components/HomeItems'
import { useSelector } from 'react-redux'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const items = useSelector(store => store.items);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  const images = [
    "images/50ba00cc44d3fa70.webp",
    "images/614c92ccb25152fe.webp",
    "images/e7554fcdb3042316.webp",
    "images/fb212593cc44b077.webp",
    "images/2152c9d0afe3352d.webp",
  ];

  return (
    <>
      <main>
        <div style={{ marginTop: "100px" }} className="containerb ">
          {/* <img id="leftImage" src="images/left.webp" alt="First Image" />
          <img id="rightImage" src="images/right.png" alt="Second Image" /> */}
          <img id='leftImage' className=' my-3' src="/images/banner2.webp" alt="" />
          <img id="mobileImage" src="images/mobile.jpg" alt="Mobile Image" />
        </div>

        <div className='d-flex justify-content-center slider-cont'>        
          <div className="slider-container">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Slide ${index + 1}`} className="slider-image" />
                </div>
              ))}
            </Slider>
          </div> 
        </div>

        {/* Banner Section */}
        <div className="banner d-flex justify-content-center">
          <img className='crazy-banner' src="images/2d52a258-890d-46ab-93b6-2458a0f966ee1725589715550-Crazy-Deals.webp" alt="Crazy Deals Banner" />
        </div>

        {/* Items Section */}
        <div className="items-container">
          {items.map(item => (
            <HomeItems key={item.id} items={item} allItems={items} />
          ))}
        </div>
      </main>
    </>
  );
}
