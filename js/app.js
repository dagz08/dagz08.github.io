
// ── Three.js setup ───────────────────────────────────────
const canvas = document.getElementById('threeCanvas');
function W() { return canvas.clientWidth }
function H() { return canvas.clientHeight }

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(W(), H());

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(48, W() / H(), 0.1, 200);
camera.position.set(0, 10, 13);
camera.lookAt(0, 0, 0);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dl = new THREE.DirectionalLight(0xffffff, 1.0); dl.position.set(4, 8, 5); scene.add(dl);
const pl1 = new THREE.PointLight(0x2dd4aa, 2.5, 30); pl1.position.set(-3, 2, 4); scene.add(pl1);
const pl2 = new THREE.PointLight(0x3b82f6, 1.3, 24); pl2.position.set(5, -2, 3); scene.add(pl2);

// ── Canvas badge drawing ─────────────────────────────────
function makeTex(cfg) {
  const S = 256, cx = 128, cy = 128;
  const cv = document.createElement('canvas'); cv.width = cv.height = S;
  const c = cv.getContext('2d');

  // glow
  const g = c.createRadialGradient(cx, cy, 0, cx, cy, 110);
  g.addColorStop(0, cfg.glow + '55'); g.addColorStop(1, 'transparent');
  c.fillStyle = g; c.fillRect(0, 0, S, S);

  // shape clip
  c.save();
  if (cfg.shape === 'hex') {
    c.beginPath();
    for (let i = 0; i < 6; i++) { const a = (Math.PI / 180) * (60 * i - 30); i === 0 ? c.moveTo(cx + 84 * Math.cos(a), cy + 84 * Math.sin(a)) : c.lineTo(cx + 84 * Math.cos(a), cy + 84 * Math.sin(a)) }
    c.closePath();
  } else if (cfg.shape === 'circle') {
    c.beginPath(); c.arc(cx, cy, 82, 0, Math.PI * 2);
  } else {
    const x = 24, y = 24, w = S - 48, h = S - 48, r = 32;
    c.beginPath(); c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.quadraticCurveTo(x + w, y, x + w, y + r); c.lineTo(x + w, y + h - r); c.quadraticCurveTo(x + w, y + h, x + w - r, y + h); c.lineTo(x + r, y + h); c.quadraticCurveTo(x, y + h, x, y + h - r); c.lineTo(x, y + r); c.quadraticCurveTo(x, y, x + r, y); c.closePath();
  }
  const gr = c.createLinearGradient(cx - 70, cy - 70, cx + 70, cy + 70);
  gr.addColorStop(0, cfg.c1); gr.addColorStop(1, cfg.c2);
  c.fillStyle = gr; c.fill();
  c.strokeStyle = cfg.border; c.lineWidth = 4; c.stroke();
  c.restore();

  cfg.draw(c, cx, cy, S);
  return new THREE.CanvasTexture(cv);
}

