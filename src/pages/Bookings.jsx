import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from '../features/bookings/BookingTable'
import BookingTableOperation from '../features/bookings/BookingTableOperation'
import AddBooking from "../features/bookings/AddBooking";
function Bookings() {
 
 

  return (
    <>
       <Row type="h">
      <Heading as="h1">Bookings</Heading>
      <BookingTableOperation/>

    </Row>
    <Row type="v">
      <Heading as="h1">All bookings</Heading>
      <BookingTable/>
       <AddBooking/>
    </Row>


    </>
  );
}

export default Bookings;
