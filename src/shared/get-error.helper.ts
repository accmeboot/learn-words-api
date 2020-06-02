export const getError = (error: any, field: string, messages: string[]) => (error?.response?.hasError ?
    error.response :
    {
        hasError: true,
        errors: [
            {
                field,
                messages
            }
        ],
        detail: error
    }
);
