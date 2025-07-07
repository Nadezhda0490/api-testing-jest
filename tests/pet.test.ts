import { api } from "../utils/api";
import { endpoints } from "../utils/endpoints";
import {
  nonExistingPetId,
  Pet,
  petStatus,
  testPet,
  updatedPet,
} from "../test-data/pet-data";

describe("Pet API", () => {
  test("POST /pet/:id/uploadImage - should upload an image for a specific pet ID", async () => {
    const response = await api
      .post(endpoints.pet.uploadImage(testPet.id))
      .attach("file", testPet.file);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain(testPet.fileName);
  });

  test("POST /pet/:id/uploadImage - should fail with 400 when no file is attached", async () => {
    const response = await api
      .post(endpoints.pet.uploadImage(testPet.id))
      .set("Content-Type", "multipart/form-data")
      .send()
      .ok((res) => true);

    expect(response.statusCode).toBe(400);
  });

  test("PUT /pet - should update an existing pet", async () => {
    const response = await api.put(endpoints.pet.update).send(updatedPet);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedPet);
  });

  test.each(petStatus)(
    'GET /pet/findByStatus - should find pets by status "%s"',
    async (status) => {
      const response = await api.get(endpoints.pet.findByStatus(status));

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);

      response.body.forEach((pet: Pet) => {
        expect(pet.status).toBe(status);
      });
    }
  );

  test("POST /pet/:id  - should update a pet in the store with form data", async () => {
    const response = await api
      .post(endpoints.pet.updateWithForm(testPet.id))
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        name: updatedPet.name,
        status: updatedPet.status,
      });

    expect(response.statusCode).toBe(200);
  });

  test("GET /pet/:id - should fail with 404 when pet is not found", async () => {
    const response = await api
      .get(endpoints.pet.getById(nonExistingPetId))
      .ok((res) => true);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Pet not found");
  });
});
