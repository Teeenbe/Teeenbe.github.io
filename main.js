const speechBubble = document.querySelector("#speech-bubble");
const p = document.createElement("p")
p.innerText = "Shut up, Meg!";
p.className = "shut-up";
p.id = "joke";
document.querySelector("#joke-text-container").appendChild(p);
speechBubble.classList.remove("transparent");
removeJokeAndBubble(1.3);

function removeJokeAndBubble(time) {
    setTimeout(function () {
        document.querySelector("#joke").remove();
        speechBubble.classList.add("transparent");
     }, time*1000);
}

function addJoke(callback) {
    return async function () {
        const joke = await callback();
        const p = document.createElement("p");
        p.id = "joke";
        p.innerText = joke;
        speechBubble.classList.remove("transparent");
        document.querySelector("#joke-text-container").appendChild(p);
        removeJokeAndBubble(3);
    }
}

async function getDadJoke() {
    let jokeLength = 0;    
    while (jokeLength > 70 || jokeLength < 45) {
        let response = await fetch("https://icanhazdadjoke.com/", {
            headers: { accept: "application/json" },
        });
        var data = await response.json();
        jokeLength = data.joke.length;
    }
    return data.joke;
}

function playFlush() {
    const audio = new Audio("audio/flush.mp3");
    audio.play();
}

const button = document.querySelector("button");
button.addEventListener("click", addJoke(getDadJoke));
button.addEventListener("click", playFlush);

/*async function getDadJoke() {

    let jokeLength = 0;
    
    while (jokeLength > 70 || jokeLength < 45) {
        let response = await fetch("https://icanhazdadjoke.com/", {
            headers: { accept: "application/json" },
        });
        var data = await response.json();
        jokeLength = data.joke.length;
    }
    const p = document.createElement("p");
    p.id = "joke";
    p.innerText = data.joke;
    speechBubble.classList.remove("transparent");
    document.querySelector("#joke-text-container").appendChild(p);

    setTimeout(function () {
        document.querySelector("#joke").remove();
        speechBubble.classList.add("transparent");
     }, 5000);
}*/