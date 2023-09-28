import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest as deleteGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useDeleteGuest(){
 
   const queryClient = useQueryClient()



    const {isLoading:isDeleteGuest, mutate:deleteGuest} = useMutation({
        mutationFn:(guestId)=> deleteGuestApi(guestId),
        retry:false,

        onSuccess:(data)=>{
          toast.success(`Guest #${data.id} successfully delete`)
          queryClient.invalidateQueries({active:true})
      },
      onError:()=>toast.error('There was an error while delete')
      })
      
      return {isDeleteGuest, deleteGuest}
  
} 