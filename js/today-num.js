document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.getElementById("title");
  const lyricEl = document.getElementById("lyric");
  const videoWrapEl = document.getElementById("video-wrap");

  // 1. 데이터 배열이 정상적으로 로드되었는지 확인
  if (typeof TODAY_NUM_DATA === "undefined" || TODAY_NUM_DATA.length === 0) {
    console.error("TODAY_NUM_DATA를 찾을 수 없거나 데이터가 비어있습니다.");
    return;
  }

  // 2. 데이터 중 무작위(랜덤)로 하나의 뮤지컬 넘버 선택
  const randomIndex = Math.floor(Math.random() * TODAY_NUM_DATA.length);
  const todayData = TODAY_NUM_DATA[randomIndex];

  // 3. HTML 텍스트 노출 (뮤지컬명 + 넘버명 / 가사)
  titleEl.textContent = `[${todayData.뮤지컬명}] ${todayData.넘버명}`;
  lyricEl.textContent = `"${todayData.가사한구절}"`;

  // 4. 유튜브 링크에서 순수 Video ID만 완벽하게 추출하는 정규식 함수
  function getYoutubeId(url) {
    if (!url) return null;
    // 일반 주소, 공유 주소, 파라미터가 붙은 주소 모두 대응하는 유튜브 정규식
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const videoId = getYoutubeId(todayData.유튜브링크);

  // 5. 비디오 주입 (오류 153 및 도메인 제한 방지 파라미터 추가)
  if (videoId) {
    videoWrapEl.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1" 
        style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    `;
  } else {
    videoWrapEl.innerHTML = `<p style="position:absolute; top:45%; width:100%; color:#fff;">영상을 불러올 수 없습니다.</p>`;
  }
});