const endpoint = 'https://api.myquran.com/v2/sholat/jadwal/1433/2024/01/03';
fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
        const jadwal = data.jadwal
        console.log(jadwal);
    });