// require
var moment = require('moment');

(function () {
    // list country
    const title = document.querySelectorAll('.country__list__zone');
    //array to stock all te properties of our list
    let arrayProps = [];

    // init all properties of one list
    function constructor(open) {
        this.open = open || false,
        this.heightList = 0,
        this.hide = function (list, plus) {
            this.heightList = 0;
            list.style.height = this.heightList;
            list.classList.remove('country__list__selector--active');
            plus.classList.remove('minus');
            this.open = false;
        },
        this.show = function (list) {
            list.style.height = this.heightList + 'px';
            this.open = true;
        }
        this.checkAllshow = function (arrayProps) {
            let openElems = document.querySelectorAll('.country__list__selector');
            for (let i = 0; i < openElems.length; i++) {
                const element = openElems[i];
                if (element.classList.contains('country__list__selector--active')) {
                    arrayProps[i].open = false;
                    arrayProps[i].heightList = 0;
                    const list = title[i].nextSibling;
                    const plus = title[i].previousSibling;
                    list.classList.remove('country__list__selector--active');
                    plus.classList.remove('minus');
                    list.style.height = 0;
                }
            }
        }
    }

    for (let i = 0; i < title.length; i++) {
        let props = new constructor();
        arrayProps.push(props);
        title[i].addEventListener('click', function () {
            let propsItem = arrayProps[i];
            const list = title[i].nextSibling;
            const plus = title[i].previousSibling;

            if (propsItem.open) {
                propsItem.hide(list, plus);
            }
            else {
                propsItem.checkAllshow(arrayProps);
                list.classList.add('country__list__selector--active');
                plus.classList.add('minus');
                const listActive = document.querySelectorAll('.country__list__selector--active > li');
                for (let x = 0; x < listActive.length; x++) {
                    propsItem.heightList += listActive[x].clientHeight;
                }
                propsItem.show(list);
            }
        })
    }
})();

(function () {

    let timer = {}; // declare timer give it value of empty obj
    var time = moment('2018-02-25T20:00:00'); //declare time give it value of moment obj of actual time
    timer.days = -moment().diff(time, 'days');
    timer.hours = -moment().diff(time.subtract(24 * timer.days, 'hours'), 'hours');
    timer.minutes = -moment().diff(time.subtract(60 * timer.hours, 'minutes'), 'minutes');
    timer.secondes = -moment().diff(time.subtract(60 * timer.minutes, 'seconds'), 'seconds');
    let allValues = [];
    // transform to string and check length on load
    for (let index in timer) {
        timer[index] = timer[index].toString();
        if (timer[index].length === 1) {
            timer[index] = '0' + timer[index];
        }
        allValues.push(timer[index]);
    }
    // clef all qui a pour valeur un tableau de toutes mes valeurs
    timer.all = allValues;

    // push in html all the values
    function initDomElements() {
        let initDomElements = document.querySelectorAll('.home__timer__box > p > span');
        for (let i = 0; i < initDomElements.length; i++) {
            initDomElements[i].innerHTML = timer.all[i];
        }
    }
    initDomElements();

    setInterval(function () {
        let actualTimer = {}; // object for the new value of timer
        //diff method remove value to time, we need to reset it everytimes
        time = moment('2018-02-25T20:00:00');
        // calcul the diff between time and now
        actualTimer.days = -moment().diff(time, 'days');
        actualTimer.hours = -moment().diff(time.subtract(24 * actualTimer.days, 'hours'), 'hours');
        actualTimer.minutes = -moment().diff(time.subtract(60 * actualTimer.hours, 'minutes'), 'minutes');
        actualTimer.secondes = -moment().diff(time.subtract(60 * actualTimer.minutes, 'seconds'), 'seconds');
        // create variable typr array
        let allValues = [];
        // transform to string and check length
        for (let index in actualTimer) {
            actualTimer[index] = actualTimer[index].toString();
            if (actualTimer[index].length === 1) {
                actualTimer[index] = '0' + actualTimer[index];
            }
            allValues.push(actualTimer[index]);
        }
        actualTimer.all = allValues;

        let occurence = [];

        for (let i = 0; i < actualTimer.all.length; i++)
            if (actualTimer.all[i] !== timer.all[i])
                occurence.push(i);

        //on parcours occurence
        for (let i = 0; i < occurence.length; i++) {
            // get element by id exemple div#entry3
            const parent = document.getElementById("entry" + occurence[i]);
            const element = parent.querySelector('span:first-child');
            element.innerHTML = actualTimer.all[occurence[i]].toString();
            if (occurence[i] === '3')
                element.classList.add('item__second--active');
            else
                element.classList.add('item__others--active');
        }

        // on re set timer avec la valeur d'actualTimer
        timer = actualTimer;
        // run CreateClock
    }, 1000);
})();

// nav bar toogle
(function () {
    const navBar = document.querySelector('.country');
    const map = document.querySelector('.toggle-nav');
    const backNav = document.querySelector('.country__back');
    const content = document.querySelector('.content');

    map.addEventListener('click', function () {
        navBar.classList.add('country--active');
        content.classList.add('content--active');
    });
    backNav.addEventListener('click', function () {
        navBar.classList.remove('country--active');
        content.classList.remove('content--active');
    })
})();
