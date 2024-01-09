const inputSearch = document.querySelector('.input-search');
const cardList = document.querySelector('.card-list');

inputSearch.addEventListener('keyup', function () {
    const valueSearch = inputSearch.value.length;

    if (valueSearch > 0) {
        cardList.classList.remove('hidden-list');

        const endpoint = 'https://equran.id/api/doa';

        fetch(endpoint)
            .then((data) => data.json())
            .then((hasil) => {
                let listDoa = '';
                hasil.forEach(doanya => {
                    listDoa += `<a href="#" data-iddoa="${doanya.id}" class="list-group-item list-group-item-action">${doanya.nama}</a>`;
                });
                const namaDoa = document.querySelector('.card-list');
                namaDoa.innerHTML = listDoa;

                const isiDoa = document.querySelectorAll('.list-group-item');

                isiDoa.forEach(hasil => {
                    const filterText = inputSearch.value.toLowerCase();
                    const itemText = hasil.textContent.toLowerCase();

                    if (itemText.includes(filterText)) {
                        hasil.style.display = 'block';
                    } else {
                        hasil.style.display = 'none';
                    }

                    hasil.addEventListener('click', function () {
                        const idDoa = this.dataset.iddoa;
                        // Tangani kejadian klik di sini
                        window.location.href = `doadetail.html?nomordoa=${idDoa}`;
                    });
                });
            });
    } else {
        cardList.classList.add('hidden-list');
    }
});
