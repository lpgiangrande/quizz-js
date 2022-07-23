// Récupérer les données du quizz au submit

const form = document.querySelector('.form-quizz');
let resultsArr = [];
const goodAnswers = ['c','a','b','a','c'];
const emojis = ['✔️','✨','👀','😭','👎'];
const resultTitle = document.querySelector('.results h2');
const resultNote = document.querySelector('.note');
const resultHelp = document.querySelector('.help');
const allQuestions = document.querySelectorAll('.question-block');
let checkArray = []; // Contiendra des true ou false en fonction des choix cochés


form.addEventListener('submit', (e) => {
    e.preventDefault(); // n'actualise pas la page, et récup données en local | empêche la soumission
    //console.log(document.querySelector('input[name="q1"]:checked').value);

   // Itérer sur les 5 inputs radio pour en récupérer leur valeur et les stockers dans un tableau
    for(i=1; i < 6; i++){
        resultsArr.push(document.querySelector(`input[name="q${i}"]:checked`).value);
        /* template literals pour récupérer dynamiquement les n° de question 
        (q1, q2...)en fonction de i */
    }
    // console.log(resultsArr);
    checkResult(resultsArr);
    // réinitialiser le tableau à vide  pour empêcher doublon si on re clic sur valider les rep du quizz
    resultsArr = []; 
})



// FONCTIONS 


/* 1 - Fonction qui compare les valeurs cochées par l'user (resultArr) 
avec le tableau de bonnes réponses (checkArray) -> doit renvoyer un checkArray avec que des true */
function checkResult(resultArr){

    for (let j = 0; j < 5; j++){
        /*
        if(resultsArr[j] === goodAnswers[j]){
            checkArray.push(true);
        } else {
            checkArray.push(false);
        }*/
        resultArr[j] === goodAnswers[j] ?  checkArray.push(true) : checkArray.push(false);
     }
    //console.log(checkArray);
    showResults(checkArray);
    colorsResult(checkArray);
    checkArray = []; // réinitialiser à 0
}


// 2 - Afficher les résultats

function showResults(checkArray) {

    // Filtrons que les false :
    const nbMistakes = checkArray.filter(el => el !== true).length;
    //console.log(nbMistakes);

    switch(nbMistakes){

        case 0:
            resultTitle.innerText = `${emojis[0]} Bravo, c'est un sans fautes ! ${emojis[0]} `;
            resultHelp.innerText = "";
            resultNote.innerText = "5/5";
        break;
        case 1:
            resultTitle.innerText = `${emojis[1]} Encore un effort ! ${emojis[1]}`;
            resultHelp.innerText = "Retentez une autre réponse dans les cases rouges puis re validez";
            resultNote.innerText = "4/5";
        break;
        case 2:
            resultTitle.innerText = `${emojis[2]} Il reste quelques erreurs ! ${emojis[2]}`;
            resultHelp.innerText = "Retentez une autre réponse dans les cases rouges puis re validez";
            resultNote.innerText = "3/5";
        break;
        case 3:
            resultTitle.innerText = `${emojis[3]} Peut mieux faire ! ${emojis[3]}`;
            resultHelp.innerText = "Retentez une autre réponse dans les cases rouges puis re validez";
            resultNote.innerText = "2/5";
        break;
        case 4:
            resultTitle.innerText = `${emojis[4]} Peut mieux faire ! ${emojis[4]}`;
            resultHelp.innerText = "Retentez une autre réponse dans les cases rouges puis re validez";
            resultNote.innerText = "1/5";
        break;
        case 5:
            resultTitle.innerText = `${emojis[5]} Peut mieux faire ! ${emojis[5]}`;
            resultHelp.innerText = "Retentez une autre réponse dans les cases rouges puis re validez";
            resultNote.innerText = "0/5";
        break;

        default:
            "Oops, résultat innatendu !";
    }
}

// 3 - Couleurs en fonctions des résultats
function colorsResult(checkArray){

    for (let i=0; i < checkArray.length; i++){
        checkArray[i] === true ? 
        allQuestions[i].style.background = '#90EE90' 
            : allQuestions[i].style.background = '#ffb8b8',
              allQuestions[i].classList.add('fail');

            setTimeout(() => {
                allQuestions[i].classList.remove('fail');
            }, 500)
    }
 }


/* 4 - Fonction pour changer le bg d'un bloc question 
en blanc au lieu de rouge quand on veut modifier une réponse */
// forEach => éxécute une fonction sur chaque élément d'un tableau (ici, bloc de question)
allQuestions.forEach(el => {
    el.addEventListener('click', () => {
        el.style.background = "white";
    })
})