import path from "path";

export interface Pet {
  id: number;
  name: string;
  status: string;
}

const fileName = "cat.jpg";

export const testPet = {
  id: 11112,
  category: { id: 2, name: "Cats" },
  name: "Martina",
  photoUrls: ["https://example.com/cat.jpg"],
  tags: [{ id: 121, name: "fluffy" }],
  status: "available",
  fileName: fileName,
  file: path.join(__dirname, fileName),
};

export const updatedPet = {
  id: testPet.id,
  category: { id: 2, name: "Cats" },
  name: "Lutik",
  photoUrls: ["https://example.com/kitten.jpg"],
  tags: [{ id: 11, name: "cuties" }],
  status: "sold",
};

export const petStatus = ["available", "pending", "sold"];

export const nonExistingPetId = Date.now();
