const table = document.querySelector('table')

const state = {}
state.wordNums = []
state.isEnglishWordChosen = false
state.numEnglishWord = null
state.numRussianWord = null

// Функция возвращает количество слов для тренировки.
const getWordCount = () => {
	document.body.innerHTML =
		'<span style="padding: 20px;">Choose the number of words to practice:</span>'

	const divElement = document.createElement('div')
	divElement.classList.add('buttons')

	for (let i = 2; i <= 4; i++) {
		const buttonElement = document.createElement('button')
		const captionElement = document.createElement('span')
		buttonElement.append(captionElement)
		captionElement.textContent = i * 4 + 2
		const effectElement = document.createElement('div')
		buttonElement.append(effectElement)

		divElement.append(buttonElement)
	}

	document.body.append(divElement)

	const buttonElements = document.querySelectorAll('button')
	buttonElements.forEach(button => {
		button.addEventListener('click', () => {
			getWordTable(button.innerText)
			button.removeEventListener('click', () => {})
		})
	})
}

// Функция очищает и заполняет таблицу слов.
const getWordTable = amount => {
	document.body.innerText = ''
	const tableElement = document.createElement('table')
	document.body.append(tableElement)

	// Выбор слов для тренировки.
	state.wordNums = getMultipleRandomOnce(words.length, amount)()

	const englishWords = []
	const russianWords = []

	for (let i = 0; i < state.wordNums.length; i++) {
		englishWords.push([words[state.wordNums[i]][0], i])
		russianWords.push([words[state.wordNums[i]][1], i])
	}

	shuffle(russianWords)

	for (let i = 0; i < state.wordNums.length; i++) {
		const rowElement = document.createElement('tr')

		const cellElementLeft = document.createElement('td')
		cellElementLeft.textContent = englishWords[i][0]
		cellElementLeft.dataset.numEng = englishWords[i][1]

		rowElement.append(cellElementLeft)

		const cellElementRight = document.createElement('td')
		cellElementRight.textContent = russianWords[i][0]
		cellElementRight.dataset.numRus = russianWords[i][1]

		rowElement.append(cellElementRight)
		tableElement.append(rowElement)
	}

	// Обработчик клика по таблице.
	tableElement.addEventListener('click', event => {
		if (event.target.tagName === 'TD') {
			// console.log('event.target: ', event)
			if (
				state.isEnglishWordChosen === true &&
				event.target.hasAttribute('data-num-eng')
			) {
				const engWordItem = document.querySelector('.text-blinked')
				engWordItem.classList.remove('text-blinked')
				state.isEnglishWordChosen = false

				return
			}

			if (
				state.isEnglishWordChosen === false &&
				event.target.hasAttribute('data-num-eng')
			) {
				event.target.classList.add('text-blinked')

				state.isEnglishWordChosen = true
				state.numEnglishWord = event.target.dataset.numEng
			} else if (event.target.hasAttribute('data-num-rus')) {
				state.numRussianWord = event.target.dataset.numRus

				if (state.numEnglishWord === state.numRussianWord) {
					// console.log('=')
					const engWordItem = document.querySelector('.text-blinked')
					const rusWordItem = event.target

					engWordItem.classList.remove('text-blinked')

					engWordItem.classList.add('text-hidden')
					// document.querySelector('[dataset=state.numEnglishWord]')
					// console.log(document.getElementsByClassName('text-blinked'))
					rusWordItem.classList.add('text-hidden')

					state.isEnglishWordChosen = false
					state.numEnglishWord = null
					state.numRussianWord = null

					// Количество скрытых английских слов.
					const hiddenEngWords =
						+document.getElementsByClassName('text-hidden').length /
						2
					// Если скрыли все слова:
					if (hiddenEngWords === +amount) {
						document.body.innerText = 'Well done!'
						const buttonElement = document.createElement('button')
						buttonElement.classList.add('button--new')

						const captionElement = document.createElement('span')
						buttonElement.append(captionElement)
						captionElement.textContent = 'Train again'
						const effectElement = document.createElement('div')
						buttonElement.append(effectElement)

						document.body.append(buttonElement)

						// Выбор следующей тренировки.
						document.body
							.getElementsByTagName('button')[0]
							.addEventListener('click', getWordCount)
					}
				}
			} else if (event.target.hasAttribute('data-num-eng')) {
				state.isEnglishWordChosen = false
				state.numEnglishWord = null
				state.numRussianWord = null
			}
		}
	})
}

getWordCount()
