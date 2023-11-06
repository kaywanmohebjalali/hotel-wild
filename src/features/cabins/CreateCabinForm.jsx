import { useForm } from "react-hook-form";
import { styled } from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import { createOrEditCabin } from "../../services/apiCabins";
import { useFetchData } from "../../hooks/useFetchData";
import SpinnerMini from "../../ui/SpinnerMini";
import { useEffect, useRef } from "react";
import UploadImage from "../../ui/UploadImage";
import { useState } from "react";

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

function CreateCabinForm(prop = {}) {
  const inputRef = useRef(null);
  const[, setUpdateImage]=useState(false)
  const { onCloseModal, id: editId, ...editValues } = prop;
  const isEditCabin = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditCabin ? editValues : {},
  });

  //  Create

  const { isLoading: isLoadingCreate, mutate: mutateCreate } = useFetchData(
    createOrEditCabin,
    "new cabin  Successfully created",
    "cabin"
  );

  // Edit
  const { isLoading: isLoadingEdit, mutate: mutateEdit } = useFetchData(
    ({ newCabinData, id }) => createOrEditCabin(newCabinData, id, editValues?.image),
    "cabin  Successfully update",
    "cabin"
  );

  function onSubmit(data) {
    let image = inputRef.current.files;
  
    if (isEditCabin)
      mutateEdit(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      mutateCreate(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
      

  }

  function onError(errors) {
    console.log(errors);
  }


  useEffect(()=>{
 
  },[])

  const isWorking = isLoadingCreate || isLoadingEdit;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) => {
              return (
                value <= getValues().regularPrice ||
                "Discount should be less than regularPrice"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />



      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>

        <UploadImage
         inputRef={inputRef} 
         setUpdateImage={setUpdateImage}
          >
          <UploadImage.Image 
          icon={<img src='/default-cabin.png'/>}
          src={isEditCabin?editValues?.image:''}

          />

          <UploadImage.DescriptionImage></UploadImage.DescriptionImage>
          <UploadImage.Drop
            iconClick={<img src="./icon-click-1.png" alt="" />}
            iconDrop={
              <img className="drop" src="/icon-upload-drop.png" alt="" />
            }
          >
            <FileInput
              disabled={isWorking}
              id="image"
              accept="image/*"
              {...register("image", {
                
                required: inputRef?.current?.files?.length==1? false : "this field is required",
              })}
              ref={inputRef}
            />
          </UploadImage.Drop>
        </UploadImage>
      </FormRow>
      

      <StyledFormRow>
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isWorking ? (
            <SpinnerMini />
          ) : (
            <span>{isEditCabin ? "edit" : "add"}</span>
          )}
        </Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
