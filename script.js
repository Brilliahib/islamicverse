window.addEventListener("scroll", function () {
    var navbar = document.querySelector(".navbar");

    // Set the scroll position threshold for the background change
    var scrollThreshold = 50; // You can adjust this value

    if (window.scrollY > scrollThreshold) {
        navbar.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.08)";
    } else {
        navbar.style.boxShadow = "none";
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
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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

const getDate = new Date();
const year = getDate.getFullYear();
const month = getDate.getMonth() + 1;
const day = getDate.getDate();



function hari() {
    if (day < 10)
        hari = `0${day}`;
    hari = day;
    return hari;
}

function bulan() {
    if (month < 10) {
        bulan = `0${month}`;
    } else {
        bulan = month;
    }
    return bulan;
}

const tanggal = `${year}-${bulan()}-${hari()}`;

let namaKota = localStorage.idkota;
function cekKota() {
    if (!namaKota) {
        cekKota = 667;
    } else {
        cekKota = namaKota;
    }
    return cekKota;
}



function getJadwalDay() {
    fetch('https://api.banghasan.com/v2/sholat/format/json/jadwal/kota/' + cekKota() + '/tanggal/' + tanggal)
        .then(response => response.json())
        .then(data => {
            const jadwal = data.jadwal.data;
            dataJadwal(jadwal);
        });
}

function dataJadwal(jadwal) {
    document.querySelector('.imsak').textContent = jadwal.imsak;
    document.querySelector('.subuh').textContent = jadwal.subuh;
    document.querySelector('.terbit').textContent = jadwal.terbit;
    document.querySelector('.dzuhur').textContent = jadwal.dzuhur;
    document.querySelector('.ashar').textContent = jadwal.ashar;
    document.querySelector('.maghrib').textContent = jadwal.maghrib;
    document.querySelector('.isya').textContent = jadwal.isya;
    document.querySelector('.tanggal').textContent = jadwal.tanggal;
    if (!localStorage.namakota) {
        window.localStorage.setItem('namakota', 'Jakarta');
    }
    document.querySelector('#judul-kota').textContent = localStorage.namakota;
}


const namaListKota = document.querySelector('.cari-kota');
const addKota = document.querySelector('.nama-list-kota');
namaListKota.addEventListener('keyup', function () {
    const kotakota = namaListKota.value.length;
    if (kotakota > 0) {
        addKota.classList.remove('hidden-list');
        fetch('https://api.banghasan.com/sholat/format/json/kota')
            .then(response => response.json())
            .then(response => {
                const kota = response.kota;
                let likota = ``;
                kota.forEach(k => {
                    likota += `<a href="#" data-idkota="${k.id}" id="inikota" class="list-group-item list-group-item-action">${k.nama}</a>`;
                });
                const listKota = document.querySelector('.nama-list-kota');
                listKota.innerHTML = likota;

                // ketika pilih kota
                const inikota = document.querySelectorAll('#inikota');
                inikota.forEach(k => {
                    const filterText = namaListKota.value.toLowerCase();
                    const itemText = k.firstChild.textContent.toLowerCase();

                    if (itemText.indexOf(filterText) != -1) {
                        k.setAttribute("style", "display: block;");
                    } else {
                        k.setAttribute("style", "display: none !important");
                    }

                    k.addEventListener('click', function () {
                        const idkota = this.dataset.idkota;
                        const namaKota = this.textContent;
                        window.localStorage.setItem('idkota', idkota);
                        window.localStorage.setItem('namakota', namaKota);
                        document.querySelector('#judul-kota').textContent = localStorage.namakota;
                        addKota.classList.add('hidden-list');
                        namaListKota.value = '';
                        location.reload();
                        alert(`Kota ${namaKota} berhasil dipilih`);
                    });
                });

            });
    } else {
        addKota.classList.add('hidden-list');
    }

});
getJadwalDay();


