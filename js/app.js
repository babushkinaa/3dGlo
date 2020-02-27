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
            // console.log(target);
            // console.log('target: ', menu.classList.contains('active-menu'));
           
            if (target.closest('.menu')) {
                menu.classList.toggle ('active-menu');
                return;
            }
            if (target.closest('.close-btn')) {
                menu.classList.toggle ('active-menu');

            }
            if (!target.closest('.active-menu')) {
                // console.log('target', target);

                menu.classList.remove ('active-menu');
            }
         
            if (target.tagName.toUpperCase() ==='A'&& !target.closest('.close-btn') && !target.closest('.portfolio-btn')) {
                slowScroll(event);//portfolio-btn
            } 
           

        });      
      
        // плавный скроллинг
        const slowScroll = (event) => {
            // console.log('event: ', event);
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
    
    // слайдер
    const slider = () =>{
        const slide = document.querySelectorAll('.portfolio-item'),
              btn = document.querySelectorAll('.portfolio-btn'),
              parrentDot = document.querySelector('.portfolio-dots'),
              slider = document.querySelector('.portfolio-content');
        let   dot = document.querySelectorAll('.dot');


        // console.log(slide, btn, dot, slider,parrentDot);

        let currentSlide = 0, // первый слайд
            interval; //переменная для остановки счетчика

        // СМЕНА КЛАССОВ СЛАЙДЕРА

        // добавляем класс для следующего
        const prevSlide = (element, index, removeClass) => { // element - элемент, index - индекс, addClass - удаляемый класс
            element[index].classList.remove(removeClass);//добавить эфект
        };
        // удаляем класс у текущего
        const nextSlide = (element, index, addClass) => { // element - элемент, index - индекс, addClass - добавляемый класс
            element[index].classList.add(addClass); //добавить эфект
        };

        // авто воспроизведение слайдера
        const autoPlaySlide = ()=>{
            prevSlide( slide, currentSlide, 'portfolio-item-active');
            prevSlide( dot, currentSlide, 'dot-active');
            //  slide[currentSlide].classList.remove('portfolio-item-active');
             currentSlide++;
             if (currentSlide >= slide.length) {
                 currentSlide = 0;
             }
             nextSlide( slide, currentSlide, 'portfolio-item-active');
             nextSlide( dot, currentSlide, 'dot-active');

            //  slide[currentSlide].classList.add('portfolio-item-active');

        };
        // запуск слайдера
        const startSlide = ()=>{
            let startSliderItem = (time = 3000) =>{ //значение по умолчанию 3 сек (3000)
                interval = setInterval(autoPlaySlide, time);
            };
            startSliderItem(); //скорость переключения слайдов
        };
        // остановка слайдера
        const stopSlide = ()=>{
                clearInterval(interval);
        };
        
      
        // обработчик нажатия на кнопки и точки слайдера
        slider.addEventListener('click',()=>{
            event.preventDefault();
            let target = event.target;
            // условия вызова обработчика 
            if (!target.matches('.portfolio-btn', '.dot')) { // если в таргет отсутствуют селекторы то ничего не делаем
                // if (!target.matches('#arrow-right','#arrow-left','.dot')) { // если в таргет отсутствуют селекторы то ничего не делаем
                return;            
            }

            prevSlide( slide, currentSlide, 'portfolio-item-active');
            prevSlide( dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) { // если в таргете есть id #arrow-ride
                currentSlide++;
            }else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((element, index)=>{
                    if(element === target){
                        currentSlide = index;
                    }
                });
            }
            // если кнопками дошелкали до последнего элемента то следующий элемент присваеваем 0й элемент массива
            if (currentSlide >= slide.length ) {
                currentSlide = 0;
            }
            // если кнопками дошелкали до первого элемента то следующий элемент присваеваем последний элемент массива
            if (currentSlide < 0 ) {
                currentSlide = slide.length -1;
            }

            nextSlide( slide, currentSlide, 'portfolio-item-active');
            nextSlide( dot, currentSlide, 'dot-active');

        });
        // остановка слайдера при наведении мышкой на кнопки или точки
        slider.addEventListener('mouseover',(event)=>{ // не нужно использовать mouseenter
            let target = event.target;

            if (target.matches('.portfolio-btn') || target.matches('.dot')) { // если мышь прибежала на эти элементы
                stopSlide();
            }
            
        });
        // запуск слайдера если мышь убежала
        slider.addEventListener('mouseout',(event) => { // не нужно использовать mouseleave
            let target = event.target;

            if (target.matches('.portfolio-btn') || target.matches('.dot')) { // если мышь убежала с этих элементов
                startSlide();
            }

        });

        // количество точек и добавление в слайдер
        const enterDotScrean = () => {
            let elementLi;

                slide.forEach((element,i) => {
                    if (i>0) {
                        elementLi = document.createElement('li');
                        elementLi.classList.add('dot'); 
                        parrentDot.appendChild(elementLi); 
                    } else{
                        elementLi = document.createElement('li');
                        elementLi.classList.add('dot'); 
                        elementLi.classList.add('dot-active'); 
                        parrentDot.appendChild(elementLi);
                    }
                    
                    // console.log(i);
                });
                dot = document.querySelectorAll('.dot');


        };
        enterDotScrean();

        startSlide();
    };
    slider();
    // команда изменение фоток при наведении мышкой
    const command = () =>{

        const changeData = (event) =>{
            const eventAttribut = "data-img";
            const imgSrc = event.getAttribute('src');
            event.hasAttribute(eventAttribut) ? event.src = event.dataset.img : 'null'; 
            event.setAttribute(eventAttribut, imgSrc);
        };
        const reverseData = (event) =>{
            const eventAttribut = "data-img";
            const imgSrc = event.getAttribute('src');
            event.hasAttribute(eventAttribut) ? event.src = event.dataset.img : 'null';
            event.setAttribute(eventAttribut, imgSrc);
        };

        document.addEventListener('mouseover', event => {
            let target = event.target;
            if (target.closest('.command__photo')) {
                changeData(target);
            }
        });
        document.addEventListener('mouseout', event => {
            let target = event.target;
            if (target.closest('.command__photo')) {
                reverseData(target);
            }
        });

    }; command();

    // калькулятор не знаю это работе не мешает но изначально в верстке уже есть проверка - может через css
    const calculate = ( price = 100 ) => {
        const calcBlock =  document.querySelector('.calc-block'), // общий блок калькулятора
            calcType = document.querySelector('.calc-type'), // тип помещения
            calcSquare = document.querySelector('.calc-square'), // площадь помещения
            calcDay = document.querySelector('.calc-day'), // количество дней
            calcCount = document.querySelector('.calc-count'), // количество помещений
            totalValue = document.querySelector('#total'); // результат

        // доп задание    
        const showPrice = (totalCalc) => {

            let op = 0, total = 0;
                    const setOpacity = () => {
                        let opacity;
                            if( op < totalCalc ) {
                                let opacity = requestAnimationFrame(setOpacity);
                                op +=50;
                                
                                totalValue.textContent = op;
                            
                            } else{
                                cancelAnimationFrame(opacity);
                            }
                    }
                    setOpacity();
            // totalValue.textContent = totalCalc;
        };    

        const coutnSum = ( price ) =>{

            let total = 0, // результат
                countValue = 1, // помещений по умолчанию 
                dayValue = 1; // дней по умолчанию
            const typeValue = calcType.options[calcType.selectedIndex].value,
                  squareValue = +calcSquare.value;

                if( calcCount.value > 1){
                    countValue += ( calcCount.value - 1 )/ 10;
                }

                if (calcDay.value && calcDay.value < 5) {
                    dayValue *= 2;
                } else if (calcDay.value && calcDay.value <10) {
                    dayValue *= 1.5;
                }


                if (typeValue &&  squareValue) {
                    total = price * typeValue * squareValue * countValue * dayValue;
                } 
               
           
            showPrice(total);
        };    

        calcBlock.addEventListener('change', event => {
            const target = event.target;

            if (target === calcType || target === calcSquare || target === calcDay || target === calcCount ) {
                // более короткий способ if (target.matches('select') || target.matches('input'))
                coutnSum(price);
            }

        });


        // document.addEventListener('input', event => {
        //     let target = event.target;
        //     // if (target.matches('input')) {
        //     if (target === calc-square) {
        //         target.value = target.value.replace(/[^0-9]/,'');
        //     }
        // })
    }; calculate( 100 );

    //маска для ввода
    const maskInput = () => {
        maskPhone('#form1-phone');
        maskPhone('#form2-phone');
    };
    maskInput();

});

