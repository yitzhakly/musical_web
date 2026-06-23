
const CHO_LIST = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const CHO_MAP  = { 'ㄲ':'ㄱ','ㄸ':'ㄷ','ㅃ':'ㅂ','ㅆ':'ㅅ','ㅉ':'ㅈ' };
const PER_PAGE = 20;

const list     = document.getElementById('glossary');
const search   = document.getElementById('search');
const tabs     = document.querySelectorAll('#alpha button');
const prevBtn  = document.getElementById('prev');
const nextBtn  = document.getElementById('next');
const pageInfo = document.getElementById('page-info');

let curPrefix = 'all', curText = '', curPage = 1, totalPages = 1;

function getPrefix(str){
  const ch = str.trim().charAt(0);
  const code = ch.charCodeAt(0);
  if (code >= 0xAC00 && code <= 0xD7A3){
    const idx  = Math.floor((code - 0xAC00) / 588);
    const cho  = CHO_LIST[idx];
    return CHO_MAP[cho] || cho;
  }
  return ch.toUpperCase();
}

function filterTerms(){
  return TERMS.filter(({term}) => {
           const byTxt = term.toLowerCase().includes(curText.toLowerCase());
           const byPre = curPrefix === 'all' ? true
                           : getPrefix(term) === curPrefix;
           return byTxt && byPre;
         })
         .sort((a,b) => a.term.localeCompare(b.term,'ko'));
}

function render(){
  const filtered = filterTerms();
  totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  curPage    = Math.min(curPage, totalPages);

  const start = (curPage - 1) * PER_PAGE;
  const view  = filtered.slice(start, start + PER_PAGE);

  list.innerHTML = '';
  view.forEach(({term,def}) => {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = term;
    dd.textContent = def;
    list.appendChild(dt);
    list.appendChild(dd);
  });

  prevBtn.disabled = curPage === 1;
  nextBtn.disabled = curPage === totalPages;
  pageInfo.textContent = `${curPage} / ${totalPages}`;
}

render();

/* ─── 이벤트 ───────────────────────────── */
search.addEventListener('input', e => {
  curText = e.target.value.trim();
  curPage = 1;
  render();
});

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    curPrefix = btn.dataset.prefix;
    curPage = 1;
    render();
  });
});

prevBtn.addEventListener('click', () => {
  if (curPage > 1){ curPage--; render(); }
});
nextBtn.addEventListener('click', () => {
  if (curPage < totalPages){ curPage++; render(); }
});

/* 토글(펼치기) */
list.addEventListener('click', e => {
  if (e.target.tagName !== 'DT') return;
  e.target.classList.toggle('open');
  const dd = e.target.nextElementSibling;
  dd.style.maxHeight = dd.style.maxHeight ? '' : dd.scrollHeight + 'px';
});
