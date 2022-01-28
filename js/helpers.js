const nav = document.getElementById("navbar");
const canvas = document.getElementById("canvas");
const controls = document.getElementById("controls");

export function onResize() {
    resizeControls();
    resizeCanvas();
};

function resizeCanvas() {
    var rect = canvas.getBoundingClientRect();
    canvas.height = (rect.bottom) - (nav.getBoundingClientRect().bottom + parseInt(window.getComputedStyle(canvas).marginTop));
    canvas.width = (rect.right) - (controls.getBoundingClientRect().right + parseInt(window.getComputedStyle(controls).marginRight));
};

function resizeControls() {
    controls.style.height = (canvas.getBoundingClientRect().bottom) - (nav.getBoundingClientRect().bottom + parseInt(window.getComputedStyle(controls).marginTop));
};