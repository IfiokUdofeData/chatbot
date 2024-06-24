document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById("inputField");
    const sendButton = document.getElementById("sendButton");
    const loadingText = document.getElementById("loading");
    const responseText = document.getElementById("response");

    sendButton.addEventListener("click", async function() {
        const inputValue = inputField.value;

        // Show loading text and disable button
        loadingText.style.display = "inline";
        sendButton.disabled = true;
        responseText.textContent = "";

        try {
            const response = await fetch("http://127.0.0.1:8000/handle/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 'data': inputValue })
            });

            const result = await response.json();

            // Console log to see response from server
            console.log('RESPONSE FROM SERVER', result.message);

            if (response.ok) {
                // Successful response from the server
                responseText.textContent = `Success: ${JSON.stringify(result)}`;
            } else {
                // Error message from the server (a custom error)
                responseText.textContent = `Error: ${result.message || 'Unknown error'}`;
            }
        } catch (error) {
            responseText.textContent = `Error: ${error.message}`;
        } finally {
            // Hide loading text and enable button
            loadingText.style.display = "none";
            sendButton.disabled = false;
        }
    });
});
