const form = document.getElementById('numberForm');
const submitBtn = document.getElementById('submitBtn');
const resultMessage = document.getElementById('resultMessage');
const numberInput = document.getElementById('numberInput');

// Correct answers (accepting both with and without space)
const correctAnswers = ['scott blackwood', 'scottblackwood'];

// Hide result message when input changes
numberInput.addEventListener('input', () => {
    resultMessage.classList.add('hidden');
});

// Form submission logic
form.addEventListener('submit', e => {
    e.preventDefault();
    const userAnswer = numberInput.value.trim().toLowerCase();

    if (userAnswer === '') {
        resultMessage.classList.remove('hidden');
        resultMessage.textContent = 'Please enter a name.';
        resultMessage.style.color = 'red';
        return;
    }

    if (correctAnswers.includes(userAnswer)) {
        // Hide any existing error messages before redirecting
        resultMessage.classList.add('hidden');
        window.location.href = 'form_four_success.html'
    } else {
        resultMessage.classList.remove('hidden');
        resultMessage.textContent = `That's not quite right. Try again!`;
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