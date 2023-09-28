
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateBookingForm from "./CreateBookingForm"







const AddBooking = () => {
return (
  <div className="">

<Modal>

  <Modal.Open opens='booking-form'>
    <Button>Add booking</Button>
  </Modal.Open >
  <Modal.Window name='booking-form'>
    <CreateBookingForm/>
  </Modal.Window>

</Modal>
  </div>
)
}


export default AddBooking
