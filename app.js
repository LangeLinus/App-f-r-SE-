// JS Code wird erst ausgeführt, wenn DOM vollständig geladen ist
// sorgt dafür, das alle HTML Elemente verfügbar sind wenn JS Code ausgeführt wird
document.addEventListener('DOMContentLoaded', function() {

    // Deklariere searchButton Konstante für später zum Einfügen
    //Event Listener der searchStreaming aufruft, wenn man Button anklickt
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchMedia);

    // Nach Media in Mediainfo API suchen
    function searchMedia() {
        // Input der Suchleiste holen
        const query = document.getElementById('search-input').value;

        // Wenn Suchleiste nicht leer ist
        if(query) {

            // Alles wie bei Function FetchStreamingInfo gemacht
            // so steht es auch auf der Seite von Rapid !
            const apiUrl = `https://imdb188.p.rapidapi.com/api/v1/search/title/${query}`;

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function() {
                if (this.readyState === this.DONE) {
                    const response = JSON.parse(this.responseText);
                    displayResults(response.results);
                }
            });

            xhr.open('GET', apiUrl);
            xhr.setRequestHeader('x-rapidapi-key', 'd40567b73emsh0140803e3efcaa3p104086jsn868d188b4611');
            xhr.setRequestHeader('x-rapidapi-host', 'imdb188.p.rapidapi.com');
            xhr.send(null);
        }
    }

    // Function zum Anzwigen des Suchergebnisses
    function displayResults(medias) {
        const resultsContainer = document.getElementById('results');
        // Lösche vorherige Suchergebnisse
        resultsContainer.innerHTML = '';

        // Iteriere über jedes gefundene Mediaobjekt
        medias.forEach(media=> {
            // Für jedes Ergebnis neues div Element mit media als class erstellen
            const mediaElement = document.createElement('div');
            mediaElement.classList.add('media');
            // Füge die HTML Elemente zum mediaElement div hinzu
            mediaElement.innerHTML = `
                <h2>${media.title}</h2>
                <p id="streaming-${media.id}">Streaming: Laden...</p>
            `;  
        
            // Fügt das mediaElement zum resultContainer hinzu
            resultsContainer.appendChild(mediaElement);
        
            // Function für Streaming Info aufrufen
            fetchStreamingInfo(media.id);
        
        });
    }

    // Abruf der Streaming-Information
    function fetchStreamingInfo(mediaID) {
        // XMLHTTPRequest Objekt für den API Aufruf
        const xhr = new XMLHttpRequest();
        // Ermöglicht Anfragen mit Anmeldeinformationen zu senden
        xhr.withCredentials = true;

        // Wird ausgeführt wenn sich der readyState des XMLHTTPREquest ändert
        xhr.addEventListener('readystatechange', function() {
            // wenn done
            if(this.readyState === this.DONE) {
                // Abfrage in JSON Formati umwandeln und übergeben 
                const response = JSON.parse(this.responseText);
                updateStreamingInfo(mediaID, response);
            }
        });

        // URL für API Aufruf mit mediaID -> deshalb braucht ich die 1. API
        const apiUrl = `https://streaming-availability.p.rapidapi.com/get/ultra?imdb_id=${mediaID}&output_language=de`;
        // Initialisiere ein GET Request mit URL
        xhr.open('GET', apiUrl);
        // Setze Header für die API Anfrage
        xhr.setRequestHeader('x-rapidapi-key', 'd40567b73emsh0140803e3efcaa3p104086jsn868d188b4611');
        xhr.setRequestHeader('x-rapidapi-host', 'streaming-availability.p.rapidapi.com');

        // Sendet die Anfrage
        xhr.send(null);
    }

    // Funtion um Streaming-Info im HTML erstellten div zu aktualisieren
    function updateStreamingInfo(mediaID, streamingInfo) {
        // referenziere HTML Element
        const streamingElement = document.getElementById(`streaming-${mediaID}`);
        // wenn verbunden
        if (streamingElement) {
            // wenn Anfrage nicht Leer 
            if (streamingInfo.streamingAvailability && streamingInfo.streamingAvailability.length > 0) {
                // verändere die Streaminganbieter 
                streamingElement.innerHTML = `Streaming auf: ${streamingInfo.streamingAvailability.join(', ')}`;
            // falls leer, dann einfach String rein
            } else {
                streamingElement.innerHTML = 'Keine Streaming-Informationen verfügbar';
            }
        }
    } 

});

