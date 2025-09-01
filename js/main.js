// ==============================
// Config
// ==============================
const STRIPE_LINK = "https://buy.stripe.com/00w00i2Fp5jjfnt2mS8bS0h"; // <-- tu Payment Link

// ==============================
// Utilidades
// ==============================
function showLoading(message = "Redirigiendo a Stripe…") {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.4);
    display:flex;align-items:center;justify-content:center;color:#fff;z-index:9999;
    font:600 1.05rem Montserrat, sans-serif;letter-spacing:.3px
  `;
  overlay.textContent = message;
  document.body.appendChild(overlay);
  return overlay;
}

// ==============================
// Lógica Stripe (misma pestaña)
// ==============================
function goToStripe(e) {
  if (e) e.preventDefault();
  showLoading();
  // Importante: usa assign para que el redirect de Stripe vuelva a tu sitio
  window.location.assign(STRIPE_LINK);
}

// ==============================
// Animaciones al hacer scroll
// ==============================
function setupRevealOnScroll() {
  const cards = document.querySelectorAll(".info-card");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
  });
}

// ==============================
// Init
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  // Botones (si no existen, no pasa nada)
  const b1 = document.getElementById("bookButton");
  const b2 = document.getElementById("bookButton2");
  if (b1) b1.addEventListener("click", goToStripe);
  if (b2) b2.addEventListener("click", goToStripe);

  // Animaciones
  setupRevealOnScroll();
});
