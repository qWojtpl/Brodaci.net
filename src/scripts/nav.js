
document.addEventListener("DOMContentLoaded", () => {

    let navs = document.querySelectorAll("nav");
    let burgers = document.querySelectorAll(".burger");
    let crosses = document.querySelectorAll(".burger-cross");
    let logos = document.querySelectorAll("#nav-image");
    let blocked = false;

    for(let i = 0; i < burgers.length; i++) {
        burgers[i].addEventListener("click", () => {
            if(blocked) {
                return;
            }
            for(let j = 0; j < navs.length; j++) {
                navs[j].setAttribute("class", "opened");
                for(let k = 0; k < logos.length; k++) {
                    logos[k].children[0].children[0].setAttribute("src", "./src/assets/logo_czarne.png");
                }
                blocked = true;
                let a = 0;
                let animation = setInterval(() => {
                    if(a > 1) {
                        blocked = false;
                        cancelInterval(animation);
                    }
                    navs[j].style.opacity = a;
                    a += 0.01;
                }, 1);
            }
        });
    }

    for(let i = 0; i < crosses.length; i++) {
        crosses[i].addEventListener("click", () => {
            if(blocked) {
                return;
            }
            for(let j = 0; j < navs.length; j++) {
                navs[j].setAttribute("class", "");
                for(let k = 0; k < logos.length; k++) {
                    logos[k].children[0].children[0].setAttribute("src", "./src/assets/logo_biale.png");
                }
            }
        });
    }

});