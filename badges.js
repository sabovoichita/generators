let portrait = document.body.classList.contains("portrait");
const defaultFontSize = 36;

function setOrientation(portraitValue) {
  portrait = portraitValue;
  document.body.classList.remove(portraitValue ? "landscape" : "portrait");
  document.body.classList.add(portraitValue ? "portrait" : "landscape");
  displayNames(getStoredNames(), portraitValue);
}

function getStoredNames() {
  let items = JSON.parse(localStorage.getItem("badgeNames")) || [];
  if (items.length === 0) {
    items = ["Enter Names"];
  }
  return items;
}

function storeNames(names) {
  localStorage.setItem("badgeNames", JSON.stringify(names));
}

function initEvents() {
  $("#names").addEventListener("input", function () {
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

  const badges = names.map((name, i) => {
    const parts = name.split(/\s+/);
    const flip = portrait ? "" : i % 10 >= 5 ? "flip" : "";
    return `<div class="badge ${flip}">
          ${parts.map(part => `<div>${part}</div>`).join("")}
        </div>`;
  });
  $("#badges").innerHTML = badges.join("");

  decreaseFont(".badge", "div", defaultFontSize);
}

const names = getStoredNames();
$("#names").value = names.join("\n");
displayNames(names, portrait);
initEvents();
