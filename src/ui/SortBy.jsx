/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = (props) => {
    const { filterField, options } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get(filterField) || ''
    function handleChange(e) {
      searchParams.set(filterField,e.target.value);
      setSearchParams(searchParams);
   
    }
  
  return (
    <Select value={sortBy} onChange={handleChange} options={options}  type='white'/>
  )
}

export default SortBy