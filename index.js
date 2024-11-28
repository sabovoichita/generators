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
    // console.log("names input: ", names);

    storeNames(names);
    displayNames(names);
  });
}
function displayNames(names) {
  names = [...names];
  const badges = names.map((name) => {
    const parts = name.split(/\s+/);
    console.log("printing");
    return `<div class="badge">
    ${parts.map((part) => `<div>${part}</div>`).join("")}
  </div>`;
  });
  document.querySelector("#badges").innerHTML = badges.join("");
}

const names = getStoredNames();
document.querySelector("#names").value = names.join("\n");
displayNames(names);
initEvents();
