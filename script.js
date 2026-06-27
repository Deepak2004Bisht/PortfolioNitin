/* ==========================================================
   AARAV portfolio — vanilla JS
   ========================================================== */

/* ---------- Helpers ---------- */
const $  = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

/* ---------- Loading screen ---------- */
window.addEventListener('load', () => {
  setTimeout(() => $('#loader').classList.add('hidden'), 600);
});

/* ---------- Year ---------- */
$('#year').textContent = new Date().getFullYear();

/* ---------- Custom cursor ---------- */
(() => {
  const c = $('#cursor'), d = $('#cursorDot');
  if (matchMedia('(max-width:900px)').matches) return;
  let x = 0, y = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; });
  const loop = () => { cx += (x - cx) * .18; cy += (y - cy) * .18; c.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
  loop();
  $$('a,button,.tile,.vcard,.reel,.filter').forEach(el => {
    el.addEventListener('mouseenter', () => c.classList.add('hover'));
    el.addEventListener('mouseleave', () => c.classList.remove('hover'));
  });
})();

/* ---------- Scroll progress + sticky navbar + active section ---------- */
const nav = $('#navbar'), bar = $('#scrollProgress'), toTop = $('#toTop');
const sections = $$('section[id]');
const navLinks = $$('.nav-link');

window.addEventListener('scroll', () => {
  const sc = window.scrollY;
  const h  = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = `${(sc / h) * 100}%`;
  nav.classList.toggle('scrolled', sc > 40);
  toTop.classList.toggle('show', sc > 600);

  let cur = sections[0]?.id;
  sections.forEach(s => { if (sc + 120 >= s.offsetTop) cur = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
});

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Mobile menu ---------- */
const burger = $('#hamburger'), links = $('#navLinks');
burger.addEventListener('click', () => { burger.classList.toggle('active'); links.classList.toggle('open'); });
navLinks.forEach(l => l.addEventListener('click', () => { burger.classList.remove('active'); links.classList.remove('open'); }));

/* ---------- Reveal on scroll + masonry tiles ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); en.target.classList.add('show'); io.unobserve(en.target); } });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

const observeReveals = () => $$('.reveal,.tile').forEach(el => io.observe(el));

/* ---------- Particles ---------- */
(() => {
  const p = $('#particles');
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDuration = 8 + Math.random() * 12 + 's';
    s.style.animationDelay = -Math.random() * 20 + 's';
    s.style.opacity = .2 + Math.random() * .5;
    p.appendChild(s);
  }
})();

/* ---------- Hero parallax ---------- */
const par = $('[data-parallax]');
document.addEventListener('mousemove', e => {
  if (!par) return;
  const x = (e.clientX / innerWidth - .5) * 20;
  const y = (e.clientY / innerHeight - .5) * 20;
  par.style.transform = `translate(${x}px,${y}px)`;
});

/* ---------- Counter animation ---------- */
const counters = $$('[data-count]');
const cio = new IntersectionObserver(es => {
  es.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, target = +el.dataset.count;
    let v = 0, step = Math.max(1, target / 60);
    const tick = () => { v += step; if (v >= target) { el.textContent = target + '+'; return; } el.textContent = Math.floor(v); requestAnimationFrame(tick); };
    tick(); cio.unobserve(el);
  });
}, { threshold: .5 });
counters.forEach(c => cio.observe(c));

/* ==========================================================
   DATA
   ========================================================== */
