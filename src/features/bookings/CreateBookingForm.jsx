import { useForm } from "react-hook-form";
import { styled } from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";

import { useAddBooking } from "./useAddBooking";
import { useCabins } from "../cabins/useCabins";
import { useGuests } from "../guests/useGuests";
import { useUpdateBooking } from "./useUpdateBooking";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;



const StyledCheckbox = styled.div``;

function CreateBookingForm(prop) {
  const { booking = {}, onCloseModal } = prop;
  const { id: bookingId, ...editValues } = booking;

  const { addBooking, isAddBooking } = useAddBooking();

  const { isLoading: isCabin, cabins } = useCabins();
  const { isGuests, guests } = useGuests();
  const { isUpdateBooking, updateBooking } = useUpdateBooking();

  const isEditBooking = Boolean(bookingId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditBooking
      ? {
          ...editValues,
          guestId: booking.guests.id,
          cabinId: booking.cabins.id,
        }
      : {},
  });

  if (isGuests || isCabin) return <Spinner />;

  function onSubmit(data) {
    const cabin = cabins.find((cabin) => cabin.id == data.cabinId);

    let newData = {
      created_at: new Date().toISOString(),
      totalPrice: Number(cabin.regularPrice) + Number(data.extrasPrice),
      cabinPrice: cabin?.regularPrice,
      ...data,
    };

    newData.totalPrice = Number(cabin.regularPrice) + Number(data.extrasPrice);

    if (isEditBooking)
      updateBooking(
        { newBookingData: newData, bookingId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      addBooking(newData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="startDate" error={errors?.startDate?.message}>
        <Input
          disabled={isAddBooking || isUpdateBooking}
          type="datetime-local"
          id="startDate"
          {...register("startDate", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="endDate" error={errors?.endDate?.message}>
        <Input
          disabled={isAddBooking || isUpdateBooking}
          type="datetime-local"
          id="endDate"
          {...register("endDate", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="numNights" error={errors?.numNights?.message}>
        <Input
          disabled={isAddBooking || isUpdateBooking}
          type="number"
          id="numNights"
          {...register("numNights", {
            required: "this field is required",
            min: {
              value: 1,
              message: "numNights should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="numGuests" error={errors?.numGuests?.message}>
        <Input
          disabled={isAddBooking || isUpdateBooking}
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "this field is required",
            min: {
              value: 1,
              message: "numGuests should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="extrasPrice" error={errors?.extrasPrice?.message}>
        <Input
          disabled={isAddBooking || isUpdateBooking}
          type="number"
          id="extrasPrice"
          {...register("extrasPrice", {
            required: "this field is required",
            min: {
              value: 0,
              message: "extrasPrice should be at least 0",
            },
          })}
        />
      </FormRow>

      <FormRow label="hasBreakfast" error={errors?.hasBreakfast?.message}>
        <StyledCheckbox>
          <Input
            disabled={isAddBooking || isUpdateBooking}
            type="checkBox"
            id="hasBreakfast"
            {...register("hasBreakfast")}
          />
        </StyledCheckbox>
      </FormRow>

      <FormRow label="isPaid" error={errors?.hasBreakfast?.message}>
        <StyledCheckbox>
          <Input
            disabled={isAddBooking || isUpdateBooking}
            type="checkBox"
            id="isPaid"
            {...register("isPaid")}
          />
        </StyledCheckbox>
      </FormRow>

      <FormRow label="status" error={errors?.status?.message}>
        <select {...register("status")}>
          <option value="unconfirmed">unconfirmed</option>
          <option value="check-in">check-in</option>
        </select>
      </FormRow>

      <FormRow label="cabinId" error={errors?.cabinId?.message}>
        <select {...register("cabinId")}>
          {cabins &&
            cabins?.map((cabin) => (
              <option key={cabin?.id} value={cabin.id}>
                {cabin?.name}
              </option>
            ))}
        </select>
      </FormRow>

      <FormRow label="guestId" error={errors?.guestId?.message}>
        <select {...register("guestId")}>
          {guests &&
            guests?.map((guest) => (
              <option key={guest?.id} value={guest.id}>
                {guest?.fullName}
              </option>
            ))}
        </select>
      </FormRow>

      <FormRow
        label="Description observations"
        error={errors?.observations?.message}
      >
        <Textarea
          disabled={isAddBooking || isUpdateBooking}
          type="number"
          id="observations"
          defaultValue=""
          {...register("observations")}
        />
      </FormRow>

      <StyledFormRow>
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isAddBooking || isUpdateBooking}>
          {isAddBooking || isUpdateBooking ? (
            <SpinnerMini />
          ) : (
            <span>{isEditBooking ? "edit" : "add"}</span>
          )}
        </Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateBookingForm;
