import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi} from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser(){
   
    const queryClient =useQueryClient()

    const {mutate:updateUser, isLoading:isUpdateUser}=useMutation({
        mutationFn:updateUserApi,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['user']})
            toast.success('user account successfully updated')
        },
        onError:err=>{
            console.log('Error user account  updated : ',err);
            toast.error(err?.message)
        }
    })

    return {updateUser,isUpdateUser}
}
