const endpoint = 'https://doa-doa-api-ahmadramadhan.fly.dev/api'
fetch(endpoint)
    .then((data) => data.json())
    .then((result) => console.log(result))
