const visaInfo = {
    tourist: "A tourist visa is for those visiting the country for leisure or vacation. Requirements include a valid passport, proof of accommodation, and return travel tickets.",
    work: "A work visa requires a job offer from a company within the country. Necessary documents include a work contract, proof of qualifications, and health insurance.",
    student: "A student visa is for those pursuing studies. You need an admission letter from a recognized educational institution, proof of funds, and health insurance.",
    medical: "A medical visa is for those seeking medical treatment. Required documents include a medical appointment confirmation, proof of funds, and a valid passport.",
    family: "A family reunion visa allows family members to join a resident in the country. Required documents include proof of relationship, proof of residence, and financial support evidence."
};

const sendButton = document.getElementById("send-button");

sendButton.addEventListener('click', async function () {
    document.getElementById("section").innerHTML = '';
    document.getElementById("avatar-section").innerHTML = '';
    // document.getElementById("block").style.height = '300px';
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    const chatOutput = document.getElementById('block');

    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';

    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.innerText = userInput;
    // userMessage.style.paddingRight = '2rem';

    const textLength = userInput.length;

    // Adjust the width of the element based on the length of the input text
    if (textLength < 100) {
        // Calculate the width based on the text length (12px per character as an example)
        if ( textLength >= 1 && textLength < 3) {
            userMessage.style.width = '10%';
        } else if(textLength >= 3 && textLength < 6){
            userMessage.style.width = '20%';
        } else{
            userMessage.style.width = (textLength * 12) + 'px';
        }
    

        // userMessage.style.paddingRight = '2rem';
    } else {
        // Reset to default width if input is empty
        userMessage.style.width = '60%';
        // userMessage.style.padding = '2rem';
    }

    const userLabel = document.createElement('div');
    userMessage.appendChild(userLabel);
    userLabel.className = 'user-label';
    // userLabel.innerText = "user";
    chatOutput.appendChild(messageBox);
    messageBox.appendChild(userMessage);

    document.getElementById('user-input').value = "";
    chatOutput.scrollTop = chatOutput.scrollHeight;

    // Simulate loading time before bot replies
    displayLoading();

    sendButton.disabled = true;

    const messageBox1 = document.createElement('div');
    messageBox1.className = 'message-box1';

    // Display bot reply
    const botResponse = document.createElement('div');
    botResponse.className = 'bot-response';
    

    try {
        const response = await fetch("http://127.0.0.1:8000/handle/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 'data': userInput })
        });

        const result = await response.json();

        // Console log to see response from server
        console.log('RESPONSE FROM SERVER', result.message);

        if (response.ok) {
            // Successful response from the server

            // textObject = JSON.stringify(result);
            text = result.message;
            text = text.replace(/\*/g, '');
            botResponse.innerText = text;

            chatOutput.appendChild(botResponse);

                
            const textLength = JSON.stringify(result).length;
            if (textLength < 100) {
                // Calculate the width based on the text length (12px per character as an example)
                
                botResponse.style.width = (textLength * 12) + 'px';
            } else {
                // Reset to default width if input is empty
                botResponse.style.width = '75%';
            }

            const botLabel = document.createElement('div');
            botResponse.appendChild(botLabel);
            botLabel.className = 'bot-label';
            // botLabel.innerText = "bot";
            // chatOutput.appendChild(botResponse);

            chatOutput.appendChild(messageBox1);
            messageBox1.appendChild(botResponse);

            chatOutput.scrollTop = chatOutput.scrollHeight;
        } else {
            // Error message from the server (a custom error)
            botResponse.innerText = `Error: ${result.message || 'Unknown error'}`;
            chatOutput.appendChild(botResponse);
        }
    } catch (error) {
        botResponse.innerText = `Error: ${error.message}`;
        chatOutput.appendChild(botResponse);
    } finally {
        // Hide loading text and enable button
        // loadingText.style.display = "none";
        removeLoading();
        sendButton.disabled = false;
    }

})


function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    const chatOutput = document.getElementById('chat-output');

    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.innerText = userInput;
    // const userLabel = document.createElement('div');
    // userMessage.appendChild(userLabel);
    // userLabel.className = 'user-label';
    // userLabel.innerText = "user";
    chatOutput.appendChild(userMessage);

    document.getElementById('user-input').value = "";
    chatOutput.scrollTop = chatOutput.scrollHeight;

    // Simulate loading time before bot replies
    displayLoading();

    setTimeout(() => {
        // Remove loading animation
        removeLoading();

        // Display bot reply
        const botResponse = document.createElement('div');
        botResponse.className = 'bot-response';
        botResponse.innerText = getBotResponse(userInput);
        const botLabel = document.createElement('div');
        botResponse.appendChild(botLabel);
        botLabel.className = 'bot-label';
        // botLabel.innerText = "bot";
        chatOutput.appendChild(botResponse);

        chatOutput.scrollTop = chatOutput.scrollHeight;
    }, 1000); // 1 second loading time
}

function displayLoading() {
    const chatOutput = document.getElementById('block');
    const loadingElement = document.createElement('div');
    loadingElement.className = 'bot-response loading';

    const spinner = document.createElement('div');
    spinner.className = 'spinner-border text-primary';
    spinner.setAttribute('role', 'status');

    loadingElement.appendChild(spinner);
    chatOutput.appendChild(loadingElement);

    chatOutput.scrollTop = chatOutput.scrollHeight;
}


function removeLoading() {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
}




function clearSection() {
    document.getElementById('section').innerHTML = '';
}


function getBotResponse(input) {
    input = input.toLowerCase();
    if (input.includes("visa")) {
        if (input.includes("tourist")) {
            return visaInfo.tourist;
        } else if (input.includes("work")) {
            return visaInfo.work;
        } else if (input.includes("student")) {
            return visaInfo.student;
        } else if (input.includes("medical")) {
            return visaInfo.medical;
        } else if (input.includes("family")) {
            return visaInfo.family;
        } else {
            return "Please specify the type of visa you are interested in (e.g., tourist, work, student, medical, family).";
        }
    } else {
        return "I'm here to help with information about visas. Please ask about a specific type of visa.";
    }
}