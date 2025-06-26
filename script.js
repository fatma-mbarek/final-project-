const data = {
  europe: [
    { country: "France", flag: "https://flagcdn.com/fr.svg", options: ["France", "Italy", "Netherlands"] },
    { country: "Germany", flag: "https://flagcdn.com/de.svg", options: ["Belgium", "Germany", "Sweden"] },
    { country: "Spain", flag: "https://flagcdn.com/es.svg", options: ["Spain", "Portugal", "Italy"] },
    { country: "Italy", flag: "https://flagcdn.com/it.svg", options: ["Greece", "Italy", "Romania"] },
    { country: "United Kingdom", flag: "https://flagcdn.com/gb.svg", options: ["Ireland", "United Kingdom", "Wales"] }
  ],
  afrique: [
    { country: "Tunisia", flag: "https://flagcdn.com/tn.svg", options: ["Morocco", "Tunisia", "Algeria"] },
    { country: "Senegal", flag: "https://flagcdn.com/sn.svg", options: ["Cameroon", "Senegal", "Ghana"] },
    { country: "South Africa", flag: "https://flagcdn.com/za.svg", options: ["Kenya", "Nigeria", "South Africa"] },
    { country: "Egypt", flag: "https://flagcdn.com/eg.svg", options: ["Egypt", "Libya", "Sudan"] },
    { country: "Nigeria", flag: "https://flagcdn.com/ng.svg", options: ["Ghana", "Nigeria", "Kenya"] }
  ],
  asie: [
    { country: "Japan", flag: "https://flagcdn.com/jp.svg", options: ["China", "Japan", "South Korea"] },
    { country: "India", flag: "https://flagcdn.com/in.svg", options: ["Pakistan", "India", "Bangladesh"] },
    { country: "China", flag: "https://flagcdn.com/cn.svg", options: ["Japan", "China", "Vietnam"] },
    { country: "South Korea", flag: "https://flagcdn.com/kr.svg", options: ["China", "Japan", "South Korea"] },
    { country: "Thailand", flag: "https://flagcdn.com/th.svg", options: ["Malaysia", "Thailand", "Cambodia"] }
  ],
  amerique: [
    { country: "Canada", flag: "https://flagcdn.com/ca.svg", options: ["Canada", "United States", "Mexico"] },
    { country: "Brazil", flag: "https://flagcdn.com/br.svg", options: ["Brazil", "Argentina", "Colombia"] },
    { country: "United States", flag: "https://flagcdn.com/us.svg", options: ["Canada", "United States", "Cuba"] },
    { country: "Argentina", flag: "https://flagcdn.com/ar.svg", options: ["Argentina", "Chile", "Peru"] },
    { country: "Mexico", flag: "https://flagcdn.com/mx.svg", options: ["Mexico", "Colombia", "Costa Rica"] }
  ]
};

let quiz = [];
let currentIndex = 0;
let score = 0;
let answered = false;
/*fonction start quiz*/
function startQuiz(continent) {
  quiz = shuffleArray([...data[continent]]);
  currentIndex = 0;
  score = 0;
  answered = false;
  document.getElementById("flag-image").style.display = "block";
  document.getElementById("controls").style.display = "block";
  document.getElementById("score-display").textContent = "";
  showQuestion();
}
/*fonction show quiz*/
function showQuestion() {
  const question = quiz[currentIndex];
  document.getElementById("flag-image").src = question.flag;
  document.getElementById("question-title").textContent = `Question ${currentIndex + 1} : What is this country ?`;
  document.getElementById("result").textContent = "";
  answered = false;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option-btn";
    btn.onclick = () => checkAnswer(option, question.country, btn);
    optionsContainer.appendChild(btn);
  });
}
/*fonction check answer */
function checkAnswer(selected, correct, btnClicked) {
  if (answered) return;

  const result = document.getElementById("result");
  const correctSound = document.getElementById("correct-sound");
  const wrongSound = document.getElementById("wrong-sound");

  if (selected === correct) {
    result.textContent = "✅ Good answer!";
    result.style.color = "green";
    correctSound.play();
    score += 10;
  } else {
    result.textContent = `❌Wrong answer. It was : ${correct}`;
    result.style.color = "red";
    wrongSound.play();
  }

  answered = true;

  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#b4e3b0";
    } else {
      btn.style.opacity = 0.5;
    }
  });
}
/*fonction next Question */
function nextQuestion() {
  if (!answered) {
    alert("Veuillez choisir une réponse avant de continuer.");
    return;
  }

  currentIndex++;
  if (currentIndex >= quiz.length) {
    document.getElementById("question-title").textContent = "Quiz  finished 🎉";
    document.getElementById("flag-image").style.display = "none";
    document.getElementById("options").innerHTML = "";
    document.getElementById("result").textContent = "";
  } else {
    showQuestion();
  }
}
/*fonction show score */
function showScore() {
  document.getElementById("score-display").textContent = `Score : ${score} points`;
}
/*fonction shuffelArray*/
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
