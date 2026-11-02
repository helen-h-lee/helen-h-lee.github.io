const copy = portfolioContent;

const languageStorageKey = 'portfolio-language';
let lang = 'ko';

// Storage can be disabled by browser privacy settings.
try {
  const savedLanguage = localStorage.getItem(languageStorageKey);
  if (Object.hasOwn(copy, savedLanguage)) lang = savedLanguage;
} catch {
  // Keep the default language when storage is unavailable.
}
const routes = ['home', 'activities', 'credentials', 'profile'];
const main = document.querySelector('#main');

// 콘텐츠는 HTML이 아닌 일반 텍스트로 표시합니다.
function escapeContent(value) {
  if (Array.isArray(value)) return value.map(escapeContent);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, escapeContent(item)]),
    );
  }
  if (typeof value !== 'string') return value;
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character],
  );
}

function koreanDateKey(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const value = (type) => parts.find((part) => part.type === type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

function certificateSection(records, expired = false) {
  const en = lang === 'en';
  const title = expired
    ? en
      ? 'Past qualifications'
      : '지난 자격 이력'
    : en
      ? 'Certifications'
      : '자격증';
  return `
    <section class="credential-group">
      <h2 class="category-heading">${title}</h2>
      ${
        records.length
          ? records
              .map(
                (record) => `
        <article class="record">
          <span class="date">${en ? 'Acquired' : '취득일'}<br><time datetime="${record.acquired}">${record.acquired}</time></span>
          <div>
            <h3>${escapeContent(record.name[lang])} · ${escapeContent(record.grade[lang])}</h3>
            <p>${escapeContent(record.issuer[lang])}</p>
            <p class="certificate-validity">${
              record.expires
                ? `${expired ? (en ? 'Expired' : '만료') : en ? 'Valid through' : '유효기간'} · <time datetime="${record.expires}">${record.expires}</time>`
                : en
                  ? 'No expiration date'
                  : '유효기간 없음'
            }</p>
            <div class="certificate-documents">${record.documents
              .map(
                (doc) => `
              <a href="${encodeURI(doc.path)}" target="_blank" rel="noopener noreferrer">${escapeContent(doc.label[lang])} ↗ <span class="small">PDF</span></a>
            `,
              )
              .join('')}</div>
          </div>
          <span class="certificate-status">${expired ? (en ? 'Expired' : '만료') : en ? 'Valid' : '유효'}</span>
        </article>
      `,
              )
              .join('')
          : `<p class="muted">${en ? 'No qualifications listed.' : '등록된 자격증이 없습니다.'}</p>`
      }
    </section>
  `;
}

function awardSection() {
  const en = lang === 'en';
  return `
    <section class="credential-group" aria-labelledby="awards-heading">
      <h2 id="awards-heading" class="category-heading">${en ? 'Awards' : '수상'}</h2>
      <div class="award-groups">${['internal', 'external']
        .map((category) => {
          const records = portfolioAwards.filter((award) => award.category === category);
          const heading =
            category === 'internal'
              ? en
                ? 'On-campus awards'
                : '교내 수상'
              : en
                ? 'External awards'
                : '교외 수상';
          return `
          <section class="award-group" aria-labelledby="awards-${category}">
            <h3 id="awards-${category}" class="category-heading">${heading}</h3>
            ${
              records.length
                ? records
                    .map(
                      (award) => `
              <article class="record">
                <span class="date">${escapeContent(award.period[lang])}</span>
                <div>
                  <h4 class="award-title">${escapeContent(award.title[lang])}</h4>
                  <p>${escapeContent(award.prize[lang])}</p>
                </div>
              </article>
            `,
                    )
                    .join('')
                : `<p class="muted">${en ? 'No awards listed yet.' : '등록된 수상 이력이 없습니다.'}</p>`
            }
          </section>
        `;
        })
        .join('')}</div>
    </section>
  `;
}

let pageEntranceAnimation;

function setupExpandableRecords() {
  const candidates = main.querySelectorAll('.activity-group, .credential-group .record');
  candidates.forEach((record) => {
    const heading = record.querySelector('h2, h3, h4');
    if (!heading) return;

    const details = document.createElement('details');
    details.className = 'expandable-record';
    const summary = document.createElement('summary');
    const title = document.createElement('span');
    title.className = 'expandable-title';
    title.textContent = heading.textContent;
    const action = document.createElement('span');
    action.className = 'expandable-action';
    summary.append(title, action);
    const body = document.createElement('div');
    body.className = 'expandable-body';

    heading.remove();
    record.querySelector('.activity-heading')?.remove();
    record.querySelectorAll('.index').forEach((index) => index.remove());
    record.replaceWith(details);
    body.append(record);
    details.append(summary, body);

    let pinned = false;
    let preview = false;
    let expanded = false;
    let expansionAnimation;
    const setExpanded = (next) => {
      expanded = next;
      const fromHeight = details.getBoundingClientRect().height;
      expansionAnimation?.cancel();
      details.style.height = '';
      details.open = true;
      const toHeight = next ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + 1;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion || typeof details.animate !== 'function') {
        details.open = next;
        updateLabel();
        return;
      }
      details.style.overflow = 'hidden';
      expansionAnimation = details.animate(
        [{ height: `${fromHeight}px` }, { height: `${toHeight}px` }],
        { duration: 300, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
      );
      expansionAnimation.onfinish = () => {
        details.open = expanded;
        details.style.overflow = '';
        expansionAnimation = undefined;
      };
      updateLabel();
    };
    const updateLabel = () => {
      action.textContent = expanded
        ? (lang === 'en' ? 'Close −' : '접기 −')
        : (lang === 'en' ? 'Details +' : '자세히 보기 +');
    };
    details.addEventListener('toggle', updateLabel);
    details.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover)').matches) return;
      if (!expanded) {
        preview = true;
        setExpanded(true);
      }
    });
    details.addEventListener('pointerleave', () => {
      if (preview && !pinned && !details.contains(document.activeElement)) setExpanded(false);
      preview = false;
    });
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      if (preview && !pinned) {
        pinned = true;
        preview = false;
        setExpanded(true);
      } else {
        pinned = !expanded;
        setExpanded(pinned);
      }
      updateLabel();
    });
    updateLabel();
  });
}

