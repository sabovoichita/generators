// TODO check this examples:
//   https://stackoverflow.com/questions/10028182/how-to-make-a-pie-chart-in-css
function $(selector, parent) {
  return (parent || document).querySelector(selector);
}
let phrases = `
#1 Darul de a rezolva probleme
Discernământ spiritual interior
Creativitate și inventivitate
Luarea deciziilor

#2 Daruri de pastor-învățător
Consiliind
Pregătind și conducând închinarea
Făcând ucenici
Predicând
Zidind unitatea trupului

#3 Orientat spre creștere
Capabil pentru viziune
Adaptându-se la creștere
Deschis la creștere
Motivații personale

#4 Penetrare în societate
Stil flexibil
Activitate evanghelică în/în afara Bisericii
Prezență în Biserică
Răspunde nevoilor Comunității

#5 Abilitățile conducerii
Autoritate și influență
Dezvoltarea conducerii Bisericii
Motivarea Membrilor
Utilizarea darurilor
Formând o lucrare care se menține

#6 Abilități administrative
Primind/oferind informații și raport
Administrarea timpului
Planificarea obiectivelor. Adaptarea / corectarea lor
Organizarea structurilor administrative

#7 Cunoștințe teologice / tehnice
Abilități financiare și contabile
Reguli și legi guvernamentale
Pregătirea lucrării și confirmarea ei
Practica și politica denominațională
Principiile Creșterii Bisericilor

#8 Abilități interpersonale și de comunicare
Ascultarea
Interacțiuni
Menținerea relațiilor
Probleme de construcții
Rezolvarea conflictelor

#9 Stabilitate personală
Făcând față stresului
Auto-încredere și auto-apreciere
Maturitate emoțională
Flexibilitate

#10 Stabilitate în familie
Rol și responsabilitate de soți
Rol și responsabilitate de soț
Cooperare în familie
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

function $(selector, parent) {
  return (parent || document).querySelector(selector);
}

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
  circle.style.setProperty("--padding-start", `${innerWidth}px`);

  const objects = createObjects(phrases);
  circle.innerHTML = objects.map(({ line }) => line).join("");
  circle.innerHTML += objects.map(({ text }) => text).join("");
}

function rotateMainCircle(degrees) {
  $("#groups").style.transform = `rotate(${degrees}deg)`;
  $("#center").style.transform = `rotate(-${degrees}deg)`;
}

function initEvents() {
  $("#rotate").addEventListener("input", event => {
    const value = event.target.value;
    rotateMainCircle(value);
    $("#rotateDegrees").value = value;
  });

  $("#rotateDegrees").addEventListener("input", event => {
    const value = event.target.value;
    rotateMainCircle(value);
    $("#rotate").value = value;
  });
}

const groups = $("#groups");
createSlices(groups, titles, 1100, 850);
groups.innerHTML += `<div id="slices" class="circle"></div>`;

const slices = $("#slices");
createSlices(slices, phrases, 850, 250);
slices.innerHTML += `<div id="center" class="circle"></div>`;

const center = $("#center");
center.style.width = "250px";
center.style.height = "250px";

let centerText = `
Viața de rugăciune activă
Spirit de slujitor
Practici etice și morale
Exercitarea credinței
`;
centerText = centerText
  .split("\n")
  .map(line => line.trim())
  .filter(line => line.length > 0);

center.innerHTML = `<h2>Disciplina spirituală</h2><div class="grid"></div>`;
$(".grid", center).innerHTML += centerText.map(text => `<div class="center-text">${text}</div>`).join("");

center.innerHTML += `<h2>&nbsp;</h2>`;

// $("#slices .circle").innerHTML = `<div id="dot" class="circle"></div>`;
// const dot = $("#dot");
// dot.style.width = "10px";
// dot.style.height = "10px";

initEvents();
