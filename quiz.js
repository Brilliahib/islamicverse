const quizData = [
    {
        question: "Ayat mana yang menyebutkan bahwa Allah Maha Mengetahui segala sesuatu?",
        a: "Al-Fatihah",
        b: "Al-Baqarah",
        c: "Al-Imran",
        d: "An-Nisa",
        correct: "b",
    },
    {
        question: "Surat An-Nisa' memiliki arti sebagai?",
        a: "Istri",
        b: "Wanita",
        c: "Kecantikan",
        d: "Paras",
        correct: "b",
    },
    {
        question: "Al-Baqarah memiliki berapa ayat?",
        a: "286",
        b: "277",
        c: "289",
        d: "287",
        correct: "a",
    },
    {
        question: "Gerakan awal dalam sholat yang dilakukan dengan berdiri disebut sebagai?",
        a: "Rukuk",
        b: "Sujud",
        c: "Takbiratul Ihram",
        d: "I'tidal",
        correct: "c",
    },
];
const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
let currentQuiz = 0
let score = 0
loadQuiz()
function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}
function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}
submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
        }
        currentQuiz++
        if (currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>
           <button onclick="location.reload()">Reload</button>
           `
        }
    }
})