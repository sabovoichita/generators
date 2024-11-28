function initEvents() {
  document.querySelector("#names").addEventListener("input", function () {
    const names = this.value
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name);
    console.log("names: ", names);
  });
}
initEvents();
