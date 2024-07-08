import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchUserNotificationView } from "@/api/user/patchUserNotificationView";
import { GetUserNotificationsResponse } from "@/api/user/getUserNotifications";

export const useUserNotificationViewedMutation = ({onSuccess, onError, onFinished}:any = {}) =>{
    const queryClient = useQueryClient();
    const viewMutation = useMutation(
        {
            mutationFn : ({id}: { id: number}) => patchUserNotificationView(id),
            onSuccess: (data, variables) =>{

                queryClient.setQueryData(['notifications'], (oldData: any) => {
                    if (!oldData) return oldData;
            
                    return {
                      ...oldData,
                      pages: oldData.pages.map((page: any) => ({
                        ...page,
                        notifications: page.notifications.map((notification: any) =>
                          notification.id === variables.id ? { ...notification, viewed: true } : notification
                        ),
                      })),
                    };
                  });

                if(onSuccess)
                    onSuccess(data, variables)
            },
            onError:(error)=>{
                if(onError)
                    onError(error);
                
            },
            onSettled:()=>{
                if(onFinished)
                    onFinished();
            }
        }

    );
    return {
        markAsViewed:viewMutation.mutate, markMutation:viewMutation,
    };
};