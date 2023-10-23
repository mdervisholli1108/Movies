
function getMovie() {
    let title = document.getElementById('title').value
    encodeURIComponent(title.trim()); //the encodeURIComponetnt lets us create spaces

    fetch(`https://online-movie-database.p.rapidapi.com/title/find?q=${title}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-RapidAPI-Key': 'ef9eadeadfmsh0c1a3b70d2680cbp131dd9jsn0580375d732c',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    })
        .then(response => response.json())
        .then((data) => {

            console.log(data);

            for (let i = 0; i < data.results.length; i++) {
                let img = document.createElement('img'); //does this matter when we have an image element in html?
                img.src = data.results[i].image.url;//this is the same as the one below?
                let src = data.results[i].image.url;
                let year = data.results[i].year;
                console.log(year);
                // img.setAttribute("onclick", "displayImg(this.src, year);")
                img.addEventListener("click", displayImg.bind(null, src, year));
                let newPhotos = document.getElementById('photos').appendChild(img);
                newPhotos.style.width = '200px';
                newPhotos.style.height = '300px';
                newPhotos.style.border = 'solid white';

            }


            document.getElementById("h1title").innerHTML = title.toUpperCase();



        })
        .catch(err => console.error(err))
}

function displayImg(imgSrc, yearReleased) {
    console.log('inside display function')
    console.log(imgSrc)

    console.log(yearReleased)
    // Get the modal
    let modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks the image, open the modal 
    modal.style.display = "block";

    // this is setting the image in the modal
    let modalImg = document.getElementById("modalImg");
    modalImg.src = imgSrc;
    modalImg.style.width = '300px';
    modalImg.style.height = '400px';
    modalImg.style.border = 'solid black';


    //this is setting the year in the modal
    let modalYear = document.getElementById("year");
    if (modalYear === "undefined") {
        modalYear.innerHTML = "none";
    } else {
        modalYear.innerHTML = yearReleased;
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
