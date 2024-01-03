const endpoint = 'https://doa-doa-api-ahmadramadhan.fly.dev/api'

fetch(endpoint)
    .then((response) => response.json())
    .then((data) => console.log(data))