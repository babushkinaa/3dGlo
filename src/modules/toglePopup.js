'use strict';

const toglePopup = () =>{
    const popUp = document.querySelector('.popup');

    // открываем popup
    const showPopup = () => {
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
    };
    // закрываем по крестику
    const closePopup = () => {
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
    };
    // закрываем если нажали нафон
    const closePopupBg = () => {
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
    };

    document.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.popup-btn')) {
            showPopup();
        }
        if (target.closest('.popup-close')) {
            closePopup();
        }
        if (!target.closest('.popup-content') && !target.closest('.form-btn')) {
            closePopupBg();
        }
    });


}

export default toglePopup;