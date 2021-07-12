import React from "react";
import Link from 'next/link'
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./index.module.scss";

export default (props) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [pause, setPause] = React.useState(false);
  const timer = React.useRef();
  const autoPlayProps ={
    loop: true,
    duration: 3000,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    }
  }

  const defaultConfig ={
    initial: 0,
    mode: "free-snap",
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
      let activeThumbnail = document.querySelector(".thumbnail-wrapper .thumbnail-active")
      if(activeThumbnail){
        // activeThumbnail.scrollIntoViewIfNeeded()
        let element = document.querySelector('.thumbnail-wrapper');
        let position = element.getBoundingClientRect();

        // checking whether fully visible
        if(position.top >= 0 && position.bottom <= window.innerHeight) {
          // console.log('Element is fully visible in screen');
          activeThumbnail.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
        }

      }
    }
  }

  let activeConfig = defaultConfig;
  //判断是否自动播放
  if(props.autoplay){
    activeConfig = Object.assign(activeConfig, autoPlayProps)
    
  }
  const [sliderRef, slider] = useKeenSlider(activeConfig);
  
  if(props.autoplay){
    React.useEffect(() => {
      sliderRef.current.addEventListener("mouseover", () => {
        setPause(true);
      });
      sliderRef.current.addEventListener("mouseout", () => {
        setPause(false);
      });
    }, [sliderRef]);
  
    React.useEffect(() => {
      timer.current = setInterval(() => {
        if (!pause && slider) {
          slider.next();
        }
      }, 3000);
      return () => {
        clearInterval(timer.current);
      };
    }, [pause, slider]);
  }

  const contentArray = props.contentArray;
  const thumbnailContentArray = props.thumbnailContentArray;
  const sliderContentArray = contentArray.map((item,index) => {
    if(item.link_to){
      return <Link key={index} href={item.link_to}><div className={`keen-slider__slide ${item.className ? item.className : "" } ${styles["cursor-pointer"]}`}>{item.content}</div></Link>
    }
    return <div key={index} className={`keen-slider__slide ${item.className ? item.className : "" }`}>{item.content}</div>
  });

  return (
    <>
      <div className={styles["navigation-wrapper"]}>
        <div ref={sliderRef} className={`keen-slider ${styles["keen-slider"]}`}>
          {sliderContentArray}
        </div>
        {slider && (
          <>
            <ArrowLeft
              onClick={(e) => e.stopPropagation() || slider.prev()}
              // disabled={currentSlide === 0}
            />

            <ArrowRight
              onClick={(e) => e.stopPropagation() || slider.next()}
              // disabled={currentSlide === slider.details().size - 1}
            />
          </>
        )}
      </div>
      {slider && (
        <div className={styles.dots}>
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  console.log(idx);
                  slider.moveToSlideRelative(idx);
                }}
                className={styles.dot + (currentSlide === idx ? ` ${styles.active}` : "")}
              />
            );
          })}
        </div>
      )}
      {slider && thumbnailContentArray && thumbnailContentArray.length > 0  && (
        <div className={`${styles["thumbnail-wrapper"]} thumbnail-wrapper`}>
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <div
                key={idx}
                className={
                  styles["thumbnail"] + (currentSlide === idx ? ` ${styles["thumbnail-active"]} thumbnail-active` : "")
                }
                onClick={() => {
                  console.log(idx);
                  slider.moveToSlideRelative(idx);
                }}
              >
                {thumbnailContentArray[idx]}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

function ArrowLeft(props) {
  const disabeld = props.disabled ? "arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`${styles.arrow} ${styles["arrow--left"]} ${disabeld ? styles[disabeld] : ''}`}
      // className={"arrow arrow--left" + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  );
}

function ArrowRight(props) {
  const disabeld = props.disabled ? "arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`${styles.arrow} ${styles["arrow--right"]} ${disabeld ? styles[disabeld] : ''}`}
      // className={"arrow arrow--right" + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
  );
}
