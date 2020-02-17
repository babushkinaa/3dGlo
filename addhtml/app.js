"use strict";

const Dz = function() {

    this.timeOfDay;
    this.dataWeek;
    this.nowTime;
    this.newYear;
};

    Dz.prototype.timeOfDay = function() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12)
            this.timeOfDay = "Доброе утро";
        else if (hour >= 12 && hour < 18)
            this.timeOfDay = "Добрый день";
        else if (hour >= 18 && hour < 24)
            this.timeOfDay = "Добрый вечер";
        else if (hour >= 0 && hour < 5)
            this.timeOfDay = "Доброй ночи";
        document.write(this.timeOfDay + '</br>');
    };

    Dz.prototype.dayWeek = function() {
        let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        this.dataWeek = days[new Date().getDay()];
        document.write('Сегодня: ',this.dataWeek+ '</br>');
    };
    Dz.prototype.time = function (){
        const date = new Date();
            const options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
            };
            this.nowTime = date.toLocaleString('ru-RU', options);
            document.write('Время: ',this.nowTime+ '</br>');
    };
    Dz.prototype.newYear = function(){
        const dateNewYear = new Date('31 dec 2020').getTime();
        const dateNow = new Date().getTime();
        this.newYear = Math.floor((dateNewYear - dateNow)/1000/60/60/24);
        document.write(`До нового года осталось ${this.newYear} дней`+ '</br>');
    };
    Dz.prototype.start = function(){
        this.timeOfDay();
        this.dayWeek();
        this.time();
        this.newYear();
    };

    

let data = new Dz();
data.start();



