/* ============================================================
   app.js — вся логика сайта: состояние, роутинг между
   страницами, рендер сайдбара/страниц, обработчики событий,
   вход администратора и панель редактирования.
   Подключается после data.js и i18n.js (см. index.html).
   ============================================================ */

/* ---------- global state (в памяти вкладки, без localStorage) ---------- */
let currentLang = 'pl';
let currentRoute = ROUTES[0].id;
let currentVehicleFilter = 'all';
let currentPage = 'home';
let homeTab = 'planner';
let favoriteIds = new Set();
let mapImageDataUrl = null;
let theme = 'dark';

const ADMIN_USER = 'RUBERS_SQ';
const ADMIN_PASSWORD = 'leksika326';
let isAdmin = false;
let loginError = false;

let adminTab = 'lines';           // lines | notices | faults | pages
let editor = null;                // {kind:'route'|'notice'|'fault', origId, data, lang}

function t(key){ return (I18N[key] && I18N[key][currentLang]) || (I18N[key] && I18N[key].en) || key; }
function vehicleLabel(type){ return type==='tram' ? t('vehicleTram') : type==='trolleybus' ? t('vehicleTrolleybus') : t('vehicleBus'); }
function tField(obj){
  if (typeof obj === 'string') return obj;
  return obj[currentLang] || obj.en || Object.values(obj)[0] || '';
}
function stopName(id){
  const s = STOPS.find(x=>x.id===id);
  return s ? s.name : id; // если это старая запись с готовым текстом — покажем как есть
}
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ---------- icons ---------- */
function vehicleIcon(type, cls){
  cls = cls || 'vicon';
  if(type==='tram'){
    return `<svg class="${cls}" viewBox="0 0 22 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="11" y1="2" x2="11" y2="8"/><line x1="6" y1="3" x2="16" y2="3"/><rect x="3" y="8" width="16" height="10" rx="2"/><circle cx="7" cy="20.5" r="1.6" fill="currentColor" stroke="none"/><circle cx="15" cy="20.5" r="1.6" fill="currentColor" stroke="none"/></svg>`;
  }
  if(type==='trolleybus'){
    return `<svg class="${cls}" viewBox="0 0 22 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="8" y1="8" x2="4" y2="2"/><line x1="14" y1="8" x2="18" y2="2"/><rect x="3" y="8" width="16" height="10" rx="2"/><circle cx="7" cy="20.5" r="1.6" fill="currentColor" stroke="none"/><circle cx="15" cy="20.5" r="1.6" fill="currentColor" stroke="none"/></svg>`;
  }
  return `<svg class="${cls}" viewBox="0 0 22 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="16" height="12" rx="2.5"/><line x1="3" y1="11" x2="19" y2="11"/><circle cx="7" cy="20.5" r="1.6" fill="currentColor" stroke="none"/><circle cx="15" cy="20.5" r="1.6" fill="currentColor" stroke="none"/></svg>`;
}
const ICONS = {
  home:  `<svg class="nicon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9.5L10 3l7 6.5"/><path d="M5 8.5V17h10V8.5"/></svg>`,
  list:  `<svg class="nicon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="4" y1="5" x2="16" y2="5"/><line x1="4" y1="10" x2="16" y2="10"/><line x1="4" y1="15" x2="16" y2="15"/></svg>`,
  compass:`<svg class="nicon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="7.2"/><path d="M12.6 7.4l-1.6 4-4 1.6 1.6-4z"/></svg>`,
  map:   `<svg class="nicon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 4L3 5.6v10.8L7 15M7 4l6 1.6M7 4v11m6-9.4l4-1.6v10.8l-4 1.6m0-10.8v10.8m0-10.8L7 15m6 .8l-6-1.8"/></svg>`,
  star:  `<svg class="nicon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 3l2.1 4.4 4.9.6-3.6 3.4.9 4.8L10 13.9l-4.3 2.3.9-4.8-3.6-3.4 4.9-.6z"/></svg>`,
  bell:  `<svg class="nicon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8a4 4 0 018 0c0 3.6 1.2 4.6 1.2 4.6H4.8S6 11.6 6 8z"/><path d="M8.4 15a1.7 1.7 0 003.2 0"/></svg>`,
  warn:  `<svg class="nicon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 3.5L17.5 16h-15z"/><line x1="10" y1="8" x2="10" y2="11.5"/><circle cx="10" cy="13.6" r="0.9" fill="currentColor" stroke="none"/></svg>`,
  phone: `<svg class="nicon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h2.5l1 3-1.6 1.4a9 9 0 004.7 4.7l1.4-1.6 3 1V15c0 1-.9 1.7-1.9 1.5C8.9 15.6 4.4 11.1 3.5 6.9 3.3 5.9 4 5 5 5z"/></svg>`,
  ticket:`<svg class="nicon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8a2 2 0 000 4v2.5A1.5 1.5 0 004.5 16h11a1.5 1.5 0 001.5-1.5V12a2 2 0 000-4V6.5A1.5 1.5 0 0015.5 5h-11A1.5 1.5 0 003 6.5z"/><line x1="10" y1="5" x2="10" y2="16" stroke-dasharray="2 2"/></svg>`,
  gear:  `<svg class="nicon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="2.6"/><path d="M10 3.5v2M10 14.5v2M3.5 10h2M14.5 10h2M5.4 5.4l1.4 1.4M13.2 13.2l1.4 1.4M14.6 5.4l-1.4 1.4M6.8 13.2l-1.4 1.4"/></svg>`,
  search:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16"><circle cx="9" cy="9" r="5.5"/><line x1="13.2" y1="13.2" x2="17" y2="17"/></svg>`,
  pin:   `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" width="14" height="14"><circle cx="10" cy="8" r="2.4"/><path d="M10 17s5.5-5 5.5-9A5.5 5.5 0 004.5 8c0 4 5.5 9 5.5 9z"/></svg>`,
  swap:  `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16"><path d="M6 5l-3 3 3 3M3 8h14M14 15l3-3-3-3M17 12H3"/></svg>`,
  lock:  `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" width="14" height="14"><rect x="4.5" y="9" width="11" height="8" rx="1.6"/><path d="M6.5 9V6.5a3.5 3.5 0 017 0V9"/></svg>`,
  plus:  `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="10" y1="4" x2="10" y2="16"/><line x1="4" y1="10" x2="16" y2="10"/></svg>`,
  trash: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" width="15" height="15"><path d="M4.5 6h11M8 6V4.5h4V6M6 6l.6 9.5a1 1 0 001 1h4.8a1 1 0 001-1L14 6"/></svg>`,
  edit:  `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" width="14" height="14"><path d="M12.5 3.5l4 4L6 18H2v-4z"/></svg>`,
  x:     `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" width="12" height="12"><line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/></svg>`,
  check: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M4 10.5l4 4 8-9"/></svg>`,
};

