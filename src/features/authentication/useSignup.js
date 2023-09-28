import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {


    const { mutate: signup, isLoading: isSignup } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {

            toast.success('account successfully created')
        },
        onError: err => {
            console.log('Error signup : ', err);

        }
    })
    return { signup, isSignup }
}
