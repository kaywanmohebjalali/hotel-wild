import { useRef, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useGetUser } from "./useGetUser";
import { useUpdateUser } from "./useUpdateUser";
import UploadImage from "../../ui/UploadImage";

function UpdateUserDataForm() {
  const inputRef= useRef(null)
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName, avatar: previousAvatar },
    },
  } = useGetUser();
  
  const { updateUser, isUpdateUser } = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);

  function handleSubmit(e) {
    e.preventDefault();
    if (fullName){
       let avatar = inputRef?.current.files[0]
       console.log(avatar);
      updateUser(
        { fullName, avatar, previousAvatar },
        {
          onSuccess: () => {
            inputRef.current.value=''
            e.target.reset();
          },
        }
        );
      }
  }

  function handleCancel() {
    setFullName(currentFullName);
    inputRef.current.value=''
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdateUser}
        />
      </FormRow>
      <FormRow label="Avatar image">
    
        <UploadImage inputRef={inputRef} width='100%'  size='small'>
          <UploadImage.Image  
          src={previousAvatar}
          icon={<img src="/icon-user-1.png" />}
           />

          <UploadImage.Drop
            iconClick={<img src="/icon-click-1.png" alt="" />}
            iconDrop={
              <img className="drop" src="/icon-upload-drop.png" alt="" />
            }
          >
            <FileInput
              disabled={isUpdateUser}
              id="image"
              accept="image/*"
              ref={inputRef}
              

            />
          </UploadImage.Drop>
        </UploadImage>
      </FormRow>
      <FormRow>
        <Button
          onClick={handleCancel}
          type="reset"
          variation="secondary"
          disabled={isUpdateUser}
        >
          Cancel
        </Button>
        <Button disabled={isUpdateUser}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
