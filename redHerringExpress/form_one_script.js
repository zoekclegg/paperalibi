const form = document.getElementById('cabinForm');
const submitBtn = document.getElementById('submitBtn');
const resultMessage = document.getElementById('resultMessage');
const dropdownContainer = document.getElementById('dropdownContainer');
const cabinList = document.querySelector('.cabin-list');

// Passenger names
const passengers = [
    'Eddie Strong',
    'Nick Henry',
    'Jasmine Myers',
    'Melanie Walters',
    'Keith Roman',
    'Robyn Hutley'
];

// Generate dropdowns dynamically
for (let i = 1; i <= 6; i++) {
    const label = document.createElement('label');
    label.textContent = `Cabin ${i}`;
    label.htmlFor = `cabin${i}`;

    const select = document.createElement('select');
    select.id = `cabin${i}`;
    select.name = `cabin${i}`;

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select passenger';
    select.appendChild(placeholder);

    passengers.forEach(passenger => {
        const opt = document.createElement('option');
        opt.value = passenger;
        opt.textContent = passenger;
        select.appendChild(opt);
    });

    dropdownContainer.appendChild(label);
    dropdownContainer.appendChild(select);

    // Add event listener to hide result message when dropdown changes
    select.addEventListener('change', () => {
        resultMessage.classList.add('hidden');
    });
}

// Form submission logic
form.addEventListener('submit', e => {
    e.preventDefault();
    let correctCount = 0;
    let allFilled = true;

    // Define correct cabin assignments (you can modify these as needed)
    const correctAnswers = [
        'Nick Henry',
        'Melanie Walters',
        'Robyn Hutley',
        'Eddie Strong',
        'Keith Roman',
        'Jasmine Myers',
    ];

    for (let i = 1; i <= 6; i++) {
        const val = document.getElementById(`cabin${i}`).value;
        if (val === '') allFilled = false;
        if (val === correctAnswers[i - 1]) correctCount++;
    }

    if (!allFilled) {
        resultMessage.classList.remove('hidden');
        resultMessage.textContent = 'Please make a selection for every cabin.';
        resultMessage.style.color = 'red';
        return;
    }

    if (correctCount === 6) {
        // Hide any existing error messages before redirecting
        resultMessage.classList.add('hidden');
        window.location.href = 'form_one_success.html';
    } else if (correctCount === 0) {
        resultMessage.classList.remove('hidden');
        resultMessage.textContent = "I'm afraid none of the passengers are correct. Try again!";
        resultMessage.style.color = 'red';
    } else {
        resultMessage.classList.remove('hidden');
        resultMessage.textContent = `That's not quite right. Only ${correctCount} out of 6 passengers are correct.`;
        resultMessage.style.color = 'red';
    }
});

// Hint section toggle
document.querySelector('.hint-toggle').addEventListener('click', () => {
    document.querySelector('.hint-content').classList.toggle('hidden');
});

// Embedded hints object
const hints = {
    "To-do list": [
        "Do you notice anything odd about the to-do list?",
        "One of the items has been listed twice.",
        "Is there a placename in the Guide that sounds similar?"
    ],
    "Postcard": [
        "Do any of the words in the message stand out to you?",
        "The name of the recipient might help figure out which words to focus on.",
        "What's missing from some of the words?"
    ],
    "Train ticket": [
        "Does anything indicate where the train was at a particular moment?",
        "A timeline of the train's journey could be useful.",
        "Take a look at some of the other documents for clues about timing."
    ],
    "Witness statement": [
        "What had the witness been doing before they boarded the train?",
        "Does the Guide help narrow down where they might have been?",
        "Are you sure the train could have feasibly travelled to all of those stations?"
    ],
    "Café receipt": [
        "Does anything seem off about the items ordered?",
        "The pricing seems a bit odd, doesn't it? £9 for a fruit salad! That's expensive.",
        "The name of the café might suggest what to do with the items and their prices."
    ],
    "Social media post": [
        "Where was the photo taken?",
        "What was Jasmine taking a break from?",
        "Are there any places in the Guide that might match her location?"
    ]
};

// Build hint UI dynamically
Object.keys(hints).forEach(cabinName => {
    const li = document.createElement('li');

    const cabinBtn = document.createElement('button');
    cabinBtn.textContent = cabinName;
    cabinBtn.type = 'button';
    cabinBtn.classList.add('cabin-toggle');

    const cabinHints = document.createElement('div');
    cabinHints.classList.add('cabin-hints', 'hidden');

    hints[cabinName].forEach((hintText, idx) => {
        const hintBtn = document.createElement('button');
        hintBtn.textContent = `Hint ${idx + 1}`;
        hintBtn.type = 'button';
        hintBtn.classList.add('single-hint-toggle');

        const hintDiv = document.createElement('div');
        hintDiv.classList.add('single-hint', 'hidden');
        hintDiv.textContent = hintText;

        hintBtn.addEventListener('click', () => {
            hintDiv.classList.toggle('hidden');
        });

        cabinHints.appendChild(hintBtn);
        cabinHints.appendChild(hintDiv);
    });

    cabinBtn.addEventListener('click', () => {
        cabinHints.classList.toggle('hidden');
    });

    li.appendChild(cabinBtn);
    li.appendChild(cabinHints);
    cabinList.appendChild(li);
});