const NAV_ITEMS_BASE = [
  ['home','navHome','home'],
  ['timetables','navTimetables','list'],
  ['planner','navPlanner','compass'],
  ['map','navMap','map'],
  ['favorites','navFavorites','star'],
  ['notices','navNotices','bell'],
  ['faults','navFaults','warn'],
  ['contacts','navContacts','phone'],
  ['tickets','navTickets','ticket'],
];
const VEHICLE_TYPES = ['bus','tram','trolleybus'];

function goPage(p, opts){
  currentPage = p;
  editor = null;
  if(opts && opts.filter) currentVehicleFilter = opts.filter;
  if(opts && opts.route) currentRoute = opts.route;
  renderAll();
  window.scrollTo(0,0);
}

/* ---------- toast ---------- */
let toastTimer = null;
function toast(msg){
  let el = document.getElementById('toast');
  if(!el){
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.innerHTML = `${ICONS.check}<span>${msg}</span>`;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.remove('show'), 2200);
}

/* ---------- sidebar ---------- */
function renderSidebarNav(){
  const wrap = document.getElementById('sidebarnav');
  let items = NAV_ITEMS_BASE.slice();
  if(isAdmin) items.push(['admin','navAdmin','gear']);

  let html = '';
  items.forEach(([page,key,icon])=>{
    html += `<div class="navitem ${currentPage===page?'active':''}" data-page="${page}">${ICONS[icon]}<span>${t(key)}</span></div>`;
    if(page === 'timetables'){
      html += `<div class="navgroup-label">${t('transportGroup')}</div><div class="subnav">`;
      VEHICLE_TYPES.forEach(vt=>{
        const active = currentPage==='timetables' && currentVehicleFilter===vt;
        html += `<div class="subnavitem ${active?'active':''}" data-page="timetables" data-vtype="${vt}">${vehicleIcon(vt,'vicon')}<span>${vehicleLabel(vt)}</span></div>`;
      });
      html += `</div>`;
    }
  });
  wrap.innerHTML = html;

  wrap.querySelectorAll('.navitem,.subnavitem').forEach(el=>{
    el.addEventListener('click', ()=>{
      const page = el.dataset.page;
      const vtype = el.dataset.vtype;
      goPage(page, vtype ? {filter:vtype} : {filter:'all'});
    });
  });

  renderAuthBox();
}

function renderAuthBox(){
  const wrap = document.getElementById('authbox');
  if(!wrap) return;
  if(isAdmin){
    wrap.innerHTML = `
      <div class="userchip">
        ${ICONS.lock}<span>${t('loggedInAs')} <b>${ADMIN_USER}</b></span>
        <button class="logoutbtn" id="logoutBtn">${t('logoutBtn')}</button>
      </div>`;
    document.getElementById('logoutBtn').addEventListener('click', ()=>{
      isAdmin = false;
      if(currentPage === 'admin') currentPage = 'home';
      renderAll();
      toast(t('logoutBtn'));
    });
  } else {
    wrap.innerHTML = `<button class="loginbtn" id="openLoginBtn">${ICONS.lock}${t('loginBtn')}</button>`;
    document.getElementById('openLoginBtn').addEventListener('click', openLoginModal);
  }
}

function renderLangPills(){
  const wrap = document.getElementById('langpills');
  wrap.innerHTML = LANGS.map(l => `<button data-lang="${l}" class="${l===currentLang?'active':''}">${LANG_LABEL[l]}</button>`).join('');
  wrap.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{ currentLang = btn.dataset.lang; renderAll(); });
  });
}

function applyStaticI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent = t(el.dataset.i18n); });
}

/* ============================================================
   LOGIN MODAL
   ============================================================ */
