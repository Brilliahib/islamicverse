const endpoint = 'https://doa-doa-api-ahmadramadhan.fly.dev/api'

fetch(endpoint)
    .then((result) => result.json())
    .then((data) => console.log(data))