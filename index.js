function initEvents() {
  const inputValue = document.querySelector("#names");
  inputValue.addEventListener("input", (e) => {
    console.log("Input:", e.data);
  });
}

initEvents();
