console.log('таймер');
window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    function addNull(num) {
        num = ''+num;   
        return (num.length === 1)? num = '0' + num : num = num;        
    }

    // функцию день дней дня
    const declOfNum = (number, titles) => addNull(number) + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
    
    // таймер

    function countTimer(deadLine) {
        let timerHours = document.querySelector('#timer-hours'),
            timerDay = document.querySelector('#timer-days'),
            timerDaySite = document.querySelector('#timer-day-site'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        

            function getTimeRemaining() {
            let dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow)/1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60)%60),
                hours = Math.floor((timeRemaining / 60 )/ 60),
                day = Math.floor(timeRemaining / 60 / 60 / 24);

                if (timeRemaining <= 0){
                    stopTimer();
                    addTimeRemaining();
                    return { hours : 0, minutes : 0, seconds : 0, day : 0 } // первый урок
                }
                
                return {
                    day,
                    hours,      // в старом стандарте 'hours':hours,
                    minutes,    //в старом стандарте 'minutes':minutes,
                    seconds,     //в старом стандарте 'seconds':seconds
                    timeRemaining
                }
            }
            // добавим еще 24 часа на акцию
            let addTimeRemaining = () =>{
                let addDays = 1;
                let date = new Date()
                date.setHours(date.getHours() + (24 - date.getHours()));
                date.setMinutes('00');
                date.setSeconds(date.getSeconds());
                countTimer(date);
            }
            let stopTimer = () => {
                clearInterval(setTimer);
            }

            function updateClock() {
                let timer = getTimeRemaining();
                
                (timer.day !== 0)? timerDay.textContent = declOfNum(timer.day,['день','дня','дней']):
                timerDay.style.display = 'none';
                (timer.hours !== 0 ) ? timerHours.textContent = addNull( timer.hours -(timer.day *24)) : 
                    timerHours.textContent = declOfNum(timer.hours,[' ч',' ч',' ч']);
                (timer.minutes !== 0) ? timerMinutes.textContent = addNull(timer.minutes) : 
                    timerMinutes.textContent = declOfNum(timer.minutes,[' м',' м',' м']);
                (timer.seconds !== 0) ? timerSeconds.textContent = addNull(timer.seconds) : 
                timerSeconds.textContent = addNull(timer.seconds);
                // timerSeconds.textContent = declOfNum(timer.seconds,['секунад','секунды','секунд']);

              
            }
            let setTimer = setInterval(() => {
                updateClock();
            }, 1000);
           
           
    }
    countTimer('19 feb 2020 12:15');


    // меню

    const toggleMenu = () =>{

        const btnMenu = document.querySelector('.menu'),
              menu = document.querySelector('menu'),
              closeBtn = menu.querySelector('.close-btn'),
              menuItems = menu.querySelectorAll('ul>li');
              
           

    

        // функция скрытия или отображения меню
        const handlerMenu = ()=>{
                // проверяем есть ли у элемента свойство translate(-100%)
                // if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
                //     menu.style.transform = 'translate(0)';
                // } else {
                //     menu.style.transform = 'translate(-100%)';
                // }

                //более простой метод взаимодействовать с классом toggle добавляет или удаляет нужный класс элементу
                menu.classList.toggle ('active-menu');
                

        };
        // плавный скроллинг
        const slowScroll = () => {
            let tagTarget = event.target.hash,
                moveToElement,
                divTargetY;
                tagTarget = '.'+tagTarget.substr(1);
                divTargetY = document.querySelector(tagTarget).offsetTop;
  
                event.target.href = '#';

                let scrollItem = () => {
                    if (window.pageYOffset <= divTargetY) {
                        moveToElement = requestAnimationFrame(scrollItem);
                        this.scrollBy(0, 80);
                    } else {
                        cancelAnimationFrame(moveToElement);
                    }
                     
                  }
                  event.target.addEventListener('click', scrollItem);
                  scrollItem();

        };
            // событие на меню
            btnMenu.addEventListener('click',handlerMenu); 
                    
            // крестик в меню        
            closeBtn.addEventListener('click',handlerMenu);
                
            // навешиваем событие на каждый элемент меню    
            menuItems.forEach((element) => element.addEventListener('click',handlerMenu)); 
            menuItems.forEach((element) => element.addEventListener('click',slowScroll)); 
           
    }

    toggleMenu();

    //popup

    const toglePopup = () =>{
        const popUp = document.querySelector('.popup'),
              popupBtn = document.querySelectorAll('.popup-btn'),
              popupClose = document.querySelector('.popup-close');

        popupBtn.forEach((element)=>{
           element.addEventListener('click', ()=>{
               if( document.documentElement.clientWidth <= 768 ){
                    popUp.style.display = 'block';
               } else{
                    popUp.style.display = 'block';
                    popUp.style.opacity = 0;
                    let op = 0;
                    const setOpacity = () => {
                        let opacity;
                            if( op < 1 ) {
                                let opacity = requestAnimationFrame(setOpacity);
                                op +=0.04;
                                popUp.style.opacity = op;
                            
                            } else{
                                cancelAnimationFrame(opacity);
                            }
                    }
                    setOpacity();
               }
   
           }); 
        });
        popupClose.addEventListener('click', () => popUp.style.display = 'none');

    }
    toglePopup();

    //прокрутка до услуг

    const slowScroll = () =>{
        const imgBtn = document.querySelector('main>a'),
              targetAncor = document.querySelector('.service-block'),
              bodyItem = document.querySelector('body'),
              targetY = targetAncor.offsetTop;
              imgBtn.href = '#';
        let top,              
            moveToElement;
          
              let scrollItem = () => {
                // event.preventDefault();
                if (window.pageYOffset < targetY) {
                    moveToElement = requestAnimationFrame(scrollItem);

                    this.scrollBy(0, 20);
                    
                } else {
                    cancelAnimationFrame(moveToElement);
                }
              };
              imgBtn.addEventListener('click', scrollItem);

    };
    slowScroll();

    //плавная прокрутка


});

