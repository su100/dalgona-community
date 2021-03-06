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
            style={{ ...style, width: '22px', height: '62px', marginLeft: '-20px' }}
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
            style={{ ...style, width: '22px', height: '62px', marginRight: '-20px' }}
            onClick={onClick}
            alt="next"
        />
    );
}
const BasicSlider = ({
    children,
    background,
    dots = true,
    autoplay = false,
    autoplaySpeed = 5000,
    infinite = false,
    slidesToShow = 1,
    slidesToScroll = 1,
    arrows = false,
}) => {
    let settings = {
        dots: dots,
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
        <div style={{ background: background }}>
            <Slider {...settings} className="basic-slider">
                {children}
            </Slider>
        </div>
    );
};

export default BasicSlider;
