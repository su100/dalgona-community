import React from 'react';
import Slider from 'react-slick';
import nextArrow from 'images/next-arrow.png';
import prevArrow from 'images/prev-arrow.png';
import './BasicSlider.scss';

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button onClick={onClick}>
      <img
        src={prevArrow}
        className={className}
        style={{ ...style, width: '22px', height: '62px', marginLeft: '-20px' }}
        alt="prev"
      />
    </button>
  );
}
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button onClick={onClick}>
      <img
        src={nextArrow}
        className={className}
        style={{ ...style, width: '22px', height: '62px', marginRight: '-20px' }}
        alt="next"
      />
    </button>
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
}) => (
  <div style={{ background }}>
    <Slider
      dots={dots}
      autoplay={autoplay}
      autoplaySpeed={autoplaySpeed}
      infinite={infinite}
      slidesToShow={slidesToShow}
      slidesToScroll={slidesToScroll}
      swipeToSlide
      arrows={arrows}
      centerMode={false}
      pauseOnHover
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      className="basic-slider"
    >
      {children}
    </Slider>
  </div>
);

export default BasicSlider;
