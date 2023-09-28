import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi} from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin(){
    const navigate = useNavigate()
    const queryClient =useQueryClient()

    const {mutate:login, isLoading:isLogin}=useMutation({
        mutationFn:({email,password})=>loginApi({email,password}),
        onSuccess:(user)=>{
            queryClient.setQueryData(['user'],user?.user)
            
            navigate('/dashboard',{replace:true})
        },
        onError:err=>{
            console.log('Error login : ',err);
            toast.error("Provider email or password incorrect")
        }
    })

    return {login,isLogin}
}
