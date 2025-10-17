# Sistema de Recomendación de Productos para E-commerce

## 📚 Descripción

Este ejercicio implementa un **sistema de recomendación de productos** para e-commerce que combina múltiples algoritmos de recomendación. Aprenderás sobre similitud de productos, filtrado colaborativo, análisis de canasta de mercado y sistemas de recomendación híbridos.

## 🎯 Objetivos de Aprendizaje

Al completar este ejercicio, serás capaz de:

- ✅ Implementar algoritmos de similitud (coseno y Jaccard)
- ✅ Aplicar filtrado colaborativo básico
- ✅ Realizar análisis de canasta de mercado
- ✅ Combinar múltiples algoritmos en un sistema híbrido
- ✅ Evaluar la calidad de las recomendaciones
- ✅ Entender conceptos de machine learning aplicados a e-commerce

## 🔍 Algoritmos Implementados

### 1. Similitud Coseno
Mide la similitud entre productos basándose en sus características numéricas.

**Fórmula:** `cos(θ) = (A · B) / (||A|| * ||B||)`

```javascript
// Ejemplo: Laptop vs Mouse
const laptop = { price: 1000, rating: 4.5, weight: 2.5 };
const mouse = { price: 25, rating: 4.2, weight: 0.1 };
// Similitud basada en características numéricas
```

### 2. Similitud Jaccard
Mide la similitud entre productos basándose en sus categorías.

**Fórmula:** `J(A,B) = |A ∩ B| / |A ∪ B|`

```javascript
// Ejemplo: Categorías de productos
const laptopCategories = ['electronics', 'computers', 'office'];
const mouseCategories = ['electronics', 'accessories', 'office'];
// Similitud = 2/4 = 0.5 (2 categorías en común, 4 únicas)
```

### 3. Filtrado Colaborativo
Recomienda productos basándose en el comportamiento de usuarios similares.

```javascript
// Si usuarios que compraron "laptop" también compraron "mouse"
// Recomendar "mouse" a usuarios que compraron "laptop"
```

### 4. Análisis de Canasta de Mercado
Encuentra productos frecuentemente comprados juntos.

```javascript
// Si "laptop" y "mouse" aparecen juntos en 80% de las compras
// Recomendar "mouse" cuando alguien ve "laptop"
```

## 🧠 Conceptos Clave

### Similitud de Productos
- **Coseno**: Ideal para características numéricas (precio, rating, peso)
- **Jaccard**: Ideal para características categóricas (categorías, tags)

### Filtrado Colaborativo
- Encuentra usuarios con patrones de compra similares
- Recomienda productos que compraron usuarios similares
- Efectivo cuando hay suficiente historial de compras

### Análisis de Canasta de Mercado
- Identifica asociaciones entre productos
- Útil para cross-selling y up-selling
- Requiere un soporte mínimo para ser significativo

### Sistema Híbrido
- Combina múltiples algoritmos para mejores resultados
- Ponderación de diferentes fuentes de recomendación
- Más robusto que algoritmos individuales

## ⚡ Análisis de Complejidad

### Complejidad Temporal
- **Similitud Coseno**: O(n) donde n es el número de características
- **Similitud Jaccard**: O(n + m) donde n y m son el tamaño de los conjuntos
- **Filtrado Colaborativo**: O(u × p) donde u es usuarios y p es productos
- **Análisis de Canasta**: O(t × p) donde t es transacciones y p es productos

### Complejidad Espacial
- **Almacenamiento de datos**: O(u × p) para historial de compras
- **Matrices de similitud**: O(p²) para similitud entre productos
- **Recomendaciones**: O(k) donde k es el número de recomendaciones

## 🛠️ Estructura del Ejercicio

### Funciones Principales

1. **`calculateCosineSimilarity(product1, product2)`**
   - Calcula similitud coseno entre dos productos
   - Usa características numéricas (precio, rating, peso)

2. **`calculateJaccardSimilarity(categories1, categories2)`**
   - Calcula similitud Jaccard entre categorías
   - Usa operaciones de conjunto

3. **`findSimilarProducts(targetProduct, allProducts, limit)`**
   - Encuentra productos similares usando similitud coseno
   - Retorna productos ordenados por similitud

4. **`collaborativeFiltering(userId, purchaseHistory, productData, limit)`**
   - Implementa filtrado colaborativo básico
   - Encuentra usuarios similares y sus productos

5. **`findFrequentlyBoughtTogether(purchaseHistory, targetProductId, minSupport, limit)`**
   - Análisis de canasta de mercado
   - Encuentra productos frecuentemente comprados juntos

