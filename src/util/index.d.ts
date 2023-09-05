import { ApiGetParams, ApiPostParams, ApiResponse } from "../@types";
export declare function generateResponseObject<ApiResponseDataType>(code: number, success: boolean, data: ApiResponseDataType, error: string): ApiResponse<ApiResponseDataType>;
export declare function axiosGet<ExpectedApiResponseData = never>(apiGetRoute: string, getParams: ApiGetParams): Promise<ApiResponse<ExpectedApiResponseData>>;
export declare function axiosPost<ExpectedApiResponseData = never>(apiPostRoute: string, postBody: ApiPostParams): Promise<ApiResponse<ExpectedApiResponseData>>;
