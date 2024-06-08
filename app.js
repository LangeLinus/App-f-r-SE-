const fetchData = async (title, country) => {
    const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?series_granularity=show&show_type=movie&output_language=en&title=${title}&country=${country}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd40567b73emsh0140803e3efcaa3p104086jsn868d188b4611',
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
    };

    let output ="";
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    for(let i = 0; i < 3; i++) {
        let streamingOptionsHTML="";

        let streamingOptions = result[i].streamingOptions.de;
        streamingOptionsHTML += '<ul>';
        
        //TODO: , Price: ${option.price.amount} einbauen mit if falls kein Preis vorhanden
        streamingOptions.forEach(option => {
            streamingOptionsHTML += `<li>Service: ${option.service.name}, Type: ${option.type}</li>`;
        });
        streamingOptionsHTML += '</ul>';


        //Maybe wieder einbauen <p>Overview:    ${result[i].overview}</p>
        output += `
            <div class="box">
                <h1>${result[i].title}</h1>
                <p>ReleaseYear: ${result[i].releaseYear}</p>
                <p>Runtime:     ${result[i].runtime}</p>
                <p>Streaming Options:</p>
                ${streamingOptionsHTML}
            </div>
        `;

        document.getElementsByClassName('result')[0].innerHTML = output;
    }
}

const userInput = document.querySelector('#search-input');
const btn = document.querySelector('#searchButton');

const callFetchData = () => {
    const title = userInput.value;
    const country = 'de';
    fetchData(title, country);
    userInput.value = ''; // optional: clear input field after fetching data
}

btn.addEventListener('click', callFetchData);





