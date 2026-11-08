document.addEventListener("DOMContentLoaded", () => {
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
​if (menuButton && navigation) {
menuButton.addEventListener("click", () => {
const isOpen = menuButton.getAttribute("aria-expanded") === "true";
menuButton.setAttribute("aria-expanded", String(!isOpen));
navigation.classList.toggle("is-open", !isOpen);
});
​navigation.querySelectorAll("a").forEach((link) => {
link.addEventListener("click", () => {
menuButton.setAttribute("aria-expanded", "false");
navigation.classList.remove("is-open");
});
});
}
​// Fallback for image placeholders when images fail to load or are missing
document.querySelectorAll("[data-optional-image]").forEach((image) => {
const frame = image.closest("[data-image-frame]");
const hideBrokenImage = () => {
image.hidden = true;
if (frame) frame.classList.remove("has-image");
};
​image.addEventListener("load", () => {
if (image.naturalWidth > 0 && frame) frame.classList.add("has-image");
});
image.addEventListener("error", hideBrokenImage);
​if (image.complete) {
if (image.naturalWidth > 0 && frame) frame.classList.add("has-image");
else hideBrokenImage();
}
});
​// Dynamically update current year in the footer
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
});
