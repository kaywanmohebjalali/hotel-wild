
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"

import CreateCabinForm from "./CreateCabinForm"





const AddCabin = () => {
  
return (
  <div className="">

<Modal>

  <Modal.Open opens='cabin-form'>
    <Button>Add cabin</Button>
  </Modal.Open >
  <Modal.Window name='cabin-form'>
    <CreateCabinForm/>
  </Modal.Window>

</Modal>
  </div>
)
}


export default AddCabin
