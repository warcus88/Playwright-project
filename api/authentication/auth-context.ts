//Example
import { APIRequestContext, request } from "@playwright/test";
import { APIAuth } from "./authentication-models";
import { getAuthAPIClient } from "./authentication-api";

export const getAuthAPIContext = async ({ user, authToken }: APIAuth): Promise<APIRequestContext> => {
    let extraHTTPHeaders: { [key: string]: string } = {
        accept: '*/*',
        'Content-Type': 'application/json'
    };

    if (!user && !authToken) {
        throw Error(`Provide "user" or  "authToken"`)
    }

    if (user && !authToken) {
        const authClient = await getAuthAPIClient();
        const token = await authClient.getAuthToken(user);

        extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: `Token ${token}` };
    }
    if (authToken && !user) {
        extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: `Token ${authToken}` };
    }

    return await request.newContext({
        baseURL: 'https://reqres.in/',
        extraHTTPHeaders
      });
}