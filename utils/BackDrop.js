const BackDrop = ({ open, closeHandler, zIndex }) => {
  return (
    <div
      className={`top-0 z-${zIndex} bg-black left-0 bottom-0 right-0 w-full h-full fixed ${
        open ? "block opacity-30" : "hidden opacity-0"
      } transition-all duration-200`}
      onClick={() => closeHandler()}
    ></div>
  );
};

export default BackDrop;
