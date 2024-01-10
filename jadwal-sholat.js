const getDate = new Date();
const getYear = getDate.getFullYear();
const getMonth = getDate.getMonth() + 1;
const getDay = getDate.getDate();

const formattedDay = getDay < 10 ? `0${getDay}` : getDay;
const tanggal = `${getYear}/${getMonth < 10 ? `0${getMonth}` : getMonth}/${formattedDay}`;
console.log(tanggal);


const tampilKota = document.querySelector('.judul-kota');
tampilKota.textContent = localStorage.judulkota;

const endpoint = 'https://api.myquran.com/v2/sholat/jadwal/' + parseInt(localStorage.idkota) + '/' + tanggal
fetch(endpoint)
    .then((data) => data.json())
    .then((hasil) => {
        const jadwal = hasil.data.jadwal
        document.querySelector('.imsak').textContent = jadwal.imsak
        document.querySelector('.subuh').textContent = jadwal.subuh
        document.querySelector('.terbit').textContent = jadwal.terbit
        document.querySelector('.dhuha').textContent = jadwal.dhuha
        document.querySelector('.dzuhur').textContent = jadwal.dzuhur
        document.querySelector('.ashar').textContent = jadwal.ashar
        document.querySelector('.maghrib').textContent = jadwal.maghrib
        document.querySelector('.isya').textContent = jadwal.isya
        document.querySelector('.tanggal').textContent = jadwal.date
    })

const inputSearch = document.querySelector('.input-search');
const cardList = document.querySelector('.card-list');

inputSearch.addEventListener('keyup', function () {
    const valueSearch = inputSearch.value.length;

    if (valueSearch > 0) {
        cardList.classList.remove('hidden-list');

        const endpoint = 'https://api.myquran.com/v2/sholat/kota/semua';

        fetch(endpoint)
            .then((data) => data.json())
            .then((hasil) => {
                const kota = hasil.data
                let listKota = '';
                kota.forEach(k => {
                    listKota += `<a href="#" data-idkota="${k.id}" id="nama-kota" class="list-group-item list-group-item-action">${k.lokasi}</a>`;
                })
                const namaKota = document.querySelector('.card-list');
                namaKota.innerHTML = listKota;

                const isiKota = document.querySelectorAll('#nama-kota');
                isiKota.forEach(kota => {
                    const filterText = inputSearch.value.toLowerCase();
                    const itemText = kota.firstChild.textContent.toLowerCase();

                    if (itemText.indexOf(filterText) != -1) {
                        kota.setAttribute("style", "display: block");
                    } else {
                        kota.setAttribute("style", "display: none !important");
                    }

                    kota.addEventListener('click', function () {
                        const idkota = this.dataset.idkota;
                        const judulKota = this.textContent;
                        window.localStorage.setItem('idkota', idkota);
                        window.localStorage.setItem('judulkota', judulKota);
                        namaKota.classList.add('hidden-list');
                        inputSearch.value = '';
                        location.reload();
                        alert(`Kota ${judulKota} berhasil dipilih!`)
                    })
                })
                console.log(isiKota)
            });
    } else {
        cardList.classList.add('hidden-list');
    }
})