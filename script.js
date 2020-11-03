//definer points og liv
let points;
let liv;
let spillerMusik = false;

window.addEventListener("DOMContentLoaded", sidenVises);

function sidenVises() {
    console.log("sidenVises");

    document.querySelector("#play").addEventListener("click", clickPlay);
    document.querySelector("#game_over").classList.add("display_none");
    document.querySelector("#level_complete").classList.add("display_none");
    document.querySelector("#start").classList.add("display_none");
    document.querySelector("#indstil_popup").classList.add("display_none");

}

function clickPlay() {
    console.log("clickPlay");

    document.querySelector("#start_skaerm").classList.add("display_none");
    document.querySelector("#start").classList.remove("display_none");
    document.querySelector("#musik").play();
    document.querySelector("#musik").volume = 0.1;

    //Nulstiller points og liv
    points = 0;
    liv = 5;

    //sætter alle liveve så de kan ses
    document.querySelector("#liv1").classList.remove("hide");
    document.querySelector("#liv2").classList.remove("hide");
    document.querySelector("#liv3").classList.remove("hide");
    document.querySelector("#liv4").classList.remove("hide");
    document.querySelector("#liv5").classList.remove("hide");

    //Gemmer alle pointsne, så der vises 0 points fra start
    document.querySelector("#point1").classList.add("hide");
    document.querySelector("#point2").classList.add("hide");
    document.querySelector("#point3").classList.add("hide");
    document.querySelector("#point4").classList.add("hide");
    document.querySelector("#point5").classList.add("hide");
    document.querySelector("#point6").classList.add("hide");
    document.querySelector("#point7").classList.add("hide");
    document.querySelector("#point8").classList.add("hide");
    document.querySelector("#point9").classList.add("hide");
    document.querySelector("#point10").classList.add("hide");
    document.querySelector("#point11").classList.add("hide");
    document.querySelector("#point12").classList.add("hide");

    document.querySelector("#stjerner").classList.add("hide");

    document.querySelector("#spil_knap").addEventListener("click", clickSpil);

}

function clickSpil() {
    console.log("clickSpil");

    document.querySelector("#start").classList.add("display_none");

    //Starter spillet
    startGame()

}


function startGame() {
    console.log("startGame");

    //starter timeren
    document.querySelector("#time_board").classList.add("sek_timer");
    document.querySelector("#time_board").addEventListener("animationend", timeUp);

    //starter alle animationer
    document.querySelector("#cupcake1_container").classList.add("kage1");
    document.querySelector("#cupcake2_container").classList.add("kage1");
    document.querySelector("#cupcake3_container").classList.add("kage2");
    document.querySelector("#cupcake4_container").classList.add("kage2");
    document.querySelector("#cupcake5_container").classList.add("kage3");
    document.querySelector("#cupcake6_container").classList.add("kage3");

    document.querySelector("#muffin1_container").classList.add("kage1");
    document.querySelector("#muffin2_container").classList.add("kage1");
    document.querySelector("#muffin3_container").classList.add("kage2");
    document.querySelector("#muffin4_container").classList.add("kage2");
    document.querySelector("#muffin5_container").classList.add("kage3");
    document.querySelector("#muffin6_container").classList.add("kage3");

    //sætter eventlisteners på alle elementerne, så der sker noget når man klikker på hhv. gode og onde kager.
    document.querySelector("#cupcake1_container").addEventListener("click", clickCup);
    document.querySelector("#cupcake2_container").addEventListener("click", clickCup);
    document.querySelector("#cupcake3_container").addEventListener("click", clickCup);
    document.querySelector("#cupcake4_container").addEventListener("click", clickCup);
    document.querySelector("#cupcake5_container").addEventListener("click", clickCup);
    document.querySelector("#cupcake6_container").addEventListener("click", clickCup);


    document.querySelector("#muffin1_container").addEventListener("click", clickMuf);
    document.querySelector("#muffin2_container").addEventListener("click", clickMuf);
    document.querySelector("#muffin3_container").addEventListener("click", clickMuf);
    document.querySelector("#muffin4_container").addEventListener("click", clickMuf);
    document.querySelector("#muffin5_container").addEventListener("click", clickMuf);
    document.querySelector("#muffin6_container").addEventListener("click", clickMuf);

    //gør så man kan klikke på indstillingerne
    document.querySelector("#indstillinger").addEventListener("click", indstil);
}


function clickCup() {
    console.log("clickCup");

    //lader points stige, hvis der er plads i barren
    if (points < 12) {
        points++;
        console.log("Antal points", points);
        console.log("Afspil points-lyden");
        if (Math.random() > 0.5) {
            document.querySelector("#cupcakelyd1").play();
        } else {
            document.querySelector("#cupcakelyd2").play();
        }

        document.querySelector("#point" + points).classList.remove("hide");
    } else {
        console.log("barren er fyldt");
        console.log("Afspil stjerne-glimmer-lyden");
        document.querySelector("#stjernelyd").play();
        document.querySelector("#stjerner").classList.remove("hide");
        document.querySelector("#stjerner").classList.add("stjerner");
        document.querySelector("#stjerner").addEventListener("animationend", stjernerDone);
    }

    //får kagen til at forsvinde når man klikker på den
    this.firstElementChild.classList.add("hide");
    this.removeEventListener("click", clickCup);
    this.addEventListener("animationiteration", genstartCup);
}

