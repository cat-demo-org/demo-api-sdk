import { ApiSdk } from "..";
import { ApiGetParams, ApiPostParams, ApiResponse, ApiResponseData } from "../@types";

/**
   Each function should wrap the get/post functions of util with the respective necesary types
   For both calling the function, and what is expected within return data
   These types should be provided preceeding the function definition

    Eventually these types should come from an external source of truth for both front end back ebd

    Route functions should be named as the root ending:

    http://localhost:8080/api/v1/exampleUserLogin => /exampleUserLogin
    
    as the root is added at class level from constructor parameter in the request within the ApiSdk

 */

// /exampleUserLogin
/////////////////////////////

interface ApiPostParams_exampleUserLogin extends ApiPostParams {
    username: string;
    password: string;
}
interface ApiResponseData_exampleUserLogin extends ApiResponseData {
    loggedIn: true;
    userUuid: "0123456789";
}
/** Log a user in via API */
export async function post_exampleUserLogin(
    apiSdk: ApiSdk,
    postParams: ApiPostParams_exampleUserLogin
): Promise<ApiResponse<ApiResponseData_exampleUserLogin>> {
    return await apiSdk._axiosPost("/exampleUserLogin", postParams);
}

// /exampleUserPosts
//////////////////////////////

interface ApiGetParams_exampleUserPosts extends ApiGetParams {
    userUuid: string;
}
interface ApiResponseData_exampleUserPosts extends ApiResponseData {
    userPosts: string[];
}

/**Fetch a users blog posts */
export async function get_exampleUserPosts(
    apiSdk: ApiSdk,
    getParams: ApiGetParams_exampleUserPosts
): Promise<ApiResponse<ApiResponseData_exampleUserPosts>> {
    return await apiSdk._axiosGet("/exampleUserPosts", getParams);
}

// /exampleUserLogout
interface ApiPostParams_exampleUserLogout extends ApiPostParams {}
interface ApiResponseData_exampleUserLogout extends ApiResponseData {
    success: boolean;
}

/**Log a user out by expiring tokens */
export async function post_exampleUserLogout(
    apiSdk: ApiSdk,
    postParams: ApiPostParams_exampleUserLogout
): Promise<ApiResponse<ApiResponseData_exampleUserLogout>> {
    return await apiSdk._axiosGet("/exampleUserLogout", postParams);
}
