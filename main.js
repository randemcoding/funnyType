const textInput = document.getElementById('text-input');
const overlayText = document.getElementById('overlay-text');
const container = document.getElementById('main-container');
const sentenceInput = document.getElementById('sentence');
const timer = document.getElementById('timer');
let reset = document.getElementById('reset');
const wpm = document.getElementById('wpm')
const errors = document.getElementById('errors');
const button30 = document.getElementById('30-sec')
const button60 = document.getElementById('60-sec')
const deleteMessage = document.getElementById('delete-message');
deleteMessage.hidden = true;
let selectedTime = 0


timer.hidden = false;
let seconds = 0;

let tempCorrect = 0;
let tempIncorrect = 0;
let totalTyped = 0
let accuracy = 0;


const dadJokes = [
  `It aint easy being cheesy.`,
  `Me and my wife agree about everything.`,
  `<insert politcally correct acceptable joke so people don't get offended>`,
  `Okay so... A trump supporter, a biden supporter walk into a bar...`,
  `Hillary Clinton was a great president.`,
  `What if batman was just a schizophrenic homeless guy lving in New York?`,
  `Superman is the most overpowered super hero til' you put a little green rock next to him.`,
  `Ryan Reynolds is not funny.`,
  `Marvel is DC for kids.`,
  `The Detroit Lions have won the Super Bowl.`, 
  `My friend said he's a dog person, I said I'm just a person who likes dogs.`,
  `If she has alot of cats, her house probably smells like.`,
  `The Big Bang Theory is not real, its a TV show.`,
  `Online gaming can help you develop social skills in a positive environment.`,
  `Some people still believe that mermaid mockumentary thing way back was real.`,
  `It's not your fault, Some people are just stupid.`,
  `Why did the tomato turn red? Because it saw the salad dressing!`,
  `What do you call fake spaghetti? An impasta!`,
  `Why don't scientists trust atoms? Because they make up everything!`,
  `What's the difference between a poorly dressed man on a trampoline and a well-dressed man on a trampoline? Attire.`,
  `I'm reading a book on the history of glue - I just can't seem to put it down!`,
  `What did one hat say to the other? You wait here, I'll go on ahead!`,
  `Why did the scarecrow win an award? Because he was outstanding in his field!`,
  `Why don't skeletons fight each other? They don't have the guts.`,
  `I don't trust people who do acupuncture. They're back stabbers.`,
  `Why do some couples go to the gym? Because some relationships need work.`,
  "Knock, knock. Who's there? Boo. Boo who? Don't cry. It's only a joke!",
  "Knock, knock. Who's there? Orange. Orange who? Orange you going to answer the door?",
  "Knock, knock. Who's there? Cows. Cows who? Cows go 'moo', not 'who'!",
  "Knock, knock. Who's there? Olive. Olive who? Olive you and I'm not afraid to admit it!",
  "Knock, knock. Who's there? Harry. Harry who? Harry up and answer the door!",
  "Knock, knock. Who's there? Lettuce. Lettuce who? Lettuce in, it's cold out here!",
  "Knock, knock. Who's there? Noah. Noah who? Noah place like home!",
  "Knock, knock. Who's there? Boo. Boo who? Don't cry, it's just a joke!",
  "Knock, knock. Who's there? Tank. Tank who? You're welcome!",
  "Knock, knock. Who's there? Interrupting cow. Interrupting cow w- MOO!",
  "I'm not arguing, I'm just explaining why I'm right.",
  "I'm not great at the advice. Can I interest you in a sarcastic comment?",
  "I'm not lazy, I'm just on energy-saving mode.",
  "I'm not sure how many problems I have because math is one of them.",
  "I'm not arguing, I'm simply explaining why I am right.",
  "I love deadlines. I love the whooshing noise they make as they go by.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "I told my wife she was getting a little chubby. She said, 'What was that?' I said, 'There's a lot of you coming and going.'",
  "I'm not saying I'm Wonder Woman, I'm just saying no one has ever seen me and Wonder Woman in the same room together.",
  "I don't always procrastinate, but when I do, I'll do it tomorrow."
];


