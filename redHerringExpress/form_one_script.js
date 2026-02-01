const form = document.getElementById('cabinForm');
const submitBtn = document.getElementById('submitBtn');
const resultMessage = document.getElementById('resultMessage');
const dropdownContainer = document.getElementById('dropdownContainer');
const cabinList = document.querySelector('.cabin-list');

// Passenger names
const passengers = [
    'Carlos Roman',
    'Eddie Strong',
    'Jasmine Myers',
    'Melanie Walters',
    'Nick Henry',
    'Robyn Hutley'
];

// Boarding stations
const stations = [
    'Airdale',
    'Brockleigh',
    'Haddington',
    'Hampton Vale',
    'Highmarsh',
    'Juniper Yard',
    'Lansmere',
    'Maple Bridge',
    'Millridge Row',
    'Queensacre',
    'St Martin\'s',
    'Uppermill',
    'Zebworth'
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

    // Add boarding station dropdown (without label)
    const stationSelect = document.createElement('select');
    stationSelect.id = `station${i}`;
    stationSelect.name = `station${i}`;
    stationSelect.style.marginTop = '5px';

    const stationPlaceholder = document.createElement('option');
    stationPlaceholder.value = '';
    stationPlaceholder.textContent = 'Select boarding station';
    stationSelect.appendChild(stationPlaceholder);

    stations.forEach(station => {
        const opt = document.createElement('option');
        opt.value = station;
        opt.textContent = station;
        stationSelect.appendChild(opt);
    });

    dropdownContainer.appendChild(stationSelect);

    // Add event listener to hide result message when dropdown changes
    select.addEventListener('change', () => {
        resultMessage.classList.add('hidden');
    });

    stationSelect.addEventListener('change', () => {
        resultMessage.classList.add('hidden');
    });
}

