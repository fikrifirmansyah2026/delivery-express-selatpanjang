// ========================================
// DELIVERY EXPRESS BUTTON FIX 2026
// Anti Double Click + Anti Freeze
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  // Semua tombol & link
  const buttons = document.querySelectorAll(
    "button, .btn, a, input[type='submit']"
  );

  buttons.forEach((btn) => {

    // Hilangkan delay klik android
    btn.style.touchAction = "manipulation";

    // Klik effect
    btn.addEventListener("touchstart", () => {
      btn.style.transform = "scale(0.97)";
      btn.style.opacity = "0.9";
    });

    btn.addEventListener("touchend", () => {
      btn.style.transform = "scale(1)";
      btn.style.opacity = "1";
    });

    // Desktop click
    btn.addEventListener("mousedown", () => {
      btn.style.transform = "scale(0.97)";
    });

    btn.addEventListener("mouseup", () => {
      btn.style.transform = "scale(1)";
    });

    // Anti spam click
    let clicked = false;

    btn.addEventListener("click", (e) => {

      if (clicked) {
        e.preventDefault();
        return;
      }

      clicked = true;

      btn.classList.add("loading");

      // Auto reset
      setTimeout(() => {
        clicked = false;
        btn.classList.remove("loading");
      }, 1200);

    });

  });

});

// ========================================
// AUTO ERROR HANDLER
// ========================================

window.addEventListener("error", (e) => {
  console.log("Button Fix Error:", e.message);
});

// ========================================
// PREVENT EMPTY LINK
// ========================================

document.querySelectorAll("a").forEach(link => {

  const href = link.getAttribute("href");

  if (
    href === "#" ||
    href === "" ||
    href === null
  ) {

    link.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Empty link blocked.");
    });

  }

});
