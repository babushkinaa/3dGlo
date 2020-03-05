'use strict';

const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = document.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    // добавляем класс bootstrap  d-none (display-none)      
    const toggleTabContent = (index) => {
        tabContent.forEach((element, i) => {
            if(index === i){
                element.classList.remove('d-none');
                tab[i].classList.add('active');
                tabContent.forEach(item => {
                    if (!item.classList.contains("d-none")) {
                        item.style.opacity = 0;
                        let op = 0;
                        const setOpacity = () => {
                            let opacity;
                                if( op <= 1 ) {
                                    opacity = requestAnimationFrame(setOpacity);
                                    op +=0.04;
                                    item.style.opacity = op;
                                
                                } else{
                                    cancelAnimationFrame(opacity);
                                }
                        }
                        setOpacity();
                    }
                });                    
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

export default tabs;