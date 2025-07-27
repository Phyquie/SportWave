'use client'
import { useMutation } from '@tanstack/react-query'
import { on } from 'nodemailer/lib/xoauth2';
import toast from 'react-hot-toast'

export const useCustomMutation = (
    url: string,
    {
        onSuccess,
        onError
    }: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
    }
) => {
    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.message || 'Something went wrong');
            }

            return result;
        },

        onSuccess: (data: any) => {
            if (!onSuccess) {
                toast.success(typeof data === 'string' ? data : data?.message || 'Success');
            }
            onSuccess?.(data);
        },

        onError: (error: any) => {
            if (!onError) {
                toast.error(error.message || 'Request failed');
            }
            onError?.(error);
        },
    });

    return mutation;
};
