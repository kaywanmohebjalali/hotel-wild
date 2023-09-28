
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateGuestForm from "./CreateGuestForm"






const AddGuest = () => {
  
return (
  <div className="">

<Modal>

  <Modal.Open opens='Guest-form'>
    <Button>Add Guest</Button>
  </Modal.Open >
  <Modal.Window name='Guest-form'>
   <CreateGuestForm/>
  </Modal.Window>

</Modal>
  </div>
)
}


export default AddGuest
