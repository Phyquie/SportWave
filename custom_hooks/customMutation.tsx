'use client'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useCustomMutation = (url: string,) => {
    const mutation = useMutation({
        mutationFn: (data: any) => {
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        },
        onSuccess: (data: any) => {
            toast.success(data.message)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return mutation
}