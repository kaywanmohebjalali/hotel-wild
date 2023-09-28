import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useUpdateBooking(){
 
   const queryClient = useQueryClient()



    const {isLoading:isUpdateBooking, mutate:updateBooking} = useMutation({
        // eslint-disable-next-line no-unused-vars
        mutationFn:({newBookingData:{cabins, guests, ...booking},bookingId})=>updateBookingApi(bookingId, booking),
        retry:false,

        onSuccess:(data)=>{
          toast.success(`Booking #${data.id} successfully update`)
          queryClient.invalidateQueries({active:true})
      },
      onError:()=>toast.error('There was an error while update')
      })
      
      return {isUpdateBooking, updateBooking}
  
} 