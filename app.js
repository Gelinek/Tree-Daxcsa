let currentNode = null;
let parentStack = [];

function createNode(person, isRoot = false) {
  const node = document.createElement('div');
  node.className = 'node';
  node.innerHTML = `<strong>${person.full_name}</strong><br><small>${person.username || ''}</small>`;

  node.onclick = (e) => {
    e.stopPropagation();

    if (person.children && person.children.length > 0 && !isRoot) {
      parentStack.push(currentNode);
      currentNode = person;
      renderTree(person);
    }
    showDetails(person);
  };

  return node;
}

function showDetails(person) {
  const el = document.getElementById('details');
  el.style.display = 'block';

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
      showDetails(currentNode);
    };
  }
}

function renderTree(node) {
//   const containerWrapper = document.getElementById('tree-container').parentElement;
//   containerWrapper.style.marginLeft = '0px'; // restablecer margen a cero

  const container = document.getElementById('tree-container');
  container.className = 'tree-wrapper';
  container.innerHTML = '';

  const level0 = document.createElement('div');
  level0.className = 'level';
  // nivel raíz sin margen individual; usa clases CSS // empuja ligeramente a la derecha
  level0.appendChild(createNode(node, true));
  container.appendChild(level0);

  const children = node.children || [];
  if (children.length > 0) {
    const level1 = document.createElement('div');
    level1.className = 'level1';
    level1.classList.add('level1-responsive');

    children.forEach((child, index) => {
      const childWrapper = document.createElement('div');
      childWrapper.className = 'child-wrapper';
      childWrapper.classList.add(child.binary_placement === 'Left' ? 'align-left' : 'align-right');
      if (children.length === 1) {
        childWrapper.style.marginLeft = child.binary_placement === 'Left' ? '-100px' : '100px';
      }
      childWrapper.classList.add('child-box');

      const childNode = createNode(child);
      childWrapper.appendChild(childNode);

      const grandChildren = child.children || [];
      if (grandChildren.length > 0) {
        const grupoNietos = document.createElement('div');
        grupoNietos.className = 'grupos-nietos';
        grupoNietos.classList.add('nietos-box');

        const leftGroup = document.createElement('div');
        leftGroup.className = 'grupo left';

        const rightGroup = document.createElement('div');
        rightGroup.className = 'grupo right';

        grandChildren.forEach(gc => {
          const gcNode = createNode(gc);
          gcNode.classList.add(gc.binary_placement?.toLowerCase() || '');
          if (gc.binary_placement === 'Left') {
            leftGroup.appendChild(gcNode);
          } else {
            rightGroup.appendChild(gcNode);
          }
        });

        grupoNietos.appendChild(leftGroup);
        grupoNietos.appendChild(rightGroup);
        childWrapper.appendChild(grupoNietos);
      }

      level1.appendChild(childWrapper);
    });

    container.appendChild(level1);
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
