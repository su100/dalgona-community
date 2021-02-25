import React from 'react';
import Slider from 'react-slick';

import './BasicSlider.scss';

const BasicSlider = (props) => {
    let settings = {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: false,
    };

    if (props.autoplay) {
        settings['autoplay'] = true;
    }
    if (props.speed) {
        settings['autoplaySpeed'] = props.speed;
    }

    if (props.infinite) {
        settings['infinite'] = true;
    }

    return (
        <Slider {...settings} className="basic-slider" style={{ background: props.background }}>
            {props.children}
        </Slider>
    );
};

export default BasicSlider;
