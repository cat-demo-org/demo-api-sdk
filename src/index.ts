import axios, { AxiosError } from "axios";
import * as requests from "./requests/index"
import { ApiGetRequest, ApiPostRequest, ApiResponse } from "type-sharing";

type RequestCollection = {
    [K in keyof typeof requests]: (params: Parameters<typeof requests[K]>[1]) => ReturnType<typeof requests[K]>
}

export class ApiSdk {

    requestRootUrl: string;
    requests: RequestCollection;

    constructor({ requestRootUrl }: { requestRootUrl: string }) {
        this.requestRootUrl = requestRootUrl;
        requests["get_exampleUserPosts"]
        this.requests = (() => {
            // @ts-ignore -- We will populate this correctly...
            let requestCollection: RequestCollection = {}
            Object.keys(requests).forEach(reqKey => {
                const k = reqKey as keyof typeof requests;
                // @ts-ignore -- This shouldn't be erroring?
                requestCollection[k] = (params: Parameters<typeof requests[typeof k]>[1]) => requests[k](this, params)
            })
            return requestCollection;
        })() 
    }

    _generateResponseObject<ApiResponseDataType>(
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
            timestamp: Date.now(),
        };
    }

    //////////////////////
    // Axios Functions //
    ////////////////////

    async _axiosGet<ExpectedApiResponseData = never>(
        apiGetRoute: string,
        getParams: ApiGetRequest
    ): Promise<ApiResponse<ExpectedApiResponseData>> {
        console.log(`GET_REQ: ${apiGetRoute}`, {
            requestRootUrl: this.requestRootUrl,
            apiGetRoute,
            getParams,
        });
        try {
            const res = await axios.get(this.requestRootUrl + apiGetRoute, {
                params: getParams,
                withCredentials: true,
            }); // res.data should conform to an ApiResponse_<TYPE> as defined below
            const formattedResponse =
                this._generateResponseObject<ExpectedApiResponseData>(
                    res.status,
                    true,
                    res.data as ExpectedApiResponseData,
                    ""
                );
            console.log(`GET_RESPONSE: ${apiGetRoute}`, formattedResponse);
            return formattedResponse;
        } catch (ex: unknown) {
            const formattedError =
                this._handleAxiosError<ExpectedApiResponseData>(ex);
            console.error(`GET_ERROR: ${apiGetRoute}`, formattedError);
            return formattedError;
        }
    }

    async _axiosPost<ExpectedApiResponseData = never>(
        apiPostRoute: string,
        postBody: ApiPostRequest
    ): Promise<ApiResponse<ExpectedApiResponseData>> {
        console.log(`POST_REQ: ${apiPostRoute}`, {
            requestRootUrl: this.requestRootUrl,
            apiPostRoute,
            postBody,
        });
        try {
            const res = await axios.post(
                this.requestRootUrl + apiPostRoute,
                postBody,
                { withCredentials: true }
            ); // res.data should conform to an ApiResponse_<TYPE> as defined below
            const formattedResponse =
                this._generateResponseObject<ExpectedApiResponseData>(
                    res.status,
                    true,
                    res.data as ExpectedApiResponseData,
                    ""
                );
            console.log(`POST_RESPONSE: ${apiPostRoute}`, formattedResponse);
            return formattedResponse;
        } catch (ex: unknown) {
            const formattedError =
                this._handleAxiosError<ExpectedApiResponseData>(ex);
            console.error(`POST_ERROR: ${apiPostRoute}`, formattedError);
            return formattedError;
        }
    }

    _handleAxiosError<ExpectedApiResponseData = never>(ex: unknown) {
        const res = {};
        if (ex instanceof AxiosError) {
            return this._generateResponseObject<ExpectedApiResponseData>(
                ex.response?.status || 404,
                false,
                res as ExpectedApiResponseData,
                ex.response?.data?.error || ex.message
            );
        } else if (ex instanceof Error) {
            return this._generateResponseObject<ExpectedApiResponseData>(
                404,
                false,
                res as ExpectedApiResponseData,
                ex.message
            );
        } else {
            return this._generateResponseObject<ExpectedApiResponseData>(
                404,
                false,
                res as ExpectedApiResponseData,
                "Unknown error occurred (CLIENT GENERATED)"
            );
        }
    }
}
