const chatData = async(test) =>{   
    const url = 'https://chat-gpt26.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '64125cfbf1msh44227ae3f9bc8e5p15b7bcjsn3933d5336452',
            'x-rapidapi-host': 'chat-gpt26.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: 'similar movies  ' + test 
                }
            ]
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        let chatoutput = "";
        chatoutput += `
        <p>
        ${chatAns(result)}
        </p>
        `;
        document.getElementById("ansChatGpt").innerHTML = chatoutput;
    } catch (error) {
        console.error(error);
    }
}

const chatAns= (jsonString) =>{
    try{
        const data = JSON.parse(jsonString);
        const content = data.choices[0].message.content;
        const films = content.split('\n').map(film => film.replace(/^\d+\.\s*/, ''));
        const topFilms = films.slice(0, 3);
        return films;
    } catch (error){
        console.error("fehler beim analysieren");
    }

};

const userInputGpt = document.querySelector('#search-input');
const gptBtn = document.querySelector('#searchButton');

const callchatData = () => {
    const userInputGpt2 = userInputGpt.value;
    chatData(userInputGpt2);
    userInput.value = ''; // optional: clear input field after fetching data
}

gptBtn.addEventListener('click', callchatData);