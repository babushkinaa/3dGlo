'use strict';

const command = () =>{
    const changeData = (event) =>{
        const eventAttribut = "data-img";
        const imgSrc = event.getAttribute('src');
        event.style.opacity = 0;
        event.hasAttribute(eventAttribut) ? event.src = event.dataset.img : 'null'; 

         let op = 0;
        const setOpacity = () => {
            let opacity;
                if( op <= 1 ) {
                    opacity = requestAnimationFrame(setOpacity);
                    op +=0.02;
                    event.style.opacity = op;
                
                } else{
                    cancelAnimationFrame(opacity);
                }
        }
        setOpacity();
        event.setAttribute(eventAttribut, imgSrc);
    };

    const reverseData = (event) =>{
        const eventAttribut = "data-img";
        const imgSrc = event.getAttribute('src');
        event.style.opacity = 0;
        event.hasAttribute(eventAttribut) ? event.src = event.dataset.img : 'null';
        let op = 0;
        const setOpacity = () => {
            let opacity;
                if( op <= 1 ) {
                    opacity = requestAnimationFrame(setOpacity);
                    op +=0.04;
                    event.style.opacity = op;
                
                } else{
                    cancelAnimationFrame(opacity);
                }
        }
        setOpacity();
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

};
export default command;