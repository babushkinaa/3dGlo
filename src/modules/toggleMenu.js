'use strict';

const toggleMenu = () =>{

    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = menu.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');
          
    document.addEventListener('click',(event)=>{

        let target = event.target;
    
        if (target.closest('.menu')) {
            menu.classList.toggle ('active-menu');
            return;
        }
        if (target.closest('.close-btn')) {
            menu.classList.toggle ('active-menu');

        }
        if (!target.closest('.active-menu')) {
            menu.classList.remove ('active-menu');
        }         
        if (target.tagName.toUpperCase() ==='A'&& !target.closest('.close-btn') && !target.closest('.portfolio-btn')) {
            slowScroll(event);//portfolio-btn
        } 
       

    });      
  
    // плавный скроллинг
    const slowScroll = (event) => {
        menu.classList.remove ('active-menu');
        let tagTarget = event.target.hash.substr(1),
            divTargetY = document.querySelector('.'+tagTarget).offsetTop,        
            moveToElement;                
            event.target.href = '#';              
        let scrollItem = () => {
            if ( window.pageYOffset <= divTargetY ) {
               
                moveToElement = requestAnimationFrame(scrollItem);
                scrollBy(0, 80);
                if(window.scrollY+1 >= document.documentElement.scrollHeight-document.documentElement.clientHeight) {
                    cancelAnimationFrame(moveToElement);
                    return
                };

            } else {
                cancelAnimationFrame(moveToElement);
            }                     
        }
        scrollItem();
    };       
};

export default toggleMenu;