/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HiOutlineSearch } from "react-icons/hi";
import Input from './Input'
import styled from 'styled-components';


const Search=styled.div`
    display: flex;
    align-items: center;
    position: relative;
`


const Icon=styled(HiOutlineSearch)`
  
    position: absolute;
    right: 0;
    margin-right: 6px;
    color: var(--color-brand-600);
    cursor: pointer;
    font-size: 2.2rem;   
      
`
const SearchFilter = ({keySearch}) => {
    const [searchParams, setSearchParams]=useSearchParams()
    const [value, setValue]=useState('')
    function handleClick(){
        searchParams.set(keySearch,value)
        setSearchParams(searchParams)
    }

    function handleChange(e){
        const value = e.target.value 
        setValue(value)
        if(value==''){
            searchParams.set(keySearch,value)
            setSearchParams(searchParams)
           
        }
    }

  return (
    <Search>
    <Input onKeyUp={handleChange} type="text"  placeholder="search of name guest"/>
   <Icon onClick={handleClick} color={`${!value?'gray':' var(--color-brand-600)'}`}/>
    </Search>
    )
}

export default SearchFilter