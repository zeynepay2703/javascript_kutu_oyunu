const btn = document.querySelector(".btn");
const kutular = document.querySelectorAll(".kutu");
const paragraf = document.querySelector(".paragraf");
const container = document.querySelector("#container");
const ul = document.getElementById('skorTablom')
const body_color = document.body;

let temp = 0; // puan
let randomSayi;
let time_switch = false;
let heart = document.querySelector(".heart");
let heart_temp = 5;
const renkler = {
    lila: "rgb(206, 147, 216)",
    koyu_mor: "rgb(142, 36, 170)",
    yesil: "rgb(129, 199, 132)",
    mavi: "rgb(66, 165, 245)",
    kirmizi: "rgb(239, 83, 80)",
}
let test = document.querySelector(".test");
let tutorial = 0;
let delay = 2000;

let eskiSkorlar = []

heart.innerHTML = 'Oyundaki can hakkın:' + heart_temp;

if (localStorage.getItem('eskiSkorlar')) {
    eskiSkorlar = JSON.parse(localStorage.getItem('eskiSkorlar'))
    console.log(eskiSkorlar)

    eskiSkorlar.forEach(item => {
        ul.insertAdjacentHTML('afterbegin', `<li>${item}</li>`)
    })
}

const time = setInterval(() => {
    time_switch && boya();
}, delay);

btn.addEventListener("click", () => {
    kutular.forEach(kutu => {
        kutu.style.backgroundColor = renkler.mavi;
    });
    time_switch = true;
    time;
    btn.style.display = 'none';
    container.style.display = 'grid';
    heart.style.display = 'block';
    paragraf.style.display = 'block';
});

kutular.forEach(kutu => {
    kutu.addEventListener("click", () => {
        if (kutu.style.backgroundColor === renkler.koyu_mor) {
            puanlama('+');
            boya();
            body_color.style.backgroundColor = renkler.yesil;
        }
        else {
            puanlama('-');
            heart_azalan();
            body_color.style.backgroundColor = renkler.kirmizi;
        }
    })
});

const boya = () => {
    randomSayi = Math.floor((Math.random() * 8) + 1);
    for (i = 0; i < kutular.length; i++) {
        if (randomSayi == i) {
            kutular[i].style.backgroundColor = renkler.koyu_mor;
            kutular[i].style.cursor = "pointer";
            puanlama;
        }
        else {
            kutular[i].style.backgroundColor = renkler.lila;
            kutular[i].style.cursor = "default";
        }
    }
};

const puanlama = (islem) => {
    islem === '+' ? temp++ : temp -= 2;
    paragraf.innerHTML = 'Puan Sayacı:' + temp;
    tutorial += temp;
};

const heart_azalan = () => {
    heart_temp--;
    heart.innerHTML = 'Oyundaki kalan can hakkın:' + heart_temp;
    heart_alert();
};

const heart_alert = () => {
    if (heart_temp <= 0) {
        alert("can hakkın bitti puanın :" + temp + " yeniden başlamak için tıkla!");
        console.log(temp);
        eskiSkorlar.push(temp)
        localStorage.setItem('eskiSkorlar', JSON.stringify(eskiSkorlar))
        location.reload();
    }
}