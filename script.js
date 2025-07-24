let allData = [];

// ▶ parent로 높이 정보를 보내는 헬퍼 함수
function updateHeight() {
  const height = document.body.scrollHeight;
  window.parent.postMessage(
    { type: 'setHeight', height },
    '*'  // 필요하다면 부모 origin으로 제한하세요
  );
}

async function loadData() {
  const res = await fetch('data.json');
  allData = await res.json();
  renderTable(allData);
  updateHeight(); // 초기 로드 후 한 번 전송
}

function renderTable(data) {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const wrapper = document.getElementById('tableWrapper');
  const body = document.getElementById('resultBody');

  body.innerHTML = '';

  // 1) 검색어가 없으면 숨기기
  if (keyword.trim() === '') {
    wrapper.classList.remove('active');
    updateHeight();
    return;
  }

  // 2) 필터링
  const filtered = data.filter(item =>
    Object.values(item).some(
      val => val && val.toString().toLowerCase().includes(keyword)
    )
  );

  // 3) 결과 없으면 ‘검색 결과가 없습니다’ 표시
  if (filtered.length === 0) {
    wrapper.classList.add('active');
    body.innerHTML = `<tr><td colspan="7">🔍 검색 결과가 없습니다.</td></tr>`;
    updateHeight();
    return;
  }

  // 4) 결과 있으면 테이블에 렌더
  wrapper.classList.add('active');
  filtered.forEach(item => {
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
  });
  updateHeight();
}

// ▶ 검색어 입력 시마다 다시 렌더 + 높이 갱신
document.getElementById('searchInput')
  .addEventListener('input', () => renderTable(allData));

loadData();


<script>
  // 페이지 로드 직후 <head>에 스타일 추가
  window.addEventListener('DOMContentLoaded', () => {
    const css = `
      .notion-collection .notion-collection-card .notion-collection-card-image img {
        width: 100% !important;
        height: auto !important;
        object-fit: contain !important;
        object-position: center center !important;
      }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  });
</script>