const nouns = ['dog', 'cat', 'elf', 'person', 'thing', 'placement', 'washington', 'bear'];
const verbs = ['running', 'ate', 'eaten', 'eating', 'ran', 'overpowered', 'dominated', 'subdued'];
const adjectives = ['big', 'small', 'fat', 'skinny', 'deranged', 'hungry', 'starving', 'malnourished'];
const adverbs = ['fast', 'slow', 'beautifully', 'quickly', 'rushingly', 'thumpy', 'mercilessly', 'ravagingly', 'happily'];

function getSentence(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getParagraph(array) {
  let choice1 = array[Math.floor(Math.random() * array.length)];
console.log(choice1)

  let choice2 = array[Math.floor(Math.random() * array.length)]
  let choice3 = array[Math.floor(Math.random() * array.length)]
  let choice4 = array[Math.floor(Math.random() * array.length)]
  let choice5 = array[Math.floor(Math.random() * array.length)]
  
  sentenceInput.innerText =  `${choice1} ${choice2} ${choice3} ${choice4} ${choice5}`;
}
function checkCorrect() {
  let inputText = textInput.value;
  let currentLetterIndex = inputText.length - 1;
  let inputLetter = inputText[currentLetterIndex];
  let sentenceLetter = sentenceInput.innerText[currentLetterIndex];
  let overlayTextValue = '';
  
  if (inputLetter === sentenceLetter || inputLetter === '') {
    // correct letter or empty string (i.e., deletion)
    deleteMessage.hidden = true;
    overlayTextValue = inputText;
    sentenceInput.style.color = 'rgb(134, 131, 138)';
    tempCorrect++
  } else {
    // incorrect letter
    deleteMessage.hidden = false;
    sentenceInput.style.color = 'red';
    overlayTextValue = inputText.slice(0, currentLetterIndex) + '_' + inputText.slice(currentLetterIndex + 1);
    tempIncorrect++
  }
  
  overlayText.innerText = overlayTextValue;
  overlayText.innerHTML += '<span class="blink">&nbsp;</span>';
}



document.addEventListener('DOMContentLoaded', function() {
  getParagraph(dadJokes);
  button30.addEventListener('click', function(){
    timer.innerText = 30;
    textInput.focus();
    selectedTime = 30;
  })
  button60.addEventListener('click', function(){
    timer.innerText = 60;
    textInput.focus();
    selectedTime = 60;
  })
});

container.addEventListener('click', function() {
  interval = ''
  textInput.focus();
  textInput.value = ''
  overlayText.innerText = ''
  sentenceInput.style.filter = 'blur(0px)';
reset.hidden = true;
seconds = timer.innerText;

textInput.addEventListener('input', checkCorrect);
textInput.addEventListener('input', halfMinute);
tempCorrect = 0;
tempIncorrect = 0;
totalTyped = 0
accuracy = 0;
getParagraph(dadJokes);
overlayText.hidden = false;
timer.hidden = false;
});

let interval = ''

function halfMinute() {
  seconds = timer.innerText;

  if (!interval) { // only start the interval if it isn't already running
    interval = setInterval(() => {
      seconds--;
      timer.innerText = seconds;
      if (seconds <= 0) {
        clearInterval(interval);
        console.log("Timer stopped after 30 seconds");
  sentenceInput.style.filter = 'blur(3px)';
  overlayText.hidden = true;
  reset.hidden = false;
  
  solveWPM()

      }
    }, 1000);
  }
}
function solveWPM(selectedTime) {
  const totalTyped = tempCorrect + tempIncorrect;
  const accuracy = Math.round((tempCorrect / totalTyped) * 100);
  let tempTime =  selectedTime
  if (tempTime === 60){
  wpmValue = (tempCorrect / 5); // assuming each word is 5 characters long
  } else {
  wpmValue = (tempCorrect / 2.5); // assuming each word is 5 characters long
  }
  wpm.innerText = `WPM: ${wpmValue}`;
  errors.innerText = `Accuracy: ${accuracy}%`;
}



