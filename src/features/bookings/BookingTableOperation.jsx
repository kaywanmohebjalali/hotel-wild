import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"
import TableOperations from "../../ui/TableOperations"
import SearchFilter from "../../ui/SearchFilter"

const BookingTableOperation = () => {
  return (
<>
    <TableOperations>

    <Filter filterField='status' options={[
      { value: "all", label: "All" },
      { value: "checked-out", label: "Checked out" },
      { value: "checked-in", label: "Checked in" },
      { value: "unconfirmed", label: "Unconfirmed" },
    
    ]
  }/>


  <SortBy filterField='sortBy' options={[

    {value:'totalPrice-asc', label:'sort by amount (A-Z)'},
    {value:'totalPrice-desc', label:'sort by amount (Z-A)'},
    {value:'numNights-asc', label:'sort by Night count (low first)'},
    {value:'numNights-desc', label:'sort by Night count  (high first)'},
    { value: "startDate-desc", label: "Sort by date (recent first)" },
    { value: "startDate-asc", label: "Sort by date (earlier first)" },
 
  ]
  }/>
  </TableOperations>
  <SearchFilter keySearch='name'/>
  </>
  )
}

export default BookingTableOperation