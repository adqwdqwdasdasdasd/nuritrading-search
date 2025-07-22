let allData = [];

async function loadData() {
  const res = await fetch('data.json');
  allData = await res.json();
  renderTable(allData);
}

function renderTable(data) {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const table = document.getElementById('resultTable');
  const body = document.getElementById('resultBody');
  body.innerHTML = '';

  const filtered = data.filter(item =>
    item.품목 && item.품목.toLowerCase().includes(keyword)
  );

  if (keyword.trim() === '') {
    table.style.display = 'none';
    return;
  }

  table.style.display = 'table';

  if (filtered.length === 0) {
    body.innerHTML = `<tr><td colspan="5">🔍 검색 결과가 없습니다.</td></tr>`;
    return;
  }

  for (const item of filtered) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.품목 || ''}</td>
      <td>${item.원산지 || ''}</td>
      <td>${item.단가 || ''}</td>
      <td>${item.브랜드 || ''}</td>
      <td><img src="${item.제품사진 || ''}" alt="이미지" /></td>
    `;
    body.appendChild(row);
  }
}

document.getElementById('searchInput').addEventListener('input', () => {
  renderTable(allData);
});

loadData();