'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import toglePopup from './modules/toglePopup';
import slowScroll from './modules/slowScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import command from './modules/command';
import calculate from './modules/calculate';
import maskPhone from './modules/maskPhone';
import sendForm from './modules/sendForm';
import Validator from './modules/validator';


// таймер
countTimer('8 mart 2020 12:15');
// меню
toggleMenu();
// popup
toglePopup();
//прокрутка до услуг
slowScroll();
//табы наши услуги
tabs();
// слайдер
slider();
// команда изменение фоток при наведении мышкой
command();
// калькулятор не знаю это работе не мешает но изначально в верстке уже есть проверка - может через css
calculate( 100 );
//send-ajax-form
sendForm();
//маска для ввода телефона
	//форма heder
maskPhone('#form1-phone');
    //форма portfolio
maskPhone('#form2-phone');
    //форма question
maskPhone('#form3-phone');

// валидатор формы
	//форма heder
const validatorForms = new Validator({
        selector: '#form1', // что валидируем
        pattern: { 
            youName: /^[А-ЯЁа-яё]*$/
        },
        method: {
            'form1-phone':[ 
                ['notEmpty'], 
                ['pattern', 'phone'] 
            ],
            'form1-email':[
                ['notEmpty'], 
                ['pattern', 'email'] 
            ],
            'form1-name':[
                ['notEmpty'], 
                ['pattern', 'youName'] 
            ]
        }
});
validatorForms.init();
    //форма portfolio
const validatorForms2 = new Validator({
        selector: '#form2', // что валидируем
        pattern: { 
            youName: /^[А-ЯЁа-яё]*$/,
            youMessage: /^[А-ЯЁа-яё]*$/,
        },
        method: {
            'form2-phone':[ 
                ['notEmpty'], 
                ['pattern', 'phone'] 
            ],
            'form2-email':[
                ['notEmpty'], 
                ['pattern', 'email'] 
            ],
            'form2-name':[
                ['notEmpty'], 
                ['pattern', 'youName'] 
            ],
            'form2-message': [
                ['notEmpty'], 
                ['pattern', 'youMessage'] 
            ]
        }
});
validatorForms2.init();
    //форма question
const validatorForms3 = new Validator({
        selector: '#form3', // что валидируем
        pattern: { 
            youName: /^[А-ЯЁа-яё]*$/,
            youMessage: /^[А-ЯЁа-яё]*$/,
        },
        method: {
            'form3-phone':[ 
                ['notEmpty'], 
                ['pattern', 'phone'] 
            ],
            'form3-email':[
                ['notEmpty'], 
                ['pattern', 'email'] 
            ],
            'form3-name':[
                ['notEmpty'], 
                ['pattern', 'youName'] 
            ],
            'form2-message': [
                ['notEmpty'], 
                ['pattern', 'youMessage'] 
            ]
        }
});
validatorForms3.init();