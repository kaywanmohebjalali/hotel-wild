import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";

import toast from "react-hot-toast";

export function useDeleteBooking(){
 
   const queryClient = useQueryClient()



    const {isLoading, mutate} = useMutation({
        mutationFn:({bookingId, eq})=>deleteBooking(bookingId,eq),
        retry:false,

        onSuccess:(data)=>{
          toast.success(`Booking #${data.id} successfully delete`)
          queryClient.invalidateQueries({active:true})
      },
      onError:()=>toast.error('There was an error while delete')
      })
      
      return {isLoading, mutate}
  
} 