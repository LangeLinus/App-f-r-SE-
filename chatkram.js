const chatData = async() =>{   
    const url = 'https://chat-gpt26.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '64125cfbf1msh44227ae3f9bc8e5p15b7bcjsn3933d5336452',
            'x-rapidapi-host': 'chat-gpt26.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: 'Name similar movies to ' + userInput + 'in headwords'
                }
            ]
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}



const callchatData = () => {
    const userInput = userInput.value;
    fetchData();
    userInput.value = ''; // optional: clear input field after fetching data
}

btn.addEventListener('click', callFetchData);