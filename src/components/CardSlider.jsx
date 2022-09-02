import React, { useRef, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import styled from 'styled-components'
import Card from './Card';

export default function CardSlider({ title, data }) {
    const [showControls, setshowControls] = useState(false);
    const [sliderposition, setsliderposition] = useState(0);
    const listRef = useRef();
    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 70;
        if (direction === "left" && sliderposition > 0) {
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
            setsliderposition(sliderposition - 1);
        }
        if (direction === "right" && sliderposition < 4) {
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
            setsliderposition(sliderposition + 1);
        }
    };
    return (
        <Container className='flex column'
            onMouseEnter={() => setshowControls(true)}
            onMouseLeave={() => setshowControls(false)}>
            <h1>{title}</h1>
            <div className="wrapper">
                <div className={`slider-action left ${showControls ? "" : "none"} flex j-center a-center`}>
                    <AiOutlineLeft onClick={() => handleDirection("left")} />
                </div>
                <div className='flex slider' ref={listRef}>
                    {data.map((movie, index) => {
                        return <Card movie={movie} key={index} />
                    })}
                </div>
                <div className={`slider-action right ${showControls ? "" : "none"} flex j-center a-center`}>
                    <AiOutlineRight onClick={() => handleDirection("right")} />
                </div>
            </div>

        </Container>
    )
}
const Container = styled.div`
    gap: 01rem;
  position: relative;
  padding: 1rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;