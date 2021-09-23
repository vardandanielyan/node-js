console.log('Client side javaScript file is loaded.');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:3000/weather?address='+search.value).then((response) => {
        response.json().then((data) => {
            if (data.error)
            {
                messageOne.textContent = data.error;
            }else{
                messageTwo.textContent = data.location+' '+JSON.stringify(data.forecast);
            }

            console.log(data);
        });
    });
})