const palettes = ['8b5cf6,3b82f6','ec4899,8b5cf6','3b82f6,06b6d4','f59e0b,ef4444','22c55e,3b82f6','ec4899,f59e0b','8b5cf6,06b6d4','3b82f6,8b5cf6'];
const svgArt = (i, w = 600, h = 400, label = '') => {
  const [a, b] = palettes[i % palettes.length].split(',');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'>
    <defs><linearGradient id='g${i}' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='%23${a}'/><stop offset='100%' stop-color='%23${b}'/></linearGradient></defs>
    <rect width='${w}' height='${h}' fill='url(%23g${i})'/>
    <circle cx='${w * .3}' cy='${h * .35}' r='${h * .25}' fill='rgba(255,255,255,.15)'/>
    <circle cx='${w * .75}' cy='${h * .7}' r='${h * .35}' fill='rgba(0,0,0,.2)'/>
    <text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' fill='rgba(255,255,255,.85)' font-family='Space Grotesk, sans-serif' font-weight='700' font-size='${Math.min(w, h) * .12}'>${label}</text>
  </svg>`;
  return `url("data:image/svg+xml;utf8,${svg.replace(/\n/g, '')}")`;
};

const videos = [
   {
    title: "Brand Film",
    desc: "Cinematic brand film.",
    duration: "1:24",
    src: "hori. video/saas.mp4"
  },
  {
    title: "YouTube Edit",
    desc: "Professional YouTube editing.",
    duration: "8:42",
    src: "hori. video/saas 01.mp4"
  },
  {
    title: "Product Promo",
    desc: "Product advertisement.",
    duration: "0:48",
    src: "hori. video/spotify.mp4"
  },
  {
    title: "Product Promo",
    desc: "Product advertisement.",
    duration: "0:48",
    src: "hori. video/motion.mp4"
  }
];

const reels = [
  {
    t: "Behind the Design",
    dur: "0:18",
    src: "Reels/documtry.mp4"
  },
  {
    t: "Logo Speed Reveal",
    dur: "0:24",
    src: "assets/reels/reel2.mp4"
  },
  {
    t: "Color Theory Tip",
    dur: "0:32",
    src: "assets/reels/reel3.mp4"
  },
  {
    t: "Photoshop in 60s",
    dur: "0:58",
    src: "assets/reels/reel4.mp4"
  },
  {
    t: "Premiere Shortcuts",
    dur: "0:42",
    src: "assets/reels/reel5.mp4"
  },
  {
    t: "Brand Mood Reel",
    dur: "0:36",
    src: "assets/reels/reel6.mp4"
  }
];

const galleryCats = ['branding','social','logo','poster','thumbnail','banner','flyer','branding','poster','social','logo','thumbnail','banner','flyer','social','branding'];
const galleryLabels = ['Brand','Social','Logo','Poster','Thumb','Banner','Flyer','Identity','Cover','Story','Mark','Hero','Web','Print','Post','System'];

const services = [
  { i: '🎨', t: 'Graphic Design',     d: 'Posters, layouts and print collateral with personality.' },
  { i: '🎬', t: 'Video Editing',      d: 'Story-led edits with rhythm, color and clean sound.' },
  { i: '✏️', t: 'Logo Design',        d: 'Marks built to scale — from favicon to billboard.' },
  { i: '🖼️', t: 'Thumbnail Design',   d: 'Click-worthy YouTube thumbnails that perform.' },
  { i: '✨', t: 'Motion Graphics',    d: 'Kinetic type, intros, lower-thirds, transitions.' },
  { i: '📱', t: 'Social Media Design',d: 'Templates, carousels and reels that stay on-brand.' },
  { i: '🪄', t: 'Brand Identity',     d: 'End-to-end systems: logo, palette, type and guidelines.' },
];

const testimonials = [
  { n: 'Priya Mehta',   r: 'Founder, Lumen Co.',  q: 'Aarav delivered a launch film that exceeded every expectation. Crisp, on-brand, and on time.', a: 'PM' },
  { n: 'Rohan Iyer',    r: 'Creator, 480k subs',   q: 'My thumbnails CTR jumped overnight. The edits are clean, fast and feel premium.',                   a: 'RI' },
  { n: 'Sara Khan',     r: 'Marketing Lead, Aura', q: 'The brand system is genuinely beautiful. Our team finally has assets we love using.',               a: 'SK' },
  { n: 'David O\'Neil', r: 'CMO, Northwind',       q: 'Reliable, creative and proactive. Easily the best freelance designer we\'ve worked with.',           a: 'DO' },
];

const socials = [
  { n: 'Instagram', a: '@aarav.designs',   k: 'IG' },
  { n: 'YouTube',   a: '@aaravedits',      k: 'YT' },
  { n: 'LinkedIn',  a: 'in/aaravsharma',   k: 'IN' },
  { n: 'Behance',   a: 'be/aaravsharma',   k: 'BE' },
  { n: 'Dribbble',  a: '@aarav',           k: 'DR' },
  { n: 'Facebook',  a: '/aarav.designs',   k: 'FB' },
];

/* ==========================================================
   Render: Videos
   ========================================================== */
const videoTrack = document.getElementById("videoTrack");

videos.forEach(video => {

    const card = document.createElement("article");
    card.className = "vcard";

    card.innerHTML = `
        <div class="vmedia">

            <video class="portfolio-video" controls preload="metadata">
                <source src="${video.src}" type="video/mp4">
            </video>

        </div>

        <div class="vinfo">
            <h3>${video.title}</h3>
            <p>${video.desc}</p>

            <div class="vmeta">
                <span>Featured</span>
                <span>${video.duration}</span>
            </div>

        </div>
    `;

    videoTrack.appendChild(card);

});


/* ==========================================================
   Render: Reels (auto-slide + drag)
   ========================================================== */
const reelTrack = $('#reelTrack');

reels.forEach((r) => {

    const el = document.createElement('article');
    el.className = 'reel';

    el.innerHTML = `

        <video class="reel-video" muted loop playsinline preload="metadata">

            <source src="${r.src}" type="video/mp4">

        </video>

        <div class="play-center">
            <button aria-label="Play">▶</button>
        </div>

        <div class="reel-overlay">

            <div class="top-row">

                <span>@aarav.designs</span>

                <span class="dur">${r.dur}</span>

            </div>

            <div class="bot-row">

                <div class="reel-title">${r.t}</div>

                <div class="actions">

                    <button data-act="like">♥</button>

                    <button data-act="share">↗</button>

                    <button data-act="mute">🔇</button>

                    <button data-act="full">⛶</button>

                </div>

            </div>

        </div>

    `;

    reelTrack.appendChild(el);

    const video = el.querySelector(".reel-video");

    function stopAllVideos(){

        document.querySelectorAll(".reel-video").forEach(v=>{

            v.pause();

            v.currentTime=0;

        });

        document.querySelectorAll(".reel").forEach(card=>{

            card.classList.remove("playing");

        });

    }

    el.querySelector(".play-center button").addEventListener("click",()=>{

        stopAllVideos();

        video.play();

        el.classList.add("playing");

    });

    el.querySelectorAll(".actions button").forEach(btn=>{

        btn.addEventListener("click",(e)=>{

            e.stopPropagation();

            const action=btn.dataset.act;

            if(action==="like"){

                btn.classList.toggle("liked");

            }

            if(action==="mute"){

                video.muted=!video.muted;

                btn.textContent=video.muted ? "🔇" : "🔊";

            }

            if(action==="full"){

                video.requestFullscreen();

            }

            if(action==="share"){

                if(navigator.share){

                    navigator.share({

                        title:r.t,

                        url:location.href

                    });

                }

            }

        });

    });

});

/* Horizontal scroll buttons */
$$('.hscroll-btn').forEach(b => b.addEventListener('click', () => {
  const t = $('#' + b.dataset.target);
  const step = t.clientWidth * .8;
  t.scrollBy({ left: b.classList.contains('next') ? step : -step, behavior: 'smooth' });
}));

/* Reels auto-slide + pause on hover + drag */
(() => {
  const t = reelTrack;
  let timer, paused = false;
  const tick = () => {
    if (paused) return;
    const max = t.scrollWidth - t.clientWidth;
    if (t.scrollLeft + 5 >= max) t.scrollTo({ left: 0, behavior: 'smooth' });
    else t.scrollBy({ left: 280, behavior: 'smooth' });
  };
  timer = setInterval(tick, 5000);
  t.addEventListener('mouseenter', () => paused = true);
  t.addEventListener('mouseleave', () => paused = false);

  // drag to scroll
  let down = false, sx = 0, sl = 0;
  t.addEventListener('mousedown', e => { down = true; sx = e.pageX; sl = t.scrollLeft; t.style.cursor = 'grabbing'; });
  ['mouseup','mouseleave'].forEach(ev => t.addEventListener(ev, () => { down = false; t.style.cursor = ''; }));
  t.addEventListener('mousemove', e => { if (!down) return; e.preventDefault(); t.scrollLeft = sl - (e.pageX - sx); });
})();

/* ==========================================================
   Render: Gallery + filter + lightbox
   ========================================================== */
const masonry = $('#masonry');
const tiles = [];
galleryCats.forEach((cat, i) => {
  const h = 240 + (i * 53) % 220;
  const el = document.createElement('div');
  el.className = 'tile reveal';
  el.dataset.cat = cat;
  el.dataset.idx = i;
  el.innerHTML = `
    <div class="art" style="background:${svgArt(i, 600, h, galleryLabels[i])};height:${h}px"></div>
    <div class="ov"><div><span>${cat}</span><h4>${galleryLabels[i]} Project</h4></div></div>`;
  masonry.appendChild(el);
  tiles.push(el);
});

/* Filter */
$$('.filter').forEach(b => b.addEventListener('click', () => {
  $$('.filter').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  const f = b.dataset.filter;
  tiles.forEach(t => {
    const show = f === 'all' || t.dataset.cat === f;
    t.style.display = show ? '' : 'none';
  });
}));

/* Lightbox */
const lb = $('#lightbox'), lbStage = $('#lbStage');
let lbIdx = 0, lbVisible = [];
const openLb = (idx) => {
  lbVisible = tiles.filter(t => t.style.display !== 'none');
  lbIdx = lbVisible.findIndex(t => +t.dataset.idx === +idx);
  render();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
};
const render = () => {
  const t = lbVisible[lbIdx];
  const art = t.querySelector('.art');
  const div = document.createElement('div');
  div.style.cssText = `width:min(900px,90vw);height:min(600px,70vh);background:${art.style.background};background-size:cover;background-position:center;border-radius:18px;`;
  lbStage.innerHTML = ''; lbStage.appendChild(div);
};
const move = (d) => { lbIdx = (lbIdx + d + lbVisible.length) % lbVisible.length; render(); };
$('#lbClose').addEventListener('click', () => { lb.classList.remove('open'); document.body.style.overflow = ''; });
$('#lbPrev').addEventListener('click', () => move(-1));
$('#lbNext').addEventListener('click', () => move(1));
lb.addEventListener('click', e => { if (e.target === lb) { lb.classList.remove('open'); document.body.style.overflow = ''; } });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') $('#lbClose').click();
  if (e.key === 'ArrowLeft') move(-1);
  if (e.key === 'ArrowRight') move(1);
});
tiles.forEach(t => t.addEventListener('click', () => openLb(t.dataset.idx)));

/* ==========================================================
   Render: Services
   ========================================================== */
const sg = $('#servicesGrid');
services.forEach(s => {
  const el = document.createElement('article');
  el.className = 'svc reveal';
  el.innerHTML = `<div class="svc-icon">${s.i}</div><h3>${s.t}</h3><p>${s.d}</p>`;
  sg.appendChild(el);
});

/* ==========================================================
   Render: Testimonials slider
   ========================================================== */
const tt = $('#testiTrack'), td = $('#testiDots');
testimonials.forEach((t, i) => {
  const el = document.createElement('div');
  el.className = 'testi';
  el.innerHTML = `
    <div class="testi-card">
      <div class="av">${t.a}</div>
      <div class="stars">★ ★ ★ ★ ★</div>
      <p class="quote">"${t.q}"</p>
      <h4>${t.n}</h4><span>${t.r}</span>
    </div>`;
  tt.appendChild(el);
  const dot = document.createElement('button');
  dot.className = 'tdot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => go(i));
  td.appendChild(dot);
});
let ti = 0;
const dots = $$('.tdot');
const go = (i) => { ti = i; tt.style.transform = `translateX(-${i * 100}%)`; dots.forEach((d, k) => d.classList.toggle('active', k === i)); };
setInterval(() => go((ti + 1) % testimonials.length), 6000);

/* ==========================================================
   Render: Social
   ========================================================== */
const so = $('#socialGrid');
socials.forEach(s => {
  const el = document.createElement('a');
  el.className = 'soc reveal';
  el.href = '#'; el.target = '_blank'; el.rel = 'noopener';
  el.innerHTML = `<div class="soc-icon">${s.k}</div><div><div class="name">${s.n}</div><div class="at">${s.a}</div></div><button class="follow">Follow</button>`;
  so.appendChild(el);
});

/* ==========================================================
   Contact form
   ========================================================== */
const form = $('#contactForm'), msg = $('#formMsg'), submit = $('#submitBtn');
form.addEventListener('submit', e => {
  e.preventDefault();
  msg.textContent = ''; msg.className = 'form-msg';
  let ok = true;
  $$('.field', form).forEach(f => f.classList.remove('err'));
  ['name','email','subject','message'].forEach(name => {
    const inp = form.elements[name];
    if (!inp.value.trim()) { inp.closest('.field').classList.add('err'); ok = false; }
  });
  const email = form.elements.email.value.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { form.elements.email.closest('.field').classList.add('err'); ok = false; }
  if (!ok) { msg.textContent = 'Please fix the highlighted fields.'; msg.classList.add('err'); return; }

  submit.classList.add('loading');
  setTimeout(() => {
    submit.classList.remove('loading');
    msg.textContent = '✓ Thanks! Your message has been sent.';
    msg.classList.add('ok');
    form.reset();
  }, 1200);
});

/* ---------- Observe everything once it's in the DOM ---------- */
observeReveals();
