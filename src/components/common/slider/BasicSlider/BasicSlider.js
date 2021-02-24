import React from 'react';
import Slider from 'react-slick';

import './BasicSlider.scss';

const BasicSlider = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: false,
    };
    return (
        <Slider {...settings} className="basic-slider">
            {props.children}
        </Slider>
    );
};

export default BasicSlider;
