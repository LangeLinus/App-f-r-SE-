const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('GET', 'https://streaming-availability.p.rapidapi.com/shows/%7Btype%7D/%7Bid%7D');
xhr.setRequestHeader('x-rapidapi-key', 'd40567b73emsh0140803e3efcaa3p104086jsn868d188b4611');
xhr.setRequestHeader('x-rapidapi-host', 'streaming-availability.p.rapidapi.com');

xhr.send(data);

