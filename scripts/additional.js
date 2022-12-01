/* Функция возвращает переданное количество amount
случайных чисел из диапазона от 0 до total */
const getMultipleRandomOnce = (total, amount) => {
	const nums = []

	return () => {
		let num = null
		for (let i = 0; i < amount; i++) {
			do {
				num = Math.floor(Math.random() * total)
			} while (nums.includes(num))

			nums.push(num)
		}
		return nums
	}
}

// Функция перемешивает переданный массив.
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)) // случайный индекс от 0 до i
		;[array[i], array[j]] = [array[j], array[i]]
	}
}
