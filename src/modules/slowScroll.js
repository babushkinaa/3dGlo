'use strict';

const slowScroll = () =>{
    const imgBtn = document.querySelector('main>a'),
          targetAncor = document.querySelector('.service-block'),
          targetY = targetAncor.offsetTop;
          imgBtn.href = '#';
    let top,              
        moveToElement;
      
          let scrollItem = () => {
            if (window.pageYOffset <= targetY) {
                moveToElement = requestAnimationFrame(scrollItem);

                scrollBy(0, 20);
                
            } else {
                cancelAnimationFrame(moveToElement);
            }
          };
          imgBtn.addEventListener('click', scrollItem);
};

export default slowScroll;