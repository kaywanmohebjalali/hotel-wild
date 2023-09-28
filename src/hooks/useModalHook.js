import { useEffect, useRef } from "react"




const useOutSideClickModal = ( close, listenCapturing=true) => {
  const ref= useRef()
  useEffect(function () {
    function handleClick(e) {
      
      if(ref.current && !ref.current.contains(e.target)){
          
                setTimeout(() => {
                  close()
           
                }, 0);
                
          }
        }
         
        document.addEventListener('click',handleClick,listenCapturing)
        
        return document.removeEventListener('click',handleClick)
    }, [close,ref,listenCapturing])
    return ref
}

export default useOutSideClickModal