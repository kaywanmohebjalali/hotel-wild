/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;



const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const StyleSpan=styled.span`
  margin: 0 3px;
  color: var(--color-brand-600);
  font-weight: bold;
`

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-grey-50);
  }
  &:disabled {

    color: var(--color-grey-400);
  }
`;



const Pagination = (props) => {
  const {count}=props
  const [searchParams, setSearchParams]=useSearchParams()
  const page= searchParams.get('page')
  const currentPage=!page? 1: Number(page)

  const pageCount=Math.ceil(count/PAGE_SIZE)

  function nextPage(){
      const next = currentPage===pageCount
      ?currentPage:currentPage+1;
      searchParams.set('page',next)
      setSearchParams(searchParams)
    
  }

  function prevPage(){
    const prev = currentPage===1
    ?currentPage:currentPage-1;
    searchParams.set('page',prev)
    setSearchParams(searchParams)
  }
  if(pageCount<=1)return null;
  return (
    <StyledPagination>
      <p>

      showing <StyleSpan>{currentPage*PAGE_SIZE-PAGE_SIZE+1}</StyleSpan> 
       to  <StyleSpan>{currentPage*PAGE_SIZE>count?count:currentPage*PAGE_SIZE}</StyleSpan>
       of  <StyleSpan>{count}</StyleSpan> results
      </p>

    <Buttons>

      <PaginationButton onClick={prevPage}
      disabled={currentPage===1}
      >
          <HiChevronLeft />   
          <span>Previous</span>
      </PaginationButton>

      <PaginationButton onClick={nextPage}
      disabled={currentPage===pageCount}

      >
          <HiChevronRight/> <span>Next</span>
        </PaginationButton>
    </Buttons>
    </StyledPagination>
  )
}

export default Pagination