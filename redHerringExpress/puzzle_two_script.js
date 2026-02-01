const form = document.getElementById('numberForm');
const submitBtn = document.getElementById('submitBtn');
const resultMessage = document.getElementById('resultMessage');
const numberInput = document.getElementById('numberInput');

// Correct answer (you can change this to whatever number you want)
const correctAnswer = 693;

// Hide result message when input changes
numberInput.addEventListener('input', () => {
    resultMessage.classList.add('hidden');
});

// Form submission logic
form.addEventListener('submit', e => {
    e.preventDefault();
    const userAnswer = parseInt(numberInput.value);

    if (isNaN(userAnswer) || numberInput.value === '') {
        resultMessage.classList.remove('hidden');
        resultMessage.textContent = 'Please enter a valid number.';
        resultMessage.style.color = 'red';
        return;
    }

    if (userAnswer === correctAnswer) {
        // Hide any existing error messages before redirecting
        resultMessage.classList.add('hidden');
        window.location.href = 'puzzle_two_success.html';
    } else {
        resultMessage.classList.remove('hidden');
        resultMessage.textContent = `Nope, that didn't work. Try again!`;
        resultMessage.style.color = 'red';
    }
});

// Hint section toggle
document.querySelector('.hint-toggle').addEventListener('click', () => {
    document.querySelector('.hint-content').classList.toggle('hidden');
});

// Individual hint toggles
document.querySelectorAll('.single-hint-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const hintDiv = button.nextElementSibling;
        hintDiv.classList.toggle('hidden');
    });
});