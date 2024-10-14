const typingtext = document.querySelector('.typing-text p');
const input = document.querySelector('.container .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;


function loadParagraph(){
    const paragraph = ["You must be the change you wish to see in the world.","Spread love everywhere you go. Let no one ever come to you without leaving happier.", "The only thing we have to fear is fear itself.", "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate: only love can do that.","Do one thing every day that scares you.", "Well done is better than well said.", "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", "It is during our darkest moments that we must focus to see the light.", "Do not go where the path may lead; go instead where there is no path and leave a trail."];

    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingtext.innerHTML='';
    for(const char of paragraph[randomIndex]){
        console.log(char);
        typingtext.innerHTML += `<span>${char}</span>`;
    }
    typingtext.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener('keydown',()=>input.focus());

    typingtext.addEventListener("click", ()=>{
        input.focus()
    })

}


function initTyping(){
    const char = typingtext.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){


        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping =true;

        }


        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log('correct');
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }
    else{
        clearInterval(timer);
        input.value= '';
    }
}


function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round((charIndex - mistake)/5 /(maxTime - timeLeft)*60);
        wpm.innerText= wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;

}

btn.addEventListener("click",reset);

input.addEventListener("input", initTyping);

loadParagraph();