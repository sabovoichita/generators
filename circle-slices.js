// TODO check this examples:
//   https://stackoverflow.com/questions/10028182/how-to-make-a-pie-chart-in-css

let text = `
#1 Darul de a rezolva probleme
Discernământ spiritual interior
Creativitate și inventivitate
Luarea deciziilor

#2 Daruri de pastor-învățător
Consilierea
Pregatirea și conducerea închinării
Facerea de ucenici
Predicarea
Zidind unitatea trupului

#3 Orientat spre creștere
Un spirit vizionar
Adaptabil pentru creștere
Generator al creșterii
Motivat personal

#4 Penetrare în societate
Stil de conducere flexibil
Activitate evanghelistică în Biserică și în afara ei
Prezent permanent în Biserică
Găsește soluții pentru nevoile Comunității

#5 Abilitățile conducerii
Autoritate, competență și influență
Dezvoltarea conducerii Bisericii
Motivarea membrilor
Utilizarea tuturor darurilor spirituale
Viziune pe termen mediu și lung

#6 Abilități administrative
Primind și oferind informații și raport
Administrarea timpului
Planificarea obiectivelor. Adaptarea și îmbunătățirea lor.
Organizarea structurilor administrative

#7 Cunoștințe teologice / tehnice
Abilități financiare și contabile
Reguli și legi guvernamentale
Pregătirea lucrării și confirmarea ei
Practica și politica denominațională
Principiile Creșterii Bisericilor

#8 Abilități interpersonale și de comunicare
Ascultarea
Interacțiunea
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

let { phrases, titles } = preparePhrases(text);

function preparePhrases(text) {
  let phrases = text
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

  return {
    titles,
    phrases
  };
}

function createObjects(phrases, color) {
  const length = phrases.reduce((acc, item) => acc + (item.children || [1]).length, 0);
  const radius = 360 / length;
  const odd = length % 2 === 1 ? 0 : 1;
  let index = 0;
  return phrases.map(({ text, children = [] }, i) => {
    const slices = children.length || 1;
    index += slices;
    const elementAngle = Math.round(slices * radius);
    const angle = Math.round(index * radius - radius / 2);
    const lineColor = color || `hsl(${Math.round(index * radius)}, 100%, 50%)`;
    const lineAngle = angle + odd * Math.round(radius / 2);
    const textAngle = angle - elementAngle / 2 + odd * Math.round(radius / 2);

    return {
      line: `<div data-index="${
        i + 1
      }" class="slice-line" style="--angle: ${lineAngle}deg; --color: ${lineColor}"></div>`,
      text: `<div data-index="${i + 1}" class="slice-text" style="--angle: ${textAngle}deg;">
          <div class="phrase-inner">${text}</div>
        </div>`
    };
  });
}

function createSlices(circle, phrases, width = 800, innerWidth = 250, lineWidth, color) {
  if (typeof circle === "string") {
    circle = $(circle);
  }
  circle.style.width = `${width}px`;
  circle.style.height = `${width}px`;
  circle.style.setProperty("--line-width", `${lineWidth || (width - innerWidth) / 2}px`);
  circle.style.setProperty("--text-width", `${(width - innerWidth) / 2}px`);
  circle.style.setProperty("--padding-start", `${innerWidth}px`);

  const objects = createObjects(phrases, color);
  circle.innerHTML = objects.map(({ line }) => line).join("");
  circle.innerHTML += objects.map(({ text }) => text).join("");
  return circle;
}

function rotateMainCircle(degrees) {
  $("#groups").style.transform = `rotate(${degrees}deg)`;
  $("#center").style.transform = `rotate(${degrees * -1}deg)`;
}

function syncValues(selector1, selector2) {
  const element1 = $(selector1);
  const element2 = $(selector2);
  element1.value = element2.value;
  element1.addEventListener("input", event => {
    element2.value = event.target.value;
  });
  element2.addEventListener("input", event => {
    element1.value = event.target.value;
    const inputEvent = new Event("input", { bubbles: true });
    element1.dispatchEvent(inputEvent);
  });
}

function initEvents() {
  syncValues("#rotate", "#rotateDegrees");
  syncValues("#zoom", "#zoomPercent");

  $("#rotate").addEventListener(
    "input",
    debounce(event => {
      const value = event.target.value;
      rotateMainCircle(-value);
    }, 300)
  );
  $("#zoom").addEventListener(
    "input",
    debounce(event => {
      const value = event.target.value;
      $("#groups").style.setProperty("--zoom", `${value}%`);
    }, 400)
  );

  $("#groups").addEventListener("click", event => {
    const target = event.target;
    if (target.closest(".phrase-inner")) {
      const slice = target.closest(".slice-text");
      const angle = parseFloat(slice.style.getPropertyValue("--angle").replace("deg", ""));
      rotateMainCircle(-angle);
      $("#rotate").value = angle;
      $("#rotateDegrees").value = angle;
    }
  });

  ["groupSize", "slicesSize", "centerSize"].forEach(id => {
    $(`#${id}`).addEventListener(
      "change",
      debounce(() => {
        start();
      }, 500)
    );
  });
}

function createMiddleGrid(circle, width) {
  if (typeof circle === "string") {
    circle = $(circle);
  }
  circle.style.width = `${width}px`;
  circle.style.height = `${width}px`;

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

  circle.innerHTML = `<h2>Disciplina</h2><div class="grid"></div>`;
  $(".grid", circle).innerHTML += centerText.map(text => `<div class="center-text">${text}</div>`).join("");
  circle.innerHTML += `<h2>Spirituală</h2>`;
  return circle;
}

function start() {
  const groupSize = parseInt($("#groupSize").value) || 1100;
  const slicesSize = parseInt($("#slicesSize").value) || 850;
  const centerSize = parseInt($("#centerSize").value) || 250;

  const groups = createSlices("#groups", titles, groupSize, slicesSize, (groupSize - centerSize) / 2);
  groups.innerHTML += `<div id="slices" class="circle"></div>`;

  const slices = createSlices("#slices", phrases, slicesSize, centerSize);
  slices.innerHTML += `<div id="center" class="circle"></div>`;

  createMiddleGrid("#center", centerSize);
  // $("#center").style.width = `${centerSize}px`;
  // $("#center").style.height = `${centerSize}px`;

  //wait until animation is done then decrease font
  setTimeout(() => {
    decreaseFont("#slices .phrase-inner", "", 26);
  }, 1000);
}

initEvents();

start();

// TODO check this changes
//  - color slices with different colors
