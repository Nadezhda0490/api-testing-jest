import { invalidOrderId, petStatus, testOrder } from "../test-data/store-data";
import { api } from "../utils/api";
import { endpoints } from "../utils/endpoints";

describe("Store API", () => {
  test("GET /store/inventory - should return pet inventories by status", async () => {
    const response = await api.get(endpoints.store.getInventory);

    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("object");

    petStatus.forEach((status) => {
      expect(response.body).toHaveProperty(status);
      expect(typeof response.body[status]).toBe("number");
    });
  });

  test("POST /store/order - should place an order for a pet", async () => {
    const response = await api.post(endpoints.store.placeOrder).send(testOrder);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(testOrder);
  });

  test("GET /store/order/:id - should find purchase order by ID", async () => {
    const response = await api.get(endpoints.store.getOrderById(testOrder.id));

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(testOrder.id);
  });

  test("GET /store/order/:id - should fail with 404 when order is not found", async () => {
    const response = await api
      .get(endpoints.store.getOrderById(invalidOrderId))
      .ok((res) => true);

    console.log(response.body);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Order not found");
  });

  test("DELETE /store/order/:id - should delete purchase order by ID", async () => {
    const response = await api.delete(
      endpoints.store.deleteOrderById(testOrder.id)
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain(`${testOrder.id}`);
  });
});
