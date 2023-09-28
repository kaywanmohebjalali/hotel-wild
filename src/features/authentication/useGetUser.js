import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";


export function useGetUser() {

    const queryClient = useQueryClient()
    const { data: user, isLoading: isUser, error } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
        onSuccess: (data) => {
            if (!data) {
                setTimeout(() => {
                    queryClient.removeQueries(['user'])
                }, 0);
            }
        }

    })

    return { isUser, error, user }
}