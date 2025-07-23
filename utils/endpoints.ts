export const endpoints = {
  pet: {
    uploadImage: (id: number | string) => `/pet/${id}/uploadImage`,
    update: "/pet",
    findByStatus: (status: string) => `/pet/findByStatus?status=${status}`,
    updateWithForm: (id: number | string) => `/pet/${id}`,
    getById: (id: number | string) => `/pet/${id}`,
  },

  store: {
    getInventory: "/store/inventory",
    placeOrder: "/store/order",
    getOrderById: (id: number | string) => `/store/order/${id}`,
    deleteOrderById: (id: number | string) => `/store/order/${id}`,
  },

  user: {
    createUser: "/user",
    getUserByUsername: (username: string) => `/user/${username}`,
    login: `/user/login`,
    logout: `/user/logout`,
    updateUser: (username: string) => `/user/${username}`,
    deleteUser: (username: string) => `/user/${username}`,
  },
};
