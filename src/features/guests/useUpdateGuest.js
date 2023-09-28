import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGuest as updateGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useUpdateGuest(){
 
   const queryClient = useQueryClient()



    const {isLoading:isUpdateGuest, mutate:updateGuest} = useMutation({
        mutationFn:({newGuestData,guestId})=>updateGuestApi(guestId, newGuestData),
        retry:false,

        onSuccess:(data)=>{
          toast.success(`Guest #${data.id} successfully update`)
          queryClient.invalidateQueries({active:true})
      },
      onError:()=>toast.error('There was an error while update')
      })
      
      return {isUpdateGuest, updateGuest}
  
} 