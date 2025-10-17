/**
 * Solución: Sistema de Recomendación de Productos para E-commerce
 * 
 * Implementación completa de un sistema de recomendación que combina
 * múltiples algoritmos: similitud coseno, similitud Jaccard, filtrado
 * colaborativo, análisis de canasta de mercado y sistema híbrido.
 */

/**
 * Calcula la similitud coseno entre dos productos basado en sus características
 * 
 * @param {Object} product1 - Producto 1 con características numéricas
 * @param {Object} product2 - Producto 2 con características numéricas
 * @returns {number} - Similitud coseno entre 0 y 1
 */
function calculateCosineSimilarity(product1, product2) {
    // Obtener todas las características únicas de ambos productos
    const allKeys = new Set([...Object.keys(product1), ...Object.keys(product2)]);
    
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;
    
    // Calcular producto punto y magnitudes
    for (const key of allKeys) {
        const value1 = product1[key] || 0;
        const value2 = product2[key] || 0;
        
        // Solo considerar valores numéricos
        if (typeof value1 === 'number' && typeof value2 === 'number') {
            dotProduct += value1 * value2;
            magnitude1 += value1 * value1;
            magnitude2 += value2 * value2;
        }
    }
    
    // Evitar división por cero
    if (magnitude1 === 0 || magnitude2 === 0) {
        return 0;
    }
    
    return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
}

/**
 * Calcula la similitud Jaccard entre dos productos basado en categorías
 * 
 * @param {Array} categories1 - Categorías del producto 1
 * @param {Array} categories2 - Categorías del producto 2
 * @returns {number} - Similitud Jaccard entre 0 y 1
 */
function calculateJaccardSimilarity(categories1, categories2) {
    // Convertir a Sets para eliminar duplicados
    const set1 = new Set(categories1);
    const set2 = new Set(categories2);
    
    // Calcular intersección
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    
    // Calcular unión
    const union = new Set([...set1, ...set2]);
    
    // Evitar división por cero
    if (union.size === 0) {
        return 0;
    }
    
    return intersection.size / union.size;
}

/**
 * Encuentra productos similares basado en similitud coseno
 * 
 * @param {Object} targetProduct - Producto objetivo
 * @param {Array} allProducts - Array de todos los productos
 * @param {number} limit - Número máximo de recomendaciones
 * @returns {Array} - Array de productos similares ordenados por similitud
 */
function findSimilarProducts(targetProduct, allProducts, limit = 5) {
    const similarities = allProducts
        .map(product => {
            // No incluir el producto objetivo
            if (product.id === targetProduct.id) {
                return null;
            }
            
            const similarity = calculateCosineSimilarity(targetProduct, product);
            return {
                ...product,
                similarity: similarity
            };
        })
        .filter(product => product !== null) // Filtrar productos nulos
        .sort((a, b) => b.similarity - a.similarity) // Ordenar por similitud descendente
        .slice(0, limit); // Limitar resultados
    
    return similarities;
}

/**
 * Implementa filtrado colaborativo básico basado en historial de compras
 * 
 * @param {string} userId - ID del usuario
 * @param {Object} purchaseHistory - Historial de compras {userId: [productIds]}
 * @param {Object} productData - Datos de productos {productId: productInfo}
 * @param {number} limit - Número máximo de recomendaciones
 * @returns {Array} - Array de productos recomendados
 */
