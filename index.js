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
  Array(9 - (names.length % 9))
    .fill(0)
    .forEach(() => names.push(" "));

  const badges = names.map((name) => {
    const parts = name.split(/\s+/);
    console.log("printing");
    return `<div class="badge">
    ${parts.map((part) => `<div>${part}</div>`).join("")}
  </div>`;
  });
  document.querySelector("#badges").innerHTML = badges.join("");
}

function decreaseFont() {
  const defaultFontSize = 36;

  let changed = false;
  document.querySelectorAll(".badge").forEach((badge) => {
    if (badge.offsetWidth < badge.scrollWidth) {
      changed = true;
      const elements = Array.from(badge.querySelectorAll("div"));
      elements.sort((a, b) => b.offsetWidth - a.offsetWidth);
      const [first] = elements;
      const fontSize = parseInt(first.style.fontSize || defaultFontSize) - 1;
      first.style.fontSize = `${fontSize}px`;
    }
  });
  return changed;
}

let changed = false;
do {
  changed = decreaseFont();
} while (changed);

const names = getStoredNames();
document.querySelector("#names").value = names.join("\n");
displayNames(names);
initEvents();
