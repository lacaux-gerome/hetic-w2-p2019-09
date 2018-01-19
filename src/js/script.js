// list country

var title = document.querySelectorAll('.country__list__zone');

for (let i = 0; i < title.length; i++) {
	title[i].addEventListener('click', function() {
		let parent = title[i].parentNode;
		let list = parent.querySelector('.country__list__selector');
		let plus = parent.querySelector('.country__list__plus');
		if (list.classList.contains('country__list__selector--active')) {
			if (list.clientHeight > 0){
				console.log('yo');
				list.style.height = '0px';
			}
			list.classList.toggle('country__list__selector--active');
			plus.classList.toggle('minus');
		}
		else{
			remove(list,plus);
		}
	})
};
function remove(list,plus) {
	var listAll = document.querySelectorAll('.country__list__selector');
	var plusAll = document.querySelectorAll('.country__list__plus');
	for (let j = 0; j < listAll.length; j++) {
		listAll[j].classList.remove('country__list__selector--active');
		listAll[j].style.height = '0px';
		plusAll[j].classList.remove('minus');
	}
	add(list,plus);
}
function add(list,plus) {
	list.classList.add('country__list__selector--active');
	plus.classList.add('minus');
	var listActive = document.querySelectorAll('.country__list__selector--active > li'),
    	heightList = 0;
	for (let x = 0; x < listActive.length; x++) {
		heightList += listActive[x].clientHeight;
	}
	list.style.height = heightList + 'px';
}


// threeJS

var THREE = require('three');