function storeNames(names) {
  localStorage.setItem("badgesNames", JSON.stringify(names));
}
function getStoredNames() {
  return JSON.parse(localStorage.getItem("badgeNames")) || [];
}

function initEvents() {
  document.querySelector("#names").addEventListener("input", function () {
    const names = this.value
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name);
    console.log("names input: ", names);

    storeNames(names);
  });
}

const names = getStoredNames();
document.querySelector("#names").value = names.join("\n");

initEvents();
