const wordList = [
  "komputer", "logika", "bahasa", "pemrograman", "fungsi", "koding",
  "data", "struktur", "array", "objek", "nilai", "variabel",
  "perulangan", "kondisi", "logis", "algoritma", "sintaks",
  "program", "internet", "teknologi", "keyboard", "layar",
  "debug", "terminal", "website", "javascript", "html", "css",
  "nodejs", "git", "linux", "framework", "library", "server"
];

const wordBox = document.getElementById("word-box");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const correctDisplay = document.getElementById("correct");
const wpmDisplay = document.getElementById("wpm");
const restartBtn = document.getElementById("restartBtn");

let words = [];
let currentIndex = 0;
let correctCount = 0;
let time = 60;
let timer;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  words = shuffle([...wordList]).slice(0, 50);
  wordBox.innerHTML = "";
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word;
    if (i === 0) span.classList.add("current");
    wordBox.appendChild(span);
  });

  input.value = "";
  input.disabled = false;
  input.focus();
  currentIndex = 0;
  correctCount = 0;
  time = 60;
  correctDisplay.textContent = "0";
  wpmDisplay.textContent = "0";
  timeDisplay.textContent = "60";

  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time === 0) {
      clearInterval(timer);
      input.disabled = true;
      wpmDisplay.textContent = Math.round((correctCount / 60) * 60);
    }
  }, 1000);
}

input.addEventListener("input", () => {
  const currentWord = words[currentIndex];
  const typedRaw = input.value;
  const typedWord = typedRaw.trim();

  const spans = wordBox.querySelectorAll("span");

  if (typedRaw.endsWith(" ")) {
    if (typedWord === currentWord) {
      spans[currentIndex].classList.add("correct");
      correctCount++;
    } else {
      spans[currentIndex].classList.add("wrong");
    }

    currentIndex++;
    if (currentIndex < spans.length) {
      spans.forEach(span => span.classList.remove("current"));
      spans[currentIndex].classList.add("current");
    }

    input.value = "";
    correctDisplay.textContent = correctCount;
  }
});

restartBtn.addEventListener("click", startGame);

startGame();
