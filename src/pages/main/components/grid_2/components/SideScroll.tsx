import React, { useState, useEffect, useMemo } from "react";
import { DataGridHandle } from "react-data-grid";
import { LeftSideArrow, RightSideArrow } from "../styles/grid";

interface ISideScrollProps {
  gridRef: React.RefObject<DataGridHandle>;
}

export default function SideScroll({ gridRef }: ISideScrollProps) {
  const gridHtmlElement = gridRef!.current!.element!
  const [scrollLeft, setScrollLeft] = useState(0)
  const [intervalId, setIntervalId] = useState(0)
  const scrollMax = gridHtmlElement.scrollWidth - gridHtmlElement.clientWidth

  const showLeft = useMemo(() => scrollLeft !== 0, [scrollLeft])
  const showRight = useMemo(() => scrollLeft !== scrollMax, [scrollLeft, scrollMax])

  useEffect(() => {
    gridHtmlElement.addEventListener("scroll", (evt) => setScrollLeft((evt.target as HTMLDivElement).scrollLeft))
  }, [gridHtmlElement])

  const startScroll = (direction: "left" | "right") => {
    const step = direction === "left" ? -75 : 75;
    
    const interval = window.setInterval(() => {      
      if (isScrollEnded(direction)) {
        window.clearInterval(interval)
      } else {
        gridHtmlElement.scrollLeft += step
      }
    }, 100)

    setIntervalId(interval)
  }

  const stopScroll = () => {    
    window.clearInterval(intervalId)
    setIntervalId(0)
  }

  const isScrollEnded = (direction: "left" | "right") => {
    const currentScrollLeft = gridHtmlElement.scrollLeft    
    return (direction === "left" && currentScrollLeft === 0) || (direction === "right" && currentScrollLeft === scrollMax)
  }

  return (
    <>
      {showLeft &&
        <LeftSideArrow
          onMouseEnter={() => startScroll("left")}
          onMouseOut={() => stopScroll()}
        />
      }
      {showRight &&
        <RightSideArrow
          onMouseEnter={() => startScroll("right")}
          onMouseOut={() => stopScroll()}
        />
      }
    </>
  )
}
