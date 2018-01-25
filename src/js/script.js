// require
var moment = require('moment');
var THREE = require('three');

(function () {
// list country
    var title = document.querySelectorAll('.country__list__zone');

    for (let i = 0; i < title.length; i++) {
        title[i].addEventListener('click', function () {
            let parent = title[i].parentNode;
            let list = parent.querySelector('.country__list__selector');
            let plus = parent.querySelector('.country__list__plus');
            if (list.classList.contains('country__list__selector--active')) {
                if (list.clientHeight > 0) {
                    list.style.height = '0px';
                }
                list.classList.toggle('country__list__selector--active');
                plus.classList.toggle('minus');
            }
            else {
                remove(list, plus);
            }
        })
    }
    ;

    function remove(list, plus) {
        var listAll = document.querySelectorAll('.country__list__selector');
        var plusAll = document.querySelectorAll('.country__list__plus');
        for (let j = 0; j < listAll.length; j++) {
            listAll[j].classList.remove('country__list__selector--active');
            listAll[j].style.height = '0px';
            plusAll[j].classList.remove('minus');
        }
        add(list, plus);
    }

    function add(list, plus) {
        list.classList.add('country__list__selector--active');
        plus.classList.add('minus');
        var listActive = document.querySelectorAll('.country__list__selector--active > li'),
            heightList = 0;
        for (let x = 0; x < listActive.length; x++) {
            heightList += listActive[x].clientHeight;
        }
        list.style.height = heightList + 'px';
    }
})();

(function () {
    let timer = {}; // declare timer give it value of empty obj
    var time = moment('2018-02-01T20:00:00'); //declare time give it value of moment obj of actual time
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

    function initDomElements() {
        let initDomElements = document.querySelectorAll('.home__timer__box > p > span');
        for (let i = 0; i < initDomElements.length; i++) {
            initDomElements[i].innerHTML = timer.all[i];
        }
    }
    initDomElements();

    (function CreateClock() {
        let actualTimer = {}; // object for the new value of timer
        //diff method remove value to time, we need to reset it everytimes
        time = moment('2018-02-01T20:00:00');
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
            setTimeout(CreateClock, 1000);
        }

        // on re set timer avec la valeur d'actualTimer
        timer = actualTimer;
        // run CreateClock
        setInterval(CreateClock, 1000);
    })();
})();
