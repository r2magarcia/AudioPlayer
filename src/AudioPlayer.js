class AudioPlayer {

    constructor(domElement) {
        this.domElement = domElement;
        this.src = this.domElement.dataset.src;
        this.audio = new Audio(this.src);
        this.controls = {
            domElement: this.domElement.querySelector(".controls")
        };
        console.log("constructor");
        this.progress = this.domElement.querySelector(".cover .progress");
        this.initControls();
        this.initProgressActions();

        this.audio.ontimeupdate = () => { this.updateUI(); }
        this.audio.volume = 0.2;
    }

    initControls() {
        this.controls.play = this.controls.domElement.querySelector(".playBtn");
        if (this.controls.play) {
            this.initPlay(this.controls.play);
        }
        console.log("initControls");
    }

    initPlay(domElement) {
        domElement.onclick = () => {
            const icon = domElement.querySelector("i");
            const isPaused = icon.classList.contains("fa-play");
            console.log(isPaused);
            if (!isPaused) {
                icon.classList.replace('fa-pause', 'fa-play');
                this.pause();
            } else {
                icon.classList.replace('fa-play', 'fa-pause');
                this.play();
            }
        }
    }

    initProgressActions() {
        // const cover = this.domElement.querySelector(".cover");
        // cover.onclick = (e) => {
        //     const x = e.offsetX;
        //     const totalX = cover.clientWidth;
        //     const progress = x / totalX;
        //     this.setCurrentTime(progress);
        // };
        const leftArrow = this.domElement.querySelector(".fa-angle-left");
        leftArrow.onclick = (e) => {
            const progress = (this.audio.currentTime) - 10;
            // console.log(e);
            this.setCurrentTime(progress);
        }
        const rightArrow = this.domElement.querySelector(".fa-angle-right");
        rightArrow.onclick = (e) => {
            const progress = (this.audio.currentTime) + 10;
            // console.log(e);
            this.setCurrentTime(progress);
        }
    }

    setCurrentTime(progress) {

        this.audio.currentTime = progress;
    }

    updateUI() {
        console.log("Updating UI");
        const total = this.audio.duration;
        const current = this.audio.currentTime;
        const progress = (current / total) * 100;
        this.progress.style.width = `${progress}%`;
        // console.log(current);
    }

    play() {
        console.log("play");
        this.audio.play().then().catch(err => console.log(`Error al reproducir el archivo: ${err}`));
    }

    pause() {
        console.log("pause");
        this.audio.pause();
    }

}