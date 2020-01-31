
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = searchElement.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    // need to exclude domain in fetch - make it relative
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }

        })
    })
})