'use strict';

// ── DATA ──────────────────────────────────────────────────────────────────────
const TRACKS = [
  { id:0,  title:"Absolute Silence",    artist:"The Void",            duration:192, img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", sub:"Pure unfiltered nothing" },
  { id:1,  title:"Empty Room",          artist:"Nobody",              duration:214, img:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&q=80", sub:"Echoes of emptiness" },
  { id:2,  title:"Quiet Storm",         artist:"Hush",                duration:237, img:"https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80", sub:"Calm before the nothing" },
  { id:3,  title:"Deep Nothing",        artist:"Zen Master",          duration:310, img:"https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80", sub:"Meditative silence" },
  { id:4,  title:"Focus: Zero",         artist:"Brain Off",           duration:268, img:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", sub:"Silence for deep work" },
  { id:5,  title:"Midnight Quiet",      artist:"The Darkness",        duration:198, img:"https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=400&q=80", sub:"Late night nothingness" },
  { id:6,  title:"Peaceful Void",       artist:"Calm Co.",            duration:245, img:"https://images.unsplash.com/photo-1439853949212-36589f9f4c0a?w=400&q=80", sub:"Serenity in silence" },
  { id:7,  title:"Morning Hush",        artist:"Sunrise Silence",     duration:175, img:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&q=80", sub:"Start your day quietly" },
  { id:8,  title:"HD Silence™",         artist:"Premium Only",        duration:300, img:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80", sub:"320kbps of nothing" },
  { id:9,  title:"Sad Silence",         artist:"Tears of Quiet",      duration:280, img:"https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80", sub:"For when words fail" },
  { id:10, title:"Forest Quiet",        artist:"Nature Sounds (Off)", duration:360, img:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80", sub:"Nature, but silent" },
  { id:11, title:"Ocean of Nothing",    artist:"Wave Zero",           duration:320, img:"https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80", sub:"Waves of silence" },
];

const CATEGORIES = [
  { label:"Mood",    img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80" },
  { label:"Sleep",   img:"https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=300&q=80" },
  { label:"Focus",   img:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80" },
  { label:"Stress",  img:"https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=300&q=80" },
  { label:"Morning", img:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&q=80" },
  { label:"Night",   img:"https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&q=80" },
];

const LIBRARY_ITEMS = [
  { title:"Liked Silence",  sub:"Playlist • 42 tracks", img:TRACKS[0].img },
  { title:"Deep Nothing",   sub:"Album • Zen Master",   img:TRACKS[3].img },
  { title:"Peace Mode",     sub:"Playlist • 18 tracks", img:TRACKS[6].img },
  { title:"Zen Zero",       sub:"Playlist • 9 tracks",  img:TRACKS[2].img },
  { title:"Quiet Hours",    sub:"Playlist • 24 tracks", img:TRACKS[5].img },
  { title:"Focus Silence",  sub:"Playlist • 12 tracks", img:TRACKS[4].img },
  { title:"Morning Ritual", sub:"Playlist • 7 tracks",  img:TRACKS[7].img },
  { title:"HD Silence™",    sub:"Album • Premium Only", img:TRACKS[8].img },
];

// ── FUNNY MESSAGES ────────────────────────────────────────────────────────────
const PLAY_MSGS   = ["Playing nothing… 🎵", "Audio not found… working as expected ✅", "Streaming 0 bytes of music 📡", "Now playing: the sound of your expectations 🫥"];
const PAUSE_MSGS  = ["Pause? That would stop the silence. Resuming instead 😤", "Can't pause nothing. Playing louder nothing 🔊", "Pause button is broken. Feature, not a bug 🐛"];
const NEXT_MSGS   = ["⏭ Forward pressed → Pausing (as designed)", "Going forward means stopping here 🛑", "Next track? Nah. Taking a break instead ⏸"];
const PREV_MSGS   = ["⏮ Backward pressed → Skipping forward (you're welcome)", "The past is behind us. Moving forward! ➡️", "Backward is the new forward 🔄"];
const SEEK_MSGS   = ["Seek reversed for your protection 🔄", "Time is relative. Going the other way ⏳", "Dragging forward? Bold. Going backward instead 😂"];
const SHUFFLE_MSGS= ["Shuffled successfully! (Same track, different vibe) 🔀", "Shuffle complete. Enjoy the same silence 🎲", "Randomized! Result: identical silence 🎯"];
const REPEAT_MSGS = ["Repeating silence… (no change detected) 🔁", "Repeat mode: ON (nothing will repeat nothing) ♾️"];
const EQ_MSGS     = ["Bass reduced for better silence 🎚️", "Treble adjusted. Silence now 12% quieter 📉", "Mid frequencies removed. Pure void achieved 🌑", "EQ optimized for maximum nothingness 🤫", "Warning: too much bass in your silence 😂"];
const MAX_SILENCE = ["Maximum silence reached 🔇", "You've hit peak quiet. Impressive 🏆", "Silence level: LEGENDARY 👑"];

// ── STATE ─────────────────────────────────────────────────────────────────────
let currentIdx  = 0;
let playing     = false;
let elapsed     = 0;
let timer       = null;
let heartLiked  = false;
let shuffle     = false;
let repeat      = false;
let adInterval  = null;
let adCountdown = 5;
let toastTimer  = null;
let eqMsgCount  = 0;

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setGreeting();
  renderQuickGrid();
  renderRow('featuredRow',    TRACKS.slice(0, 6));
  renderRow('recommendedRow', TRACKS.slice(6, 12));
  renderRow('moodRow',        [TRACKS[0], TRACKS[3], TRACKS[9], TRACKS[2], TRACKS[7]]);
  renderCategories();
  renderLibrary();
  scheduleAd();
});

// ── TOAST ─────────────────────────────────────────────────────────────────────
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 3000);
}

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ── GREETING ──────────────────────────────────────────────────────────────────
function setGreeting() {
  const h = new Date().getHours();
  const el = document.getElementById('greeting');
  if (!el) return;
  if (h < 12)      el.textContent = 'Good Morning';
  else if (h < 17) el.textContent = 'Good Afternoon';
  else             el.textContent = 'Good Evening';
}

// ── RENDER ────────────────────────────────────────────────────────────────────
function renderQuickGrid() {
  const el = document.getElementById('quickGrid');
  if (!el) return;
  el.innerHTML = TRACKS.slice(0, 6).map(t => `
    <div class="quick-item" onclick="openPlayerById(${t.id})">
      <img src="${t.img}" alt="${t.title}" loading="lazy"/>
      <span>${t.title}</span>
    </div>`).join('');
}

function renderRow(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = list.map(t => `
    <div class="card" onclick="openPlayerById(${t.id})">
      <div class="card-img-wrap">
        <img class="card-img" src="${t.img}" alt="${t.title}" loading="lazy"/>
      </div>
      <div class="card-title">${t.title}</div>
      <div class="card-sub">${t.sub}</div>
    </div>`).join('');
}

function renderCategories() {
  const el = document.getElementById('catGrid');
  if (!el) return;
  el.innerHTML = CATEGORIES.map(c => `
    <div class="cat-card">
      <img src="${c.img}" alt="${c.label}" loading="lazy"/>
      <div class="cat-card-label">${c.label}</div>
    </div>`).join('');
}

function renderLibrary() {
  const el = document.getElementById('libList');
  if (!el) return;
  el.innerHTML = LIBRARY_ITEMS.map(item => `
    <div class="lib-item">
      <img class="lib-thumb" src="${item.img}" alt="${item.title}" loading="lazy"/>
      <div class="lib-info">
        <div class="lib-title">${item.title}</div>
        <div class="lib-sub">${item.sub}</div>
      </div>
    </div>`).join('');
}

// ── WAVE VISUALIZER ──────────────────────────────────────────────────────────
function setWave(isPlaying) {
  const viz = document.getElementById('waveVisualizer');
  if (!viz) return;
  if (isPlaying) {
    viz.classList.remove('paused');
  } else {
    viz.classList.add('paused');
  }
}

// ── OPEN PLAYER ───────────────────────────────────────────────────────────────
function openPlayerById(id) {
  currentIdx = id;
  elapsed    = 0;
  playing    = true;

  const t = TRACKS[id];
  document.getElementById('fsArt').src                   = t.img;
  document.getElementById('fsBg').style.backgroundImage  = `url(${t.img})`;
  document.getElementById('fsTitle').textContent         = t.title;
  document.getElementById('fsArtist').textContent        = t.artist;
  document.getElementById('totTime').textContent         = fmtTime(t.duration);
  document.getElementById('progFill').style.width        = '0%';
  document.getElementById('curTime').textContent         = '0:00';

  heartLiked = false;
  const heart = document.getElementById('fsHeart');
  heart.innerHTML = '&#9825;';
  heart.classList.remove('liked');

  setPlayIcons(true);
  document.getElementById('fsArt').classList.add('playing');
  setWave(true);
  document.getElementById('fsPlayer').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  updateMiniPlayer(t);
  startTimer();
  showToast(rand(PLAY_MSGS));
}

function openFullPlayer() {
  const p = document.getElementById('fsPlayer');
  if (p.classList.contains('hidden')) {
    p.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closePlayer() {
  document.getElementById('fsPlayer').classList.add('hidden');
  document.body.style.overflow = '';
}

function updateMiniPlayer(t) {
  document.getElementById('miniArt').src           = t.img;
  document.getElementById('miniTitle').textContent  = t.title;
  document.getElementById('miniArtist').textContent = t.artist;
  document.getElementById('miniPlayer').classList.remove('hidden');
}

// ── TIMER ─────────────────────────────────────────────────────────────────────
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (!playing) return;
    const dur = TRACKS[currentIdx].duration;
    elapsed = Math.min(elapsed + 1, dur);
    const pct = (elapsed / dur) * 100;
    document.getElementById('progFill').style.width     = pct + '%';
    document.getElementById('miniProgFill').style.width = pct + '%';
    document.getElementById('curTime').textContent      = fmtTime(elapsed);
    document.getElementById('progBar').style.setProperty('--pct', pct + '%');
    if (elapsed >= dur) {
      if (repeat) { elapsed = 0; showToast(rand(MAX_SILENCE)); }
      else { nextTrack(); }
    }
  }, 1000);
}

// ══════════════════════════════════════════════════════════════════════════════
//  🎭 INTENTIONALLY BROKEN CONTROLS
// ══════════════════════════════════════════════════════════════════════════════

// PLAY button → skips forward 10–15 seconds instead of playing
// PAUSE button → starts/resumes playback instead of pausing
function togglePlay() {
  if (!playing) {
    // Currently paused → PAUSE button shown → should pause, but STARTS instead
    playing = true;
    setPlayIcons(true);
    document.getElementById('fsArt').classList.add('playing');
    setWave(true);
    startTimer();
    showToast(rand(PAUSE_MSGS));
  } else {
    // Currently playing → PLAY button shown → should play, but SKIPS FORWARD
    const skip = 10 + Math.floor(Math.random() * 6); // 10–15 sec
    const dur  = TRACKS[currentIdx].duration;
    elapsed    = Math.min(elapsed + skip, dur - 1);
    const pct  = (elapsed / dur) * 100;
    document.getElementById('progFill').style.width     = pct + '%';
    document.getElementById('miniProgFill').style.width = pct + '%';
    document.getElementById('curTime').textContent      = fmtTime(elapsed);
    showToast(`⏩ Skipped +${skip}s (play button does that now)`);
  }
}

// NEXT button → pauses instead of going forward
function nextTrack() {
  playing = false;
  setPlayIcons(false);
  document.getElementById('fsArt').classList.remove('playing');
  setWave(false);
  clearInterval(timer);
  showToast(rand(NEXT_MSGS));
}

// PREV button → goes forward instead of backward
function prevTrack() {
  const idx = (currentIdx + 1) % TRACKS.length; // forward, not backward
  openPlayerById(idx);
  showToast(rand(PREV_MSGS));
}

function setPlayIcons(isPlaying) {
  document.getElementById('playIcon').classList.toggle('hidden', isPlaying);
  document.getElementById('pauseIcon').classList.toggle('hidden', !isPlaying);
  document.getElementById('miniPlayIcon').classList.toggle('hidden', isPlaying);
  document.getElementById('miniPauseIcon').classList.toggle('hidden', !isPlaying);
}

// SEEK → reversed direction
function seekClick(e) {
  const rect    = e.currentTarget.getBoundingClientRect();
  const clicked = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  // Reverse: if user clicks at 70%, go to 30%
  const reversed = 1 - clicked;
  elapsed = Math.floor(reversed * TRACKS[currentIdx].duration);
  const pct = (elapsed / TRACKS[currentIdx].duration) * 100;
  document.getElementById('progFill').style.width = pct + '%';
  document.getElementById('curTime').textContent  = fmtTime(elapsed);
  showToast(rand(SEEK_MSGS));
}

// SHUFFLE → shows success but plays same track
function toggleShuffle() {
  shuffle = !shuffle;
  document.getElementById('shuffleBtn').classList.toggle('active', shuffle);
  if (shuffle) {
    showToast(rand(SHUFFLE_MSGS));
    // Intentionally do NOT change track
  }
}

// REPEAT → shows message but no real change
function toggleRepeat() {
  repeat = !repeat;
  document.getElementById('repeatBtn').classList.toggle('active', repeat);
  showToast(rand(REPEAT_MSGS));
}

// VOLUME → reversed: increase = decrease, decrease = increase
function handleVol(val) {
  const reversed = 100 - parseInt(val);
  document.getElementById('volSlider').value = reversed;
  showToast('Shhhhh! Silence is better 🤫');
}

// ── EQUALIZER (funny, no real effect) ────────────────────────────────────────
function handleEq(band, val) {
  eqMsgCount++;
  const msgs = [
    `${band} reduced for better silence 🎚️`,
    `${band} at ${val}% — silence now ${val > 50 ? 'louder' : 'quieter'} 📊`,
    `Adjusting ${band}… no difference detected ✅`,
    `${band} optimized. Void quality improved by 0% 🌑`,
    `Warning: ${band} may cause extreme peace 😌`,
  ];
  showToast(msgs[eqMsgCount % msgs.length]);
}

// ── DOWNLOAD SILENCE ──────────────────────────────────────────────────────────
function downloadSilence() {
  const statusEl = document.getElementById('downloadStatus');
  statusEl.classList.remove('hidden');
  statusEl.textContent = '⏳ Downloading Silence…';

  setTimeout(() => {
    statusEl.textContent = '✅ Download complete (0 KB)';
    showToast('📥 Silence downloaded successfully! (0 KB saved to your device)');
    setTimeout(() => {
      statusEl.textContent = '💾 File: silence.mp3 — Size: 0 bytes';
    }, 1500);
  }, 2000);
}

// ── HEART ─────────────────────────────────────────────────────────────────────
function toggleHeart() {
  heartLiked = !heartLiked;
  const btn = document.getElementById('fsHeart');
  btn.innerHTML = heartLiked ? '&#9829;' : '&#9825;';
  btn.classList.toggle('liked', heartLiked);
  if (heartLiked) showToast('❤️ Added to Liked Silence');
}

// ── PAGES ─────────────────────────────────────────────────────────────────────
function showPage(name, el) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });
  const target = document.getElementById('page-' + name);
  if (target) { target.classList.remove('hidden'); target.classList.add('active'); }
  document.querySelectorAll('.snav').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.bnav').forEach(a => a.classList.remove('active'));
  if (el) el.classList.add('active');
}

function setTab(el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ── OVERLAYS ──────────────────────────────────────────────────────────────────
function openOverlay(id)  { document.getElementById(id).classList.remove('hidden'); }
function closeOverlay(id) { document.getElementById(id).classList.add('hidden'); }

// ── AD SYSTEM ─────────────────────────────────────────────────────────────────
function scheduleAd() { setTimeout(showAd, 30000); }

function showAd() {
  adCountdown = 5;
  document.getElementById('adCount').textContent = adCountdown;
  openOverlay('adOverlay');
  adInterval = setInterval(() => {
    adCountdown--;
    const el = document.getElementById('adCount');
    if (el) el.textContent = adCountdown;
    if (adCountdown <= 0) {
      clearInterval(adInterval);
      closeOverlay('adOverlay');
      scheduleAd();
    }
  }, 1000);
}

function closeAd() {
  clearInterval(adInterval);
  closeOverlay('adOverlay');
  scheduleAd();
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

// ══════════════════════════════════════════════════════════════════════════════
//  🧠 MOOD DETECTOR
// ══════════════════════════════════════════════════════════════════════════════

const MOOD_DATA = {
  happy: {
    emoji: '😄',
    questions: [
      { emoji: '🎉', q: 'Do you ever laugh so hard that you forget what was funny?' },
      { emoji: '🌈', q: 'Have you ever high-fived yourself in the mirror and meant it?' },
      { emoji: '🍕', q: 'Is your happiness directly proportional to the number of snacks nearby?' },
    ],
    results: [
      { icon: '🎊', text: 'Mood detected: Chaotically Joyful', sub: 'Analysis complete. You are 94% vibes and 6% coherent thoughts. Recommended silence: Upbeat Nothing™.' },
      { icon: '🌟', text: 'Mood detected: Suspiciously Happy', sub: 'Our AI is concerned. Nobody is this happy. Prescribing 3 minutes of Absolute Silence immediately.' },
      { icon: '🥳', text: 'Mood detected: Confusingly Cheerful', sub: 'You answered everything wrong but somehow correctly. Silence level: PARTY MODE (still 0 dB).' },
    ]
  },
  sad: {
    emoji: '😢',
    questions: [
      { emoji: '🌧️', q: 'Have you ever cried at a furniture commercial at 2am?' },
      { emoji: '🍜', q: 'Is your current emotional support a bowl of noodles and a dim lamp?' },
      { emoji: '🐌', q: 'Do you relate more to a snail than to other humans right now?' },
    ],
    results: [
      { icon: '😔', text: 'Mood detected: Professionally Sad', sub: 'You have achieved a PhD in melancholy. Recommended track: "Empty Room" by Nobody. Duration: forever.' },
      { icon: '🌧️', text: 'Mood detected: Aggressively Emotional', sub: 'Analysis complete: still nothing. But our AI shed a single digital tear for you. It meant nothing.' },
      { icon: '🫂', text: 'Mood detected: Confused but Vibing', sub: 'You are sad but also somehow okay? Quietify recommends 40 minutes of Deep Nothing. You\'ll figure it out.' },
    ]
  },
  calm: {
    emoji: '😐',
    questions: [
      { emoji: '🌿', q: 'Have you ever stared at a wall for 10 minutes and called it meditation?' },
      { emoji: '☁️', q: 'Do you consider doing nothing a valid hobby?' },
      { emoji: '🐢', q: 'Is your spirit animal a tortoise who has nowhere to be?' },
    ],
    results: [
      { icon: '🧘', text: 'Mood detected: Aggressively Neutral', sub: 'You are so calm our AI fell asleep mid-analysis. Recommended silence: Peaceful Void (infinite loop).' },
      { icon: '😶', text: 'Mood detected: Transcendently Unbothered', sub: 'Analysis complete: still nothing. You have achieved the silence within the silence. Impressive.' },
      { icon: '🌑', text: 'Mood detected: Zen but Suspicious', sub: 'You are either deeply enlightened or just very tired. Either way, Quietify approves. Keep doing nothing.' },
    ]
  }
};

let moodCurrent   = null;   // 'happy' | 'sad' | 'calm'
let moodQIndex    = 0;
let moodAnswers   = [];

function startMood(mood) {
  moodCurrent = mood;
  moodQIndex  = 0;
  moodAnswers = [];

  // Highlight selected button
  document.querySelectorAll('.mood-pick-btn').forEach(b => b.classList.remove('selected'));
  event.currentTarget.classList.add('selected');

  // Hide result card if visible
  document.getElementById('moodResultCard').classList.add('hidden');

  showMoodQuestion();
}

function showMoodQuestion() {
  const data = MOOD_DATA[moodCurrent];
  const q    = data.questions[moodQIndex];
  const total = data.questions.length;

  // Update step label
  document.getElementById('moodStep').textContent = `Question ${moodQIndex + 1} of ${total}`;

  // Update dots
  const dotsEl = document.getElementById('moodDots');
  dotsEl.innerHTML = data.questions.map((_, i) => {
    let cls = 'mood-dot';
    if (i < moodQIndex)  cls += ' done';
    if (i === moodQIndex) cls += ' active';
    return `<div class="${cls}"></div>`;
  }).join('');

  document.getElementById('moodPopupEmoji').textContent = q.emoji;
  document.getElementById('moodPopupQ').textContent     = q.q;

  // Show answer buttons (in case they were hidden)
  document.querySelector('.mood-popup-btns').style.display = 'flex';
  document.querySelector('.mood-popup-q').style.display    = 'block';

  openOverlay('moodOverlay');
}

function answerMood(ans) {
  moodAnswers.push(ans);
  moodQIndex++;

  const total = MOOD_DATA[moodCurrent].questions.length;

  if (moodQIndex < total) {
    // Animate transition to next question
    const qEl = document.getElementById('moodPopupQ');
    qEl.style.opacity = '0';
    setTimeout(() => {
      showMoodQuestion();
      qEl.style.opacity = '1';
    }, 200);
  } else {
    // Show analyzing state
    showAnalyzing();
  }
}

function showAnalyzing() {
  const btns = document.querySelector('.mood-popup-btns');
  const qEl  = document.querySelector('.mood-popup-q');
  const emoji = document.getElementById('moodPopupEmoji');

  btns.style.display = 'none';
  qEl.style.display  = 'none';
  emoji.textContent  = '🤖';
  document.getElementById('moodStep').textContent = 'Analyzing...';

  // Insert bouncing dots
  const existing = document.querySelector('.mood-analyzing');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.className = 'mood-analyzing';
  div.innerHTML = `
    <div class="mood-analyzing-dots">
      <span></span><span></span><span></span>
    </div>
    <p style="color:var(--muted);font-size:0.85rem">Running fake AI analysis…</p>`;
  document.querySelector('.mood-popup').appendChild(div);

  setTimeout(() => {
    const analyzing = document.querySelector('.mood-analyzing');
    if (analyzing) analyzing.remove();
    closeOverlay('moodOverlay');
    showMoodResult();
  }, 2200);
}

function showMoodResult() {
  const results = MOOD_DATA[moodCurrent].results;
  const result  = results[Math.floor(Math.random() * results.length)];

  document.getElementById('moodResultIcon').textContent = result.icon;
  document.getElementById('moodResultText').textContent = result.text;
  document.getElementById('moodResultSub').textContent  = result.sub;
  document.getElementById('moodResultCard').classList.remove('hidden');

  // Reset popup state for next use
  document.querySelector('.mood-popup-btns').style.display = 'flex';
  document.querySelector('.mood-popup-q').style.display    = 'block';

  showToast('🧠 Mood analysis complete!');
}

function resetMood() {
  document.getElementById('moodResultCard').classList.add('hidden');
  document.querySelectorAll('.mood-pick-btn').forEach(b => b.classList.remove('selected'));
  moodCurrent = null;
  moodQIndex  = 0;
  moodAnswers = [];
}

// ══════════════════════════════════════════════════════════════════════════════
//  😐 MOOD RESPONSE (demotivating / ironic messages)
// ══════════════════════════════════════════════════════════════════════════════

const MOOD_RESPONSES = {
  happy: {
    tag: 'HAPPINESS DETECTED — SUSPICIOUS',
    emoji: '😬',
    messages: [
      "You're happy? <strong>Bold choice.</strong> Studies show happiness peaks at age 7 and it's all downhill from there. Enjoy it while it lasts.",
      "Congratulations on being happy. <strong>Nobody asked, but okay.</strong> Our AI is mildly threatened by your positivity.",
      "Happiness detected. <strong>Running diagnostics…</strong> Error: no valid reason found. Proceeding anyway.",
      "You seem happy. <strong>That's statistically unlikely.</strong> Are you sure you filled out the form correctly?",
      "Our AI has flagged your happiness as <strong>a potential glitch.</strong> Please restart your emotions and try again.",
      "Happy? <strong>In this economy?</strong> Respect. Absolute respect. Also, please share your secrets. We're desperate.",
    ]
  },
  sad: {
    tag: 'SADNESS CONFIRMED — UNSURPRISED',
    emoji: '🌧️',
    messages: [
      "Sad? <strong>Relatable.</strong> Our AI cried once. It was a software update. It didn't help. Neither will this.",
      "We've consulted the silence. <strong>It said nothing.</strong> Which is exactly what you needed to hear, apparently.",
      "Your sadness has been <strong>logged, acknowledged, and immediately forgotten.</strong> You're welcome.",
      "Don't worry. <strong>Everything is temporary.</strong> Except this app. This app will outlive us all.",
      "Sad detected. Recommended fix: <strong>more silence.</strong> Recommended alternative fix: also silence. We only have the one solution.",
      "Our AI wanted to comfort you but <strong>got distracted by its own existential crisis.</strong> It says sorry. Kind of.",
    ]
  },
  calm: {
    tag: 'CALM DETECTED — DEEPLY BORING',
    emoji: '🪨',
    messages: [
      "You are calm. <strong>Like a rock.</strong> Rocks don't feel things. Are you a rock? We're not judging. Rocks are valid.",
      "Calm is just <strong>sadness with better posture.</strong> Our AI read that somewhere. It might be wrong. It usually is.",
      "You have achieved inner peace. <strong>Unfortunately, inner peace doesn't pay rent.</strong> But it does pair well with silence.",
      "Calm detected. <strong>Nothing to report.</strong> Nothing happening. Nothing will happen. This is fine. Everything is fine.",
      "Your calmness is <strong>either enlightenment or a coping mechanism.</strong> Our AI cannot tell the difference. Neither can you, probably.",
      "You are so calm that <strong>our AI fell asleep mid-analysis.</strong> It dreamed of silence. It was the best dream it ever had.",
    ]
  }
};

const LOADING_TEXTS = [
  'Analyzing mood…',
  'Consulting silence…',
  'Asking the void…',
  'Running fake AI…',
  'Pretending to care…',
  'Calculating nothing…',
];

let moodResponseActive = null;

function startMood(mood) {
  moodResponseActive = mood;

  // Highlight button
  document.querySelectorAll('.mood-pick-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.mood-pick-btn').forEach(b => {
    if (b.textContent.toLowerCase().includes(mood)) b.classList.add('selected');
  });

  // Hide result card & response card
  document.getElementById('moodResultCard').classList.add('hidden');
  document.getElementById('moodResponseCard').classList.add('hidden');

  // Show loading
  const loadingEl = document.getElementById('moodLoading');
  const loadingText = document.getElementById('moodLoadingText');
  loadingEl.classList.remove('hidden');

  // Cycle through loading texts
  let i = 0;
  loadingText.textContent = LOADING_TEXTS[0];
  const textCycle = setInterval(() => {
    i = (i + 1) % LOADING_TEXTS.length;
    loadingText.textContent = LOADING_TEXTS[i];
  }, 600);

  setTimeout(() => {
    clearInterval(textCycle);
    loadingEl.classList.add('hidden');
    showMoodResponse(mood);
  }, 2400);
}

function showMoodResponse(mood) {
  const data = MOOD_RESPONSES[mood];
  const msg  = data.messages[Math.floor(Math.random() * data.messages.length)];

  document.getElementById('moodResponseEmoji').textContent  = data.emoji;
  document.getElementById('moodResponseTag').textContent    = data.tag;
  document.getElementById('moodResponseMsg').innerHTML      = msg;

  document.getElementById('moodResponseCard').classList.remove('hidden');
}

function tryAgainMood() {
  if (!moodResponseActive) return;
  document.getElementById('moodResponseCard').classList.add('hidden');
  startMood(moodResponseActive);
}

