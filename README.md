# 🌳 Árbol Genealógico de Distribuidores Daxcsa / Daxcsa Distributor Tree

Este proyecto visualiza jerárquicamente la red de distribuidores (padre, hijos, nietos) a partir de un archivo JSON estructurado.  
This project visually displays the hierarchical network of distributors (parent, children, grandchildren) based on a structured JSON file.

---

## 🚀 ¿Qué hace este proyecto? / What does this project do?

- Visualización de jerarquía de distribuidores (padre → hijos → nietos)  
  Displays distributor hierarchy (parent → children → grandchildren)
- Muestra detalles del nodo al hacer clic  
  Shows node details on click
- Permite navegación entre generaciones  
  Enables navigation across generations
- Diseño responsive: se adapta a móviles y escritorio  
  Responsive design: adapts to mobile and desktop

---

## 📁 Estructura del Proyecto / Project Structure

├── index.html # Página principal / Main HTML
├── app.js # Lógica JS para renderizar el árbol / JS logic for rendering
├── style.css # Estilos generales / General styles


---

## 📦 ¿Cómo usarlo? / How to use it?

1. Abre `index.html` en tu navegador  
   Open `index.html` in your browser
2. Haz clic en "📁 Insertar archivo JSON"  
   Click on "📁 Insert JSON file"
3. Selecciona tu archivo JSON con la estructura adecuada  
   Select your properly structured JSON file
4. El árbol se renderizará automáticamente  
   The tree will render automatically

---

## 📐 Formato del JSON / JSON Format

```json
{
  "data": {
    "attributes": [
      {
        "full_name": "Padre",
        "username": "padre1",
        "status": "Activo",
        "product_name": "Producto A",
        "category_name": "Categoría 1",
        "binary_placement": "Root",
        "children": [
          {
            "full_name": "Hijo Izquierdo",
            "binary_placement": "Left",
            "children": [
              {
                "full_name": "Nieto",
                "binary_placement": "Left"
              }
            ]
          },
          {
            "full_name": "Hijo Derecho",
            "binary_placement": "Right"
          }
        ]
      }
    ]
  }
}