function collaborativeFiltering(userId, purchaseHistory, productData, limit = 5) {
    const userPurchases = purchaseHistory[userId] || [];
    
    // Si el usuario no tiene historial, retornar productos populares
    if (userPurchases.length === 0) {
        return Object.keys(productData)
            .map(productId => ({
                productId,
                score: 0.1 // Puntuación baja para productos sin historial
            }))
            .slice(0, limit);
    }
    
    // Encontrar usuarios similares
    const similarUsers = Object.entries(purchaseHistory)
        .filter(([otherUserId, purchases]) => {
            if (otherUserId === userId) return false;
            
            // Calcular similitud basada en productos comprados
            const userSet = new Set(userPurchases);
            const otherSet = new Set(purchases);
            const intersection = new Set([...userSet].filter(x => otherSet.has(x)));
            const union = new Set([...userSet, ...otherSet]);
            
            return intersection.size / union.size > 0.1; // Umbral mínimo de similitud
        })
        .map(([otherUserId, purchases]) => ({
            userId: otherUserId,
            purchases: purchases,
            similarity: calculateUserSimilarity(userPurchases, purchases)
        }));
    
    // Contar productos recomendados por usuarios similares
    const productScores = {};
    
    similarUsers.forEach(({ purchases, similarity }) => {
        purchases.forEach(productId => {
            if (!userPurchases.includes(productId)) {
                productScores[productId] = (productScores[productId] || 0) + similarity;
            }
        });
    });
    
    // Convertir a array y ordenar
    const recommendations = Object.entries(productScores)
        .map(([productId, score]) => ({
            productId,
            score: score
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    
    return recommendations;
}

/**
 * Función auxiliar para calcular similitud entre usuarios
 */
function calculateUserSimilarity(purchases1, purchases2) {
    const set1 = new Set(purchases1);
    const set2 = new Set(purchases2);
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return union.size === 0 ? 0 : intersection.size / union.size;
}

/**
 * Encuentra productos frecuentemente comprados juntos (Market Basket Analysis)
 * 
 * @param {Object} purchaseHistory - Historial de compras {userId: [productIds]}
 * @param {string} targetProductId - Producto objetivo
 * @param {number} minSupport - Soporte mínimo (número de veces que deben aparecer juntos)
 * @param {number} limit - Número máximo de recomendaciones
 * @returns {Array} - Array de productos frecuentemente comprados juntos
 */
function findFrequentlyBoughtTogether(purchaseHistory, targetProductId, minSupport = 2, limit = 5) {
    // Encontrar transacciones que contienen el producto objetivo
    const relevantTransactions = Object.values(purchaseHistory)
        .filter(transaction => transaction.includes(targetProductId));
    
    if (relevantTransactions.length === 0) {
        return [];
    }
    
    // Contar productos que aparecen junto al producto objetivo
    const productCounts = {};
    
    relevantTransactions.forEach(transaction => {
        transaction.forEach(productId => {
            if (productId !== targetProductId) {
                productCounts[productId] = (productCounts[productId] || 0) + 1;
            }
        });
    });
    
    // Filtrar por soporte mínimo y ordenar
    const frequentProducts = Object.entries(productCounts)
        .filter(([productId, frequency]) => frequency >= minSupport)
        .map(([productId, frequency]) => ({
            productId,
            frequency: frequency,
            confidence: frequency / relevantTransactions.length
        }))
        .sort((a, b) => b.frequency - a.frequency)
        .slice(0, limit);
    
    return frequentProducts;
}

/**
 * Sistema de recomendación híbrido que combina múltiples algoritmos
 * 
 * @param {string} userId - ID del usuario
 * @param {string} targetProductId - Producto objetivo (opcional)
 * @param {Object} data - Datos completos del sistema
 * @param {number} limit - Número máximo de recomendaciones
 * @returns {Array} - Array de productos recomendados con puntuaciones
 */
function hybridRecommendation(userId, targetProductId, data, limit = 5) {
    const { products, categories, purchaseHistory } = data;
    const productScores = {};
    
    // 1. Filtrado colaborativo (peso: 0.4)
    const collaborativeRecs = collaborativeFiltering(userId, purchaseHistory, products, limit * 2);
    collaborativeRecs.forEach(rec => {
        productScores[rec.productId] = (productScores[rec.productId] || 0) + rec.score * 0.4;
    });
    
    // 2. Productos similares (si hay producto objetivo) (peso: 0.3)
    if (targetProductId && products[targetProductId]) {
        const allProducts = Object.entries(products).map(([id, data]) => ({ id, ...data }));
        const similarProducts = findSimilarProducts(products[targetProductId], allProducts, limit * 2);
        similarProducts.forEach(product => {
            productScores[product.id] = (productScores[product.id] || 0) + product.similarity * 0.3;
        });
    }
    
    // 3. Productos frecuentemente comprados juntos (peso: 0.3)
    if (targetProductId) {
        const frequentProducts = findFrequentlyBoughtTogether(purchaseHistory, targetProductId, 1, limit * 2);
        frequentProducts.forEach(product => {
            productScores[product.productId] = (productScores[product.productId] || 0) + product.confidence * 0.3;
        });
    }
    
    // Convertir a array y ordenar
    const recommendations = Object.entries(productScores)
        .map(([productId, score]) => ({
            productId,
            score: score
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    
    return recommendations;
}

/**
 * Calcula métricas de evaluación del sistema de recomendación
 * 
 * @param {Array} recommendations - Recomendaciones generadas
 * @param {Array} actualPurchases - Compras reales del usuario
 * @returns {Object} - Métricas de precisión, recall y F1-score
 */
function evaluateRecommendations(recommendations, actualPurchases) {
    if (recommendations.length === 0) {
        return {
            precision: 0,
            recall: 0,
            f1Score: 0
        };
    }
    
    const recommendedIds = new Set(recommendations.map(rec => rec.productId));
    const actualIds = new Set(actualPurchases);
    
    // Calcular intersección
    const intersection = new Set([...recommendedIds].filter(x => actualIds.has(x)));
    
    // Calcular métricas
    const precision = intersection.size / recommendedIds.size;
    const recall = actualIds.size === 0 ? 0 : intersection.size / actualIds.size;
    const f1Score = (precision + recall) === 0 ? 0 : 2 * (precision * recall) / (precision + recall);
    
    return {
        precision: precision,
        recall: recall,
        f1Score: f1Score
    };
}

/**
 * Función auxiliar para generar recomendaciones basadas en popularidad
 * 
 * @param {Object} purchaseHistory - Historial de compras
 * @param {number} limit - Número máximo de recomendaciones
 * @returns {Array} - Productos populares
 */
function getPopularProducts(purchaseHistory, limit = 5) {
    const productCounts = {};
    
    Object.values(purchaseHistory).forEach(transaction => {
        transaction.forEach(productId => {
            productCounts[productId] = (productCounts[productId] || 0) + 1;
        });
    });
    
    return Object.entries(productCounts)
        .map(([productId, count]) => ({
            productId,
            popularity: count
        }))
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, limit);
}

/**
 * Función auxiliar para normalizar características de productos
 * 
 * @param {Object} product - Producto con características
 * @returns {Object} - Producto con características normalizadas
 */
function normalizeProductFeatures(product) {
    const normalized = { ...product };
    
    // Normalizar precio (asumiendo rango 0-10000)
    if (normalized.price !== undefined) {
        normalized.price = normalized.price / 10000;
    }
    
    // Normalizar rating (asumiendo rango 0-5)
    if (normalized.rating !== undefined) {
        normalized.rating = normalized.rating / 5;
    }
    
    // Normalizar peso (asumiendo rango 0-10)
    if (normalized.weight !== undefined) {
        normalized.weight = normalized.weight / 10;
    }
    
    return normalized;
}

/**
 * Función auxiliar para calcular similitud ponderada
 * 
 * @param {Object} product1 - Producto 1
 * @param {Object} product2 - Producto 2
 * @param {Object} weights - Pesos para cada característica
 * @returns {number} - Similitud ponderada
 */
function calculateWeightedSimilarity(product1, product2, weights = {}) {
    const defaultWeights = {
        price: 0.3,
        rating: 0.4,
        weight: 0.1,
        brand: 0.2
    };
    
    const finalWeights = { ...defaultWeights, ...weights };
    let totalSimilarity = 0;
    let totalWeight = 0;
    
    Object.keys(finalWeights).forEach(key => {
        if (product1[key] !== undefined && product2[key] !== undefined) {
            if (typeof product1[key] === 'number' && typeof product2[key] === 'number') {
                // Similitud numérica (1 - diferencia normalizada)
                const maxValue = Math.max(product1[key], product2[key]);
                const minValue = Math.min(product1[key], product2[key]);
                const similarity = maxValue === 0 ? 1 : 1 - (maxValue - minValue) / maxValue;
                
                totalSimilarity += similarity * finalWeights[key];
                totalWeight += finalWeights[key];
            } else if (product1[key] === product2[key]) {
                // Similitud categórica (1 si igual, 0 si diferente)
                totalSimilarity += 1 * finalWeights[key];
                totalWeight += finalWeights[key];
            }
        }
    });
    
    return totalWeight === 0 ? 0 : totalSimilarity / totalWeight;
}

module.exports = {
    calculateCosineSimilarity,
    calculateJaccardSimilarity,
    findSimilarProducts,
    collaborativeFiltering,
    findFrequentlyBoughtTogether,
    hybridRecommendation,
    evaluateRecommendations,
    getPopularProducts,
    normalizeProductFeatures,
    calculateWeightedSimilarity
};
