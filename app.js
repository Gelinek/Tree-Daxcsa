let currentNode = null;
let parentStack = [];

function createNode(person, isRoot = false) {
  const node = document.createElement('div');
  node.className = 'node';
  node.innerHTML = `<strong>${person.full_name}</strong><br><small>${person.username}</small>`;

  node.onclick = (e) => {
    e.stopPropagation();
    showDetails(person);

    if (person.children && person.children.length > 0) {
      parentStack.push(currentNode);
      currentNode = person;
      renderTree(person);
    }
  };

  return node;
}

function showDetails(person) {
  const el = document.getElementById('details');
  el.innerHTML = `
    <h3>Details</h3>
    <p><strong>Name:</strong> ${person.full_name}</p>
    <p><strong>User:</strong> ${person.username}</p>
    <p><strong>Status:</strong> ${person.status}</p>
    <p><strong>Product:</strong> ${person.product_name ?? 'N/A'}</p>
    <p><strong>Category:</strong> ${person.category_name ?? 'N/A'}</p>
    ${parentStack.length > 0 ? '<button id="btnBack">⬅️ Back</button>' : ''}
  `;

  const btnBack = document.getElementById('btnBack');
  if (btnBack) {
    btnBack.onclick = () => {
      currentNode = parentStack.pop();
      renderTree(currentNode);
      showDetails(currentNode); // Actualizar detalles al regresar
    };
  }
}


function renderTree(node) {
  const container = document.getElementById('tree-container');
  container.innerHTML = '';

  // Nivel 0: nodo raíz actual
  const level0 = document.createElement('div');
  level0.className = 'level';
  level0.appendChild(createNode(node, true));
  container.appendChild(level0);

  // Nivel 1: hijos del nodo actual
  const children = node.children || [];
  if (children.length > 0) {
    const level1 = document.createElement('div');
    level1.className = 'level';

    children.forEach(child => {
      level1.appendChild(createNode(child));
    });

    container.appendChild(level1);

    // Nivel 2: nietos (hijos de cada hijo)
    const level2 = document.createElement('div');
    level2.className = 'level';

    children.forEach(child => {
      const grandChildren = child.children || [];
      grandChildren.forEach(grandChild => {
        level2.appendChild(createNode(grandChild));
      });
    });

    container.appendChild(level2);
  }
}

document.getElementById('jsonFileInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const contents = e.target.result;
    try {
      const json = JSON.parse(contents);
      currentNode = json.data.attributes[0];
      parentStack = [];
      renderTree(currentNode);
      document.getElementById('details').innerHTML = '';
      document.getElementById('jsonFileInput').value = '';

    } catch (err) {
      alert("Error al cargar el JSON: " + err.message);
    }
  };
  reader.readAsText(file);
});
