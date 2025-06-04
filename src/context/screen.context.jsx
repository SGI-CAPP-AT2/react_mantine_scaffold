import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext();

export const ScreenProvider = ({ mainRef, children }) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const computeSize = (mainRef) => {
    if (mainRef == null || mainRef.current == null) return;
    const style = window.getComputedStyle(mainRef.current);
    if (window.innerWidth < 700) setIsMobile(true);
    else setIsMobile(false);
    const paddings = [
      style.getPropertyValue("padding-top"),
      style.getPropertyValue("padding-right"),
      style.getPropertyValue("padding-bottom"),
      style.getPropertyValue("padding-left"),
    ];
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = paddings.map(
      (e) => parseFloat(e.replace("px", ""))
    );

    setHeight(mainRef.current.offsetHeight - (paddingTop + paddingBottom));
    setWidth(mainRef.current.offsetWidth - (paddingLeft + paddingRight));
  };
  useEffect(() => {
    computeSize(mainRef);
    window.addEventListener("resize", () => {
      computeSize(mainRef);
    });
  }, [mainRef]);
  return (
    <ScreenContext.Provider value={{ height, width, isMobile }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = () => useContext(ScreenContext);
