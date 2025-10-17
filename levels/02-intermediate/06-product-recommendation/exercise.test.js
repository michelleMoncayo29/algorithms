const {
    calculateCosineSimilarity,
    calculateJaccardSimilarity,
    findSimilarProducts,
    collaborativeFiltering,
    findFrequentlyBoughtTogether,
    hybridRecommendation,
    evaluateRecommendations
} = require('./exercise');

describe('Sistema de Recomendación de Productos para E-commerce', () => {
    
    // Datos de prueba
    const sampleProducts = {
        'laptop': {
            price: 1000,
            rating: 4.5,
            category: 'electronics',
            brand: 'TechCorp',
            weight: 2.5
        },
        'mouse': {
            price: 25,
            rating: 4.2,
            category: 'electronics',
            brand: 'TechCorp',
            weight: 0.1
        },
        'keyboard': {
            price: 80,
            rating: 4.3,
            category: 'electronics',
            brand: 'TechCorp',
            weight: 0.8
        },
        'book': {
            price: 15,
            rating: 4.7,
            category: 'books',
            brand: 'BookStore',
            weight: 0.3
        },
        'headphones': {
            price: 150,
            rating: 4.4,
            category: 'electronics',
            brand: 'AudioPro',
            weight: 0.4
        }
    };

    const sampleCategories = {
        'laptop': ['electronics', 'computers', 'office'],
        'mouse': ['electronics', 'accessories', 'office'],
        'keyboard': ['electronics', 'accessories', 'office'],
        'book': ['books', 'education', 'entertainment'],
        'headphones': ['electronics', 'audio', 'accessories']
    };

    const samplePurchaseHistory = {
        'user1': ['laptop', 'mouse', 'keyboard'],
        'user2': ['laptop', 'headphones', 'book'],
        'user3': ['mouse', 'keyboard', 'book'],
        'user4': ['laptop', 'mouse', 'headphones'],
        'user5': ['book', 'headphones']
    };

    describe('calculateCosineSimilarity', () => {
        test('debe calcular similitud coseno correctamente', () => {
            const product1 = sampleProducts.laptop;
            const product2 = sampleProducts.mouse;
            
            const similarity = calculateCosineSimilarity(product1, product2);
            
            expect(similarity).toBeGreaterThanOrEqual(0);
            expect(similarity).toBeLessThanOrEqual(1);
            expect(typeof similarity).toBe('number');
        });

        test('debe retornar 1 para productos idénticos', () => {
            const product1 = sampleProducts.laptop;
            const product2 = { ...sampleProducts.laptop };
            
            const similarity = calculateCosineSimilarity(product1, product2);
            
            expect(similarity).toBeCloseTo(1, 5);
        });

        test('debe retornar 0 para productos completamente diferentes', () => {
            const product1 = { price: 0, rating: 0, weight: 0 };
            const product2 = { price: 1, rating: 1, weight: 1 };
            
            const similarity = calculateCosineSimilarity(product1, product2);
            
            expect(similarity).toBeCloseTo(0, 5);
        });

        test('debe manejar productos con características faltantes', () => {
            const product1 = { price: 100, rating: 4.0 };
            const product2 = { price: 200, rating: 3.5, weight: 1.0 };
            
            const similarity = calculateCosineSimilarity(product1, product2);
            
            expect(similarity).toBeGreaterThanOrEqual(0);
            expect(similarity).toBeLessThanOrEqual(1);
        });
    });

    describe('calculateJaccardSimilarity', () => {
        test('debe calcular similitud Jaccard correctamente', () => {
            const categories1 = sampleCategories.laptop;
            const categories2 = sampleCategories.mouse;
            
            const similarity = calculateJaccardSimilarity(categories1, categories2);
            
            expect(similarity).toBeGreaterThanOrEqual(0);
            expect(similarity).toBeLessThanOrEqual(1);
            expect(typeof similarity).toBe('number');
        });

        test('debe retornar 1 para categorías idénticas', () => {
            const categories1 = ['electronics', 'computers'];
            const categories2 = ['electronics', 'computers'];
            
            const similarity = calculateJaccardSimilarity(categories1, categories2);
            
            expect(similarity).toBe(1);
        });

        test('debe retornar 0 para categorías sin intersección', () => {
            const categories1 = ['electronics', 'computers'];
            const categories2 = ['books', 'education'];
            
            const similarity = calculateJaccardSimilarity(categories1, categories2);
            
            expect(similarity).toBe(0);
        });

        test('debe manejar arrays vacíos', () => {
            const categories1 = [];
            const categories2 = ['electronics'];
            
            const similarity = calculateJaccardSimilarity(categories1, categories2);
            
            expect(similarity).toBe(0);
        });

        test('debe manejar categorías duplicadas', () => {
            const categories1 = ['electronics', 'electronics', 'computers'];
            const categories2 = ['electronics', 'computers', 'computers'];
            
            const similarity = calculateJaccardSimilarity(categories1, categories2);
            
            expect(similarity).toBeGreaterThan(0);
            expect(similarity).toBeLessThanOrEqual(1);
        });
    });

    describe('findSimilarProducts', () => {
        test('debe encontrar productos similares', () => {
            const targetProduct = sampleProducts.laptop;
            const allProducts = Object.entries(sampleProducts).map(([id, data]) => ({
                id,
                ...data
            }));
            
            const similarProducts = findSimilarProducts(targetProduct, allProducts, 3);
            
            expect(Array.isArray(similarProducts)).toBe(true);
            expect(similarProducts.length).toBeLessThanOrEqual(3);
            expect(similarProducts.every(p => p.id !== 'laptop')).toBe(true);
        });

        test('debe retornar productos ordenados por similitud', () => {
            const targetProduct = sampleProducts.mouse;
            const allProducts = Object.entries(sampleProducts).map(([id, data]) => ({
                id,
                ...data
            }));
            
            const similarProducts = findSimilarProducts(targetProduct, allProducts, 5);
            
            if (similarProducts.length > 1) {
                for (let i = 0; i < similarProducts.length - 1; i++) {
                    expect(similarProducts[i].similarity).toBeGreaterThanOrEqual(
                        similarProducts[i + 1].similarity
                    );
                }
            }
        });

        test('debe manejar array vacío de productos', () => {
            const targetProduct = sampleProducts.laptop;
            const allProducts = [];
            
            const similarProducts = findSimilarProducts(targetProduct, allProducts, 5);
            
            expect(similarProducts).toEqual([]);
        });

        test('debe respetar el límite de recomendaciones', () => {
            const targetProduct = sampleProducts.laptop;
            const allProducts = Object.entries(sampleProducts).map(([id, data]) => ({
                id,
                ...data
            }));
            
            const similarProducts = findSimilarProducts(targetProduct, allProducts, 2);
            
            expect(similarProducts.length).toBeLessThanOrEqual(2);
        });
    });

    describe('collaborativeFiltering', () => {
        test('debe generar recomendaciones basadas en usuarios similares', () => {
            const userId = 'user1';
            const recommendations = collaborativeFiltering(
                userId,
                samplePurchaseHistory,
                sampleProducts,
                3
            );
            
            expect(Array.isArray(recommendations)).toBe(true);
            expect(recommendations.length).toBeLessThanOrEqual(3);
        });

        test('debe excluir productos ya comprados por el usuario', () => {
            const userId = 'user1';
            const userPurchases = samplePurchaseHistory[userId];
            const recommendations = collaborativeFiltering(
                userId,
                samplePurchaseHistory,
                sampleProducts,
                5
            );
            
            recommendations.forEach(rec => {
                expect(userPurchases).not.toContain(rec.productId);
            });
        });

        test('debe manejar usuario sin historial de compras', () => {
            const userId = 'newUser';
            const recommendations = collaborativeFiltering(
                userId,
                samplePurchaseHistory,
                sampleProducts,
                3
            );
            
            expect(Array.isArray(recommendations)).toBe(true);
        });

        test('debe retornar recomendaciones ordenadas por puntuación', () => {
            const userId = 'user1';
            const recommendations = collaborativeFiltering(
                userId,
                samplePurchaseHistory,
                sampleProducts,
                5
            );
            
            if (recommendations.length > 1) {
                for (let i = 0; i < recommendations.length - 1; i++) {
                    expect(recommendations[i].score).toBeGreaterThanOrEqual(
                        recommendations[i + 1].score
                    );
                }
            }
        });
    });

    describe('findFrequentlyBoughtTogether', () => {
        test('debe encontrar productos frecuentemente comprados juntos', () => {
            const targetProductId = 'laptop';
            const frequentProducts = findFrequentlyBoughtTogether(
                samplePurchaseHistory,
                targetProductId,
                1,
                3
            );
            
            expect(Array.isArray(frequentProducts)).toBe(true);
            expect(frequentProducts.length).toBeLessThanOrEqual(3);
        });

        test('debe respetar el soporte mínimo', () => {
            const targetProductId = 'laptop';
            const minSupport = 2;
            const frequentProducts = findFrequentlyBoughtTogether(
                samplePurchaseHistory,
                targetProductId,
                minSupport,
                5
            );
            
            frequentProducts.forEach(product => {
                expect(product.frequency).toBeGreaterThanOrEqual(minSupport);
            });
        });

        test('debe retornar productos ordenados por frecuencia', () => {
            const targetProductId = 'mouse';
            const frequentProducts = findFrequentlyBoughtTogether(
                samplePurchaseHistory,
                targetProductId,
                1,
                5
            );
            
            if (frequentProducts.length > 1) {
                for (let i = 0; i < frequentProducts.length - 1; i++) {
                    expect(frequentProducts[i].frequency).toBeGreaterThanOrEqual(
                        frequentProducts[i + 1].frequency
                    );
                }
            }
        });

        test('debe manejar producto no encontrado en historial', () => {
            const targetProductId = 'nonexistent';
            const frequentProducts = findFrequentlyBoughtTogether(
                samplePurchaseHistory,
                targetProductId,
                1,
                5
            );
            
            expect(frequentProducts).toEqual([]);
        });

        test('debe excluir el producto objetivo de los resultados', () => {
            const targetProductId = 'laptop';
            const frequentProducts = findFrequentlyBoughtTogether(
                samplePurchaseHistory,
                targetProductId,
                1,
                5
            );
            
            frequentProducts.forEach(product => {
                expect(product.productId).not.toBe(targetProductId);
            });
        });
    });

    describe('hybridRecommendation', () => {
        const completeData = {
            products: sampleProducts,
            categories: sampleCategories,
            purchaseHistory: samplePurchaseHistory
        };

        test('debe generar recomendaciones híbridas', () => {
            const userId = 'user1';
            const recommendations = hybridRecommendation(
                userId,
                null,
                completeData,
                5
            );
            
            expect(Array.isArray(recommendations)).toBe(true);
            expect(recommendations.length).toBeLessThanOrEqual(5);
        });

        test('debe incluir recomendaciones basadas en producto objetivo', () => {
            const userId = 'user1';
            const targetProductId = 'laptop';
            const recommendations = hybridRecommendation(
                userId,
                targetProductId,
                completeData,
                5
            );
            
            expect(Array.isArray(recommendations)).toBe(true);
            expect(recommendations.length).toBeLessThanOrEqual(5);
        });

        test('debe retornar recomendaciones con puntuaciones', () => {
            const userId = 'user1';
            const recommendations = hybridRecommendation(
                userId,
                null,
                completeData,
                3
            );
            
            recommendations.forEach(rec => {
                expect(rec).toHaveProperty('productId');
                expect(rec).toHaveProperty('score');
                expect(typeof rec.score).toBe('number');
            });
        });

        test('debe manejar datos incompletos', () => {
            const userId = 'user1';
            const incompleteData = {
                products: sampleProducts,
                categories: {},
                purchaseHistory: {}
            };
            
            const recommendations = hybridRecommendation(
                userId,
                null,
                incompleteData,
                3
            );
            
            expect(Array.isArray(recommendations)).toBe(true);
        });
    });

    describe('evaluateRecommendations', () => {
        test('debe calcular métricas de evaluación correctamente', () => {
            const recommendations = [
                { productId: 'laptop', score: 0.9 },
                { productId: 'mouse', score: 0.8 },
                { productId: 'keyboard', score: 0.7 }
            ];
            const actualPurchases = ['laptop', 'headphones', 'book'];
            
            const metrics = evaluateRecommendations(recommendations, actualPurchases);
            
            expect(metrics).toHaveProperty('precision');
            expect(metrics).toHaveProperty('recall');
            expect(metrics).toHaveProperty('f1Score');
            
            expect(metrics.precision).toBeGreaterThanOrEqual(0);
            expect(metrics.precision).toBeLessThanOrEqual(1);
            expect(metrics.recall).toBeGreaterThanOrEqual(0);
            expect(metrics.recall).toBeLessThanOrEqual(1);
            expect(metrics.f1Score).toBeGreaterThanOrEqual(0);
            expect(metrics.f1Score).toBeLessThanOrEqual(1);
        });

        test('debe manejar recomendaciones perfectas', () => {
            const recommendations = [
                { productId: 'laptop', score: 0.9 },
                { productId: 'mouse', score: 0.8 }
            ];
            const actualPurchases = ['laptop', 'mouse'];
            
            const metrics = evaluateRecommendations(recommendations, actualPurchases);
            
            expect(metrics.precision).toBe(1);
            expect(metrics.recall).toBe(1);
            expect(metrics.f1Score).toBe(1);
        });

        test('debe manejar recomendaciones sin aciertos', () => {
            const recommendations = [
                { productId: 'laptop', score: 0.9 },
                { productId: 'mouse', score: 0.8 }
            ];
            const actualPurchases = ['book', 'headphones'];
            
            const metrics = evaluateRecommendations(recommendations, actualPurchases);
            
            expect(metrics.precision).toBe(0);
            expect(metrics.recall).toBe(0);
            expect(metrics.f1Score).toBe(0);
        });

        test('debe manejar arrays vacíos', () => {
            const recommendations = [];
            const actualPurchases = ['laptop', 'mouse'];
            
            const metrics = evaluateRecommendations(recommendations, actualPurchases);
            
            expect(metrics.precision).toBe(0);
            expect(metrics.recall).toBe(0);
            expect(metrics.f1Score).toBe(0);
        });

        test('debe calcular F1-score correctamente', () => {
            const recommendations = [
                { productId: 'laptop', score: 0.9 },
                { productId: 'mouse', score: 0.8 },
                { productId: 'keyboard', score: 0.7 }
            ];
            const actualPurchases = ['laptop', 'mouse', 'book'];
            
            const metrics = evaluateRecommendations(recommendations, actualPurchases);
            
            // F1 = 2 * (precision * recall) / (precision + recall)
            const expectedF1 = 2 * (metrics.precision * metrics.recall) / (metrics.precision + metrics.recall);
            expect(metrics.f1Score).toBeCloseTo(expectedF1, 5);
        });
    });

    describe('Casos edge y validación', () => {
        test('debe manejar productos con características numéricas cero', () => {
            const product1 = { price: 0, rating: 0, weight: 0 };
            const product2 = { price: 100, rating: 4.0, weight: 1.0 };
            
            const similarity = calculateCosineSimilarity(product1, product2);
            
            expect(similarity).toBeGreaterThanOrEqual(0);
            expect(similarity).toBeLessThanOrEqual(1);
        });

        test('debe manejar historial de compras con transacciones vacías', () => {
            const emptyHistory = {
                'user1': [],
                'user2': ['laptop']
            };
            
            const recommendations = collaborativeFiltering(
                'user1',
                emptyHistory,
                sampleProducts,
                3
            );
            
            expect(Array.isArray(recommendations)).toBe(true);
        });

        test('debe manejar productos con características negativas', () => {
            const product1 = { price: -100, rating: 4.0, weight: 1.0 };
            const product2 = { price: 200, rating: 3.0, weight: 2.0 };
            
            const similarity = calculateCosineSimilarity(product1, product2);
            
            expect(typeof similarity).toBe('number');
        });

        test('debe manejar límites de recomendación muy altos', () => {
            const targetProduct = sampleProducts.laptop;
            const allProducts = Object.entries(sampleProducts).map(([id, data]) => ({
                id,
                ...data
            }));
            
            const similarProducts = findSimilarProducts(targetProduct, allProducts, 100);
            
            expect(similarProducts.length).toBeLessThanOrEqual(allProducts.length - 1);
        });
    });
});
