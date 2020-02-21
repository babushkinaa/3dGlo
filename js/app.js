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
              
        document.addEventListener('click',(event)=>{

            let target = event.target;
            console.log(target);
            // console.log('target: ', menu.classList.contains('active-menu'));
           
            if (target.closest('.menu')) {
                menu.classList.toggle ('active-menu');
                return;
            }
            if (target.closest('.close-btn')) {
                menu.classList.toggle ('active-menu');

            }
            if (!target.closest('.active-menu')) {
                console.log('target', target);

                menu.classList.remove ('active-menu');
            }
         
            if (target.tagName.toUpperCase() ==='A'&& !target.closest('.close-btn')) {
                slowScroll(event);
            } 
           

        });      
      
        // плавный скроллинг
        const slowScroll = (event) => {
            console.log('event: ', event);
            menu.classList.remove ('active-menu');

            let tagTarget = event.target.hash.substr(1),
                divTargetY = document.querySelector('.'+tagTarget).offsetTop,
            
                moveToElement;
                
                event.target.href = '#';
              
                let scrollItem = () => {
                    if (window.pageYOffset <= divTargetY) {
                        moveToElement = requestAnimationFrame(scrollItem);
                        this.scrollBy(0, 80);
                    } else {
                        cancelAnimationFrame(moveToElement);
                    }
                     
                }
                  scrollItem();

        };
            // событие на меню
            // btnMenu.addEventListener('click',handlerMenu); 
                    
            // крестик в меню        
            // closeBtn.addEventListener('click',handlerMenu);
                
            // навешиваем событие на каждый элемент меню    
            // menuItems.forEach((element) => element.addEventListener('click',handlerMenu)); 
            // menuItems.forEach((element) => element.addEventListener('click',slowScroll)); 
           
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
        popupClose.addEventListener('click', () => {
            let op = 1, opacity;
                    const setOpacity = () => {
                        let opacity;
                            if( op > 0 ) {
                                opacity = requestAnimationFrame(setOpacity);
                                op -=0.08;
                                popUp.style.opacity = op;
                            
                            } else{
                                cancelAnimationFrame(opacity);
                                popUp.style.display = 'none';
                            }
                    }
                    setOpacity();
            
        });

        //щелчек по фону закрытие popup
        popUp.addEventListener('click',()=>{
            let op = 1, opacity;
            const setOpacity = () => {
                let opacity;
                    if( op > 0 ) {
                        opacity = requestAnimationFrame(setOpacity);
                        op -=0.3;
                        popUp.style.opacity = op;
                    
                    } else{
                        cancelAnimationFrame(opacity);
                        popUp.style.display = 'none';
                    }
            }
            setOpacity();
        });

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

    //табы наши услуги

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
              tab = document.querySelectorAll('.service-header-tab'),
              tabContent = document.querySelectorAll('.service-tab');
  

        // добавляем класс bootstrap  d-none (display-none)      
        const toggleTabContent = (index) => {
            tabContent.forEach((element, i) => {
                if(index === i){
                    // console.log(element);
                    element.classList.remove('d-none');
                    tab[i].classList.add('active');
                } else {
                    element.classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            });
        };     

              tabHeader.addEventListener('click',(event) =>{
                  let target = event.target; // присвоим событие прилетевшее в обработчик переменной target
                      target = target.closest('.service-header-tab');  // переопределим target если у элемента нет класса service-header-tab
                                                                       // проверяем у родителя класс 
                      tab.forEach((item,i) => {
                          if(item === target){
                            toggleTabContent(i);
                            
                          }
                      });
                  
              });

    };
    tabs();

    const slider = () =>{

    };
    slider();

});

