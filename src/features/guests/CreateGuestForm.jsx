import { useForm } from 'react-hook-form';



import SpinnerMini from '../../ui/SpinnerMini';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import Button from '../../ui/Button';

import { useAddGuest } from './useAddGuest';
import { useUpdateGuest } from './useUpdateGuest';

import {countries} from '../../data/countries'


// With NEW modal
// function CreateGuest({ onSuccessNewGuest, setIsOpenForm }) {
function CreateGuestForm(prop) {
  const {onCloseModal, ...guest}=prop
  const {id:guestId, ...editValues}=guest
 
  const isEditGuest=Boolean(guestId)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(
    {
      defaultValues:isEditGuest?{...editValues}:{}
    }
  );
  
  const {addGuest, isAddGuest}=useAddGuest()
  const {isUpdateGuest, updateGuest}=useUpdateGuest()
  

 
 
  

  


  function onSubmit(data) {
    const country = countries.find(item=>item.name===data.nationality)

     data.countryFlag=`https://flagcdn.com/${country.code.toLowerCase()}.svg`
     data.nationality=country.name
    
   
    if(isEditGuest)updateGuest({newGuestData:data,guestId},{
      onSuccess:()=>{
       reset()
       onCloseModal?.()
      }
     })
    else addGuest(data,{
     onSuccess:()=>{
      reset()
      onCloseModal?.()
     }
    });

     
  }

  
  return (
    <Form type='modal' onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isAddGuest || isUpdateGuest}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isAddGuest || isUpdateGuest}
          {...register('email', {
            required: 'Email address is required',
            pattern: {
              // google: email regex JavaScript
              value: /\S+@\S+\.\S+/,
              message: 'Please specify a valid email',
            },
          })}
        />
      </FormRow>

   

      <FormRow label="Nationality" error={errors?.nationality?.message}>
      <select {...register("nationality")}>
      {countries && countries?.map(country=> <option key={country?.code}  value={country?.name}>{country?.name}</option>)}

     </select>
      </FormRow>

      <FormRow label='National ID' error={errors?.nationalID?.message}>
        <Input
          type='text'
          disabled={isAddGuest || isUpdateGuest}
          id='nationalID'
          {...register('nationalID', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
          disabled={isAddGuest || isUpdateGuest}
          // eslint-disable-next-line no-undef
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
       
        <Button 
        disabled={isAddGuest || isUpdateGuest}>
        {isAddGuest || isUpdateGuest?<SpinnerMini/>:
        <span>{isEditGuest?'edit':'add'}</span>
        }
        </Button>

      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
