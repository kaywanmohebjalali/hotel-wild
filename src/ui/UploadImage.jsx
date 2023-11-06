/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./UploadImage.css";

let file = "";


// 1
const UploadContext = createContext();

// 2
const UploadImage = ({
  children,
  inputRef,
  setUpdateImage,
  width,
  height,
  bgColor,
  boxShadow,
  color,
  borderRadius,
  size,
  maxWidth,
  minWidth
}) => {
 
  const sizeImgRef = useRef(null);

  const descriptionRef = useRef(null);
  const dropRef = useRef(null);
  const [image, setImage] = useState("");

  function stopDropHtml(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  useEffect(() => {
    const rootEle = document.querySelector(':root');
    size=='small'?rootEle.style.setProperty('--size', 3/4)
    :rootEle.style.setProperty('--size', 1)
    const parent = document.querySelector(".container-upload");
    const imgEle = document.querySelector(".person img");

    if (imgEle) imgEle.style.borderRadius = borderRadius ? borderRadius : "50%";
    if (parent) {
      parent.style.maxWidth = maxWidth ? maxWidth : "none";
      parent.style.minWidth = minWidth ? minWidth : "100px";
      parent.style.width = width ? width : "100%";
      parent.style.height = width ? height : "auto";
      parent.style.backgroundColor = bgColor ? bgColor : "#f5f5f5";
      parent.style.boxShadow = boxShadow ? boxShadow : "0px 0px 2px #8f8d8d";
      parent.style.color = color ? color : "#444";
    }

    const htmlElement = document.querySelector("html");
    htmlElement.addEventListener("dragover", stopDropHtml, false);
    htmlElement.addEventListener("drop", stopDropHtml, false);

    function drop(e) {
      file = e?.dataTransfer?.files[0];
      e.preventDefault();
      inputRef.current.files = e.dataTransfer.files;
      setImage?.(e.dataTransfer.files[0]);
      setUpdateImage?.(e.dataTransfer.files[0]);
      
      handleImageChange(null,e.dataTransfer.files[0])
    }
    dropRef.current.addEventListener("drop", drop);

    return () => {
      htmlElement?.removeEventListener("drop", stopDropHtml);
      htmlElement?.removeEventListener("dragover", stopDropHtml);
      dropRef.current?.removeEventListener("drop", drop);
    };
  }, []);

  function clearData() {
    setImage?.("");
    setUpdateImage?.(false);
    if (sizeImgRef?.current) {
      sizeImgRef.current.innerHTML = "size:0kb";
    }

    if (inputRef?.current) inputRef.current.value = "";
  }

  function handleClickImage() {
    if (inputRef?.current) inputRef.current.click();
  }

  function handleImageChange(e,fileImg) {
  
    file = e?e?.target?.files[0]:fileImg;
    if (file) {
      setUpdateImage?.(file);
      setImage(file);

      if ( sizeImgRef.current) {
        sizeImgRef.current.innerHTML = file?.size ? `size: ${file?.size} kb`: "";
      }
    } else {
      clearData();
    }
  }

  function handleDeleteImg() {
    if (file) {
      clearData();
    }
  }

  return (
    <UploadContext.Provider
      value={{
        dropRef,
        descriptionRef,
        
        sizeImgRef,
        handleDeleteImg,
        handleClickImage,
        handleImageChange,
        image,
        setImage,
      }}
    >
      <div className="container-upload">
        <div className="box-upload">{children}</div>
      </div>
    </UploadContext.Provider>
  );
};

// 3

function Drop({ children, iconClick, iconDrop }) {
  const { dropRef, handleClickImage, handleImageChange } =
    useContext(UploadContext);
  
 
  return (
    <div className="all-upload">
      {cloneElement(children, { onChange: handleImageChange })}
      <label ref={dropRef} className="label-upload">
        {iconDrop}
        <p className="text-drop">drop file here</p>
      </label>
      <div className="click-container">
      <p className="text-or">or</p>
        <abbr title="click for upload image" onClick={handleClickImage}>
          {iconClick}
        </abbr>
          
      </div>
      
    </div>
  );
}

function Image({ icon = "" ,src=''}) {
  const { handleDeleteImg, image } = useContext(UploadContext);

  return (
    <div className="container-img">
      {image && (
        <abbr className="user" title="delete img">
          <img
            src="/icon-delete-3.png"
            className="delete"
            onClick={handleDeleteImg}
          />
        </abbr>
      )}

      <div className="person">
        {image  ? <img src={URL.createObjectURL(image)} /> :
         icon && !src ? icon : ""}

         {src && !image ?<img src={src} />:''}

      </div>
    </div>
  );
}

function DescriptionImage() {
  const { descriptionRef, sizeImgRef } = useContext(UploadContext);

  return (
    <div ref={descriptionRef} className="description-img">
    
      <span ref={sizeImgRef} className="size-upload">
        size:0kb
      </span>
    </div>
  );
}

// 4

UploadImage.Drop = Drop;
UploadImage.Image = Image;
UploadImage.DescriptionImage = DescriptionImage;

export default UploadImage;
