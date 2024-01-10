import test, { APIRequestContext, APIResponse } from '@playwright/test';
import { APIRoutes } from '../../utils/apiroutes';
import { APIClient } from './apiclient';
import { UsersListModel } from '../models/usersListModel';

export class UsersAPIClient implements APIClient {
    constructor(public context: APIRequestContext) { }

    async getUsersList(): Promise<APIResponse> {
        return await test.step(`Getting List of users`, async () => {
            return await this.context.get(`${APIRoutes.Users}?page=2`);
          }); 
    } 
}