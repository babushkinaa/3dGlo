const slowScroll = () =>{
    const imgBtn = document.querySelector('main>a'),
          targetAncor = document.querySelector('.service-block'),
          bodyItem = document.querySelector('body'),
          targetY = targetAncor.offsetTop;
          imgBtn.href = '#';
    let top,              
        moveToElement;
      
          let scrollItem = () => {
            if (window.pageYOffset < targetY) {
                moveToElement = requestAnimationFrame(scrollItem);

                this.scrollBy(0, 20);
                
            } else {
                cancelAnimationFrame(moveToElement);
            }
          };
          imgBtn.addEventListener('click', scrollItem);
};

export default slowScroll;