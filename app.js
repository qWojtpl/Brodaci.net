
class BrodaciPage {

    static #instance;
    #imagesManager;
    #backgroundLoader;
    #contentLoader;

    startApp() {
        this.#imagesManager = new ImagesManager();
        this.#imagesManager.load("S3.png");
        this.#backgroundLoader = new BackgroundLoader();
        this.#contentLoader = new ContentLoader();
    }

    static getInstance() {
        return this.#instance;
    }

    static setInstance(instance) {
        this.#instance = instance;
    }

    getImagesManager() {
        return this.#imagesManager;
    }

    getBackgroundLoader() {
        return this.#backgroundLoader;
    }

    getContentLoader() {
        return this.#contentLoader;
    }

}

class BackgroundLoader {

    async swapAsync(resourceName) {
        let body = document.querySelector("body");
        body.style.backgroundImage = "url(./images/" + resourceName + ")";
    }

}

class ImagesManager {

    #images = [];

    load(resourceName) {
        let img = new Image();
        img.src = "./images/" + resourceName;
        this.#images[this.#images.length] = img;
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
        if(document.getElementById("content-" + contentName) == null) {
            return false;
        }
        this.setUsingLoader(true);
        document.getElementById("content").innerHTML = document.getElementById("content-" + contentName).innerHTML;
        let b = 0;
        let clazz = this;
        let timer = setInterval(function() {
            if(b >= 1) {
                clearInterval(timer);
                clazz.setUsingLoader(false);
                return true;
            }
            b += 0.01;
            console.log(b);
            document.getElementById("content").style.opacity = b;
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