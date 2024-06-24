const visaInfo = {
    tourist: "A tourist visa is for those visiting the country for leisure or vacation. Requirements include a valid passport, proof of accommodation, and return travel tickets.",
    work: "A work visa requires a job offer from a company within the country. Necessary documents include a work contract, proof of qualifications, and health insurance.",
    student: "A student visa is for those pursuing studies. You need an admission letter from a recognized educational institution, proof of funds, and health insurance.",
    medical: "A medical visa is for those seeking medical treatment. Required documents include a medical appointment confirmation, proof of funds, and a valid passport.",
    family: "A family reunion visa allows family members to join a resident in the country. Required documents include proof of relationship, proof of residence, and financial support evidence."
};

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

function showVisaTypes() {
    const visaInfoDiv = document.getElementById('visa-info');
    if (visaInfoDiv.innerHTML != '' ) {

    visaInfoDiv.innerHTML = "";
    document.getElementById('show').innerHTML = "Show Visa Types ";

    } else {
        document.getElementById('show').innerHTML = "Hide Visa Types";
        visaInfoDiv.innerHTML = `
        <p>Tourist Visa: ${visaInfo.tourist}</p>
        <p>Work Visa: ${visaInfo.work}</p>
        <p>Student Visa: ${visaInfo.student}</p>
        <p>Medical Visa: ${visaInfo.medical}</p>
        <p>Family Reunion Visa: ${visaInfo.family}</p>
    `;
    }
}

// function Test() {
//     console.log("connected");
// }



function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    const chatOutput = document.getElementById('chat-output');


    // const userMessage = document.getElementById('user-message');
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.innerText = userInput;
    const userLabel = document.createElement('div');
    userMessage.appendChild(userLabel);
    userLabel.className = 'user-label';
    userLabel.innerText = "user";
    chatOutput.appendChild(userMessage);

 


    // const botResponse = document.getElementById('bot-response');
    const botResponse = document.createElement('div');
    botResponse.className = 'bot-response';

    // const usernameDiv = document.getElementById('username');
    botResponse.innerText = chatOutput.getAttribute('data-username');

    // botResponse.innerText = getBotResponse(userInput);
    const botLabel = document.createElement('div');
    botResponse.appendChild(botLabel);
    botLabel.className = 'bot-label';
    botLabel.innerText = "bot";
    chatOutput.appendChild(botResponse);

    document.getElementById('user-input').value = "";
    chatOutput.scrollTop = chatOutput.scrollHeight;
}


document.addEventListener("DOMContentLoaded", function() {
    // const inputField = document.getElementById("inputField");
    // const loadingText = document.getElementById("loading");
    // const responseText = document.getElementById("response");
    

    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", async function() {

        // document.getElementById("section").innerHTML = ''

        const userInput = document.getElementById('user-input').value;


        const chatOutput = document.getElementById('chat-output');


        // const userMessage = document.getElementById('user-message');
        const userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        userMessage.innerText = userInput;
        const userLabel = document.createElement('div');
        userMessage.appendChild(userLabel);
        userLabel.className = 'user-label';
        userLabel.innerText = "user";
        chatOutput.appendChild(userMessage);

        // create the loading element
        const loadingText = document.createElement('div');
        loadingText.className = 'loading-text';
        chatOutput.appendChild(loadingText);


        // Show loading text and disable button
        loadingText.style.display = "block";
        sendButton.disabled = true;
        // responseText.textContent = "";
    

        // const botResponse = document.getElementById('bot-response');
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
                botResponse.innerText = `Success: ${JSON.stringify(result)}`;
                chatOutput.appendChild(botResponse);
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
            loadingText.style.display = "none";
            sendButton.disabled = false;
        }
    });
});

