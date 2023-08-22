
class BrodaciPage {

    static #instance;
    #contentLoader;

    startApp() {
        this.#contentLoader = new ContentLoader();
    }

    static getInstance() {
        return this.#instance;
    }

    static setInstance(instance) {
        this.#instance = instance;
    }

    getContentLoader() {
        return this.#contentLoader;
    }

}

class ContentLoader {

    #usingLoader;
    #currentContent;

    constructor() {
        let allButtons = document.querySelectorAll("a[app-load-content]");
        for(let i = 0; i < allButtons.length; i++) {
            allButtons[i].addEventListener("click", () => {
                this.loadContent(allButtons[i].getAttribute("app-load-content"));
            });
        }
    }

    async loadContent(contentName) {
        if(this.#usingLoader || this.#currentContent == contentName) {
            return false;
        }
        this.setCurrentContent(contentName);
        console.log("Loading content: " + contentName);
        document.getElementById("content").style.opacity = 0;
        this.setUsingLoader(true);
        $.ajax({
            type: "GET",
            url: "./contents/rules.html",
            async: true,
            success : function(data) {
                document.getElementById("content").innerHTML = data;
            }
        });
        let o = 0;
        let clazz = this;
        let timer = setInterval(function() {
            if(o >= 1) {
                clearInterval(timer);
                clazz.setUsingLoader(false);
                return true;
            }
            o += 0.01;
            document.getElementById("content").style.opacity = o;
        }, 10);
    }

    setUsingLoader(state) {
        this.#usingLoader = state;
    }

    setCurrentContent(contentName) {
        this.#currentContent = contentName;
    }

}

BrodaciPage.setInstance(new BrodaciPage());
document.addEventListener("DOMContentLoaded", () => BrodaciPage.getInstance().startApp());