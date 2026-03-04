const {
  fetchCommentsByPost,
  getCommentersEmails,
  countCommentsByDomain,
  getPostWithComments,
  searchComments
} = require('./exercise');

// Mock global.fetch 
global.fetch = jest.fn();

describe('Ejercicio 58: Análisis de Comentarios y Posts', () => {

  beforeEach(() => {
    fetch.mockClear();
  });

  const mockPost = {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit'
  };

  const mockComments = [
    { postId: 1, id: 1, name: 'id labore ex et quam laborum', email: 'Eliseo@gardner.biz' },
    { postId: 1, id: 2, name: 'quo vero reiciendis velit similique earum', email: 'Jayne_Kuhic@sydney.com' },
    { postId: 1, id: 3, name: 'odio adipisci rerum aut animi', email: 'Nikita@garfield.biz' },
    { postId: 1, id: 4, name: 'alias odio sit', email: 'Lew@alysha.tv' },
    { postId: 1, id: 5, name: 'vero eaque aliquid doloribus et culpa', email: 'Hayden@althea.biz' }
  ];

  // ===== 1. fetchCommentsByPost =====
  describe('fetchCommentsByPost', () => {
    test('debe obtener todos los comentarios de un post', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockComments
      });

      const comments = await fetchCommentsByPost(1);
      
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/comments?postId=1');
      expect(comments).toHaveLength(5);
    });

    test('debe manejar errores de red', async () => {
      fetch.mockRejectedValueOnce(new Error('Network Error'));
      await expect(fetchCommentsByPost(1)).rejects.toThrow('Network Error');
    });
  });

  // ===== 2. getCommentersEmails =====
  describe('getCommentersEmails', () => {
    test('debe extraer solo los emails usando map', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockComments
      });

      const emails = await getCommentersEmails(1);
      
      expect(emails).toEqual([
        'Eliseo@gardner.biz',
        'Jayne_Kuhic@sydney.com',
        'Nikita@garfield.biz',
        'Lew@alysha.tv',
        'Hayden@althea.biz'
      ]);
    });
  });

  // ===== 3. countCommentsByDomain =====
  describe('countCommentsByDomain', () => {
    test('debe contar comentarios por dominio TLD', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockComments
      });

      const counts = await countCommentsByDomain(1);
      
      expect(counts).toEqual({
        biz: 3,
        com: 1,
        tv: 1
      });
    });
  });

  // ===== 4. getPostWithComments =====
  describe('getPostWithComments', () => {
    test('debe combinar post y comentarios en un solo objeto', async () => {
      // Mockear fetch para responder secuencialmente: primero post (o segundo, dependiendo de implementación paralela)
      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPost
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockComments
        });

      // Nota: Si la implementación usa Promise.all, el orden de los mocks en Jest depende del orden en el array.
      // Si el estudiante usa await secuencial, depende del orden de llamadas.
      // Asumiremos que fetch post se llama antes o concurrentemente pero primero en lista.
      
      // Ajuste para robustez: mockear por URL si es posible, pero Jest simple usa orden.
      // Si falla, el estudiante podría necesitar ajustar sus mocks o implementación.
      // Para este ejercicio simple, asumimos orden lógico: post -> comentarios.

      const result = await getPostWithComments(1);
      
      expect(result).toEqual({
        id: 1,
        title: mockPost.title,
        body: mockPost.body,
        comments: mockComments,
        totalComments: 5
      });
    });
  });

  // ===== 5. searchComments =====
  describe('searchComments', () => {
    test('debe buscar comentarios con query param', async () => {
      const searchResults = [mockComments[0]];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => searchResults
      });

      const results = await searchComments('labore');
      
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/comments?q=labore');
      expect(results).toHaveLength(1);
      expect(results[0].name).toContain('labore');
    });
  });

});
