# node-dlp-sentiment

Система определение эмоциональной тональности

Установка:

`npm install node-dlp-sentiment`

Использование:

~~~
сonst sentiment = require('node-dlp-sentiment');

let message = 'Чуть не кончил пока держал руки под горячей водой:D';

sentiment({phrase: message, lang:'ru'} , (err, result) => {
	console.log(message + ' - ' +
		' score=' + result.score +
		' comparative=' + result.comparative +
		' positive=' + result.positive +
		' negative=' + result.negative);
	done();
});
~~~



### Поддерживаемые OS
* Window 7-..., 2008-...
* Linux
* MacOS

### Поддерживаемые языки
* Русский
* Английский
* *Планируется: Немецкий, Французский, Итальянский*

