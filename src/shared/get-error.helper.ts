export const getError = (error: any, filed: string, messages: string[]) => (error?.response?.hasError ?
    error.response :
    {
        hasError: true,
        errors: [
            {
                filed,
                messages
            }
        ],
        detail: error
    }
);
