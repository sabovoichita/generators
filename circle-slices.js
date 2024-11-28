console.log("Welcome");
// TODO check this examples:
//   https://stackoverflow.com/questions/10028182/how-to-make-a-pie-chart-in-css
// let phrases = new Array(6).fill("Text").map((text, index) => `${text} ${index + 1}`);
let phrases = [
  // 1 = Darul de a rezolva probleme
  "Discernământ spiritual interior",
  "Creativitate si inventivitate",
  "Luarea deciziilor",
  // 2 = Daruri de pastor-invatator
  "Consiliind",
  "Pregatind si conducand inchinarea",
  "Facand ucenici",
  "Predicand",
  "Zidind unitatea trupului",
  // 3 = Orientat spre crestere
  "Capabil pentru viziune",
  "Adaptaptindu-se la crestere",
  "Deschis la crestere",
  "Motivatii personale",
  // 4 = Penetrare in societate
  "Stil flexibil",
  "Activitate evang. in/afara Bisericii",
  "Prezenta in Biserica",
  "Raspunde nevoilor Comunitatii",
  // 5 = Abilitatile conducerii
  "Autoritate si Influenta",
  "Dezvoltarea conducerii Bisericii",
  "Motivarea Membrilor",
  "Utilizarea darurilor",
  "Formand o lucrare care se mentine"
];
phrases = [...phrases, ...phrases]; // TMP duplicate phrases
const length = phrases.length;
const radius = 360 / length;
const odd = length % 2 === 1 ? 0 : 1;
document.querySelector(".circle").innerHTML =
  phrases
    .map((phrase, index) => {
      const angle = Math.round(index * radius);
      const color = `hsl(${Math.round(index * radius)}, 100%, 50%)`;
      return `
                  <div class="slice-line" style="--angle: ${angle}deg; --color: ${color}"></div>
                  <div class="slice-text" style="--angle: ${
                    angle + odd * Math.round(radius / 2)
                  }deg; --color: ${color}">
                      <div class="phrase-inner" style="z-index: ${phrases.length + index}">${index}.${phrase}</div>
                  </div>
                `;
    })
    .join("") + `<div class="inner-circle"></div>`;
