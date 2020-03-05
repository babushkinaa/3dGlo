'use strict';

const calculate = ( price = 100 ) => {
    const calcBlock =  document.querySelector('.calc-block'), // общий блок калькулятора
        calcType = document.querySelector('.calc-type'), // тип помещения
        calcSquare = document.querySelector('.calc-square'), // площадь помещения
        calcDay = document.querySelector('.calc-day'), // количество дней
        calcCount = document.querySelector('.calc-count'), // количество помещений
        totalValue = document.querySelector('#total'); // результат

    // доп задание    
    const showPrice = (totalCalc) => {

        let op = 0;
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

    document.addEventListener('input', event => {
        let target = event.target;
        if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
            target.value = target.value.replace(/[^0-9]/,'');
        }
    })
}; 

export default calculate;