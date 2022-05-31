let currencyValueRight = 'USD';
let currencyValueLeft = 'RUB';
let inputValueRight = '';
let inputValueLeft = '';
let rateValue = 0;
let kursLeft = document.querySelector('.kurs__left');
let kursRight = document.querySelector('.kurs__right');


let currencyTo = document.querySelectorAll('.currency__to');
let currencyFrom = document.querySelectorAll('.currency__from');
let inputRight = document.querySelector('.input__right');
let inputLeft = document.querySelector('.input__left');

let currencyRight = document.querySelector('.right');
let converterLinkRight = [...currencyRight.children];
let currencyLeft = document.querySelector('.left');
let converterLinkLeft = [...currencyLeft.children];




currencyRight.addEventListener('click',(e)=>{
	converterLinkRight.forEach((el) =>{
		el.classList.remove('cliced')
	})
	e.target.classList.toggle('cliced');
	currencyValueRight = e.target.innerText;
	currencyTo.forEach(e=>{
		e.innerText=currencyValueRight;
	})
	getCurrencyCourse()
})

	currencyLeft.addEventListener('click',(e)=>{
		converterLinkLeft.forEach(el =>{
			el.classList.remove('cliced')
		})
	
		e.target.classList.toggle('cliced');
		currencyValueLeft = e.target.innerText;
		currencyFrom.forEach(e=>{
			e.innerText=currencyValueLeft;
		})
		getCurrencyCourse();
	})
	

function getCurrencyCourse(){
	if(currencyValueLeft!=currencyValueRight){
		fetch (`https://api.exchangerate.host/convert?from=${currencyValueLeft}&to=${currencyValueRight}`)
		.then(res=>res.json())
		.then(data =>{
			rateValue = +data.result;
			kursLeft.innerText = Math.floor((data.result)*10000)/10000 + ' ';
			kursRight.innerText = Math.floor((1/data.result)*10000)/10000+' ';
			inputRight.value = Math.floor((data.result)*10000)/10000; 
			
		})
		.catch(error => {
			console.log(`${error.message}`)
		});
	}else{
		inputLeft.value = 1;
		inputRight.value = 1;
		rateValue = 1;
		kursLeft.innerText = 1;
		kursRight.innerText = 1;
		inputLeft.value = inputRight.value
	}
	

}
getCurrencyCourse()
inputLeft.value = 1;

inputRight.addEventListener('input',(e)=>{
	inputValueRight=+e.target.value;
	inputLeft.value=Math.floor((inputValueRight/rateValue)*10000)/10000;
})	


inputLeft.addEventListener('input',(e)=>{
	inputValueLeft=+e.target.value;
	inputRight.value=Math.floor((inputValueLeft*rateValue)*10000)/10000;
})
