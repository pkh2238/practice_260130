class LottoNumber extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');
        const color = this.getAttribute('color');

        const style = document.createElement('style');
        style.textContent = `
            .lotto-number {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: ${color};
                border: 2px solid #ccc;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                font-weight: bold;
                color: white;
            }
        `;

        const div = document.createElement('div');
        div.setAttribute('class', 'lotto-number');
        div.textContent = number;

        shadow.appendChild(style);
        shadow.appendChild(div);
    }
}

customElements.define('lotto-number', LottoNumber);

const generateLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers);
};

const getNumberColor = (number) => {
    if (number <= 10) return '#f2b526'; // Yellow
    if (number <= 20) return '#3498db'; // Blue
    if (number <= 30) return '#e74c3c'; // Red
    if (number <= 40) return '#2ecc71'; // Green
    return '#9b59b6'; // Purple
};

const displayLottoNumbers = () => {
    const container = document.getElementById('lotto-numbers-container');
    container.innerHTML = '';
    const numbers = generateLottoNumbers();
    numbers.forEach(number => {
        const lottoNumberElement = document.createElement('lotto-number');
        lottoNumberElement.setAttribute('number', number);
        lottoNumberElement.setAttribute('color', getNumberColor(number));
        container.appendChild(lottoNumberElement);
    });
};

document.getElementById('generate-button').addEventListener('click', displayLottoNumbers);

displayLottoNumbers();
