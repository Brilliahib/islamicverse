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
        <a href="" class="button">Dengarkan</a>
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
            <h3 class="text-end">${s.ar}</h3>
            <p>${s.tr}</p>
            <p>${s.idn}</p>
        </div>
        </div>
            `;
        });
        const cardIsiSurat = document.querySelector('.card-isi-surat');
        cardIsiSurat.innerHTML = isiSurat;

        console.log(surat);
        // END ISI SURAT
    });
