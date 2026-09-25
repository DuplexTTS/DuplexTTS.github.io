const samples = [
  { slug: 'native-37', route: 'Autonomous', routeClass: 'blue', id: '01', duration: 60, title: 'A difficult idea, worked out together.', context: 'Two collaborators revisit an unfinished art project.', note: 'Native generation · English', quality: 'Listener study · 2 ratings' },
  { slug: 'native-30', route: 'Autonomous', routeClass: 'blue', id: '02', duration: 60, title: 'Making a plan that includes everyone.', context: 'A theater team adapts a performance for accessibility.', note: 'Native generation · English', quality: 'Listener study · 2 ratings' },
  { slug: 'native-01', route: 'Autonomous', routeClass: 'blue', id: '03', duration: 60, title: 'When a scene is not working yet.', context: 'An actor and director search for a better interpretation.', note: 'Native generation · English', quality: 'Listener study · 2 ratings' },
  { slug: 'scripted-en-03', route: 'Scripted', routeClass: 'orange', id: '04', duration: 96.28, title: 'A disagreement with an interruption.', context: 'Ethics and morality · English.', note: 'Scripted composition · English', quality: 'Listener study · 2 ratings' },
  { slug: 'scripted-en-21', route: 'Scripted', routeClass: 'orange', id: '05', duration: 103.72, title: 'A news story, with someone joining in.', context: 'News and current affairs · English.', note: 'Scripted composition · English', quality: 'Listener study · 2 ratings' },
  { slug: 'scripted-zh-20', route: 'Scripted', routeClass: 'orange', id: '06', duration: 61.08, title: '一段关于数码科技的对话。', context: '数码科技 · 中文。', note: 'Scripted composition · Chinese', quality: 'Listener study · 2 ratings' },
];
const waveforms = new Map();
let activeWave = null;
const pad = value => String(Math.floor(value || 0)).padStart(2, '0');
const clock = value => `${pad(value / 60)}:${pad(value % 60)}`;

function cardMarkup(item) {
  return `<article class="sample-card" data-slug="${item.slug}">
    <div class="sample-card-head"><div class="sample-card-index"><span>${item.id}</span><i></i><em>${item.route}</em></div><span class="sample-card-duration">${clock(item.duration)}</span></div>
    <h3>${item.title}</h3><p class="sample-card-context">${item.context}</p>
    <div class="sample-card-wave"><div class="waveform" id="wave-${item.slug}" aria-label="Actual stereo waveform for sample ${item.id}"></div><div class="wave-loading">Loading waveform</div><div class="wave-error" hidden>Waveform unavailable for this sample.</div></div>
    <div class="sample-card-controls"><button class="card-play" type="button" aria-label="Play sample ${item.id}"><span>▶</span></button><span class="card-time">00:00</span><div class="card-progress"><i></i></div><span class="sample-card-note">${item.note}</span></div><audio class="native-fallback" hidden controls preload="none" src="assets/${item.slug}/mix.wav" aria-label="Play sample ${item.id}"></audio>
    <div class="sample-card-foot"><span><b class="track-a-label">A</b> left</span><span><b class="track-b-label">B</b> right</span><span class="sample-quality">${item.quality}</span><details><summary>Tracks</summary><div class="track-audio"><label>A<audio controls preload="none" src="assets/${item.slug}/track-a.wav"></audio></label><label>B<audio controls preload="none" src="assets/${item.slug}/track-b.wav"></audio></label></div></details></div>
  </article>`;
}

function createWave(item, card) {
  if (waveforms.has(item.slug)) return waveforms.get(item.slug);
  const container = card.querySelector('.waveform');
  const loading = card.querySelector('.wave-loading');
  const errorMessage = card.querySelector('.wave-error');
  const fallback = card.querySelector('.native-fallback');
  const wave = WaveSurfer.create({
    container,
    height: 72,
    waveColor: '#6e9fb4',
    progressColor: '#c46927',
    cursorColor: '#c46927',
    cursorWidth: 1,
    barWidth: 2,
    barGap: 1,
    barRadius: 1,
    normalize: true,
    dragToSeek: true,
    hideScrollbar: true,
    interact: true,
  });
  wave.load(`assets/${item.slug}/mix.wav`);
  wave.on('ready', () => { loading.hidden = true; card.querySelector('.card-time').textContent = `00:00 / ${clock(wave.getDuration())}`; });
  wave.on('error', error => { loading.hidden = true; errorMessage.hidden = false; fallback.hidden = false; console.warn(`Could not render ${item.slug}`, error); });
  wave.on('timeupdate', seconds => { card.querySelector('.card-time').textContent = `${clock(seconds)} / ${clock(wave.getDuration())}`; card.querySelector('.card-progress i').style.width = `${wave.getCurrentTime() / wave.getDuration() * 100}%`; });
  wave.on('play', () => { if (activeWave && activeWave !== wave) activeWave.pause(); activeWave = wave; card.classList.add('is-playing'); card.querySelector('.card-play span').textContent = 'Ⅱ'; });
  wave.on('pause', () => { card.classList.remove('is-playing'); card.querySelector('.card-play span').textContent = '▶'; });
  wave.on('finish', () => { if (activeWave === wave) activeWave = null; card.classList.remove('is-playing'); card.querySelector('.card-play span').textContent = '▶'; });
  card.querySelector('.card-play').addEventListener('click', () => {
    if (fallback.hidden === false) { fallback.play().catch(() => {}); return; }
    wave.playPause();
  });
  card.querySelector('.card-progress').addEventListener('click', event => { const box = event.currentTarget.getBoundingClientRect(); wave.seekTo(Math.max(0, Math.min(1, (event.clientX - box.left) / box.width))); });
  waveforms.set(item.slug, wave);
  return wave;
}

function init() {
  const root = document.querySelector('#sample-grid');
  root.innerHTML = samples.map(cardMarkup).join('');
  const cards = [...root.querySelectorAll('.sample-card')];
  const bySlug = Object.fromEntries(samples.map(item => [item.slug, item]));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    createWave(bySlug[card.dataset.slug], card);
    observer.unobserve(card);
  }), { rootMargin: '420px 0px' });
  cards.forEach(card => observer.observe(card));
  createWave(samples[0], cards[0]);
}

init();
