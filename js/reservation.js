let CURRENT = [];
let PREVIOUS = [];

async function init() {

    const allData = await loadMusicals();

    CURRENT = allData.filter(
        m => Number(m.type) === 1
    );

    PREVIOUS = allData.filter(
        m => Number(m.type) === 2
    );

    startReservation();
}

function startReservation() {

    /* ---------- 캐러셀 ---------- */

    const carousel =
        document.getElementById('carousel');

    if (CURRENT.length > 0) {

        carousel.insertAdjacentHTML(
            'afterbegin',

            `<div class="carousel-track">` +

            CURRENT.map((m, i) => `
                <div
                    class="poster-card"
                    data-idx="${i}"
                >
                    <img
                        src="${m.poster}"
                        alt="${m.title}"
                    >
                </div>
            `).join('')

            +

            `</div>`
        );

        const track =
            carousel.querySelector(
                '.carousel-track'
            );

        const slideW =
            track.firstElementChild
            .offsetWidth + 24;

        let cIdx = 0;

        function move() {
            track.style.transform =
                `translateX(${-cIdx * slideW}px)`;
        }

        function next() {
            cIdx =
                (cIdx + 1)
                % CURRENT.length;

            move();
        }

        function prev() {
            cIdx =
                (cIdx - 1 + CURRENT.length)
                % CURRENT.length;

            move();
        }

        let timer =
            setInterval(next, 2000);

        document
            .getElementById('nextBtn')
            .addEventListener(
                'click',
                () => {

                    clearInterval(timer);

                    next();

                    timer =
                        setInterval(
                            next,
                            3500
                        );
                }
            );

        document
            .getElementById('prevBtn')
            .addEventListener(
                'click',
                () => {

                    clearInterval(timer);

                    prev();

                    timer =
                        setInterval(
                            next,
                            3500
                        );
                }
            );

    }

    /* ---------- 그리드 ---------- */

    const gridNow =
        document.getElementById('grid');

    const gridPrev =
        document.getElementById(
            'prev-grid'
        );

    function makeGrid(
        arr,
        target
    ) {

        target.innerHTML =
            arr.map((m, i) => `

                <li
                    class="card"
                    data-type="${target.id}"
                    data-idx="${i}"
                >

                    <img
                        src="${m.poster}"
                        alt="${m.title}"
                    >

                    <p>${m.title}</p>

                </li>

            `).join('');
    }

    makeGrid(
        CURRENT,
        gridNow
    );

    makeGrid(
        PREVIOUS,
        gridPrev
    );

    /* ---------- 모달 ---------- */

    const modal =
        document.getElementById(
            'm-modal'
        );

    const mClose =
        document.getElementById(
            'm-close'
        );

    const mPoster =
        document.getElementById(
            'm-poster'
        );

    const mTitle =
        document.getElementById(
            'm-title'
        );

    const mPeriod =
        document.getElementById(
            'm-period'
        );

    const mVenue =
        document.getElementById(
            'm-venue'
        );

    const mCast =
        document.getElementById(
            'm-cast'
        );

    const mSynop =
        document.getElementById(
            'm-synop'
        );

    const mLink =
        document.getElementById(
            'm-link'
        );

    function openModal(d) {

        mPoster.src = d.poster;

        mPoster.alt = d.title;

        mTitle.textContent =
            d.title;

        mPeriod.textContent =
            `기간 : ${d.period}`;

        mVenue.textContent =
            `공연장 : ${d.venue}`;

        mCast.textContent =
            `출연진 : ${d.cast}`;

        mSynop.textContent =
            d.synop;

        mLink.href =
            d.link;

        modal.classList.add(
            'show'
        );
    }

    function closeModal() {

        modal.classList.remove(
            'show'
        );
    }

    mClose.addEventListener(
        'click',
        closeModal
    );

    modal.addEventListener(
        'click',
        e => {

            if (
                e.target === modal
            ) {

                closeModal();

            }

        }
    );

    window.addEventListener(
        'keydown',
        e => {

            if (
                e.key === 'Escape'
            ) {

                closeModal();

            }

        }
    );

    /* ---------- 카드 클릭 ---------- */

    document.body.addEventListener(
        'click',
        e => {

            const card =
                e.target.closest(
                    '.poster-card, .card'
                );

            if (!card)
                return;

            const list =

                card.dataset.type
                === 'prev-grid'

                    ? PREVIOUS
                    : CURRENT;

            const data =
                list[
                    Number(
                        card.dataset.idx
                    )
                ];

            if (!data)
                return;

            openModal(data);

        }
    );

    /* ---------- 최애 뮤지컬 ---------- */

    document
        .getElementById(
            'toggle-prev'
        )
        .addEventListener(
            'click',
            e => {

                const show =

                    gridPrev
                        .style
                        .display

                    === 'none';

                gridPrev.style.display =

                    show
                        ? 'grid'
                        : 'none';

                e.target.textContent =

                    show
                        ? '접기'
                        : '보기';

            }
        );
}

init();