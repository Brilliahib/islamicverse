window.addEventListener("scroll", function () {
    var navbar = document.querySelector(".navbar");

    // Set the scroll position threshold for the background change
    var scrollThreshold = 50; // You can adjust this value

    if (window.scrollY > scrollThreshold) {
        navbar.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.08)";
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    } else {
        navbar.style.boxShadow = "none";
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0)";
    }
});

// Daftar waktu shalat
const prayerTimes = [
    { name: 'Fajr', time: '05:00' },
    { name: 'Dhuhr', time: '12:00' },
    { name: 'Asr', time: '15:30' },
    { name: 'Maghrib', time: '18:00' },
    { name: 'Isha', time: '19:00' },
    // Tambahkan waktu shalat berikutnya di sini
];

// Mendapatkan waktu saat ini
const currentTime = new Date();
const currentHour = currentTime.getHours();
const currentMinute = currentTime.getMinutes();
const currentTimestamp = currentHour * 60 + currentMinute;

// Mencari waktu shalat berikutnya
let nextPrayerIndex = 0;
for (let i = 0; i < prayerTimes.length; i++) {
    const prayerTime = prayerTimes[i].time.split(':');
    const prayerHour = parseInt(prayerTime[0]);
    const prayerMinute = parseInt(prayerTime[1]);
    const prayerTimestamp = prayerHour * 60 + prayerMinute;

    if (prayerTimestamp > currentTimestamp) {
        nextPrayerIndex = i;
        break;
    }
}

// Menampilkan waktu shalat berikutnya
const nextPrayerContainer = document.getElementById('nextPrayer');
nextPrayerContainer.innerHTML = `<p>Sebentar lagi waktunya shalat "${prayerTimes[nextPrayerIndex].name}"`;

// Hitung mundur untuk waktu shalat berikutnya
simplyCountdown('.simply-countdown', {
    year: currentTime.getFullYear(),
    month: currentTime.getMonth() + 1, // Bulan dimulai dari 0
    day: currentTime.getDate(),
    hours: prayerTimes[nextPrayerIndex].time.split(':')[0],
    minutes: prayerTimes[nextPrayerIndex].time.split(':')[1],
    words: {
        days: { singular: 'day', plural: 'days', hide: true, },
        hours: { singular: 'hour', plural: 'hours' },
        minutes: { singular: 'minute', plural: 'minutes' },
        seconds: { singular: 'second', plural: 'seconds' }
    },
});

function updateClock() {
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear();
    var month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var week = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    var ids = ["dayname", "month", "daynum", "year"];
    var values = [week[dname], month[mo], dnum, yr]; // Removed unnecessary square brackets
    for (var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).textContent = values[i]; // Used textContent instead of firstChild.nodeValue
}

function initClock() {
    updateClock();
    window.setInterval(updateClock, 1000); // Changed the interval to 1000 milliseconds (1 second)
}

// Call initClock to start the clock
initClock();


const inputSearch = document.querySelector('.input-search');
const cardList = document.querySelector('.card-list');

console.log(inputSearch)



