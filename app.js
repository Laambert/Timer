const removeBut = document.querySelectorAll(".removeBut");
const checkButtons = document.querySelectorAll(".checkBox");
const navPages = document.querySelectorAll(".nav-item a");
const saves = document.querySelectorAll(".box");
const activeNav = document.querySelector(".active-nav");
const startBut = document.getElementsByClassName("buttons")[0];
const stopBut = document.getElementsByClassName("buttons")[1];
const mainBlock = document.getElementsByClassName("mainBlock")[0];
const timer = document.getElementsByClassName("timer")[0];
const saveBut = document.getElementsByClassName("fa-save")[0];
const savesBlock = document.getElementsByClassName("savesBlock")[0];
const nav = document.getElementsByTagName("nav")[0];
const node = document.getElementsByClassName("timesave")[0];


gsap.registerPlugin(Flip);
let upperChecked = true;
let interval = null;
let units = "s";
let speed = 1000;
let time = ["00", ":", "00"]
let count = [0, 0];
let hide = true;
let removed = false

checkButtons.forEach(but => {
    but.addEventListener('click', (e) => {
        gsap.to(checkButtons, { color: "whitesmoke" });
        if (document.activeElement !== e.target) {
            gsap.to(but, { color: '#385ae0' })
        }

    })

})

navPages.forEach(page => {
    page.addEventListener('click', (e) => {
        gsap.to(navPages, { color: "#252525" });
        if (document.activeElement === e.target) {
            gsap.to(page, { color: '#385ae0' })
        }
        const state = Flip.getState(activeNav)
        page.appendChild(activeNav);
        Flip.from(state, {
            duration: 1.25,
            absolute: true,
            ease: "elastic.out(1,0.5)",
        })
    })
})

function startInterval() {
    interval = setInterval(function() {
        count[1] += 1

        time[2] = ('0' + count[1]).slice(-2)
        if (time[2] == 60) {
            count[1] = 0
            count[0] += 1
            time[0] = ('0' + count[0]).slice(-2)
            time[2] = ('0' + count[1]).slice(-2)

        } else {

        }
        timer.textContent = time[0] + time[1] + time[2] + units
        console.log(time)
    }, speed)
}


function startTimer() {

    if (interval === null) {
        gsap.to(saveBut, { color: "transparent" });
        startInterval()
    } else {

    }
}

function buttonChecked() {
    if (upperChecked == false) {
        upperChecked = true;
        document.getElementById("S").style.borderColor = "#385ae0"
        document.getElementById("S").style.fontSize = "40px"
        document.getElementById("Ms").style.fontSize = "30px"
        document.getElementById("Ms").style.borderColor = "#708090"
        units = "s"
        timer.textContent = time[0] + time[1] + time[2] + units
        clearInterval(interval)
        speed = 1000
        startInterval()

    } else {
        upperChecked = false;
        document.getElementById("Ms").style.borderColor = "#385ae0"
        document.getElementById("Ms").style.fontSize = "40px"
        document.getElementById("S").style.fontSize = "30px"
        document.getElementById("S").style.borderColor = "#708090"
        units = "ms"
        timer.textContent = time[0] + time[1] + time[2] + units
        clearInterval(interval)
        speed = 100
        startInterval()
    }

}

function pauseTimer() {
    if (interval !== null) {
        clearInterval(interval)
        interval = null;
        gsap.to(saveBut, { color: "#294fe3" });
        if (hide == true) {
            nav.style.left = "50%"
            hide = false;

            gsap.to(navPages[0], { color: "#385ae0" });
            gsap.to(navPages[1], { color: "#252525" });
            gsap.to(savesBlock, { color: "black", borderColor: "#385ae0b9" });
            gsap.to(activeNav, { backgroundColor: "#385ae0" });
        }
    }
}

function addTimeToBlock() {
    document.getElementsByClassName("savesBlock")[0].style.justifyContent = "flex-start";
    document.getElementsByClassName("savesBlock")[0].appendChild(node.cloneNode(true));
    let time = document.getElementsByClassName("time")[length].innerHTML = timer.textContent
    const scnd = document.getElementsByClassName("timesave")[1]
    if (removed === false) {
        removed = true
        document.getElementsByClassName("savesBlock")[0].removeChild(scnd)[1]
    }
    saves.forEach(save => {
        gsap.to(saves, { color: "black" });
    })
    removeBut.forEach(but => {
        gsap.to(removeBut, { borderColor: "gray" });
    })



}

function remove(el) {
    el.remove();
}

function resetTimer() {
    clearInterval(interval)
    interval = null;
    count = [0, 0]
    time = ["00", ":", "00"]
    timer.textContent = "00:00" + units
    console.log(time)
}