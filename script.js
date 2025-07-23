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

  if (keyword.trim() === '') {
    table.style.display = 'none';
    return;
  }

  const filtered = data.filter(item =>
    Object.values(item).some(
      val => val && val.toString().toLowerCase().includes(keyword)
    )
  );

  table.style.display = 'table';

  if (filtered.length === 0) {
    body.innerHTML = `<tr><td colspan="7">🔍 검색 결과가 없습니다.</td></tr>`;
    return;
  }

  for (const item of filtered) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.품목 || ''}</td>
      <td>${item.원산지 || ''}</td>
      <td>${item.중량 || ''}</td>
      <td>${item.규격 || ''}</td>
      <td>${item.단가 || ''}</td>
      <td>${item.창고 || ''}</td>
      <td>${item.브랜드 || ''}</td>
    `;
    body.appendChild(row);
  }
}

document.getElementById('searchInput').addEventListener('input', () => {
  renderTable(allData);
});

loadData();
