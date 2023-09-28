import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGuests(){
    const {isLoading:isGuests, data:guests, error} = useQuery({
        queryKey:["Guests"],
        queryFn:getGuests,
      })
      return {isGuests, guests, error}
    
}