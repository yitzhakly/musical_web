document.addEventListener('DOMContentLoaded', async () => {

  const theaters = await loadTheaters();

  const map = L.map('map').setView(
      [37.5665, 126.9780],
      11
  );

  L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
          attribution: '&copy; OpenStreetMap'
      }
  ).addTo(map);

  const cluster = L.markerClusterGroup();

  function drawMarkers(keyword = '') {

      cluster.clearLayers();

      let count = 0;

      theaters.forEach(t => {

          if (!t.lat || !t.lng) return;

          if (
              keyword &&
              !t.name.includes(keyword)
          ) return;

          count++;

          const marker = L.marker([
              Number(t.lat),
              Number(t.lng)
          ]);

          marker.bindPopup(`
            <div style="width:250px">
        
                <h3 style="margin-bottom:10px;">
                    ${t.name}
                </h3>
        
                <p>
                    📍 ${t.addr}
                </p>
        
                <div style="
                    display:flex;
                    gap:10px;
                    flex-wrap:wrap;
                ">
        
                    <a
                        href="${t.home}"
                        target="_blank"
                    >
                        홈페이지
                    </a>
        
                    <a href="theaters.html">
                        시야정보
                    </a>
        
                </div>
        
            </div>
        `);

          cluster.addLayer(marker);

      });

      map.addLayer(cluster);

      document.getElementById(
          'count-info'
      ).textContent =
          `총 ${count}개 극장`;

  }

  drawMarkers();

  document
      .getElementById('map-search')
      .addEventListener('input', e => {

          drawMarkers(
              e.target.value.trim()
          );

      });

  document
      .getElementById('reset-map')
      .addEventListener('click', () => {

          map.setView(
              [37.5665, 126.9780],
              11
          );

      });

});