let allData = [];

async function loadData() {
  const res = await fetch('data.json');
  allData = await res.json();
  renderTable(allData);
  sendHeight(); // 초기 높이 전달
}

function renderTable(data) {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const wrapper = document.getElementById('tableWrapper');
  const body = document.getElementById('resultBody');
  body.innerHTML = '';

  if (keyword.trim() === '') {
    wrapper.classList.remove('active'); // 숨기기
    sendHeight(); // 높이 재전송
    return;
  }

  const filtered = data.filter(item =>
    Object.values(item).some(
      val => val && val.toString().toLowerCase().includes(keyword)
    )
  );

  wrapper.classList.add('active');

  if (filtered.length === 0) {
    body.innerHTML = '<tr><td colspan="7">🔍 검색 결과가 없습니다.</td></tr>';
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

  sendHeight(); // 변경 후 높이 전달
}

function sendHeight() {
  setTimeout(() => {
    const h = document.documentElement.scrollHeight;
    console.log("Sending height to parent:", h);
    window.parent.postMessage({
      type: 'setHeight',
      height: h
    }, '*');
  }, 50);
}

document.getElementById('searchInput').addEventListener('input', () => {
  renderTable(allData);
});

loadData();
