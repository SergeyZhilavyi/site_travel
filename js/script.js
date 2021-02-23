'use strict';
/*Scroll header start*/

(function () {
    const  header = document.querySelector('.header');
    window.onscroll = () => {
        if(window.pageYOffset > 50) { /*Если от верха проскроллили на 50px выполняем след действие*/ 
            header.classList.add('header_active');/*Здесь точка перед классом не нужна*/ 
        }else{
            header.classList.remove('header_active');/*Здесь точка перед классом не нужна*/
        }
    };
}());

/*Scroll header end*/

/*Adaptive menu start*/

(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header_menu');
    const menuCloseItem = document.querySelector('.header_menu-close');
    burgerItem.addEventListener('click', () => {
        menu.classList.add('header_menu_active');
    });
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header_menu_active');
    });
}());

/*Adaptive menu end*/

/*Прокрутка по якорям (id)*/ 

(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;/*Расчёт высоты */
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());

// Глобальная переменная smoothScroll(Плавный скролл) - имеет 2 параметра необходимых для работы 
/* Переменная headerElHeight, в неё записываем высоту хедера для того, чтобы регулировать
то растояние, которое нам нужно проскроллить до блока(ЧТобы menu не наезжало на блок при скролле) 
когда хедер зафиксирован*/

/*ease-функция-обработчик нашего скролла. Т.е она отвечает за то, как именно будет 
анимироваться наш скролл*/

//animation - Собственно сама анимация
/*scrollTo - здесь у нас происходит подвешивание обработчика события на сами ссылки
для того чтобы при клике срабатывала та функция скролла, которая описана выше */

/*Скрипт вычисляет высоту хедера и вычитает её из того расстояния на которое нужно проскроллить
Соответственно он скролит с учётом высоты этого хедера. И хедер не наезжает на контент блока */ 

/*Если возникает такая ситуация, когда хедер не перемещается (не скролится)Б то тогда нужно удалить
переменную  headerElHeight везде, где она встречается. После этого работа скрипта будет корректной*/