// ── Icon drawers ─────────────────────────────────────────
function dNetCore(c, cx, cy) { c.fillStyle = '#fff'; c.font = 'bold 48px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('.NET', cx, cy - 14); c.font = '24px sans-serif'; c.fillStyle = '#cde'; c.fillText('Core', cx, cy + 28) }
function dCSharp(c, cx, cy) { c.fillStyle = '#fff'; c.font = 'bold 76px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('C#', cx, cy) }
function dReact(c, cx, cy) { const t = '#61dafb'; c.strokeStyle = t; c.lineWidth = 5; for (let i = 0; i < 3; i++) { c.save(); c.translate(cx, cy); c.rotate(Math.PI / 3 * i); c.beginPath(); c.ellipse(0, 0, 72, 25, 0, 0, Math.PI * 2); c.stroke(); c.restore() } c.beginPath(); c.arc(cx, cy, 10, 0, Math.PI * 2); c.fillStyle = t; c.fill() }
function dDocker(c, cx, cy) { c.fillStyle = '#2496ed'; c.fillRect(cx - 44, cy - 4, 88, 16);[[cx - 40, cy - 22], [cx - 18, cy - 22], [cx + 4, cy - 22], [cx - 29, cy - 42], [cx - 7, cy - 42]].forEach(([x, y]) => { c.strokeStyle = '#fff'; c.lineWidth = 3; c.strokeRect(x, y, 18, 16) }) }
function dSQL(c, cx, cy) { ['#c0392b', '#e74c3c', '#ec7063'].forEach((col, i) => { const y = cy - 46 + i * 30; c.fillStyle = col; c.beginPath(); c.ellipse(cx, y + 11, 40, 11, 0, 0, Math.PI * 2); c.fill(); c.fillRect(cx - 40, y, 80, 11); c.beginPath(); c.ellipse(cx, y, 40, 11, 0, 0, Math.PI * 2); c.fill() }); c.fillStyle = '#fff'; c.font = 'bold 20px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('SQL', cx, cy + 48) }
function dRestApi(c, cx, cy) { c.fillStyle = '#2ecc71'; c.font = 'bold 28px monospace'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('{REST', cx, cy - 13); c.fillText('API}', cx, cy + 20) }
function dMicro(c, cx, cy) { [[-24, -24], [6, -24], [-24, 6], [6, 6]].forEach(([dx, dy]) => { c.fillStyle = '#aaa'; c.fillRect(cx + dx, cy + dy, 20, 20); c.fillStyle = '#ccc'; c.fillRect(cx + dx, cy + dy, 9, 9); c.strokeStyle = '#777'; c.lineWidth = 2; c.strokeRect(cx + dx, cy + dy, 20, 20) }) }
function dEFCore(c, cx, cy) { c.fillStyle = '#fff'; c.font = 'bold 60px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('EF', cx, cy - 12); c.font = '22px sans-serif'; c.fillStyle = '#aac'; c.fillText('Core', cx, cy + 26) }
function dJwt(c, cx, cy) { c.fillStyle = '#fb015b'; c.font = 'bold 32px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('JWT', cx, cy - 10); c.font = '18px sans-serif'; c.fillStyle = '#fff'; c.fillText('✦ ✦ ✦', cx, cy + 22) }
function dAzure(c, cx, cy) { c.fillStyle = '#0089d6'; c.beginPath(); c.moveTo(cx, cy - 68); c.lineTo(cx - 58, cy + 48); c.lineTo(cx - 14, cy + 48); c.lineTo(cx + 8, cy - 8); c.lineTo(cx + 58, cy + 48); c.lineTo(cx + 16, cy + 48); c.closePath(); c.fill() }
function dAngular(c, cx, cy) {
  // Angular logo: simple red "A" with stylized shield
  c.fillStyle = '#dd0031';
  c.beginPath();
  c.moveTo(cx, cy - 60);
  c.lineTo(cx - 52, cy + 40);
  c.lineTo(cx + 52, cy + 40);
  c.closePath();
  c.fill();

  c.fillStyle = '#fff';
  c.font = 'bold 42px sans-serif';
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText('A', cx, cy + 5);
}


// ── Badge definitions ─────────────────────────────────────
const BADGES = [
  { shape: 'hex', c1: '#5b2d8e', c2: '#7c3db5', border: 'rgba(180,140,255,.7)', glow: '#7c3db5', draw: dNetCore, isCenter: true, scale: 2.0 },
  // inner ring — 3 badges, 120° apart
  { shape: 'circle', c1: '#0d2137', c2: '#0a3d54', border: 'rgba(97,218,251,.7)', glow: '#61dafb', draw: dReact, ring: 0, slot: 0, scale: 1.05 },
  { shape: 'circle', c1: '#0d1a40', c2: '#1a3580', border: 'rgba(100,150,255,.6)', glow: '#3b82f6', draw: dEFCore, ring: 0, slot: 1, scale: 1.0 },
  { shape: 'rounded', c1: '#0a2a1a', c2: '#1a5c30', border: 'rgba(46,204,113,.55)', glow: '#2ecc71', draw: dRestApi, ring: 0, slot: 2, scale: 1.0 },
  // mid ring — 3 badges
  { shape: 'rounded', c1: '#1a1f2e', c2: '#2a3040', border: 'rgba(180,180,200,.4)', glow: '#8899bb', draw: dMicro, ring: 1, slot: 0, scale: .98 },
  { shape: 'rounded', c1: '#051525', c2: '#0a2b4a', border: 'rgba(0,137,214,.65)', glow: '#0089d6', draw: dAzure, ring: 1, slot: 1, scale: 1.05 },
  { shape: 'hex', c1: '#1d6b2e', c2: '#2ecc71', border: 'rgba(46,204,113,.7)', glow: '#2ecc71', draw: dCSharp, ring: 1, slot: 2, scale: 1.1 },
  // outer ring — 3 badges
  { shape: 'rounded', c1: '#0d2545', c2: '#1a4a80', border: 'rgba(36,150,237,.7)', glow: '#2496ed', draw: dDocker, ring: 2, slot: 0, scale: 1.05 },
  { shape: 'rounded', c1: '#2c0a0a', c2: '#5a1a1a', border: 'rgba(231,76,60,.6)', glow: '#e74c3c', draw: dSQL, ring: 2, slot: 1, scale: 1.0 },
  { shape: 'hex', c1: '#2a0d1a', c2: '#5a1a35', border: 'rgba(251,1,91,.6)', glow: '#fb015b', draw: dJwt, ring: 2, slot: 2, scale: .95 },
  {
    shape: 'hex',
    c1: '#2d0a0a',
    c2: '#dd0031',
    border: 'rgba(221,0,49,.6)',
    glow: '#dd0031',
    draw: dAngular,
    ring: 2,
    slot: 3,
    scale: 1.05
  },

];

// ── Orbit configuration ───────────────────────────────────
// Badges orbit in the XY plane (a true circle, radius r).
// The group is tilted on X by a small angle so the disc faces
// slightly toward the camera — all badges remain visible.
const ORBIT = [
  { r: 3.5, speed: 0.35 },
  { r: 5.0, speed: 0.25 },
  { r: 6.5, speed: 0.17 },
];
const RING_COUNTS = [3, 3, 4]; // outer ring now has 4 slots
const RING_PHASE = [0, Math.PI * 0.4, Math.PI * 0.15];

// ── Build scene group ─────────────────────────────────────
const group = new THREE.Group();
// No tilt — orbits are in the XZ plane (horizontal disc).
// Camera is positioned above and forward so we see the disc at a nice angle.
scene.add(group);

const meshes = [];

BADGES.forEach(b => {
  const tex = makeTex(b);
  const sz = b.isCenter ? 1.55 * b.scale : 0.8 * b.scale;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(sz * 2, sz * 2),
    new THREE.MeshStandardMaterial({ map: tex, transparent: true, alphaTest: 0.04, side: THREE.DoubleSide, roughness: .3, metalness: .5 })
  );
  if (b.isCenter) {
    mesh.position.set(0, 0, 0);
  } else {
    const orb = ORBIT[b.ring];
    const total = RING_COUNTS[b.ring];
    const baseAngle = (b.slot / total) * Math.PI * 2 + RING_PHASE[b.ring];
    mesh.userData = { orb, angle: baseAngle, floatOff: b.slot * 2.1 };
  }
  group.add(mesh);
  meshes.push({ mesh, b });
});

// ── Orbit ring visuals ────────────────────────────────────
ORBIT.forEach(o => {
  const pts = [];
  for (let i = 0; i <= 128; i++) { const a = i / 128 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * o.r, 0, Math.sin(a) * o.r)) }
  group.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color: 0x2dd4aa, transparent: true, opacity: .16 })
  ));
});

