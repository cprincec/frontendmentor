const url =
    "https://github.com/cprincec/frontendmentor/blob/main/static-job-listings-master/public/data.json";

fetch(url)
    .then((data) => data.json())
    .then((result) => console.log(result));
