import { api } from "../utils/api";
import { endpoints } from "../utils/endpoints";
import { invalidUsername, testUser, updatedUser } from "../test-data/user-data";

describe("User API", () => {
  test("POST /user - should create a user", async () => {
    const response = await api.post(endpoints.user.createUser).send(testUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain(`${testUser.id}`);
  });

  test("GET /user/:username - should get user by username", async () => {
    const response = await api.get(
      endpoints.user.getUserByUsername(testUser.username)
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(testUser);
  });

  test("GET /user/:username - should return 404 when user is not found", async () => {
    const response = await api
      .get(endpoints.user.getUserByUsername(invalidUsername))
      .ok((res) => true);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toContain("User not found");
  });

  test("GET /user/login - should log user into the system", async () => {
    const response = await api.get(
      `${endpoints.user.login}?username=${testUser.username}&password=${testUser.password}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain("logged in user session:");
  });

  test("GET /user/logout - should log out user from the system", async () => {
    const response = await api.get(endpoints.user.logout);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain("ok");
  });

  test("PUT /user/:username - should update user", async () => {
    const response = await api
      .put(endpoints.user.updateUser(updatedUser.username))
      .send(updatedUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain(`${updatedUser.id}`);
  });

  test("DELETE /user/:username - should delete user", async () => {
    const response = await api.delete(
      endpoints.user.deleteUser(updatedUser.username)
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain(`${updatedUser.username}`);
  });
});
