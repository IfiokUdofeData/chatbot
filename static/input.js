

function sendMessage() {
    
    console.log("working");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nameForm');
    const responseParagraph = document.getElementById('response');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch('/get_input/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Update the response paragraph with the name data
            responseParagraph.textContent = `Hello capacity, ${data.name}!`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

}
