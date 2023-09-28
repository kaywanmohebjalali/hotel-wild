import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CreateGuestForm from "./CreateGuestForm";
import { useDeleteBooking } from "../bookings/useDeleteBooking";
import { useDeleteGuest } from "./useDeleteGuest";

const ImgCountry = styled.img`
  display: block;
  width: 3rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;




const GuestRow = (prop) => {
  const { id: guestId, fullName, email, nationality, countryFlag  } = prop;

  const {isLoading:isDeleteBooking, mutate:deleteBooking}=useDeleteBooking()
  const {isDeleteGuest, deleteGuest}=useDeleteGuest()

 async function deleteGuestAndBooking(){

 deleteBooking({bookingId:guestId, eq:'guestId'},{
  onSuccess:()=>{
    setTimeout(() => {
      deleteGuest(guestId)
    }, 1);
  }
 })
  

 }
  return (
    <>
      <Table.Row>
        <ImgCountry  src={countryFlag}/>
       
        <Cabin>{fullName}</Cabin>
        <div className="">{email}</div>
        <div className="">{nationality}</div>
       
     
        <div className="">
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={guestId}>
                <HiMiniEllipsisVertical />
              </Menus.Toggle>

              <Menus.List id={guestId}>
               

              <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
            

    
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>edit</Menus.Button>
                </Modal.Open>

              
              </Menus.List>

              <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="Guests and Booking"
                onConfirm={() => deleteGuestAndBooking()}
               
                disabled={isDeleteBooking || isDeleteGuest}
              
              />
            </Modal.Window>


              <Modal.Window name="edit">
                <CreateGuestForm {...prop} />
              </Modal.Window>

             
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default GuestRow;
