import { useQuery } from "@tanstack/react-query"
import { getStaysTodayActivity } from "../../services/apiBookings"


export function useTodayActivity()  {

const {data:activities, isLoading:isActivity, error}=useQuery({
    queryKey:['todayActivity'],
    queryFn:getStaysTodayActivity
})    
  return {activities, isActivity, error}
}

