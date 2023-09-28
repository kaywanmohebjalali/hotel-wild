import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi} from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout(){
    const navigate = useNavigate()
    const queryClient =useQueryClient()

    const {mutate:logout, isLoading:isLogout}=useMutation({
        mutationFn:logoutApi,
        onSuccess:()=>{
            navigate('/login',{replace:true})
            queryClient.removeQueries()
        },
        onError:err=>{
            console.log('Error login : ',err);
            toast.error("error logout")
        }
    })
    return {logout,isLogout}
}
