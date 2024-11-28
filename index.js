let portrait = document.body.classList.contains("portrait");

function setOrientation(portraitValue) {
  portrait = portraitValue;
  document.body.classList.remove(portraitValue ? "landscape" : "portrait");
  document.body.classList.add(portraitValue ? "portrait" : "landscape");
  displayNames(getStoredNames(), portraitValue);
}

function getStoredNames() {
  return JSON.parse(localStorage.getItem("badgeNames")) || [];
}

function storeNames(names) {
  localStorage.setItem("badgeNames", JSON.stringify(names));
}

function initEvents() {
  document.querySelector("#names").addEventListener("input", function () {
    const names = this.value
      .split("\n")
      .map(name => name.trim())
      .filter(name => name);
    storeNames(names);
    displayNames(names, portrait);
  });
}

function displayNames(names, portrait = true) {
  names = [...names];
  const itemsPerPage = portrait ? 9 : 5; // 5 because will duplicate each name

  if (names.length % itemsPerPage !== 0) {
    new Array(itemsPerPage - (names.length % itemsPerPage)).fill(0).forEach(() => names.push(" "));
  }

  if (!portrait) {
    //TODO duplicate each row to make it double sided (one row has 5 elements
    names = names.reduce((acc, name, index, all) => {
      acc.push(name);
      if (index % 5 === 4) {
        acc.push(...all.slice(index - 4, index + 1));
      }
      return acc;
    }, []);
  }

  const defaultFontSize = 36;
  const badges = names.map((name, i) => {
    const parts = name.split(/\s+/);
    const flip = portrait ? "" : i % 10 >= 5 ? "flip" : "";
    return `<div class="badge ${flip}">
          ${parts.map(part => `<div>${part}</div>`).join("")}
        </div>`;
  });
  document.querySelector("#badges").innerHTML = badges.join("");

  function decreaseFont() {
    let changed = false;
    document.querySelectorAll(".badge").forEach(badge => {
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
}

const names = getStoredNames();
document.querySelector("#names").value = names.join("\n");
displayNames(names, portrait);
initEvents();
