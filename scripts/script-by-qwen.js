scripts/script.js
const table = document.querySelector('table')

const state = {
    wordNums: [],
    isEnglishWordChosen: false,
    numEnglishWord: null,
    numRussianWord: null
}

// Функция возвращает количество слов для тренировки.
const getWordCount = () => {
    const bodyElement = document.body;
    bodyElement.innerHTML = `
        <span style="padding: 20px;">Choose the number of words to practice:</span>
        <div class="buttons"></div>
    `;

    const buttonsDiv = bodyElement.querySelector('.buttons');
    for (let i = 2; i <= 4; i++) {
        createButton(buttonsDiv, i * 4 + 2);
    }

    const buttonElements = document.querySelectorAll('button');
    buttonElements.forEach(button => {
        button.addEventListener('click', () => {
            getWordTable(button.innerText);
            button.removeEventListener('click', () => {});
        });
    });
}

// Функция для создания кнопок.
const createButton = (parent, text) => {
    const buttonElement = document.createElement('button');
    const captionElement = document.createElement('span');
    buttonElement.append(captionElement);
    captionElement.textContent = text;
    const effectElement = document.createElement('div');
    buttonElement.append(effectElement);

    parent.append(buttonElement);
}

// Функция очищает и заполняет таблицу слов.
const getWordTable = (amount) => {
    const bodyElement = document.body;
    bodyElement.innerHTML = '';
    const tableElement = document.createElement('table');
    bodyElement.append(tableElement);

    // Выбор слов для тренировки.
    state.wordNums = getMultipleRandomOnce(words.length, amount)();

    const englishWords = [];
    const russianWords = [];

    for (let i = 0; i < state.wordNums.length; i++) {
        englishWords.push([words[state.wordNums[i]][0], i]);
        russianWords.push([words[state.wordNums[i]][1], i]);
    }

    shuffle(russianWords);

    for (let i = 0; i < state.wordNums.length; i++) {
        const rowElement = document.createElement('tr');

        const cellElementLeft = document.createElement('td');
        cellElementLeft.textContent = englishWords[i][0];
        cellElementLeft.dataset.numEng = englishWords[i][1];

        rowElement.append(cellElementLeft);

        const cellElementRight = document.createElement('td');
        cellElementRight.textContent = russianWords[i][0];
        cellElementRight.dataset.numRus = russianWords[i][1];

        rowElement.append(cellElementRight);
        tableElement.append(rowElement);
    }

    // Обработчик клика по таблице.
    tableElement.addEventListener('click', event => {
        if (event.target.tagName === 'TD') {
            handleCellClick(event.target);
        }
    });
}

// Функция для обработки клика по ячейке.
const handleCellClick = (target) => {
    const bodyElement = document.body;
    const tableElement = document.querySelector('table');

    if (state.isEnglishWordChosen === true && target.hasAttribute('data-num-eng')) {
        const engWordItem = document.querySelector('.text-blinked');
        if (engWordItem === target) {
            engWordItem.classList.remove('text-blinked');
            state.isEnglishWordChosen = false;
        }
    } else if (
        state.isEnglishWordChosen === false &&
        target.hasAttribute('data-num-eng')
    ) {
        target.classList.add('text-blinked');
        state.isEnglishWordChosen = true;
        state.numEnglishWord = target.dataset.numEng;
    } else if (target.hasAttribute('data-num-rus')) {
        state.numRussianWord = target.dataset.numRus;

        if (state.numEnglishWord === state.numRussianWord) {
            const engWordItem = document.querySelector('.text-blinked');
            const rusWordItem = target;
            engWordItem.classList.remove('text-blinked');
            engWordItem.classList.add('text-hidden');
            rusWordItem.classList.add('text-hidden');

            state.isEnglishWordChosen = false;
            state.numEnglishWord = null;
            state.numRussianWord = null;

            const hiddenEngWords = +document.getElementsByClassName('text-hidden').length / 2;
            if (hiddenEngWords === +amount) {
                bodyElement.innerHTML = 'Well done!';
                createButton(bodyElement, 'Train again');

                document.body.querySelector('.button--new').addEventListener('click', getWordCount);
            }
        } else {
            const engWordItem = document.querySelector('.text-blinked');
            engWordItem.classList.remove('text-blinked');

            state.isEnglishWordChosen = false;
            state.numEnglishWord = null;
            state.numRussianWord = null;
        }
    } else if (target.hasAttribute('data-num-eng')) {
        state.isEnglishWordChosen = false;
        state.numEnglishWord = null;
        state.numRussianWord = null;
    }
}

getWordCount();