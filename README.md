# demo-project API SDK

**Run `pnpm link-deps` after git pull**

This is an example of the repo hierarchy for proposed shared API-SDKs to be made for their respective products

As specified in [Standards For Web Applications]() -- The use for the *demo-api-sdk* is to provide an SDK to all digesting products within a respective product family that depend on the same API(s)

## API Functions

Follow these guidelines when creating an API SDK

**All API Functions should be categorized as needed within the 'requests' folder by name as follows:**
    
 - `<type>_<name>` => `post_userLogin() || get_userPosts()`

**All API Functions should return a body as follows for easy implementation:**

```
export interface ApiResponse<ApiResponseData> {
    code: number; // The HTTP Response code
    data: ApiResponseData; // Typed endpoint-specific data
    error: string; // Any error if present, else ""
    success: boolean; // If the request was successful
    timestamp: number; // Timestamp of request completion
}

This is defined in the `shared-types` repository