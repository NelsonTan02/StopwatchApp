const start= document.getElementById('startBtn');
const end= document.getElementById('stopBtn');
const reset= document.getElementById('resetBtn');
const lap= document.getElementById('lapBtn');
const clearLap= document.getElementById('clearLapBtn');
const lapdiv= document.getElementById('lap');
const lapRingtone=document.getElementById('lapRingtone');
const setRingtone= document.getElementById('submitBtn');
const msg=document.getElementById('msg');
const ringtone= document.getElementById('ringtone');
const img= document.getElementById('image');

let video=document.getElementById('bgvid');
let setringtoneTime= document.getElementById('setringtoneTime');
let hr = min = s = ms = 0;
let click=0;
let startTimer;
let startTimer2;
let cnt=0;

//order=0 means none of the timers is running
//order=1 means stopwatch is running 
//order=2 means Custom stopwatch is running

//let ringtone = new Audio("ringtone.mp3");

start.addEventListener('click', () => {
	if(click < 1){
	start.classList.add('active');
	end.classList.remove('endActive');

	startTimer= setInterval(() => {
		ms++;
		
		if(ms == 10){
			ms=0;
			s++;
		}

		if(s == 60){
			ms=0;
			s=0;
			s++;
			min++;
		}

		if(min == 60){
			ms=0;
			s=0;
			s++;
			min=0;
			min++;
			hr++;
		}

		if(hr == 24){
			ms=0;
			s=0;
			min=0;
			hr=0;
			alert('Timer stopped at 24th Hour!');
		}

		runValue();

		if(hr==3){
			ringtone.play();
			ringtone.loop = true;
		}

	},100); 

	click++;
  	}
});

	function runValue(){
		const millisec= document.getElementById('ms');
		if(ms < 10){
			millisec.innerText="0"+ms;
		}else{
			millisec.innerText= ms;
		}

		const sec=document.getElementById('seconds');
		if(s < 10){
			sec.innerText= "0"+ s;
		}else{
		sec.innerText= s;
		};

		const minutes=document.getElementById('minutes');
		if(min < 10){
		minutes.innerText= "0"+ min;
		}else{
		minutes.innerText=min;
		};

		const hours=document.getElementById('hours');
		if(hr < 10){
			hours.innerText="0"+hr;
		}else{
			hours.innerText= hr;
		}
		
	}

end.addEventListener('click', () => {
	start.classList.remove('active');
	end.classList.add('endActive');

	click=0;


	clearInterval(startTimer);
	clearInterval(startTimer2);

})

reset.addEventListener('click', () => {
	start.classList.remove('active');
	end.classList.remove('endActive');
	
	click=0;

	clearInterval(startTimer);
	clearInterval(startTimer2);
	

	ms=0;
	s=0;
	min=0;
	hr=0;

	runValue();

	msg.innerText='';
});

let lapcnt=0;

lap.addEventListener('click', () => {
	lapcnt++;
	recordLap();

	ringtone.pause();
});

function recordLap(){
	let hours=document.getElementById('hours').innerText;
	let minutes=document.getElementById('minutes').innerText;
	let seconds=document.getElementById('seconds').innerText;
	let millisec=document.getElementById('ms').innerText;
	let time= hours+":"+minutes+":"+seconds+":"+millisec;
	let div=document.createElement('div');
	let br=document.createElement('br');
	div.innerText="Lap"+lapcnt+": "+time;
	div.id="laptime";
	lapdiv.appendChild(div);
	lapdiv.appendChild(br);
}

clearLap.addEventListener('click', () => {
	lapdiv.innerText='';
	lapcnt=0;

})

lapRingtone.addEventListener('click', () => {

	/* Open when someone clicks on the span element */
		document.getElementById("myNav").style.width = "100%"; 
	
	/* Close when someone clicks on the "x" symbol inside the overlay */

});

function closeNav() {
	document.getElementById("myNav").style.width = "0%";
}



setRingtone.addEventListener('click', (e) => {

			clearInterval(startTimer);
			clearInterval(startTimer2);

			ms=0;
			s=0;
			min=0;
			hr=0;

			runValue();
			msg.innerText='';

			e.preventDefault();
			var d = new Date(); //date and time NOW
			d.getHours(); 
			d.getMinutes();
			d.getSeconds();

			//console.log(d.getMilliseconds());

		let mytimeChosen= setringtoneTime.value;
		let myTime= mytimeChosen.split(":");
		let hrGap;
		let minGap;
		//myTime[0]= chosen hour
		//myTime[1]= chosen minute
		let myHr= parseInt(myTime[0]);
		let myMin= parseInt(myTime[1]);

		//console.log(myHr);

		if(myMin < d.getMinutes()) { //set time < current time

			minGap = (60 - d.getMinutes()) + myMin; //returns number of minutes to ringtone

			myHr= myHr - 1;

		}else{ // set time > current time

			minGap = myMin - d.getMinutes();
		}
		//console.log(minGap);

		if(myHr < d.getHours()) {

			hrGap = (24 - d.getHours()) + myHr;

		}else{ //set hr > curr hr

			hrGap = myHr - d.getHours();
		}

		closeNav();

		minGap= minGap<10? "0"+minGap : minGap;
		hrGap= hrGap<10? "0"+hrGap : hrGap;

		let div2=document.createElement('div');
		div2.innerText="Alarm going off at "+hrGap+":"+minGap+":00:00";
		div2.id='alarmDiv';
		msg.appendChild(div2);

		startTimer2= setInterval(() => {

			ms++;
			
			if(ms == 10){
				ms=0;
				s++;
			}

			if(s == 60){
				ms=0;
				s=0;
				s++;
				min++;
			}

			if(min == 60){
				ms=0;
				s=0;
				s++;
				min=0;
				min++;
				hr++;
			}

			if(hr == 24){
				ms=0;
				s=0;
				min=0;
				hr=0;
				alert('Timer stopped at 24th Hour!');
			}

			runValue();

			if(hr == hrGap && min == minGap){
				if(cnt === 0){
					startRingTone();
					let close=document.createElement('btn');
					close.id='closeBtn';
					close.innerHTML='Stop Alarm';
					console.log(close);
					msg.appendChild(close); 
					cnt=1;

					if(close){
						close.addEventListener('click', () => {
							stopRingTone();
							msg.removeChild(close);
						});
					}
				}
			}
		},100);
	});


	function stopRingTone() {
		ringtone.pause(); 
	}

	function startRingTone() {
		ringtone.play();
	}

	img.addEventListener('click', () =>  {
		if(video.style.display==='block'){
		video.style.display='none';
	}else{
			video.style.display='block';
		}
	})








