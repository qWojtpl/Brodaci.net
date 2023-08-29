
const cards = document.getElementsByClassName("move-card");
const buttons = document.getElementsByClassName("move-card-button");

let cardIndex = 0;
let blocked = false;

hideAllCards();
selectCard(buttons[0]);

let update = setInterval(() => {
    if(cardIndex == buttons.length) {
        cardIndex = 0;
    }
    if(!blocked) {
        selectCard(buttons[cardIndex++], false);
    } else {
        blocked = false;
    }
}, 10000);

for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        selectCard(buttons[i], true);
    });
}

function hideAllCards() {
    for(let i = 0; i < cards.length; i++) {
        cards[i].style.display = "none";
    }
}

function selectCard(element, manual) {
    if(manual) {
        blocked = true;
    }
    let index = 0;
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].style.borderRadius = "50%";
        buttons[i].style.width = "4vw";
        if(buttons[i] == element) {
            index = i;
        }
    }
    cardIndex = index;
    element.style.borderRadius = "3vw";
    element.style.width = "6vw";
    hideAllCards();
    cards[index].style.display = "";
}