// ── Particles ─────────────────────────────────────────────
(() => {
  const n = 260, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { pos[i * 3] = (Math.random() - .5) * 26; pos[i * 3 + 1] = (Math.random() - .5) * 14; pos[i * 3 + 2] = (Math.random() - .5) * 18 }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x2dd4aa, size: .055, transparent: true, opacity: .45 })));
})();

// ── Animation loop ────────────────────────────────────────
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  const t = clock.elapsedTime;

  meshes.forEach(({ mesh, b }) => {
    if (b.isCenter) {
      mesh.position.y = Math.sin(t * 0.5) * 0.08;
      mesh.lookAt(camera.position);
      return;
    }
    const ud = mesh.userData;
    ud.angle += ud.orb.speed * dt;
    // Orbit in the XZ plane (horizontal) — badges spin like a flat disc on a table
    mesh.position.set(
      Math.cos(ud.angle) * ud.orb.r,
      0,
      Math.sin(ud.angle) * ud.orb.r
    );
    // Billboard: always face the camera so icons are readable
    mesh.lookAt(camera.position);
  });

  // No group tilt or Z-spin — the disc stays flat and stable
  renderer.render(scene, camera);
}
animate();

// ── Resize handler ────────────────────────────────────────
window.addEventListener('resize', () => {
  renderer.setSize(W(), H());
  camera.aspect = W() / H();
  camera.updateProjectionMatrix();
});

let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  navbar.classList.toggle('active');
  menu.classList.toggle('fa-times');
}

window.onscroll = () => {
  navbar.classList.remove('active');
  menu.classList.remove('fa-times');

  if (window.scrollY > 100) {
    document.querySelector('.header .container').classList.add('active');
  } else {
    document.querySelector('.header .container').classList.remove('active');
  }
}

var typed = new Typed('.typing', {
  strings: ['Frontend', 'Backend', 'Fullstack'],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

let details = document.querySelector('.content .flex .details-btn');

details.onclick = () => {
  details.classList.add('active');
  document.querySelector('.content .column .details').classList.add('active');
}


var swiper = new Swiper(".testimonials-slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  grabCursor: true,
});

// document.getElementById('btnSubmit').addEventListener('click', function(){
//   swal("Thanks for getting in touch", "Email Sent", "success");
// })

document.addEventListener("click", function (e) {
  const card = e.target.closest(".flip-card");
  // Clicked a card → toggle flip
  if (card) {
    card.classList.toggle("flipped");
  }
  // Clicked outside → hide all flips
  else {
    document
      .querySelectorAll(".flip-card.flipped")
      .forEach((c) => c.classList.remove("flipped"));
  }
});


// Initialize EmailJS (replace with your public key)
emailjs.init("oWBQ2RmYdImLyX_2X"); // Example: "XyZ123abc"

// Open/Close Modal
const modal = document.getElementById("contactModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.querySelector(".close");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Handle Form Submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const responseMessage = document.getElementById("response-message");

  emailjs.send("service_8u7gzns", "template_ohznp8p", {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  })
    .then(() => {
      responseMessage.textContent = "✅ Your message has been sent successfully!";
      responseMessage.style.color = "green";
      document.getElementById("contact-form").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      responseMessage.textContent = "❌ Oops! Something went wrong. Please try again.";
      responseMessage.style.color = "red";
    });
});





