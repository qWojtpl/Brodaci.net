
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

    constructor() {
        let allButtons = document.querySelectorAll("a");
        for(let i = 0; i < allButtons.length; i++) {
            if(allButtons[i].getAttribute("app-load-content") != null) {
                allButtons[i].addEventListener("click", () => this.loadContent(allButtons[i].getAttribute("app-load-content")));
            }
        }
    }

    loadContent(contentName) {
        console.log(contentName);
    }

}

BrodaciPage.setInstance(new BrodaciPage());
document.addEventListener("DOMContentLoaded", () => BrodaciPage.getInstance().startApp());