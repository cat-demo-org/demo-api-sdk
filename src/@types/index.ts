
/////////////////////////////
// Base ApiResponseObject //
///////////////////////////
export interface ApiResponse<ApiResponseData> {
    code: number; // HTTP Response Code
    data: ApiResponseData; // Typed endpoint specific data
    error: string; // Any error if present
    success: boolean; // If the request was successful
    timestampResponse?: number; // Timestamp of request completion
    timestampRequest: number; // Timestamp of request initiation
}

///////////////////////////////////////
// ResponseData Generic Definitions //
/////////////////////////////////////
export interface ApiGetParams {}
export interface ApiPostParams {}