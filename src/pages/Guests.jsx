
import Heading from "../ui/Heading";
import Row from "../ui/Row";



import GuestTable from "../features/guests/GuestsTable";
import SearchFilter from "../ui/SearchFilter";
import AddGuest from "../features/guests/AddGuest";
function Guests() {



  return (
    <>
    <Row type="h">
      <Heading as="h1">All Guests</Heading>
      <SearchFilter keySearch='fullName'/>

    </Row>
     
     <Row type="v">
       <GuestTable/>
       <AddGuest/>
   </Row>
      
    </>
 
  );
}

export default Guests;

