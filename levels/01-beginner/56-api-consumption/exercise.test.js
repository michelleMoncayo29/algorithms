const { fetchUser, fetchUserPosts, getFormattedUserProfile } = require('./exercise');

// Mock global.fetch 
global.fetch = jest.fn();

describe('Ejercicio 56: Consumo de API (JSONPlaceholder)', () => {

  beforeEach(() => {
    fetch.mockClear();
  });

  const mockUser = {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      city: "Gwenborough"
    }
  };

  const mockPosts = [
    { id: 1, title: "Post 1", userId: 1 },
    { id: 2, title: "Post 2", userId: 1 },
    { id: 3, title: "Post 3", userId: 1 }
  ];

  // ===== 1. fetchUser =====
  describe('fetchUser', () => {
    test('debe obtener un usuario correctamente (200 OK)', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser
      });

      const user = await fetchUser(1);
      
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
      expect(user).toEqual(mockUser);
    });

    test('debe lanzar un error si el usuario no existe (404 Not Found)', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(fetchUser(999)).rejects.toThrow();
    });

    test('debe lanzar un error si hay error de red', async () => {
      fetch.mockRejectedValueOnce(new Error('Network Error'));

      await expect(fetchUser(1)).rejects.toThrow('Network Error');
    });
  });

  // ===== 2. fetchUserPosts =====
  describe('fetchUserPosts', () => {
    test('debe obtener posts correctamente', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPosts
      });

      const posts = await fetchUserPosts(1);
      
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts?userId=1');
      expect(posts).toHaveLength(3);
      expect(posts[0].title).toBe("Post 1");
    });

    test('debe retornar array vacío si no hay posts', async () => {
       fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      });

      const posts = await fetchUserPosts(2);
      expect(posts).toEqual([]);
    });
  });

  // ===== 3. getFormattedUserProfile =====
  describe('getFormattedUserProfile', () => {
    test('debe retornar el perfil combinado y formateado', async () => {
      // Mockear fetch para responder secuencialmente: primero usuario, luego posts
      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPosts
        });

      const profile = await getFormattedUserProfile(1);

      expect(profile).toEqual({
        id: 1,
        fullName: "Leanne Graham",
        email: "Sincere@april.biz",
        addressSummary: "Kulas Light, Gwenborough",
        totalPosts: 3
      });
    });

    test('debe propagar el error si fetchUser falla', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(getFormattedUserProfile(999)).rejects.toThrow();
    });
  });

});