function animatePageEntrance() {
  pageEntranceAnimation?.cancel();
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    typeof main.animate !== 'function'
  )
    return;

  pageEntranceAnimation = main.animate(
    [
      { opacity: 0, transform: 'translateY(5px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 420, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
  );
}

function render(animate = true) {
  const t = escapeContent(copy[lang]);
  const requestedPage = location.hash.slice(1) || 'home';
  const page = routes.includes(requestedPage) ? requestedPage : 'not-found';
  document.documentElement.lang = lang;
  document.querySelector('#nav').innerHTML = routes
    .map((r, i) => `<a href="#${r}" ${page === r ? 'aria-current="page"' : ''}>${t.nav[i]}</a>`)
    .join('');
  document.querySelectorAll('[data-lang]').forEach((b) => {
    b.classList.toggle('active', b.dataset.lang === lang);
    b.setAttribute('aria-pressed', b.dataset.lang === lang);
  });
  document.querySelector('#draft').textContent = copy[lang].draft;
  const contact = `<section class="contact"><p class="eyebrow">CONTACT</p><p class="email">${t.email}</p><div class="contact-links"><span>GitHub ↗</span><span>LinkedIn ↗</span></div><p class="placeholder">${t.contactNote}</p></section>`;
  if (page === 'home')
    main.innerHTML = `<section class="hero"><p class="eyebrow">PERSONAL ARCHIVE</p><h1>PORTFOLIO</h1></section><div class="home-profile"><section><h2>${t.name}</h2><p>${t.student}</p><p class="muted">${t.school}</p><p class="muted small">${t.intro}</p></section>${contact}</div>`;
  else if (page === 'profile')
    main.innerHTML = `<section class="page-heading"><p class="eyebrow">PERSONAL ARCHIVE / 03</p><h1>PROFILE</h1><p>${t.profile}</p></section><section class="profile-grid"><div><h2>${t.name}</h2><p>${t.student}</p><p class="muted">${t.intro}</p></div><dl>${t.labels.map((x, i) => `<div><dt>${x}</dt><dd>${t.values[i]}</dd></div>`).join('')}</dl></section>`;
  else if (page === 'not-found') {
    main.innerHTML = `
      <section class="page-heading">
        <p class="eyebrow">PAGE NOT FOUND</p>
        <h1>404</h1>
        <p>${t.notFound}</p>
      </section>
      <section class="not-found">
        <p>${t.notFoundDescription}</p>
        <a class="back-home" href="#home">${t.backHome} →</a>
      </section>
    `;
  } else if (page === 'credentials') {
    const today = koreanDateKey();
    const active = portfolioCertificates.filter(
      (record) => !record.expires || record.expires >= today,
    );
    const expired = portfolioCertificates.filter(
      (record) => record.expires && record.expires < today,
    );
    main.innerHTML = `
      <section class="page-heading">
        <p class="eyebrow">PERSONAL ARCHIVE / 02</p>
        <h1>CREDENTIALS</h1>
        <p>${t.credentials}</p>
      </section>
      <div class="credential-groups">
        ${certificateSection(active)}
        ${expired.length ? certificateSection(expired, true) : ''}
        ${awardSection()}
        ${t.certs
          .slice(2)
          .map((item, offset) => {
            const index = offset + 2;
            return `
          <section class="credential-group" aria-labelledby="credential-${index}">
            <h2 id="credential-${index}" class="category-heading">${t.categories[index]}</h2>
            <article class="record">
              <span class="date">${t.credentialDates[index]}</span>
              <div><h3>${item[0]}</h3><p>${item[1]}</p></div>
              <span class="index">0${index + 1}</span>
            </article>
          </section>
        `;
          })
          .join('')}
      </div>
    `;
  } else {
    const items = page === 'activities' ? t.items : t.certs;
    main.innerHTML = `
      <section class="page-heading">
        <p class="eyebrow">PERSONAL ARCHIVE / 01</p>
        <h1>ACTIVITIES</h1>
        <p>${t.activities}</p>
      </section>
      <section class="records activity-list">
        ${items.map((item, index) => `
          <article class="activity-group">
            <div class="activity-heading">
              <h2>${item.title}</h2>
              <span class="index">${String(index + 1).padStart(2, '0')}</span>
            </div>
            <div class="record">
              <span class="date">${item.date}</span>
              <div>
              <p class="activity-role">${item.role}</p>
              <p>${item.description}</p>
              </div>
            </div>
          </article>
        `).join('')}
      </section>
    `;
  }
  const original = copy[lang];
  document.title = `${page === 'not-found' ? `404 · ${original.notFound}` : original.nav[routes.indexOf(page)]} — ${original.name}`;
  setupExpandableRecords();
  if (animate) animatePageEntrance();
}
document.querySelectorAll('[data-lang]').forEach((b) =>
  b.addEventListener('click', () => {
    lang = b.dataset.lang;
    try {
      localStorage.setItem(languageStorageKey, lang);
    } catch {
      // Language switching still works for the current visit.
    }
    render();
  }),
);
window.addEventListener('hashchange', () => {
  render();
  window.scrollTo(0, 0);
});
render();

// 열린 탭도 한국 날짜가 바뀌면 만료 상태를 갱신합니다.
let lastCertificateDate = koreanDateKey();
setInterval(() => {
  const today = koreanDateKey();
  if (today !== lastCertificateDate) {
    lastCertificateDate = today;
    render(false);
  }
}, 60000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) render(false);
});

