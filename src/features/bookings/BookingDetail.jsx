import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {isLoading, booking, error}=useBooking()
  const {checkout, isLoading:isCheckout}=useCheckout()
  const { mutate:deleteBooking, isLoading: isDelete } = useDeleteBooking();

  const {status, id:bookingId}=booking
  const navigate =useNavigate()
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if(isLoading) return <Spinner/>
  if(error) return <Empty resourceName='booking'/>
  return (
    <>
      <Row type="h">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>

      { status==='unconfirmed'&& <Button onClick={()=>navigate(`/checkin/${bookingId}`)} >
      check in
      </Button>
      }

<Modal>

<Modal.Open opens='delete'>

 <Button variation='danger'>Delete Booking</Button>

  </Modal.Open>


  <Modal.Window name='delete'>
    <ConfirmDelete
    resourceName='Booking'
    onConfirm={()=>deleteBooking(bookingId,{
      onSettled:()=>navigate(-1)
    })}
    disabled={isDelete}
    />
  </Modal.Window>
    </Modal>

{ status==='checked-in'&& <Button 
disabled={isCheckout}
icon={<HiArrowUpOnSquare />} 
onClick={()=>checkout(bookingId)}

>
      check out
      </Button>
    }

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
