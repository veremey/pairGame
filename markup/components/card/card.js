var myCards = document.getElementById('field');
var error = document.getElementById('error');

var resultsArray = [];
var counter = 0;

var Interval ;
var images = [];

var data = {
  'Cristal' : {
    'title': 'Олег Кристал.',
    'desc' : 'Бывший журналист, советник лидера ДПМ Олег Кристал. Владеет телеканалами Canal 2 и Canal 3, которые раньше принадлежали Плахотнюку.'
  },
  'FurculitaCorneliu': {
    'title' : ' Корнелиу Фуркулица. ',
    'desc' : ' Депутат, член исполкома Партии социалистов Корнелиу Фуркулица. Ему принадлежат телеканалы NTV Moldova и ТНТ-Exclusive TV. '
  },
  'morari': {
    'title' : ' Наталья Морарь. ',
    'desc' : ' Телеведущая, председатель НПО Media Alternativa Наталья Морарь. Это НПО — учредитель телеканала TV8. В админсовет Media Alternativa также входят журналисты Мариана Раца, Кристина Гуцу, политолог Игорь Боцан. В ближайшее время в него должны войти юрист Ион Гузун и правозащитница Мариана Калугин. '
  },
  'plaha2': {
    'title' : ' Владимир Плахотнюк. ',
    'desc' : ' Лидер правящей Демпартии Владимир Плахотнюк. Ему принадлежат телеканалы Publika TV и Prime. '
  },
  'sirbu2': {
    'title' : ' Александр Сырбу ',
    'desc' : ' Бизнесмен, бывший владелец кабельного оператора Sun Communications Александр Сырбу. Владеет 80% телеканала N4. Еще по 10% принадлежат его сыну Евгению Сырбу и Андрею Боршевичу. '
  },
  'Vadim-Ciubara': {
    'title' : ' Вадим Чубара. ',
    'desc' : ' Бизнесмен Вадим Чубара. Владеет телеканалом Accent TV. Издание Rise Moldova называло его «теневым» советником президента Игоря Додона. '
  },
  'VGTRK': {
    'title' : ' RTR-Moldova ',
    'desc' : ' У RTR-Moldova несколько владельцев: некоммерческое партнерство «РОСМЕДИАКОМ» (50%), один из учредителей которого ВГТРК, а также молдавская бизнес-леди Валентина Стецко (25%) и компании SB Grup Media (25%). Владельцы последней Галина Сырбу (80%) и Оксана Боршевич (20%).'
  },
  'victor-topa': {
    'title' : ' Виктор Цопа.',
    'desc' : 'Бизнесмен Виктор Цопа. Владелец Jurnal TV. Заочно приговорен в Молдове к 10 годам лишения свободы. Сейчас живет в Германии.'
  }
};


// берем ключ объекта и ставим его в самый конец масива images
for(key in data) {;
  images.push(key);
}

var clone = images.slice(0); // duplicate array
var cards = images.concat(clone); // merge to arrays

// Shufffel function
function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],   o[i] = o[j], o[j] = x);
  return o;
}
shuffle(cards);

for (var i = 0; i < cards.length; i++) {
	var cardContent = '<div class="card__item"><div class="front"></div><div class="back"><img src="static/img/content/'+cards[i]+'.jpg"> </></div></div>';
  card = document.createElement('div');
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  card.classList.add("card");
  card.innerHTML = cardContent;
  myCards.appendChild(card);

  card.onclick = function (e) {

    if (this.className != 'card flipped' && this.className != 'card correct'){
        this.className = 'card flipped';
        var result = this.dataset.item;
        resultsArray.push(result);
        clearInterval(dontClick);
    }

    if (resultsArray.length > 1) {
    	var cards = document.getElementsByClassName('card');
    	for (var i = cards.length - 1; i >= 0; i--) {
    		cards[i].classList.add('dontClick');
    	}
    	var dontClick =  setTimeout( function () {
    		for (var i = cards.length - 1; i >= 0; i--) {
    			cards[i].classList.remove('dontClick');
    		}
    	}, 600);


      if (resultsArray[0] === resultsArray[1]) {
        check("card correct");
        show(resultsArray[0]);

        win();
        resultsArray = [];
      } else {
        check("card reverse");
        resultsArray = [];
        var count = ++counter ;
        var clicks = document.getElementById('counter');
        // clicks.innerHTML = count;
      }

    }

  }

};


var check = function(className) {
  var x = document.getElementsByClassName("flipped");

  setTimeout(function() {
    for(var i = (x.length - 1); i >= 0; i--) {
      x[i].className = className;
    }
  },500);

}

var show = function(dataItem) {
	var card;
	var profile = document.getElementById('profile');

	var cardContent = '<div class="profile__pic"><img class="profile__img"  src="static/img/content/'+dataItem+'.jpg" > </></div><div class="profile__info"><h3 class="profile__title">'+ data[dataItem].title +'</h3><p class="profile__desc"> '+ data[dataItem].desc +'  </p></div><div class="center"><button class="btn js-close">ДАЛЕЕ</button></div>';

	card = document.createElement('div');
  card.classList.add('profile');
	card.innerHTML = cardContent;
	profile.appendChild(card);
	profile.classList.add("active");

	var closeBtn = document.querySelector('.js-close');

	closeBtn.onclick = function () {
		profile.innerHTML = '';
		profile.classList.remove('active');
    win();
	}

}

var winText = '<div class="win"><div class="win__wrap"><h3 class="win__title">Поздравляем!</h3><p class="win__desc"> Теперь вы знаете всех основных владельцев молдавских телеканалов.Ну или почти всех. Например, телеканалом Pro TV владеет офшорная компания CME Media Enterprises, 75% которой принадлежит американскому медиаконгломерату AT&amp;T, а остальные акции находятся на бирже и их владельцы могут постоянно меняться.</p><p class="win__desc">Ну, и, наверное, все знают, что телеканалы Moldova 1 и Moldova 2 — общественные и финансируются из денег налогоплательщиков.</p></div></div>'


var win = function () {
  var field = document.getElementById('field');
  var layout = document.getElementById('layout');

  var allCards = document.getElementsByClassName('card').length;
  var allReversedCards = document.getElementsByClassName('correct').length;

  if(allCards === allReversedCards) {
    clearInterval(Interval);
    layout.innerHTML = winText;

  }

}
