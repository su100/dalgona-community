import React from 'react';
import Slider from 'react-slick';
import nextArrow from 'images/next-arrow.png';
import prevArrow from 'images/prev-arrow.png';
import './BasicSlider.scss';

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            src={prevArrow}
            className={className}
            style={{ ...style, width: '40px', height: '160px' }}
            onClick={onClick}
            alt="prev"
        />
    );
}
function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            src={nextArrow}
            className={className}
            style={{ ...style, width: '40px', height: '160px' }}
            onClick={onClick}
            alt="next"
        />
    );
}
const BasicSlider = ({
    children,
    background,
    autoplay = false,
    autoplaySpeed = 5000,
    infinite = false,
    slidesToShow = 1,
    slidesToScroll = 1,
    arrows = false,
}) => {
    let settings = {
        dots: true,
        autoplay: autoplay,
        autoplaySpeed: autoplaySpeed,
        infinite: infinite,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        swipeToSlide: true,
        arrows: arrows,
        centerMode: false,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Slider {...settings} className="basic-slider" style={{ background: background }}>
            {children}
        </Slider>
    );
};

export default BasicSlider;