function openLoginModal(){
  loginError = false;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'loginOverlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <h3>${ICONS.lock}${t('loginTitle')}</h3>
      <div class="field-row">
        <label>${t('loginUsername')}</label>
        <input type="text" id="loginUsername" autocomplete="username">
      </div>
      <div class="field-row">
        <label>${t('loginPassword')}</label>
        <input type="password" id="loginPassword" autocomplete="current-password">
      </div>
      <div class="login-error" id="loginErrorMsg" style="display:none;">${t('loginError')}</div>
      <div class="modal-actions">
        <button class="primarybtn" id="loginSubmitBtn">${t('loginSubmit')}</button>
        <button class="ghostbtn" id="loginCancelBtn">${t('loginCancel')}</button>
      </div>
      <div class="modal-note">${t('loginNote')}</div>
    </div>
  `;
  document.body.appendChild(overlay);

  const close = ()=> overlay.remove();
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) close(); });
  document.getElementById('loginCancelBtn').addEventListener('click', close);

  const submit = ()=>{
    const u = document.getElementById('loginUsername').value.trim();
    const p = document.getElementById('loginPassword').value;
    if(u === ADMIN_USER && p === ADMIN_PASSWORD){
      isAdmin = true;
      close();
      renderAll();
      toast(t('loginBtn') + ': ' + ADMIN_USER);
    } else {
      document.getElementById('loginErrorMsg').style.display = 'block';
    }
  };
  document.getElementById('loginSubmitBtn').addEventListener('click', submit);
  overlay.querySelectorAll('input').forEach(inp=>{
    inp.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') submit(); });
  });
  document.getElementById('loginUsername').focus();
}

/* ============================================================
   FEED CARD (notices / faults, used on Home + dedicated pages)
   ============================================================ */
function feedCardHtml(item, isFault, index){
  const adminBtns = isAdmin ? `
    <div class="admin-row-actions">
      <button class="icon-btn" data-edit-feed="${isFault?'fault':'notice'}:${index}">${ICONS.edit}</button>
      <button class="icon-btn danger" data-del-feed="${isFault?'fault':'notice'}:${index}">${ICONS.trash}</button>
    </div>` : '';
  return `
    <div class="feedcard ${isFault?'fault':''}">
      <div class="fhead">
        ${vehicleIcon(item.type,'fvicon')}
        <span class="fdate">${item.date}</span>
        ${adminBtns}
      </div>
      <h4>${tField(item.title)}</h4>
      <p>${tField(item.body)}</p>
    </div>`;
}
function bindFeedAdminButtons(root, listGetter){
  root.querySelectorAll('[data-edit-feed]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const [kind, idx] = btn.dataset.editFeed.split(':');
      openFeedEditor(kind, +idx);
    });
  });
  root.querySelectorAll('[data-del-feed]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const [kind, idx] = btn.dataset.delFeed.split(':');
      if(!confirm(t('adminConfirmDelete'))) return;
      (kind==='fault' ? FAULTS : NOTICES).splice(+idx,1);
      toast(t('adminDeleted'));
      renderPage();
    });
  });
}

/* ---------- HOME PAGE ---------- */
function renderHomePage(root){
  root.innerHTML = `
    <h1 class="pagetitle">${t('navHome')}</h1>
    <div class="panel fullpanel">
      <div class="searchrow">
        <button class="mylocbtn" id="mylocbtn">${ICONS.pin}${t('myLocation')}</button>
        <div class="searchbox">
          ${ICONS.search}
          <input type="text" id="homesearch" placeholder="${t('searchPlaceholder')}">
        </div>
        <button class="searchgo" id="homesearchgo">${ICONS.search}</button>
      </div>
      <div class="locnote" id="locnote" style="display:none;">${t('myLocationNote')}</div>

      <div class="tabs">
        <button class="${homeTab==='planner'?'active':''}" data-hometab="planner">${t('tabPlanner')}</button>
        <button class="${homeTab==='favorites'?'active':''}" data-hometab="favorites">${t('tabFavorites')}</button>
      </div>
      <div id="hometab-content"></div>
    </div>

    <div class="section-heading">${ICONS.bell}${t('noticesHeading')}</div>
    <div id="home-notices">${NOTICES.slice(0,2).map((n,i)=>feedCardHtml(n,false,i)).join('') || `<p class="lead">${t('noneRightNow')}</p>`}</div>

    <div class="section-heading">${ICONS.warn}${t('faultsHeading')}</div>
    <div id="home-faults">${FAULTS.slice(0,2).map((f,i)=>feedCardHtml(f,true,i)).join('') || `<p class="lead">${t('noneRightNow')}</p>`}</div>
  `;

  document.getElementById('mylocbtn').addEventListener('click', ()=>{
    document.getElementById('locnote').style.display = 'block';
  });
  document.getElementById('homesearchgo').addEventListener('click', doHomeSearch);
  document.getElementById('homesearch').addEventListener('keydown', (e)=>{ if(e.key==='Enter') doHomeSearch(); });

  root.querySelectorAll('[data-hometab]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ homeTab = btn.dataset.hometab; renderHomeTabContent(); syncHomeTabButtons(); });
  });
  renderHomeTabContent();
  bindFeedAdminButtons(document.getElementById('home-notices'));
  bindFeedAdminButtons(document.getElementById('home-faults'));
}
function syncHomeTabButtons(){
  document.querySelectorAll('[data-hometab]').forEach(b=> b.classList.toggle('active', b.dataset.hometab===homeTab));
}
function doHomeSearch(){
  const q = document.getElementById('homesearch').value;
  goPage('timetables', {filter:'all'});
  setTimeout(()=>{
    const s = document.getElementById('linesearch');
    if(s){ s.value = q; renderLineList(q); }
  }, 0);
}
function renderHomeTabContent(){
  const wrap = document.getElementById('hometab-content');
  if(!wrap) return;
  if(homeTab === 'favorites'){
    wrap.innerHTML = favoritesListHtml();
    bindFavoritesListEvents(wrap);
  } else {
    wrap.innerHTML = plannerFormHtml();
    bindPlannerFormEvents(wrap);
  }
}

/* ---------- TIMETABLES PAGE ---------- */
function renderTimetablesPage(root){
  root.innerHTML = `
    <h1 class="pagetitle">${t('navTimetables')}</h1>
    <div class="panel fullpanel">
      <div class="vfilters" id="vfilters"></div>
      <div class="searchbox" style="margin-bottom:14px;">
        ${ICONS.search}
        <input type="text" id="linesearch" placeholder="${t('searchPlaceholder')}">
      </div>
      <ul class="linelist" id="linelist"></ul>
      <div id="detail"></div>
    </div>
  `;
  renderVFilters();
  document.getElementById('linesearch').addEventListener('input', (e)=> renderLineList(e.target.value));
  renderLineList('');
  renderDetail();
}
function renderVFilters(){
  const wrap = document.getElementById('vfilters');
  if(!wrap) return;
  const types = ['all', ...VEHICLE_TYPES];
  wrap.innerHTML = types.map(vt => `
    <button class="vfilter ${currentVehicleFilter===vt?'active':''}" data-vtype="${vt}">
      ${vt==='all' ? '' : vehicleIcon(vt)}<span>${vt==='all' ? t('filterAll') : vehicleLabel(vt)}</span>
    </button>`).join('');
  wrap.querySelectorAll('.vfilter').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      currentVehicleFilter = btn.dataset.vtype;
      renderVFilters();
      renderLineList(document.getElementById('linesearch')?.value || '');
      renderSidebarNav();
    });
  });
}
function renderLineList(filter){
  const list = document.getElementById('linelist');
  if(!list) return;
  const f = (filter||'').trim().toLowerCase();
  const filtered = ROUTES.filter(r =>
    (currentVehicleFilter === 'all' || r.type === currentVehicleFilter) &&
    (!f || r.id.includes(f) || r.from.toLowerCase().includes(f) || r.to.toLowerCase().includes(f))
  );
  list.innerHTML = filtered.map(r => `
    <li><div class="linerow">
      <button class="linebtn ${r.id===currentRoute?'active':''}" data-id="${r.id}">
        <span class="num" style="background:${r.color}">${r.id}</span>
        ${vehicleIcon(r.type)}
        <span class="dir">${r.from} \u2192 ${r.to}</span>
      </button>
      ${isAdmin ? `<button class="icon-btn" data-edit-route="${r.id}">${ICONS.edit}</button>` : ''}
      <button class="starbtn ${favoriteIds.has(r.id)?'on':''}" data-star="${r.id}">${favoriteIds.has(r.id)?'\u2605':'\u2606'}</button>
    </div></li>`).join('') || `<li style="padding:14px;color:var(--muted);font-size:13px;">\u2014</li>`;

  if(isAdmin){
    const addRow = document.createElement('div');
    addRow.className = 'admin-add-row';
    addRow.innerHTML = `<button class="ghostbtn" id="addRouteBtn">${ICONS.plus}${t('adminAddRoute')}</button>`;
    list.after(addRow);
    document.getElementById('addRouteBtn').addEventListener('click', ()=> openRouteEditor(null));
  }

  list.querySelectorAll('.linebtn').forEach(btn=>{
    btn.addEventListener('click', ()=>{ currentRoute = btn.dataset.id; renderDetail(); renderLineList(filter); });
  });
  list.querySelectorAll('[data-edit-route]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{ e.stopPropagation(); openRouteEditor(btn.dataset.editRoute); });
  });
  list.querySelectorAll('.starbtn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const id = btn.dataset.star;
      favoriteIds.has(id) ? favoriteIds.delete(id) : favoriteIds.add(id);
      renderLineList(filter);
    });
  });
}
function renderDetail(){
  const detail = document.getElementById('detail');
  if(!detail) return;
  const r = ROUTES.find(x => x.id === currentRoute) || ROUTES[0];
  if(!r){ detail.innerHTML = ''; return; }
  const diagramHtml = r.stops.map((sid,i) => `
    <li>
      ${i < r.stops.length-1 ? `<span class="barline" style="background:${r.color}"></span>` : ''}
      <span class="dotwrap" style="border-color:${r.color}"></span>
      <span class="stopname">${stopName(sid)}</span>
    </li>`).join('');
  const depsHtml = r.times.map(time => `<div class="dep"><span class="time">${time}</span></div>`).join('');

  detail.innerHTML = `
    <div class="detail-head">
      <span class="num-big" style="background:${r.color}">${r.id}</span>
      <div class="detail-title">
        <div class="label">${t('direction')} \u00b7 ${vehicleIcon(r.type)} ${vehicleLabel(r.type)}</div>
        <h3>${r.from} \u2192 ${r.to}</h3>
      </div>
      <button class="starbtn ${favoriteIds.has(r.id)?'on':''}" data-star="${r.id}" style="font-size:22px;">${favoriteIds.has(r.id)?'\u2605':'\u2606'}</button>
    </div>
    <div class="detail-body">
      <div>
        <div class="diagram-head">${t('stopsHeading')}</div>
        <ul class="diagram">${diagramHtml}</ul>
      </div>
      <div>
        <div class="deps-head">${t('nextDepartures')}</div>
        <div class="deps">${depsHtml}</div>
      </div>
    </div>
  `;
  detail.querySelector('.starbtn').addEventListener('click', ()=>{
    favoriteIds.has(r.id) ? favoriteIds.delete(r.id) : favoriteIds.add(r.id);
    renderDetail();
    renderLineList(document.getElementById('linesearch')?.value || '');
  });
}

/* ---------- PLANNER PAGE + shared planner form ---------- */
let plannerMode = 'departs';
function plannerFormHtml(){
  return `
    <div class="plannerform">
      <div class="pfrow"><span class="dot from"></span>
        <input type="text" placeholder="${t('plannerFromPlaceholder')}">
        <button class="swapbtn" title="swap">${ICONS.swap}</button>
      </div>
      <div class="pfrow"><span class="dot to"></span>
        <input type="text" placeholder="${t('plannerToPlaceholder')}">
      </div>
      <div class="pfrow">
        <div class="togglepair">
          <button class="${plannerMode==='departs'?'active':''}" data-pm="departs">${t('plannerDeparts')}</button>
          <button class="${plannerMode==='arrives'?'active':''}" data-pm="arrives">${t('plannerArrives')}</button>
        </div>
      </div>
      <div class="moreopts">${t('plannerMoreOptions')} \u25be</div>
      <button class="searchbtn" id="plannerSearchBtn">${t('plannerSearch')}</button>
    </div>
    <div class="plannernote">${t('plannerNote')}</div>
  `;
}
function bindPlannerFormEvents(root){
  root.querySelectorAll('[data-pm]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ plannerMode = btn.dataset.pm; renderHomeTabContent(); if(currentPage==='planner') renderPage(); });
  });
}
function renderPlannerPage(root){
  root.innerHTML = `
    <h1 class="pagetitle">${t('navPlanner')}</h1>
    <div class="panel fullpanel" id="plannerpanel">${plannerFormHtml()}</div>
  `;
  bindPlannerFormEvents(root);
}

/* ---------- MAP PAGE (остановки — жёлтые точки, зум/перетаскивание) ---------- */
let mapZoom = 1, mapPanX = 0, mapPanY = 0;
function clampZoom(z){ return Math.min(4, Math.max(1, z)); }
function applyMapTransform(){
  const inner = document.getElementById('mapinner');
  if(inner) inner.style.transform = `translate(${mapPanX}px, ${mapPanY}px) scale(${mapZoom})`;
}
function resetMapView(){ mapZoom = 1; mapPanX = 0; mapPanY = 0; applyMapTransform(); }

function renderMapPage(root){
  const effectiveMapUrl = mapImageDataUrl || (MAP_IMAGE_URL ? (MAP_IMAGE_URL + '?t=' + Date.now()) : null);
  root.innerHTML = `
    <h1 class="pagetitle">${t('navMap')}</h1>
    <div class="panel fullpanel">
      <p class="lead">${t('mapNote')}</p>
      ${isAdmin ? `
        <div class="admin-hint">${t('mapAdminHint')}</div>
        <div class="admin-hint">${t('githubMapNote')}</div>
        <div class="mapupload-row">
          <label class="ghostbtn small" for="mapImageInput">${ICONS.plus}${t('previewMapImage')}</label>
          <input type="file" id="mapImageInput" accept="image/*" style="display:none;">
          ${mapImageDataUrl ? `<button class="ghostbtn small" id="resetMapImageBtn">${t('resetMapImage')}</button>` : ''}
        </div>
        <div class="modal-note" style="margin:0 0 12px;">${t('mapImageNote')}</div>
      ` : ''}
      <div class="mapbox${isAdmin ? ' admin-editable' : ''}" id="mapbox">
        <div class="map-inner" id="mapinner" style="${effectiveMapUrl ? `background-image:url('${effectiveMapUrl}');background-size:cover;background-position:center;background-repeat:no-repeat;` : ''}">
          ${STOPS.map(s => `<div class="stopdot" style="left:${s.x};top:${s.y};" data-stop-id="${s.id}" title="${escapeHtml(s.name)}"></div>`).join('')}
        </div>
        <div class="mapzoom-controls">
          <button id="mapZoomIn" title="+">${ICONS.plus}</button>
          <button id="mapZoomOut" title="\u2212">\u2212</button>
          <button id="mapZoomReset" title="reset">${ICONS.x}</button>
        </div>
      </div>
    </div>
  `;
  resetMapView();

  const mapbox = document.getElementById('mapbox');
  const inner = document.getElementById('mapinner');

  // --- зум колесом мыши, с сохранением точки под курсором ---
  mapbox.addEventListener('wheel', (e)=>{
    e.preventDefault();
    const rect = mapbox.getBoundingClientRect();
    const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
    const oldZoom = mapZoom;
    const newZoom = clampZoom(mapZoom - e.deltaY * 0.0018 * mapZoom);
    mapPanX = cx - (cx - mapPanX) * (newZoom / oldZoom);
    mapPanY = cy - (cy - mapPanY) * (newZoom / oldZoom);
    mapZoom = newZoom;
    applyMapTransform();
  }, { passive:false });

  document.getElementById('mapZoomIn').addEventListener('click', ()=>{ mapZoom = clampZoom(mapZoom * 1.4); applyMapTransform(); });
  document.getElementById('mapZoomOut').addEventListener('click', ()=>{ mapZoom = clampZoom(mapZoom / 1.4); applyMapTransform(); });
  document.getElementById('mapZoomReset').addEventListener('click', resetMapView);

  // --- перетаскивание мышью/пальцем ---
  let dragging = false, dragStartX = 0, dragStartY = 0, panStartX = 0, panStartY = 0, dragDist = 0;
  function dragStart(clientX, clientY){
    dragging = true; dragDist = 0;
    dragStartX = clientX; dragStartY = clientY;
    panStartX = mapPanX; panStartY = mapPanY;
  }
  function dragMove(clientX, clientY){
    if(!dragging) return;
    const dx = clientX - dragStartX, dy = clientY - dragStartY;
    dragDist = Math.max(dragDist, Math.abs(dx), Math.abs(dy));
    mapPanX = panStartX + dx; mapPanY = panStartY + dy;
    applyMapTransform();
  }
  function dragEnd(){ dragging = false; }

  mapbox.addEventListener('mousedown', (e)=>{ if(e.target.closest('.mapzoom-controls')) return; dragStart(e.clientX, e.clientY); });
  window.addEventListener('mousemove', (e)=> dragMove(e.clientX, e.clientY));
  window.addEventListener('mouseup', dragEnd);
  mapbox.addEventListener('touchstart', (e)=>{ if(e.touches.length===1) dragStart(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});
  mapbox.addEventListener('touchmove', (e)=>{ if(e.touches.length===1) dragMove(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});
  mapbox.addEventListener('touchend', dragEnd);

  // --- клик = добавить/редактировать остановку (но не если это был драг) ---
  if(isAdmin){
    document.getElementById('mapImageInput').addEventListener('change', (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = ()=>{ mapImageDataUrl = reader.result; renderMapPage(root); };
      reader.readAsDataURL(file);
    });
    document.getElementById('resetMapImageBtn')?.addEventListener('click', ()=>{
      mapImageDataUrl = null; renderMapPage(root);
    });

    mapbox.addEventListener('click', (e)=>{
      if(dragDist > 4) return; // это было перетаскивание, не клик
      if(e.target.closest('.stopdot') || e.target.closest('.mapzoom-controls')) return;
      const rect = mapbox.getBoundingClientRect();
      const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
      const xPct = (((cx - mapPanX) / mapZoom) / rect.width * 100).toFixed(1) + '%';
      const yPct = (((cy - mapPanY) / mapZoom) / rect.height * 100).toFixed(1) + '%';
      const name = prompt(t('promptStopName'));
      if(!name || !name.trim()) return;
      const nextId = 's' + (STOPS.reduce((max,s)=> Math.max(max, parseInt(s.id.slice(1))||0), 0) + 1);
      STOPS.push({ id: nextId, name: name.trim(), x: xPct, y: yPct });
      toast(t('adminSaved'));
      renderMapPage(root);
    });
    inner.querySelectorAll('.stopdot').forEach(dot=>{
      dot.addEventListener('click', (e)=>{
        e.stopPropagation();
        if(dragDist > 4) return;
        const id = dot.dataset.stopId;
        const stop = STOPS.find(s=>s.id===id);
        const result = prompt(t('promptStopRename'), stop.name);
        if(result === null) return; // отмена
        if(!result.trim()){
          STOPS = STOPS.filter(s=>s.id!==id);
          ROUTES.forEach(r=> r.stops = r.stops.filter(sid=>sid!==id));
          toast(t('adminDeleted'));
        } else {
          stop.name = result.trim();
          toast(t('adminSaved'));
        }
        renderMapPage(root);
      });
    });
  }
}

/* ---------- FAVORITES PAGE + shared list ---------- */
function favoritesListHtml(){
  const favs = ROUTES.filter(r => favoriteIds.has(r.id));
  if(favs.length === 0) return `<p class="lead">${t('favoritesEmpty')}</p>`;
  return `<ul class="linelist">
    ${favs.map(r => `
      <li><div class="linerow">
        <button class="linebtn" data-goto="${r.id}">
          <span class="num" style="background:${r.color}">${r.id}</span>
          ${vehicleIcon(r.type)}
          <span class="dir">${r.from} \u2192 ${r.to}</span>
        </button>
        <button class="starbtn on" data-unstar="${r.id}">\u2605</button>
      </div></li>`).join('')}
  </ul>`;
}
function bindFavoritesListEvents(root){
  root.querySelectorAll('[data-goto]').forEach(btn=>{
    btn.addEventListener('click', ()=> goPage('timetables', {route:btn.dataset.goto, filter:'all'}));
  });
  root.querySelectorAll('[data-unstar]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ favoriteIds.delete(btn.dataset.unstar); renderHomeTabContent(); if(currentPage==='favorites') renderPage(); });
  });
}
function renderFavoritesPage(root){
  root.innerHTML = `
    <h1 class="pagetitle">${t('navFavorites')}</h1>
    <div class="panel fullpanel" id="favpanel">${favoritesListHtml()}</div>
  `;
  bindFavoritesListEvents(root);
}

/* ---------- NOTICES / FAULTS PAGES ---------- */
function renderNoticesPage(root){
  root.innerHTML = `
    <h1 class="pagetitle">${t('noticesHeading')}</h1>
    ${isAdmin ? `<button class="ghostbtn admin-add-row" id="addNoticeBtn">${ICONS.plus}${t('adminAddNotice')}</button>` : ''}
    <div id="feedlist">${NOTICES.length ? NOTICES.map((n,i)=>feedCardHtml(n,false,i)).join('') : `<p class="lead">${t('noneRightNow')}</p>`}</div>
  `;
  if(isAdmin) document.getElementById('addNoticeBtn').addEventListener('click', ()=> openFeedEditor('notice', null));
  bindFeedAdminButtons(document.getElementById('feedlist'));
}
function renderFaultsPage(root){
  root.innerHTML = `
    <h1 class="pagetitle">${t('faultsHeading')}</h1>
    ${isAdmin ? `<button class="ghostbtn admin-add-row" id="addFaultBtn">${ICONS.plus}${t('adminAddFault')}</button>` : ''}
    <div id="feedlist">${FAULTS.length ? FAULTS.map((f,i)=>feedCardHtml(f,true,i)).join('') : `<p class="lead">${t('noneRightNow')}</p>`}</div>
  `;
  if(isAdmin) document.getElementById('addFaultBtn').addEventListener('click', ()=> openFeedEditor('fault', null));
  bindFeedAdminButtons(document.getElementById('feedlist'));
}

/* ---------- CONTACTS / TICKETS PAGES ---------- */
function renderContactsPage(root){
  root.innerHTML = `<h1 class="pagetitle">${t('contactsHeading')}</h1><div class="panel fullpanel"><p class="lead" style="margin:0;">${t('contactsBody')}</p></div>`;
}
function renderTicketsPage(root){
  root.innerHTML = `<h1 class="pagetitle">${t('ticketsHeading')}</h1><div class="panel fullpanel"><p class="lead" style="margin:0;">${t('ticketsBody')}</p></div>`;
}

/* ============================================================
   ADMIN PANEL
   ============================================================ */
function renderAdminPage(root){
  if(!isAdmin){ goPage('home'); return; }
  root.innerHTML = `
    <h1 class="pagetitle">${t('navAdmin')}</h1>
    <div class="admin-hint">${t('adminHint')}</div>
    <div class="tabs">
      <button class="${adminTab==='lines'?'active':''}" data-atab="lines">${t('adminTabLines')}</button>
      <button class="${adminTab==='notices'?'active':''}" data-atab="notices">${t('adminTabNotices')}</button>
      <button class="${adminTab==='faults'?'active':''}" data-atab="faults">${t('adminTabFaults')}</button>
      <button class="${adminTab==='pages'?'active':''}" data-atab="pages">${t('adminTabPages')}</button>
    </div>
    <div id="admin-body"></div>
  `;
  root.querySelectorAll('[data-atab]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ adminTab = btn.dataset.atab; editor = null; renderAdminBody(); });
  });
  renderAdminBody();
}

function renderAdminBody(){
  const body = document.getElementById('admin-body');
  if(!body) return;
  if(editor){
    renderEditorForm(body);
    return;
  }
  if(adminTab === 'lines') return renderAdminLines(body);
  if(adminTab === 'notices') return renderAdminFeed(body, 'notice');
  if(adminTab === 'faults') return renderAdminFeed(body, 'fault');
  if(adminTab === 'pages') return renderAdminPages(body);
}

function adminRowHtml(kind, id, badge, label, sub){
  return `
    <div class="admin-list-row">
      ${badge}
      <div class="admin-row-meta">
        <div class="admin-row-label">${label}</div>
        ${sub ? `<div class="admin-row-sub">${sub}</div>` : ''}
      </div>
      <div class="admin-row-actions">
        <button class="icon-btn" data-arow-edit="${id}">${ICONS.edit}</button>
        <button class="icon-btn danger" data-arow-del="${id}">${ICONS.trash}</button>
      </div>
    </div>`;
}

function renderAdminLines(body){
  body.innerHTML = `
    <button class="primarybtn admin-add-row" id="adminAddRoute">${ICONS.plus}${t('adminAddRoute')}</button>
    <div class="admin-list">
      ${ROUTES.map(r => adminRowHtml('route', r.id,
        `<span class="num" style="background:${r.color}">${r.id}</span>`,
        `${r.from} \u2192 ${r.to}`, vehicleLabel(r.type))).join('') || `<p class="lead">\u2014</p>`}
    </div>
  `;
  document.getElementById('adminAddRoute').addEventListener('click', ()=> openRouteEditor(null));
  body.querySelectorAll('[data-arow-edit]').forEach(btn=>{
    btn.addEventListener('click', ()=> openRouteEditor(btn.dataset.arowEdit));
  });
  body.querySelectorAll('[data-arow-del]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(!confirm(t('adminConfirmDelete'))) return;
      const idx = ROUTES.findIndex(r=>r.id===btn.dataset.arowDel);
      if(idx>-1) ROUTES.splice(idx,1);
      if(currentRoute === btn.dataset.arowDel) currentRoute = ROUTES[0]?.id;
      toast(t('adminDeleted'));
      renderAdminLines(body);
    });
  });
}

function renderAdminFeed(body, kind){
  const arr = kind==='fault' ? FAULTS : NOTICES;
  const addKey = kind==='fault' ? 'adminAddFault' : 'adminAddNotice';
  body.innerHTML = `
    <button class="primarybtn admin-add-row" id="adminAddFeed">${ICONS.plus}${t(addKey)}</button>
    <div class="admin-list">
      ${arr.map((item,i) => adminRowHtml(kind, i,
        vehicleIcon(item.type),
        tField(item.title), item.date)).join('') || `<p class="lead">\u2014</p>`}
    </div>
  `;
  document.getElementById('adminAddFeed').addEventListener('click', ()=> openFeedEditor(kind, null));
  body.querySelectorAll('[data-arow-edit]').forEach(btn=>{
    btn.addEventListener('click', ()=> openFeedEditor(kind, +btn.dataset.arowEdit));
  });
  body.querySelectorAll('[data-arow-del]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(!confirm(t('adminConfirmDelete'))) return;
      arr.splice(+btn.dataset.arowDel,1);
      toast(t('adminDeleted'));
      renderAdminFeed(body, kind);
    });
  });
}

const EDITABLE_PAGE_TEXTS = ['contactsBody', 'ticketsBody', 'mapNote', 'aiNote', 'footer'];
let pagesEditorLang = {};
function renderAdminPages(body){
  body.innerHTML = EDITABLE_PAGE_TEXTS.map((key)=>{
    const lang = pagesEditorLang[key] || currentLang;
    const labelKey = 'label' + key.charAt(0).toUpperCase() + key.slice(1);
    return `
      <div class="panel fullpanel admin-page-field">
        <div class="admin-page-field-head">
          <h3>${t(labelKey)}</h3>
        </div>
        <div class="minilangtabs" data-pf-langs="${key}">
          ${LANGS.map(l=>`<button class="${l===lang?'active':''}" data-pf-lang="${key}:${l}">${LANG_LABEL[l]}</button>`).join('')}
        </div>
        <textarea class="admin-textarea" data-pf-text="${key}" rows="3">${escapeHtml(I18N[key][lang] || '')}</textarea>
        <button class="primarybtn small" data-pf-save="${key}">${t('adminSave')}</button>
      </div>`;
  }).join('');

  body.querySelectorAll('[data-pf-lang]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const [key, lang] = btn.dataset.pfLang.split(':');
      pagesEditorLang[key] = lang;
      renderAdminPages(body);
    });
  });
  body.querySelectorAll('[data-pf-save]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const key = btn.dataset.pfSave;
      const lang = pagesEditorLang[key] || currentLang;
      const val = body.querySelector(`[data-pf-text="${key}"]`).value;
      I18N[key][lang] = val;
      toast(t('adminSaved'));
      renderAll();
    });
  });
}

/* ---------- route editor ---------- */
function openRouteEditor(id){
  const existing = id ? ROUTES.find(r=>r.id===id) : null;
  editor = {
    kind:'route',
    origId: id,
    data: existing ? JSON.parse(JSON.stringify(existing)) : {
      id:'', type:'bus', color:'#3b82f6', from:'', to:'', stops:[], times:['']
    }
  };
  renderAdminBody();
}

function renderEditorForm(body){
  if(editor.kind === 'route') return renderRouteEditorForm(body);
  return renderFeedEditorForm(body);
}

function renderRouteEditorForm(body){
  const d = editor.data;
  body.innerHTML = `
    <div class="panel fullpanel editor-form">
      <div class="field-row">
        <label>${t('formRouteNumber')}</label>
        <input type="text" id="ef-id" value="${escapeHtml(d.id)}">
      </div>
      <div class="field-row">
        <label>${t('formVehicleType')}</label>
        <div class="segbtns" id="ef-type">
          ${VEHICLE_TYPES.map(vt=>`<button data-vt="${vt}" class="${d.type===vt?'active':''}">${vehicleIcon(vt)}<span>${vehicleLabel(vt)}</span></button>`).join('')}
        </div>
      </div>
      <div class="field-row">
        <label>${t('formColor')}</label>
        <input type="color" id="ef-color" value="${d.color}">
      </div>
      <div class="field-row">
        <label>${t('formFrom')}</label>
        <input type="text" id="ef-from" value="${escapeHtml(d.from)}">
      </div>
      <div class="field-row">
        <label>${t('formTo')}</label>
        <input type="text" id="ef-to" value="${escapeHtml(d.to)}">
      </div>

      <div class="field-row">
        <label>${t('formStopsPick')}</label>
        <div class="modal-note" style="margin:-2px 0 10px;">${t('formStopsPickHint')}</div>
        ${STOPS.length === 0 ? `
          <div class="admin-hint">${t('formStopsEmpty')}</div>
          <button class="ghostbtn small" id="ef-gotomap">${t('goToMap')}</button>
        ` : `
          <div class="stop-picker" id="ef-picked">
            ${d.stops.length === 0 ? `<span class="stop-picker-empty">—</span>` :
              d.stops.map((sid,i)=>`<button class="stopchip picked" data-picked-i="${i}">${i+1}. ${escapeHtml(stopName(sid))} ${ICONS.x}</button>`).join('')}
          </div>
          <div class="stop-picker" id="ef-available">
            ${STOPS.map(s=>`<button class="stopchip" data-add-stop="${s.id}">${ICONS.pin}${escapeHtml(s.name)}</button>`).join('')}
          </div>
        `}
      </div>

      <div class="field-row">
        <label>${t('formTimes')}</label>
        <div class="editlist" id="ef-times">
          ${d.times.map((s,i)=>`
            <div class="editlist-row">
              <input type="text" data-time-i="${i}" value="${escapeHtml(s)}" placeholder="07:00">
              <button class="icon-btn danger" data-time-del="${i}" title="${t('removeTime')}">${ICONS.x}</button>
            </div>`).join('')}
        </div>
        <button class="ghostbtn small" id="ef-addtime">${ICONS.plus}${t('formAddTime')}</button>
      </div>

      <div class="modal-actions">
        <button class="primarybtn" id="ef-save">${t('adminSave')}</button>
        <button class="ghostbtn" id="ef-cancel">${t('adminCancel')}</button>
      </div>
    </div>
  `;

  // sync simple fields into editor.data live so re-render (add/remove row) doesn't lose typed text
  function syncSimple(){
    d.id = document.getElementById('ef-id').value.trim();
    d.color = document.getElementById('ef-color').value;
    d.from = document.getElementById('ef-from').value.trim();
    d.to = document.getElementById('ef-to').value.trim();
    body.querySelectorAll('[data-time-i]').forEach(inp=>{ d.times[+inp.dataset.timeI] = inp.value; });
  }

  body.querySelectorAll('#ef-type button').forEach(btn=>{
    btn.addEventListener('click', ()=>{ syncSimple(); d.type = btn.dataset.vt; renderRouteEditorForm(body); });
  });
  document.getElementById('ef-gotomap')?.addEventListener('click', ()=>{ editor = null; goPage('map'); });
  body.querySelectorAll('[data-add-stop]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ syncSimple(); d.stops.push(btn.dataset.addStop); renderRouteEditorForm(body); });
  });
  body.querySelectorAll('[data-picked-i]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ syncSimple(); d.stops.splice(+btn.dataset.pickedI,1); renderRouteEditorForm(body); });
  });
  document.getElementById('ef-addtime').addEventListener('click', ()=>{ syncSimple(); d.times.push(''); renderRouteEditorForm(body); });
  body.querySelectorAll('[data-time-del]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ syncSimple(); d.times.splice(+btn.dataset.timeDel,1); if(d.times.length===0) d.times.push(''); renderRouteEditorForm(body); });
  });

  document.getElementById('ef-cancel').addEventListener('click', ()=>{ editor = null; renderAdminBody(); });
  document.getElementById('ef-save').addEventListener('click', ()=>{
    syncSimple();
    if(!d.id || !d.from || !d.to){ toast(t('formMissingFields')); return; }
    d.times = d.times.map(s=>s.trim()).filter(Boolean);
    if(d.times.length === 0) d.times = ['--:--'];

    const idx = editor.origId ? ROUTES.findIndex(r=>r.id===editor.origId) : -1;
    if(idx > -1) ROUTES[idx] = d; else ROUTES.push(d);
    currentRoute = d.id;
    editor = null;
    toast(t('adminSaved'));
    renderAll();
  });
}

/* ---------- notice/fault editor ---------- */
function blankFieldDict(){
  const o = {}; LANGS.forEach(l=> o[l]=''); return o;
}
function openFeedEditor(kind, idx){
  const arr = kind==='fault' ? FAULTS : NOTICES;
  const existing = (idx!==null && idx!==undefined) ? arr[idx] : null;
  editor = {
    kind: kind,
    origIndex: (idx!==null && idx!==undefined) ? idx : null,
    lang: currentLang,
    data: existing ? JSON.parse(JSON.stringify(existing)) : {
      date:'', type:'bus', title: blankFieldDict(), body: blankFieldDict()
    }
  };
  renderAdminBody();
}
function renderFeedEditorForm(body){
  const d = editor.data;
  const lang = editor.lang;
  body.innerHTML = `
    <div class="panel fullpanel editor-form">
      <div class="field-row">
        <label>${t('formDate')}</label>
        <input type="text" id="ef-date" value="${escapeHtml(d.date)}" placeholder="16.08.2026">
      </div>
      <div class="field-row">
        <label>${t('formVehicleType')}</label>
        <div class="segbtns" id="ef-type">
          ${VEHICLE_TYPES.map(vt=>`<button data-vt="${vt}" class="${d.type===vt?'active':''}">${vehicleIcon(vt)}<span>${vehicleLabel(vt)}</span></button>`).join('')}
        </div>
      </div>

      <div class="minilangtabs">
        ${LANGS.map(l=>`<button class="${l===lang?'active':''}" data-ef-lang="${l}">${LANG_LABEL[l]}</button>`).join('')}
      </div>
      <div class="lang-note">${t('formEditingLang')} <b>${LANG_LABEL[lang]}</b></div>

      <div class="field-row">
        <label>${t('formTitle')}</label>
        <input type="text" id="ef-title" value="${escapeHtml(d.title[lang]||'')}">
      </div>
      <div class="field-row">
        <label>${t('formBody')}</label>
        <textarea id="ef-body" rows="3">${escapeHtml(d.body[lang]||'')}</textarea>
      </div>

      <div class="modal-actions">
        <button class="primarybtn" id="ef-save">${t('adminSave')}</button>
        <button class="ghostbtn" id="ef-cancel">${t('adminCancel')}</button>
      </div>
    </div>
  `;

  function syncLangFields(){
    d.title[lang] = document.getElementById('ef-title').value;
    d.body[lang] = document.getElementById('ef-body').value;
    d.date = document.getElementById('ef-date').value;
  }

  body.querySelectorAll('#ef-type button').forEach(btn=>{
    btn.addEventListener('click', ()=>{ syncLangFields(); d.type = btn.dataset.vt; renderFeedEditorForm(body); });
  });
  body.querySelectorAll('[data-ef-lang]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ syncLangFields(); editor.lang = btn.dataset.efLang; renderFeedEditorForm(body); });
  });
  document.getElementById('ef-cancel').addEventListener('click', ()=>{ editor = null; renderAdminBody(); });
  document.getElementById('ef-save').addEventListener('click', ()=>{
    syncLangFields();
    // забиваем пустые языки английским (или текущим), чтобы нигде не было дыр
    const fallbackTitle = d.title[lang] || Object.values(d.title).find(Boolean) || '';
    const fallbackBody = d.body[lang] || Object.values(d.body).find(Boolean) || '';
    LANGS.forEach(l=>{
      if(!d.title[l]) d.title[l] = fallbackTitle;
      if(!d.body[l]) d.body[l] = fallbackBody;
    });
    const arr = editor.kind==='fault' ? FAULTS : NOTICES;
    if(editor.origIndex !== null) arr[editor.origIndex] = d; else arr.unshift(d);
    editor = null;
    toast(t('adminSaved'));
    renderAll();
  });
}

/* ---------- router ---------- */
function renderPage(){
  const root = document.getElementById('page-root');
  const renderers = {
    home: renderHomePage,
    timetables: renderTimetablesPage,
    planner: renderPlannerPage,
    map: renderMapPage,
    favorites: renderFavoritesPage,
    notices: renderNoticesPage,
    faults: renderFaultsPage,
    contacts: renderContactsPage,
    tickets: renderTicketsPage,
    admin: renderAdminPage,
  };
  (renderers[currentPage] || renderHomePage)(root);
}

function renderAll(){
  renderLangPills();
  applyStaticI18n();
  renderSidebarNav();
  renderPage();
}

/* ---------- accessibility controls ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('sidebarBrand').addEventListener('click', ()=> goPage('home'));

  document.querySelectorAll('.a11y [data-fs]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.documentElement.classList.remove('fs-default','fs-large','fs-xlarge');
      document.documentElement.classList.add('fs-' + btn.dataset.fs);
      document.querySelectorAll('.a11y [data-fs]').forEach(b=>b.classList.toggle('active', b===btn));
    });
  });
  document.querySelectorAll('.a11y [data-contrast]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.documentElement.classList.toggle('contrast-high', btn.dataset.contrast === 'high');
      document.querySelectorAll('.a11y [data-contrast]').forEach(b=>b.classList.toggle('active', b===btn));
    });
  });
  document.querySelectorAll('.a11y [data-theme]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      theme = btn.dataset.theme;
      document.documentElement.classList.toggle('theme-light', theme === 'light');
      document.querySelectorAll('.a11y [data-theme]').forEach(b=>b.classList.toggle('active', b===btn));
    });
  });

  renderAll();
});
