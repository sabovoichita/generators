// TODO check this examples:
//   https://stackoverflow.com/questions/10028182/how-to-make-a-pie-chart-in-css

let phrases = `
#1 Darul de a rezolva probleme
Discernământ spiritual interior
Creativitate si inventivitate
Luarea deciziilor

#2 Daruri de pastor-invatator
Consiliind
Pregatind si conducand inchinarea
Facand ucenici
Predicand
Zidind unitatea trupului

#3 Orientat spre crestere
Capabil pentru viziune
Adaptaptindu-se la crestere
Deschis la crestere
Motivatii personale

#4 Penetrare in societate
Stil flexibil
Activitate evang. in/afara Bisericii
Prezenta in Biserica
Raspunde nevoilor Comunitatii

#5 Abilitatile conducerii
Autoritate si Influenta
Dezvoltarea conducerii Bisericii
Motivarea Membrilor
Utilizarea darurilor
Formand o lucrare care se mentine

#6 Abilitati administrative
Primind/oferind informatii si raport
Administrarea timpului
Planificarea obiectivelor. Adaptarea / corectarea lor
Organizarea structurilor administrative

#7 Cunostinte teologice / tehnice
Abilitati financiare si contabile
Reguli si legi guvernamentale
Pregatirea lucrarii si confirmarea ei
Practica si politica denominationala
Principiile Cesterii Bsericilor

#8 Abilitati interpersonale si de comunicare
Ascultarea
Interactiuni
Mentinerea relatiilor
Probleme de constructii
Rezolvarea conflictelor

#9 Stabilitate personala
Facand fata stresului
Auto-incredere si auto-apreciere
Maturitate emotionala
Flexibilitate    

#10 Stabilitate in familie
Rol si responsabilitate de soti
Rol si responsabilitate de sot
Cooperare in familie
`;

phrases = phrases
  .split("\n")
  .map(line => line.trim())
  .filter(line => line.length > 0);

//const titles = phrases.filter(line => line.startsWith("#"));
// group phrases by titles and remove titles from phrases (return title + phrases.length after them)
const titles = phrases.reduce((acc, line) => {
  if (line.startsWith("#")) {
    acc.push({
      text: line.substring(1).trim(),
      children: []
    });
  } else {
    acc[acc.length - 1].children.push(line);
  }
  return acc;
}, []);

phrases = phrases
  .filter(line => !line.startsWith("#"))
  .map(line => ({
    text: line
  }));

function createObjects(phrases) {
  const length = phrases.reduce((acc, item) => acc + (item.children || [1]).length, 0);
  const radius = 360 / length;
  const odd = length % 2 === 1 ? 0 : 1;
  let index = 0;
  return phrases.map(({ text, children = [] }, i) => {
    const slices = children.length || 1;
    index += slices;
    const elementAngle = Math.round(slices * radius);
    const angle = Math.round(index * radius);
    const color = `hsl(${Math.round(index * radius)}, 100%, 50%)`;
    const lineAngle = angle + odd * Math.round(radius / 2);
    const textAngle = angle - elementAngle / 2 + odd * Math.round(radius / 2);

    return {
      line: `<div class="slice-line" style="--angle: ${lineAngle}deg; --color: ${color}"></div>`,
      text: `<div class="slice-text" style="--angle: ${textAngle}deg; --color: ${color}">
          <div class="phrase-inner">${text}</div>
        </div>`
    };
  });
}

function createSlices(circle, phrases, width = 800, innerWidth = 250) {
  circle.style.width = `${width}px`;
  circle.style.height = `${width}px`;
  circle.style.setProperty("--line-width", `${(width - innerWidth) / 2}px`);
  // circle.style.setProperty("--padding-start", `${innerWidth + 10}px`);
  circle.style.setProperty("--padding-start", `${innerWidth}px`);
  circle.style.setProperty("--inner-width", `${innerWidth}px`);

  const objects = createObjects(phrases);
  circle.innerHTML = objects.map(({ line }) => line).join("");
  circle.innerHTML += objects.map(({ text }) => text).join("");
}

function initEvents() {
  document.querySelector("#rotate").addEventListener("input", event => {
    const value = event.target.value;
    document.querySelector("#groups").style.transform = `rotate(${value}deg)`;
  });
}

const groups = document.querySelector("#groups");
createSlices(groups, titles, 1100, 850);
groups.innerHTML += `<div id="slices" class="circle"></div>`;

const slices = document.querySelector("#slices");
createSlices(slices, phrases, 850, 250);
slices.innerHTML += `<div class="inner-circle"></div>`;

// document.querySelector("#slices .inner-circle").innerHTML = `<div id="dot" class="inner-circle"></div>`;
// const dot = document.querySelector("#dot");
// dot.style.width = "10px";
// dot.style.height = "10px";

initEvents();
