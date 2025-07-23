let allData = [];

async function loadData() {
  const res = await fetch('data.json');
  allData = await res.json();
  renderTable(allData);
  sendHeight(); // 최초 로드 시 높이 전송
}

function renderTable(data) {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const table = document.getElementById('resultTable');
  const wrapper = document.getElementById('tableWrapper');
  const body = document.getElementById('resultBody');
  body.innerHTML = '';

  if (keyword.trim() === '') {
    wrapper.classList.remove('active');
    sendHeight();
    return;
  }

  const filtered = data.filter(item =>
    Object.values(item).some(
      val => val && val.toString().toLowerCase().includes(keyword)
    )
  );

  wrapper.classList.add('active');

  if (filtered.length === 0) {
    body.innerHTML = `<tr><td colspan="7">🔍 검색 결과가 없습니다.</td></tr>`;
  } else {
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

  sendHeight();
}

function sendHeight() {
  setTimeout(() => {
    window.parent.postMessage({
      type: 'setHeight',
      height: document.documentElement.scrollHeight
    }, '*');
  }, 50); // 약간의 딜레이로 레이아웃 렌더링 완료 후 높이 계산
}

document.getElementById('searchInput').addEventListener('input', () => {
  renderTable(allData);
});

loadData();
