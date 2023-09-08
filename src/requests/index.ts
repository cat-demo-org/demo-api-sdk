import { ApiSdk } from "..";
// import { ApiGetParams, ApiPostParams, ApiResponse, ApiResponseData } from "../@types";
import { ApiGet_GetPosts, ApiPost_Login, ApiPost_Logout, ApiResponse, ApiResponseData_GetPosts, ApiResponseData_Login, ApiResponseData_Logout } from 'type-sharing';

/**
    Each function should wrap the get/post functions of util with the respective necesary types
    For both calling the function, and what is expected within return data

    These types should come from an external source of truth for both front end back ebd

    Route functions should be named as the root ending:

    http://localhost:8080/api/v1/exampleUserLogin => /exampleUserLogin
    
    as the root is added at class level from constructor parameter in the request within the ApiSdk

 */

// /exampleUserLogin
/////////////////////////////

/** Log a user in via API */
export async function post_exampleUserLogin(
    apiSdk: ApiSdk,
    postParams: ApiPost_Login
): Promise<ApiResponse<ApiResponseData_Login>> {
    return await apiSdk._axiosPost("/exampleUserLogin", postParams);
}

// /exampleUserPosts
//////////////////////////////

/**Fetch a users blog posts */
export async function get_exampleUserPosts(
    apiSdk: ApiSdk,
    getParams: ApiGet_GetPosts
): Promise<ApiResponse<ApiResponseData_GetPosts>> {
    return await apiSdk._axiosGet("/exampleUserPosts", getParams);
}

// /exampleUserLogout
//////////////////////////////

/**Log a user out by expiring tokens */
export async function post_exampleUserLogout(
    apiSdk: ApiSdk,
    postParams: ApiPost_Logout
): Promise<ApiResponse<ApiResponseData_Logout>> {
    return await apiSdk._axiosGet("/exampleUserLogout", postParams);
}
