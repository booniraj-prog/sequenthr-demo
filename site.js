const pages = [
  ["index.html", "Home"],
  ["solutions.html", "Solutions"],
  ["industries.html", "Industries"],
  ["why.html", "Why SequentHR"],
  ["about.html", "About"],
  ["leadership.html", "Leadership"],
  ["contact.html", "Contact"],
];

function currentPage() {
  let file = decodeURIComponent(location.pathname.split("/").pop() || "index.html");
  if (!file) return "index.html";
  if (!file.toLowerCase().endsWith(".html")) file += ".html";
  return file.toLowerCase();
}

function linkList(className) {
  const here = currentPage();
  return pages
    .map(([href, label]) => {
      const current = here === href ? ' aria-current="page"' : "";
      return `<a href="${href}"${current}>${label}</a>`;
    })
    .join("");
}

const logo = `<a class="brand" href="index.html" aria-label="Sequent HR, home"><img src="logo.png" alt="" width="391" height="310"></a>`;

document.getElementById("site-header").innerHTML = `<header class="nav">
  <div class="wrap nav-row">
    ${logo}
    <nav class="links" aria-label="Primary">${linkList()}</nav>
    <a class="btn btn-solid" href="contact.html">Book a Consultation</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile">Menu</button>
  </div>
  <div class="wrap" id="mobile" hidden>${linkList()}</div>
</header>`;

document.getElementById("site-footer").innerHTML = `<footer>
  <div class="wrap foot">
    <div>
      <strong style="letter-spacing:.12em">SEQUENT HR</strong>
      <p>Sequent HR Consulting Pvt. Ltd. Labour law compliance and payroll from Bengaluru, for organisations across India.</p>
    </div>
    <div>
      <p class="kicker ember">Visit</p>
      <p>Mahalakshmipuram, Bengaluru 560086<br>Landmark: Pai International &amp; Mahalakshmi Metro Station</p>
    </div>
    <div>
      <p class="kicker ember">Pages</p>
      <p><a href="solutions.html">Solutions</a><br><a href="industries.html">Industries</a><br><a href="leadership.html">Leadership</a><br><a href="about.html">About</a><br><a href="contact.html">Contact</a></p>
    </div>
  </div>
  <p class="wrap" style="color:rgba(247,243,236,.5);font-size:12px">Â© 2026 Sequent HR Consulting Pvt. Ltd.</p>
</footer>`;

const menu = document.querySelector(".menu-btn");
const mobile = document.getElementById("mobile");
document.addEventListener("mousemove", (event) => {
  const button = event.target.closest && event.target.closest(".btn");
  if (!button) return;
  const rect = button.getBoundingClientRect();
  button.style.setProperty("--gx", (event.clientX - rect.left) + "px");
  button.style.setProperty("--gy", (event.clientY - rect.top) + "px");
}, { passive: true });

document.querySelectorAll(".spot").forEach((el) => {
  el.addEventListener("mousemove", (event) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", (event.clientX - rect.left) + "px");
    el.style.setProperty("--my", (event.clientY - rect.top) + "px");
  });
});

menu.addEventListener("click", () => {
  const open = mobile.hasAttribute("hidden");
  mobile.toggleAttribute("hidden", !open);
  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "Close" : "Menu";
});

(function initCursor() {
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return;

  const root = document.createElement("div");
  root.className = "cursor-fx";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = '<span class="cursor-trail"></span><span class="cursor-trail"></span><span class="cursor-trail"></span><span class="cursor-trail"></span><span class="cursor-ring"></span><span class="cursor-dot"></span><span class="cursor-tag"></span>';
  document.body.appendChild(root);

  const trails = Array.from(root.querySelectorAll(".cursor-trail"));
  const ring = root.querySelector(".cursor-ring");
  const dot = root.querySelector(".cursor-dot");
  const tag = root.querySelector(".cursor-tag");
  let x = -160;
  let y = -160;
  let visible = false;
  const ringPoint = { x: -160, y: -160 };
  const beads = trails.map(() => ({ x: -160, y: -160 }));
  const ease = [0.28, 0.2, 0.14, 0.09];

  window.addEventListener("mousemove", (event) => {
    x = event.clientX;
    y = event.clientY;
    if (!visible) {
      visible = true;
      root.classList.add("is-on");
      ringPoint.x = x;
      ringPoint.y = y;
      beads.forEach((bead) => {
        bead.x = x;
        bead.y = y;
      });
    }
    const hit = event.target.closest && event.target.closest("a, button, input, textarea, select, summary");
    root.classList.toggle("is-hot", Boolean(hit));
    const labelNode = event.target.closest && event.target.closest("[data-leader]");
    const label = labelNode ? labelNode.getAttribute("data-leader") : "";
    tag.textContent = label;
    tag.style.opacity = label ? "1" : "0";
  }, { passive: true });

  document.documentElement.addEventListener("mouseleave", () => {
    visible = false;
    root.classList.remove("is-on");
  });
  window.addEventListener("mousedown", () => root.classList.add("is-down"));
  window.addEventListener("mouseup", () => root.classList.remove("is-down"));

  (function tick() {
    ringPoint.x += (x - ringPoint.x) * 0.18;
    ringPoint.y += (y - ringPoint.y) * 0.18;
    ring.style.transform = "translate3d(" + ringPoint.x + "px," + ringPoint.y + "px,0)";
    dot.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    tag.style.transform = "translate3d(" + (ringPoint.x + 28) + "px," + (ringPoint.y + 20) + "px,0)";
    let followX = x;
    let followY = y;
    beads.forEach((bead, index) => {
      bead.x += (followX - bead.x) * ease[index];
      bead.y += (followY - bead.y) * ease[index];
      trails[index].style.transform = "translate3d(" + bead.x + "px," + bead.y + "px,0)";
      followX = bead.x;
      followY = bead.y;
    });
    requestAnimationFrame(tick);
  })();
})();

