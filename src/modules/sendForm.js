const sendForm = () =>{
    const errorMessage = 'Что то пошло не так',
        successMessage = 'Ваша заявка получена',
        statusMessage = document.createElement('div'),
        imgLoader = document.createElement('img'),
        url = './server.php';
    let body = {};               

    statusMessage.style.cssText = 'font-size: 4rem;';

     // очищаем поля
     const resetValue = (target) =>{
        target.querySelector('#'+target.id+'-name').value = '';
        target.querySelector('#'+target.id+'-email').value = '';
        target.querySelector('#'+target.id+'-phone').value = '';
        (target.querySelector('#'+target.id+'-message')) ? 
        target.querySelector('#'+target.id+'-message').value = '': null;
    };
    // отображаем loader
    const showLoader =  () => {
        imgLoader.style.display = 'inline-block';
        imgLoader.src = "./images/1.gif";
    };

    document.addEventListener('submit',(event) => {
        event.preventDefault();
        const target = event.target;          
        if (target.querySelector('#'+target.id+'-name').matches('.error') || 
            target.querySelector('#'+target.id+'-email').matches('.error') ||
            target.querySelector('#'+target.id+'-phone').matches('.error') ||
            target.querySelector('#'+target.id+'-message') && target.querySelector('#'+target.id+'-message').matches('.error')) {
            return;
        }
        target.appendChild(statusMessage);
        statusMessage.appendChild(imgLoader).style.display = 'none';

        const formData = new FormData(target);
                formData.forEach((val, key) => {
                    body[key] = val;
                });
        showLoader();
        const postData = (body) => {
            return fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'aplication/json'},
                body : JSON.stringify(body)
            });
        };

        postData(body)              
            .then( response => {
                if (response.ok) {
                    imgLoader.style.display = 'none';
                    statusMessage.textContent = successMessage;
                    resetValue(target);
                } else {
                    throw new Error(response.textContent);
                }
            })
            .catch( error => statusMessage.textContent = errorMessage);
    });
};
export default sendForm;