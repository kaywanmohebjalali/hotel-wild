import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { AddGuest as AddGuestApi} from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useAddGuest(){
 
  const queryClient = useQueryClient()




    const {mutate:addGuest, isLoading:isAddGuest} = useMutation({
        
      mutationFn:(guest)=>AddGuestApi(guest),
        onSuccess:(data)=>{
          toast.success(`Guest #${data.id} successfully created`)
          queryClient.invalidateQueries({active:true})
      },
      onError:()=>toast.error('There was an error while created')

      })
      
        
    
      
      return {addGuest, isAddGuest}
  
} 