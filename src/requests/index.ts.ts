import { ApiGetParams, ApiPostParams, ApiResponse } from "../@types";
import { axiosGet, axiosPost } from "../util";

/**
   Each function should wrap the get/post functions of util with the respective necesary types
   For both calling the function, and what is expected within return data
   These types should be provided preceeding the function definition

    Route functions should be named as the root ending:

    http://localhost:8080/api/v1/exampleUserLogin => /exampleUserLogin
    
    as the root is added at build from the .env file and injected in the request within the utils
 */

// /exampleUserLogin
/////////////////////////////

interface ApiPostParams_exampleUserLogin extends ApiPostParams {
    username: string;
    password: string;
}
interface ApiResponseData_exampleUserLogin {
    loggedIn: true;
    userUuid: "0123456789";
}
/** Log a user in via API */
export async function post_exampleUserLogin(
    postParams: ApiPostParams_exampleUserLogin
): Promise<ApiResponse<ApiResponseData_exampleUserLogin>> {
    return await axiosPost("/exampleUserLogin", postParams);
}

// /exampleUserPosts
//////////////////////////////

interface ApiGetParams_exampleUserPosts extends ApiGetParams {
    userUuid: string;
}
interface ApiResponseData_exampleUserPosts {
    userPosts: string[];
}

/**Fetch a users blog posts */
export async function get_exampleUserPosts(getParams: ApiGetParams_exampleUserPosts): Promise<ApiResponse<ApiResponseData_exampleUserPosts>> {
    return await axiosGet("/exampleUserPosts", getParams);
}

// /exampleUserLogout
interface ApiPostParams_exampleUserLogout extends ApiPostParams {}
interface ApiResponseData_exampleUserLogout {
    success: boolean
}

/**Log a user out by expiring tokens */
export async function post_exampleUserLogout(postParams: ApiPostParams_exampleUserLogout): Promise<ApiResponse<ApiResponseData_exampleUserLogout>> {
    return await axiosGet("/exampleUserLogout", postParams);
}