6. **`hybridRecommendation(userId, targetProductId, data, limit)`**
   - Sistema de recomendación híbrido
   - Combina múltiples algoritmos

7. **`evaluateRecommendations(recommendations, actualPurchases)`**
   - Evalúa la calidad de las recomendaciones
   - Calcula precisión, recall y F1-score

## 🧪 Casos de Prueba

El ejercicio incluye casos de prueba para:

- ✅ Cálculo correcto de similitudes
- ✅ Productos idénticos y completamente diferentes
- ✅ Manejo de datos faltantes o vacíos
- ✅ Recomendaciones ordenadas por puntuación
- ✅ Exclusión de productos ya comprados
- ✅ Respeto a límites y soportes mínimos
- ✅ Evaluación de métricas de calidad
- ✅ Casos edge y validación de entrada

## 🎓 Aplicaciones Reales

### E-commerce
- **Amazon**: "Los clientes que compraron X también compraron Y"
- **Netflix**: Recomendaciones de películas basadas en historial
- **Spotify**: Descubrimiento de música personalizado

### Marketing
- **Cross-selling**: Vender productos complementarios
- **Up-selling**: Sugerir productos de mayor valor
- **Retención**: Mantener usuarios con recomendaciones relevantes

### Optimización
- **Inventario**: Predecir demanda de productos relacionados
- **Precios**: Ajustar precios basándose en asociaciones
- **Layout**: Organizar productos en tienda física

## 🚀 Ejercicios Adicionales

Una vez completado el ejercicio básico, puedes intentar:

1. **Implementar filtrado basado en contenido**
2. **Agregar factorización de matrices (SVD)**
3. **Implementar recomendaciones en tiempo real**
4. **Crear sistema de feedback y aprendizaje**
5. **Optimizar para grandes volúmenes de datos**
6. **Implementar recomendaciones para nuevos usuarios**

## 📊 Métricas de Evaluación

### Precisión (Precision)
- **Fórmula**: Productos recomendados correctamente / Total recomendados
- **Interpretación**: ¿Qué porcentaje de recomendaciones fueron acertadas?

### Recall (Exhaustividad)
- **Fórmula**: Productos recomendados correctamente / Total comprados
- **Interpretación**: ¿Qué porcentaje de compras fueron predichas?

### F1-Score
- **Fórmula**: 2 × (Precisión × Recall) / (Precisión + Recall)
- **Interpretación**: Media armónica entre precisión y recall

## 🔧 Consideraciones Técnicas

### Escalabilidad
- Para grandes catálogos, usar índices y caching
- Implementar algoritmos aproximados para similitud
- Usar procesamiento en lotes para actualizaciones

### Calidad de Datos
- Limpiar y normalizar características de productos
- Manejar datos faltantes apropiadamente
- Validar consistencia de categorías

### Rendimiento
- Pre-calcular similitudes para productos populares
- Usar estructuras de datos eficientes (Set, Map)
- Implementar paginación para grandes resultados

## 📖 Recursos Adicionales

- [Collaborative Filtering - Wikipedia](https://en.wikipedia.org/wiki/Collaborative_filtering)
- [Market Basket Analysis - Analytics Vidhya](https://www.analyticsvidhya.com/blog/2018/08/guide-to-market-basket-analysis/)
- [Cosine Similarity - Towards Data Science](https://towardsdatascience.com/cosine-similarity-explained-using-python-ae83321e16f9)
- [Recommendation Systems - Coursera](https://www.coursera.org/learn/recommender-systems-introduction)

## 🎯 Casos de Uso del Ejercicio

### Datos de Ejemplo
```javascript
const products = {
    'laptop': { price: 1000, rating: 4.5, weight: 2.5 },
    'mouse': { price: 25, rating: 4.2, weight: 0.1 },
    'keyboard': { price: 80, rating: 4.3, weight: 0.8 }
};

const purchaseHistory = {
    'user1': ['laptop', 'mouse', 'keyboard'],
    'user2': ['laptop', 'headphones'],
    'user3': ['mouse', 'keyboard']
};
```

### Flujo de Trabajo
1. **Calcular similitudes** entre productos
2. **Encontrar usuarios similares** al usuario objetivo
3. **Identificar productos frecuentemente comprados juntos**
4. **Combinar recomendaciones** de diferentes fuentes
5. **Evaluar calidad** de las recomendaciones

---

**¡Construye tu propio sistema de recomendación y descubre el poder del machine learning en e-commerce! 🛒✨**
