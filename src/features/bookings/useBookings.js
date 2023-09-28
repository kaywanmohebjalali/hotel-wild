import {  useQuery, useQueryClient} from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings(){
 
  const queryClient = useQueryClient()
    const [searchParams]=useSearchParams()

    // Filter
    const filterValue =searchParams.get('status')
    const filter =!filterValue ||filterValue=='all'?null:
    {field:'status', value:filterValue, method:null} 

    // sortBy
    const sortByRaw =searchParams.get('sortBy') ||'startDate'
    const [field, direction] =sortByRaw.split('-')
    const sortBy ={field, direction}

    // Page
        const filterPage = !searchParams.get('page')?1: 
        Number(searchParams.get('page'))
  
   







    const {isLoading, data:{data,count}={} ,error} = useQuery({
        queryKey:["bookings",filter,sortBy,filterPage],
        queryFn:()=>getBookings({filter,sortBy,filterPage}),
        
      })

 
          // PRE_FETCHING
    const pageCount= Math.ceil(count/PAGE_SIZE)

    if(filterPage<pageCount){
     queryClient.prefetchQuery({
        queryKey:["bookings",filter,sortBy,filterPage+1],
        queryFn:()=>getBookings({filter,sortBy,filterPage:filterPage+1}),
        
      }
     )
    }

    if(filterPage>1){
      queryClient.prefetchQuery({
         queryKey:["bookings",filter,sortBy,filterPage-1],
         queryFn:()=>getBookings({filter,sortBy,filterPage:filterPage-1}),
         
       }
      )
     }
      
      return {isLoading, data, error,count}
  
} 