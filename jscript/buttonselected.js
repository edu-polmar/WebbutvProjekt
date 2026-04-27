var buttons = document.querySelectorAll("button");

for (button in buttons) {
  buttons[button].onclick = function () {
    buttons.forEach(function (btn) {
      btn.classList.remove("highlight");
    });
    this.classList.add("highlight");
  };
}
