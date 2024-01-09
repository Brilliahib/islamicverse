function getURL(e) {
    const pageURL = window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for (let i = 0; i < urlVariable.length; i++) {
        const parameterName = urlVariable[i].split('=');
        if (parameterName[0] == e) {
            return parameterName[1];
        }
    }
}

const nomorsurat = getURL('nomorsurat');

const endpoint = `https://equran.id/api/surat/${nomorsurat}`;

fetch(endpoint)
    .then((data) => data.json())
    .then((result) => {
        // JUDUL SURAT
        const judulSurat = document.querySelector('.judul-surat');
        const cardJudulSUrat = `
        <strong>${result.nama_latin} - ${result.nama}</strong>
        <p>Jumlah ayat : ${result.jumlah_ayat} (${result.arti})</p>
        <button class="btn btn-primary audio-button-play">Dengarkan</button>
        <button class="btn btn-danger hidden-button audio-button-pause">Stop</button>
        <audio id="audio-tag" src="${result.audio}"></audio>
        `
        judulSurat.innerHTML = cardJudulSUrat;
        console.log(judulSurat);
        // END JUDUL SURAT

        // ISI SURAT
        const surat = result.ayat;
        let isiSurat = '';
        surat.forEach(s => {
            isiSurat += `
            <div class="card mb-3"
            <div class="card-body">
            <p>${s.nomor}.</p>
            <h2 class="text-end fw-medium lh-lg">${s.ar}</h2>
            <p class="ayat">${s.tr}</p>
            <p>${s.idn}</p>
        </div>
        </div>
            `;
        });

        console.log(surat);
        // END ISI SURAT
        const cardIsiSurat = document.querySelector('.card-isi-surat');
        cardIsiSurat.innerHTML = isiSurat;

        const buttonPlay = document.querySelector('.audio-button-play')
        const buttonPause = document.querySelector('.audio-button-pause')
        const audioSurat = document.querySelector('#audio-tag')

        buttonPlay.addEventListener('click', function () {
            buttonPlay.classList.add('hidden-button');
            buttonPause.classList.remove('hidden-button');
            audioSurat.play();
        })

        buttonPause.addEventListener('click', function () {
            buttonPause.classList.add('hidden-button');
            buttonPlay.classList.remove('hidden-button');
            audioSurat.pause();
        })
    });
