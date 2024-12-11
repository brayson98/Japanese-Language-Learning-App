import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import './Carousel.css';

const Carousel = () => {
    const images = [
        { src: '/images/Mt_Fuji.jpg', caption: 'Mount Fuji - 日本' },
        { src: '/images/Cherry_Blossom.jpg', caption: 'Cherry Blossoms - 桜' },
        { src: '/images/Torii_Gates.jpg', caption: 'Torii Gate - 鳥居' },
        { src: '/images/Shibuya.jpg', caption: 'Shibuya - 渋谷' },
        { src: '/images/Kimonos.jpg', caption: 'Kimonos - 着物' },
    ];

   
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="carousel-slide">
                        <img src={image.src} alt={image.caption} />
                        <p>{image.caption}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
