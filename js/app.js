console.log('таймер');
window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    function addNull(num) {
        num = ''+num;   
        return (num.length === 1)? num = '0' + num : num = num;        
    }

    // Никита - нашел функцию которую Макс на стриме показывал
    const declOfNum = (number, titles) => addNull(number) + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
    
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

                if (timeRemaining <= 1){
                    stopTimer();
                    addTimeRemaining();
                    // return { hours : 0, minutes : 0, seconds : 0, day : 0 } // первый урок
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
                date.setDate(date.getDate() + addDays);
                countTimer(date);
            }
            let stopTimer = () => {
                clearInterval(setTimer);
            }

            function updateClock() {
                let timer = getTimeRemaining();
                
                (timer.day !== 0)? timerDay.textContent = declOfNum(timer.day,['день','дня','дней']):
                timerDay.style.display = 'none';
                (timer.hours !== 0) ? timerHours.textContent = addNull( timer.hours -(timer.day *24)) : 
                    timerHours.textContent = declOfNum(timer.hours,['час','часа','часов']);
                (timer.minutes !== 0) ? timerMinutes.textContent = addNull(timer.minutes) : 
                    timerMinutes.textContent = declOfNum(timer.minutes,['минута','минуты','минут']);
                (timer.seconds !== 0) ? timerSeconds.textContent = addNull(timer.seconds) : 
                timerSeconds.textContent = addNull(timer.seconds);
                // timerSeconds.textContent = declOfNum(timer.seconds,['секунад','секунды','секунд']);

              
            }
            let setTimer = setInterval(() => {
                updateClock();
            }, 1000);
           
           
    }

    countTimer('18 feb 2020 16:58');

    
    

});