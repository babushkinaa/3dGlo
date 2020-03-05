'use strict';

const slider = () =>{
    const slide = document.querySelectorAll('.portfolio-item'),
          btn = document.querySelectorAll('.portfolio-btn'),
          parrentDot = document.querySelector('.portfolio-dots'),
          slider = document.querySelector('.portfolio-content');
    let   dot = document.querySelectorAll('.dot'),
          currentSlide = 0, // первый слайд
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
         currentSlide++;
         if (currentSlide >= slide.length) {
             currentSlide = 0;
         }
         nextSlide( slide, currentSlide, 'portfolio-item-active');
         nextSlide( dot, currentSlide, 'dot-active');
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
            });
            dot = document.querySelectorAll('.dot');


    };
    enterDotScrean();
    startSlide();
};

export default slider;