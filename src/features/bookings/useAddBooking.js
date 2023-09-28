import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { AddBooking as addBookingApi} from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useAddBooking(){
 
  const queryClient = useQueryClient()




    const {mutate:addBooking, isLoading:isAddBooking} = useMutation({
        
      mutationFn:(booking)=>addBookingApi(booking),
        onSuccess:(data)=>{
          toast.success(`Booking #${data.id} successfully created`)
          queryClient.invalidateQueries({active:true})
      },
      onError:()=>toast.error('There was an error while created')

      })
      
        
    
      
      return {addBooking, isAddBooking}
  
} 