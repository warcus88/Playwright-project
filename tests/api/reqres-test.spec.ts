import { test, expect } from '@playwright/test';
const data = {
    name: "Mykola",
    job: "leader"
};

test('Try', async ({ request }) => {

})

test.describe('Simple API tests with reqres', () => {
    test('POST user', async ({ request }) => {

        const getListUsersResponse = await request.post('/api/users', { data });
        console.log('----------------------' + await getListUsersResponse.json);
        expect(getListUsersResponse.ok).toBeTruthy();
        expect(getListUsersResponse.status()).toEqual(201);
        expect(getListUsersResponse.statusText()).toEqual('Created');

        expect(await getListUsersResponse.json()).toContainEqual(expect.objectContaining({
            job: 'leader',
            name: 'Mykola'
          }));
    })

    test('GET list of users', async ({ request }) => {
        const getListUsersResponse = await request.get('/api/users?page=2');
        expect(getListUsersResponse.ok).toBeTruthy();
    })
})