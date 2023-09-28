import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useFetchData(func, successMessage, key) {


  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: func,
    onSuccess: () => {
      toast.success(successMessage);

      queryClient.invalidateQueries({
        queryKey: [key],
      });

    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, mutate }
}