// Form submission logic
form.addEventListener('submit', e => {
    e.preventDefault();
    let correctCount = 0;
    let allFilled = true;

    // Define correct cabin assignments with boarding stations
    const correctAnswers = [
        { passenger: 'Nick Henry', station: 'Queensacre' },
        { passenger: 'Melanie Walters', station: 'Millridge Row' },
        { passenger: 'Robyn Hutley', station: 'Zebworth' },
        { passenger: 'Eddie Strong', station: 'Juniper Yard' },
        { passenger: 'Carlos Roman', station: 'Airdale' },
        { passenger: 'Jasmine Myers', station: 'Maple Bridge' }
    ];

    for (let i = 1; i <= 6; i++) {
        const passengerVal = document.getElementById(`cabin${i}`).value;
        const stationVal = document.getElementById(`station${i}`).value;
        if (passengerVal === '' || stationVal === '') allFilled = false;
        if (passengerVal === correctAnswers[i - 1].passenger && stationVal === correctAnswers[i - 1].station) {
            correctCount++;
        }
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
        resultMessage.textContent = "I'm afraid none of the cabins have the correct passenger and station.";
        resultMessage.style.color = 'red';
    } else if (correctCount === 1) {
        resultMessage.classList.remove('hidden');
        resultMessage.textContent = "Not quite. Only 1 of the cabins has the correct passenger and station.";
        resultMessage.style.color = 'red';
    } else {
        resultMessage.classList.remove('hidden');
        resultMessage.textContent = `Not quite. Only ${correctCount} of the cabins have the correct passenger and station.`;
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
        "Despite Nick's note, he has ended up packing an item twice. We need to connect these two pairs of socks to a location somehow.",
        "Nick also packed a travel guide, so perhaps that can help us find a location related to socks.",
        "Is there a placename in the travel guide that sounds similar to two socks?",
        "Tusox Castle is located in Queensacre. That is where Nick must have boarded the train."
    ],
    "Train ticket": [
        "There's blood - or something - covering up the departure station. But there's another piece of information on the ticket that might help.",
        "It will be useful to construct a partial timeline of the train's journey. You'll need to look at some of the other documents to do this.",
        "Mel's postcard and Eddie's witness statement both tell us when they boarded the train. You'll need to work out their stations first in order to deduce Mel's.",
        "Using the map, Robyn could only have boarded at Zebworth."
    ],
    "Postcard": [
        "Do any words stand out to you? The name of the recipient might help figure out which words to focus on.",
        "Some words are misspelt. What are they and what letters are missing?",
        "'Swiming', 'foward' and 'suprise' all have missing letters. Knowing the missing letters should help us find a location.",
        "The missing letters are 'MRR', which is the station code for Millridge Row. That's where Melanie boarded the train."
    ],
    "Social media post": [
        "Where was the photo taken?",
        "The post has a location tag for EVC. Does Jasmine's post suggest what kind of place this is?",
        "Take a look at the guide to see if you can find EVC.",
        "EVC are the initials for East Valley College in Maple Bridge, where Jasmine is studying."
    ],
    "Café receipt": [
        "The pricing seems a bit odd, doesn't it? £10 for a hot chocolate! That's expensive.",
        "The name of the café and the note at the bottom might suggest what to do with the items and their prices.",
        "Look at each item and it's price. How might we use these to construct the name of the location?",
        "Using each item's price as the index, take the corresponding letter from each item's name. For example, the 2nd letter of 'Bacon' is 'A'. Putting all the letters together spells out 'Airdale', which is where Carlos boarded."
    ],
    "Witness statement": [
        "What had Eddie done before he boarded the train?",
        "Eddie came straight from the airport. The travel guide can help narrow down which stations have airports.",
        "Both Juniper Yard and St Martin's have airports. You'll need to work out some of the other passenger's boarding stations to figure out which one Eddie used.",
        "The train can't travel through any station twice, so based on the other passenger's boarding stations, Eddie boarded at Juniper Yard."
    ],
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
        const isSolution = idx === hints[cabinName].length - 1;
        hintBtn.textContent = isSolution ? 'Solution' : `Hint ${idx + 1}`;
        hintBtn.type = 'button';
        hintBtn.classList.add('single-hint-toggle');
        if (isSolution) {
            hintBtn.classList.add('solution-toggle');
        }

        const hintDiv = document.createElement('div');
        hintDiv.classList.add('single-hint', 'hidden');
        if (isSolution) {
            hintDiv.classList.add('solution-hint');
        }
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

// Add final solution section
const finalSolutionLi = document.createElement('li');

const finalSolutionBtn = document.createElement('button');
finalSolutionBtn.textContent = 'Solution';
finalSolutionBtn.type = 'button';
finalSolutionBtn.classList.add('cabin-toggle', 'final-solution-toggle');

const finalSolutionContainer = document.createElement('div');
finalSolutionContainer.classList.add('cabin-hints', 'hidden');

const areYouSureBtn = document.createElement('button');
areYouSureBtn.textContent = 'Are you sure you want to see the final solution?';
areYouSureBtn.type = 'button';
areYouSureBtn.classList.add('single-hint-toggle');

const solutionText = document.createElement('div');
solutionText.classList.add('single-hint', 'hidden');

const solutionList = document.createElement('ul');
solutionList.innerHTML = `
    <li>Cabin 1: Nick Henry - Queensacre</li>
    <li>Cabin 2: Melanie Walters - Millridge Row</li>
    <li>Cabin 3: Robyn Hutley - Zebworth</li>
    <li>Cabin 4: Eddie Strong - Juniper Yard</li>
    <li>Cabin 5: Carlos Roman - Airdale</li>
    <li>Cabin 6: Jasmine Myers - Maple Bridge</li>
`;
solutionText.appendChild(solutionList);

areYouSureBtn.addEventListener('click', () => {
    solutionText.classList.toggle('hidden');
});

finalSolutionContainer.appendChild(areYouSureBtn);
finalSolutionContainer.appendChild(solutionText);

finalSolutionBtn.addEventListener('click', () => {
    finalSolutionContainer.classList.toggle('hidden');
});

finalSolutionLi.appendChild(finalSolutionBtn);
finalSolutionLi.appendChild(finalSolutionContainer);
cabinList.appendChild(finalSolutionLi);