function genstartCup() {
    console.log("genstartCup");
    //starter cupcaken man klikkede på forfra når den når til sin startposition, som er udenfor skærmen.
    this.addEventListener("click", clickCup);
    this.firstElementChild.classList.remove("hide");
}

function stjernerDone() {
    console.log("stjernerDone");
    //fjerner stjernerne så de kan blive vist igen næste gang man får points.
    document.querySelector("#stjerner").classList.add("hide");
    document.querySelector("#stjerner").classList.remove("stjerner");
}

function clickMuf() {
    console.log("clickMuf");
    console.log("Afspil lyd for klik på dårlig kage");
    if (Math.random() > 0.5) {
        document.querySelector("#muffinlyd1").play();
    } else {
        document.querySelector("#muffinlyd2").play();
    }

    //lader points falde, hvis der er nogle points i point barometeret (likes).
    if (points > 0) {
        document.querySelector("#point" + points).classList.add("hide");
        points--;
    } else {
        console.log("Der er ingen points at trække fra, så man mister kun liv.")
    }

    //lader liv falde
    document.querySelector("#liv" + liv).classList.add("hide");
    liv--;

    //får kagen til at forsvinde når man klikker på den
    this.firstElementChild.classList.add("hide");
    this.removeEventListener("click", clickMuf);

    //Hvis man løber tør for liv (followes), stopper spillet. Ellers fortsætter det.
    if (liv < 1) {
        console.log("spil slutter");
        console.log("Afspil stop-spillet-lyden");
        stopSpillet();
    } else {
        this.addEventListener("animationiteration", genstartMuf);
    }
}

function genstartMuf() {
    console.log("genstartMuf");
    //Den muffin man klikker på, bliver synlig igen når den når ud til sin startplads(udenfor skærmen).
    this.addEventListener("click", clickMuf);
    this.firstElementChild.classList.remove("hide");
}

function timeUp() {
    console.log("timeUp");
    console.log("Afspil stop-spillet-lyden");
    stopSpillet();
}

function stopSpillet() {

    //standser alle animationer og eventlisteners
    document.querySelector("#cupcake1_container").removeEventListener("click", clickCup);
    document.querySelector("#cupcake2_container").removeEventListener("click", clickCup);
    document.querySelector("#cupcake3_container").removeEventListener("click", clickCup);
    document.querySelector("#cupcake4_container").removeEventListener("click", clickCup);
    document.querySelector("#cupcake5_container").removeEventListener("click", clickCup);
    document.querySelector("#cupcake6_container").removeEventListener("click", clickCup);


    document.querySelector("#muffin1_container").removeEventListener("click", clickMuf);
    document.querySelector("#muffin2_container").removeEventListener("click", clickMuf);
    document.querySelector("#muffin3_container").removeEventListener("click", clickMuf);
    document.querySelector("#muffin4_container").removeEventListener("click", clickMuf);
    document.querySelector("#muffin5_container").removeEventListener("click", clickMuf);
    document.querySelector("#muffin6_container").removeEventListener("click", clickMuf);

    document.querySelector("#cupcake1_container").removeEventListener("animationend", genstartCup);
    document.querySelector("#cupcake2_container").removeEventListener("animationend", genstartCup);
    document.querySelector("#cupcake3_container").removeEventListener("animationend", genstartCup);
    document.querySelector("#cupcake4_container").removeEventListener("animationend", genstartCup);
    document.querySelector("#cupcake5_container").removeEventListener("animationend", genstartCup);
    document.querySelector("#cupcake6_container").removeEventListener("animationend", genstartCup);


    document.querySelector("#muffin1_container").removeEventListener("animationend", genstartMuf);
    document.querySelector("#muffin2_container").removeEventListener("animationend", genstartMuf);
    document.querySelector("#muffin3_container").removeEventListener("animationend", genstartMuf);
    document.querySelector("#muffin4_container").removeEventListener("animationend", genstartMuf);
    document.querySelector("#muffin5_container").removeEventListener("animationend", genstartMuf);
    document.querySelector("#muffin6_container").removeEventListener("animationend", genstartMuf);

    document.querySelector("#cupcake1_container").classList.remove("kage1");
    document.querySelector("#cupcake2_container").classList.remove("kage1");
    document.querySelector("#cupcake3_container").classList.remove("kage2");
    document.querySelector("#cupcake4_container").classList.remove("kage2");
    document.querySelector("#cupcake5_container").classList.remove("kage3");
    document.querySelector("#cupcake6_container").classList.remove("kage3");

    document.querySelector("#muffin1_container").classList.remove("kage1");
    document.querySelector("#muffin2_container").classList.remove("kage1");
    document.querySelector("#muffin3_container").classList.remove("kage2");
    document.querySelector("#muffin4_container").classList.remove("kage2");
    document.querySelector("#muffin5_container").classList.remove("kage3");
    document.querySelector("#muffin6_container").classList.remove("kage3");

    document.querySelector("#time_board").classList.remove("sek_timer");

    if (points >= 10) {
        levelComplete();
    } else {
        gameover();
    }
}

