import test, { APIRequestContext, APIResponse } from '@playwright/test';
import { APIRoutes } from '../../utils/apiroutes';
import { APIClient } from '../clients/apiclient';
import { AuthUser } from './authentication-models';
import { getDefaultAPIContext } from '../contexts/default-context';

class AuthAPIClient implements APIClient {
    
    constructor(public context: APIRequestContext) { }

    async getAuthTokenApi(data: AuthUser) : Promise<APIResponse> {
        return await test.step(`Getting token for user with email "${data.email}" and password "${data.password}"`, async () => {
            return await this.context.post(APIRoutes.Auth, {data})
        })
    }

    async getAuthToken(data: AuthUser) : Promise<string> {

        const response = await this.getAuthTokenApi(data);

        test.expect(response.status()).toBe(200);

        const json = await response.json();
        const token = json.token;

        return token ?? 'exampleToken';
    }

}

export const getAuthAPIClient = async (): Promise<AuthAPIClient> => {
    return new AuthAPIClient(await getDefaultAPIContext());
  };