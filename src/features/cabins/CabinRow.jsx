import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import { createOrEditCabin, deleteCabin } from "../../services/apiCabins";

import CreateCabinForm from "./CreateCabinForm";
import { useFetchData } from "../../hooks/useFetchData";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiMiniEllipsisVertical, HiSquare2Stack } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
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

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = (prop) => {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = prop;


  const { isLoading, mutate } = useFetchData(
    deleteCabin,
    "cabin Successfully deleted",
    "cabin"
  );
  const { isLoading: createIsLoading, mutate: createMutate } = useFetchData(
    createOrEditCabin,
    "copy cabin Successfully created",
    "cabin"
  );
  function handleDuplicate() {
    createMutate({
      name: `copy of name ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }


  return (
    <>


      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div className="">fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div className="">
          <Modal>
            <Menus.Menu>

              <Menus.Toggle id={cabinId}>
                <HiMiniEllipsisVertical />
              </Menus.Toggle>

              <Menus.List id={cabinId}>

                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                  disabled={createIsLoading}
                >
                  duplicate
                </Menus.Button>


                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>edit</Menus.Button>
                </Modal.Open>
          

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>delete</Menus.Button>
                </Modal.Open>
                </Menus.List>

                <Modal.Window name="edit">
                  <CreateCabinForm {...prop} />
                </Modal.Window>
                
                <Modal.Window name="delete">
                  <ConfirmDelete
                    resourceName="cabins"
                    disabled={isLoading}
                    onConfirm={() => mutate({cabinId,image})}
                  />
                </Modal.Window>
       
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