function levelComplete() {
    console.log("levelComplete");
    console.log("Afspil vinder-lyden");
    document.querySelector("#winlyd").play();

    document.querySelector("#level_complete").classList.remove("display_none");
    document.querySelector("#next_level").addEventListener("click", igen);
}

function gameover() {
    console.log("gameover");
    console.log("Afspil taber-lyden");
    document.querySelector("#loselyd").play();

    document.querySelector("#game_over").classList.remove("display_none");
    document.querySelector("#spil_igen").addEventListener("click", igen);
}

function igen() {
    console.log("igen");


    document.querySelector("#game_over").classList.add("display_none");
    document.querySelector("#level_complete").classList.add("display_none");
    document.querySelector("#start").classList.add("display_none");
    document.querySelector("#indstil_popup").classList.add("display_none");

    clickPlay();
}

function indstil() {
    console.log("indstil");

    document.querySelector("#indstil_popup").classList.remove("display_none");

    document.querySelector("#cupcake1_container").classList.add("pause");
    document.querySelector("#cupcake2_container").classList.add("pause");
    document.querySelector("#cupcake3_container").classList.add("pause");
    document.querySelector("#cupcake4_container").classList.add("pause");
    document.querySelector("#cupcake5_container").classList.add("pause");
    document.querySelector("#cupcake6_container").classList.add("pause");

    document.querySelector("#muffin1_container").classList.add("pause");
    document.querySelector("#muffin2_container").classList.add("pause");
    document.querySelector("#muffin3_container").classList.add("pause");
    document.querySelector("#muffin4_container").classList.add("pause");
    document.querySelector("#muffin5_container").classList.add("pause");
    document.querySelector("#muffin6_container").classList.add("pause");

    document.querySelector("#time_board").classList.add("pause");

    document.querySelector("#kryds").addEventListener("click", clickKryds);
    document.querySelector("#knap1").addEventListener("click", clickKnap1);
    document.querySelector("#knap2").addEventListener("click", clickKnap2);
}

function clickKnap1() {
    document.querySelector("#knap1").classList.toggle("mute");

    if (document.querySelector("#musik").muted == false) {
        console.log("stop musik");
        stopMusik();
    } else {
        console.log("start musik");
        startMusik();
    }
}

function stopMusik() {
    console.log("stopMusik");
    document.querySelector("#musik").muted = true;
}

function startMusik() {
    console.log("startMusik");
    document.querySelector("#musik").muted = false;
}

function clickKnap2() {
    document.querySelector("#knap2").classList.toggle("mute");

    if (document.querySelector("#cupcakelyd1").muted == false) {
        console.log("stop lyd");
        stopLyd();
    } else {
        console.log("start lyd");
        startLyd();
    }
}

function stopLyd() {
    console.log("stop lyd");

    document.querySelector("#cupcakelyd1").muted = true;
    document.querySelector("#cupcakelyd2").muted = true;
    document.querySelector("#stjernelyd").muted = true;
    document.querySelector("#muffinlyd1").muted = true;
    document.querySelector("#muffinlyd2").muted = true;
    document.querySelector("#winlyd").muted = true;
    document.querySelector("#loselyd").muted = true;
}

function startLyd() {
    console.log("start lyd");

    document.querySelector("#cupcakelyd1").muted = false;
    document.querySelector("#cupcakelyd2").muted = false;
    document.querySelector("#stjernelyd").muted = false;
    document.querySelector("#muffinlyd1").muted = false;
    document.querySelector("#muffinlyd2").muted = false;
    document.querySelector("#winlyd").muted = false;
    document.querySelector("#loselyd").muted = false;
}

function clickKryds() {
    console.log("clickKryds");

    document.querySelector("#indstil_popup").classList.add("display_none");

    document.querySelector("#cupcake1_container").classList.remove("pause");
    document.querySelector("#cupcake2_container").classList.remove("pause");
    document.querySelector("#cupcake3_container").classList.remove("pause");
    document.querySelector("#cupcake4_container").classList.remove("pause");
    document.querySelector("#cupcake5_container").classList.remove("pause");
    document.querySelector("#cupcake6_container").classList.remove("pause");

    document.querySelector("#muffin1_container").classList.remove("pause");
    document.querySelector("#muffin2_container").classList.remove("pause");
    document.querySelector("#muffin3_container").classList.remove("pause");
    document.querySelector("#muffin4_container").classList.remove("pause");
    document.querySelector("#muffin5_container").classList.remove("pause");
    document.querySelector("#muffin6_container").classList.remove("pause");

    document.querySelector("#time_board").classList.remove("pause");
}
