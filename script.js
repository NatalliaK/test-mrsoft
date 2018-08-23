const PROXY = 'https://cors-anywhere.herokuapp.com/';
const ADDR_BD = 'http://www.mrsoft.by/data.json';
const cont = document.getElementById('container');
const preload = document.getElementById('preload');
var data;

class Sorting {
	constructor(db) {
		this.db = db.data;
		this.input = document.querySelector('input[type="text"]');
		this.checkbox = document.querySelector('input[type="checkbox"]');
		this.sortingByNum = document.getElementById('sort-num');
		this.sortingByStr = document.getElementById('sort-str');
		this.modifiedData;

		cont.addEventListener('click', this.sort.bind(this));
	}

	sort(e) {
		if (this.input.value && e.target.tagName === 'BUTTON') {
			e.preventDefault();
			if (isFinite(this.input.value) && e.target === this.sortingByNum) {
				this.getNum();
			} else if (/[a-z]/i.test(this.input.value) && e.target === this.sortingByStr) {
				this.getStr(this.checkbox.checked);
			} else {
				this.modifiedData = [];
			}
			this.drawResult(this.modifiedData);
		}
	}

	getNum() {
		this.modifiedData = this.db.filter(el => el.length > this.input.value);
		this.input.value = '';

		return this.modifiedData;
	}

	getStr(check) {
		let flag = check ? '' : 'i';
		let regexp = new RegExp(this.input.value, flag);

		this.modifiedData = this.db.filter(el => regexp.test(el));
		this.input.value = '';

		return this.modifiedData;
	}

	drawResult(sortingData) {
		if (document.querySelector('ul')) {
			var ul = document.querySelector('ul');
		} else {
			ul = document.createElement('ul');
			ul.classList.add('list');
		}

		if (sortingData.length > 0) {
			ul.innerHTML = sortingData.map(el => `<li>${el}</li>`).join('');
			cont.appendChild(ul);
		} else {
			ul.innerHTML = '';
		}
	}
}

// PROXY - для добавления заголовка к запросу

getDataByFetch(PROXY + ADDR_BD)
	.then(db => {
		preload.classList.add('hidden');

		return data = new Sorting(db);
	});