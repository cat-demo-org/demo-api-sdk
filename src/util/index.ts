import axios, { AxiosError } from "axios";
import { ApiGetParams, ApiPostParams, ApiResponse } from "../@types";
import { environment } from "../configuration";

export function generateResponseObject<ApiResponseDataType>(
    code: number,
    success: boolean,
    data: ApiResponseDataType,
    error: string
): ApiResponse<ApiResponseDataType> {
    return {
        code: code,
        data: data,
        error: error,
        success: success,
        timestampRequest: Date.now(),
    };
}

//////////////////////
// Axios Functions //
////////////////////

export async function axiosGet<ExpectedApiResponseData = never>(
    apiGetRoute: string,
    getParams: ApiGetParams
): Promise<ApiResponse<ExpectedApiResponseData>> {
    console.log(`GET_REQ: ${apiGetRoute}`, {
        environment,
        apiGetRoute,
        getParams,
    });
    try {
        const res = await axios.get(environment.ROOT_API_URL + apiGetRoute, {
            params: getParams,
            withCredentials: true,
        }); // res.data should conform to an ApiResponse_<TYPE> as defined below
        const formattedResponse =
            generateResponseObject<ExpectedApiResponseData>(
                res.status,
                true,
                res.data as ExpectedApiResponseData,
                ""
            );
        console.log(`GET_RESPONSE: ${apiGetRoute}`, formattedResponse);
        return formattedResponse;
    } catch (ex: unknown) {
        const formattedError = handleAxiosError<ExpectedApiResponseData>(ex);
        console.error(`GET_ERROR: ${apiGetRoute}`, formattedError);
        return formattedError;
    }
}

export async function axiosPost<ExpectedApiResponseData = never>(
    apiPostRoute: string,
    postBody: ApiPostParams
): Promise<ApiResponse<ExpectedApiResponseData>> {
    console.log(`POST_REQ: ${apiPostRoute}`, {
        environment,
        apiPostRoute,
        postBody,
    });
    try {
        const res = await axios.post(
            environment.ROOT_API_URL + apiPostRoute,
            postBody,
            { withCredentials: true }
        ); // res.data should conform to an ApiResponse_<TYPE> as defined below
        const formattedResponse =
            generateResponseObject<ExpectedApiResponseData>(
                res.status,
                true,
                res.data as ExpectedApiResponseData,
                ""
            );
        console.log(`POST_RESPONSE: ${apiPostRoute}`, formattedResponse);
        return formattedResponse;
    } catch (ex: unknown) {
        const formattedError = handleAxiosError<ExpectedApiResponseData>(ex);
        console.error(`POST_ERROR: ${apiPostRoute}`, formattedError);
        return formattedError;
    }
}

function handleAxiosError<ExpectedApiResponseData = never>(ex: unknown) {
    const res = {};
    if (ex instanceof AxiosError) {
        return generateResponseObject<ExpectedApiResponseData>(
            ex.response?.status || 404,
            false,
            res as ExpectedApiResponseData,
            ex.response?.data?.error || ex.message
        );
    } else if (ex instanceof Error) {
        return generateResponseObject<ExpectedApiResponseData>(
            404,
            false,
            res as ExpectedApiResponseData,
            ex.message
        );
    } else {
        return generateResponseObject<ExpectedApiResponseData>(
            404,
            false,
            res as ExpectedApiResponseData,
            "Unknown error occurred (CLIENT GENERATED)"
        );
    }
}
