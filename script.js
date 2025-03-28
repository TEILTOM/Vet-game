const animalImageElement = document.getElementById('animal-image');
const symptomElement = document.getElementById('symptom');
const procedureButtonsElement = document.getElementById('procedure-buttons');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const moneyElement = document.getElementById('money');
const currentBadgeElement = document.getElementById('current-badge');
const earnedBadgesContainer = document.getElementById('earned-badges');
const vetTierElement = document.getElementById('vet-tier');
const tierUpPopup = document.getElementById('tier-up-popup');
const tierUpMessageTitle = document.getElementById('tier-up-message-title');
const tierUpMessage = document.getElementById('tier-up-message');
const animalFactsElement = document.getElementById('animal-facts');

const supplyMedicineElement = document.getElementById('supply-medicine');
const supplyBandageElement = document.getElementById('supply-bandage');
const supplyAntisepticElement = document.getElementById('supply-antiseptic');
const supplyThermometerElement = document.getElementById('supply-thermometer');
const supplyStethoscopeElement = document.getElementById('supply-stethoscope');
const supplyFleaTreatmentElement = document.getElementById('supply-flea-treatment');
const supplySpecialFoodElement = document.getElementById('supply-special-food');

const buyMedicineButton = document.getElementById('buy-medicine');
const buyBandageButton = document.getElementById('buy-bandage');
const buyAntisepticButton = document.getElementById('buy-antiseptic');
const buyThermometerButton = document.getElementById('buy-thermometer');
const buyStethoscopeButton = document.getElementById('buy-stethoscope');
const buyFleaTreatmentButton = document.getElementById('buy-flea-treatment');
const buySpecialFoodButton = document.getElementById('buy-special-food');

let currentPatientIndex = -1;
let score = 0;
let money = 0;
let currentTierIndex = 0;
const vetTiers = ['Veterinary Nurse', 'Junior Vet', 'Vet', 'Senior Vet', 'Zoologist'];
let treatedInCurrentTier = 0;
const treatmentsNeededPerTier = 3;

const animalsData = [
    { name: 'Buddy', species: 'Dog', image: 'dog.png', happyImage: 'dog_happy.png', symptoms: ['Coughing'], simpleSymptom: 'Is coughing a lot', correctProcedure: 'Listen to heartbeat', treated: false, tier: 0, 
      backstory: 'Buddy got caught in a rainstorm while chasing squirrels and caught a cold!', 
      facts: ['Dogs have a sense of time and can predict routines.', 'They can hear sounds four times farther away than humans.', 'A dog’s nose print is as unique as a human fingerprint.'] },
    { name: 'Whiskers', species: 'Cat', image: 'cat.png', happyImage: 'cat_happy.png', symptoms: ['Scratching excessively'], simpleSymptom: 'Is scratching a lot', correctProcedure: 'Check for fleas', treated: false, tier: 0, 
      backstory: 'Whiskers explored an old barn and picked up some itchy visitors!', 
      facts: ['Cats sleep for 12-16 hours a day.', 'They have five toes on front paws but four on back.', 'A group of cats is called a clowder.'] },
    { name: 'Pip', species: 'Hamster', image: 'hamster.png', happyImage: 'hamster_happy.png', symptoms: ['Lethargy'], simpleSymptom: 'Feels very sleepy and slow', correctProcedure: 'Take temperature', treated: false, tier: 0, 
      backstory: 'Pip stayed up too late running on his wheel and now feels under the weather!', 
      facts: ['Hamsters can store food in their cheeks.', 'They are nocturnal and love to burrow.', 'Their teeth never stop growing.'] },
    { name: 'Polly', species: 'Parrot', image: 'parrot.png', happyImage: 'parrot_happy.png', symptoms: ['Runny nose', 'Sneezing'], simpleSymptom: 'Has a runny nose and is sneezing', correctProcedure: 'Give medicine', treated: false, tier: 1, 
      backstory: 'Polly flew through a dusty attic and caught a little birdie cold!', 
      facts: ['Parrots can mimic human speech.', 'Some live over 50 years.', 'They use their feet like hands to eat.'] },
    { name: 'Barnaby', species: 'Rabbit', image: 'rabbit.png', happyImage: 'rabbit_happy.png', symptoms: ['Limping'], simpleSymptom: 'Is hopping funny on one leg', correctProcedure: 'Put on a bandage', treated: false, tier: 1, 
      backstory: 'Barnaby hopped too hard chasing carrots and twisted a paw!', 
      facts: ['Rabbits can jump up to 3 feet high.', 'Their ears help regulate body temperature.', 'They eat their own poop to digest food twice.'] },
    { name: 'Sheldon', species: 'Tortoise', image: 'turtle.png', happyImage: 'turtle_happy.png', symptoms: ['Loss of appetite'], simpleSymptom: 'Doesn\'t want to eat', correctProcedure: 'Give special food', treated: false, tier: 1, 
      backstory: 'Sheldon ate some weird weeds in the garden and lost his appetite!', 
      facts: ['Tortoises can live over 100 years.', 'They can retract their heads into their shells.', 'Some species hibernate in winter.'] },
    { name: 'Bella', species: 'Dog', image: 'dog2.png', happyImage: 'dog2_happy.png', symptoms: ['Vomiting', 'Diarrhea'], simpleSymptom: 'Has thrown up and has a poorly tummy', correctProcedure: 'Give medicine for stomach upset', treated: false, tier: 2, 
      backstory: 'Bella snuck into the trash and ate something she shouldn’t have!', 
      facts: ['Dogs dream, especially when they’re puppies.', 'They sweat through their paws.', 'There are over 340 dog breeds worldwide.'] },
    { name: 'Oliver', species: 'Cat', image: 'cat2.png', happyImage: 'cat_happy.png', symptoms: ['Watery eyes', 'Loss of energy'], simpleSymptom: 'Has watery eyes and seems tired', correctProcedure: 'Check for infection', treated: false, tier: 2, 
      backstory: 'Oliver napped in a dusty windowsill and woke up feeling yucky!', 
      facts: ['Cats can jump up to 6 times their body length.', 'They purr to self-soothe.', 'Their whiskers help them navigate in the dark.'] },
    { name: 'Nibbles', species: 'Guinea Pig', image: 'guineapig.png', happyImage: 'guineapig_happy.png', symptoms: ['Swollen paw', 'Whimpering'], simpleSymptom: 'Has a puffy paw and is making little noises', correctProcedure: 'Check for injury', treated: false, tier: 2, 
      backstory: 'Nibbles got his paw stuck in his cage while reaching for a treat!', 
      facts: ['Guinea pigs need vitamin C from their diet.', 'They communicate with squeaks and purrs.', 'They’re social and love company.'] },
    { name: 'Rio', species: 'Macaw', image: 'macaw.png', happyImage: 'macaw_happy.png', symptoms: ['Difficulty breathing', 'Tail bobbing'], simpleSymptom: 'Is having trouble breathing and their tail is moving with each breath', correctProcedure: 'Check for respiratory infection', treated: false, tier: 3, 
      backstory: 'Rio flew through a smoky jungle and caught a cough!', 
      facts: ['Macaws have strong beaks to crack nuts.', 'They can fly up to 15 miles per day.', 'Their bright colors help them blend into rainforests.'] },
    { name: 'Daisy', species: 'Ferret', image: 'ferret.png', happyImage: 'ferret_happy.png', symptoms: ['Sneezing', 'Nasal discharge'], simpleSymptom: 'Is sneezing a lot with stuff coming out of their nose', correctProcedure: 'Give antibiotics', treated: false, tier: 3, 
      backstory: 'Daisy dug into a dusty burrow and caught a sniffle!', 
      facts: ['Ferrets sleep 14-18 hours a day.', 'They’re related to weasels and otters.', 'They love to stash shiny objects.'] },
    { name: 'Franklin', species: 'Iguana', image: 'iguana.png', happyImage: 'iguana_happy.png', symptoms: ['Skin rash', 'Lethargy'], simpleSymptom: 'Has a red bumpy patch and is very sleepy', correctProcedure: 'Check for fungal infection', treated: false, tier: 3, 
      backstory: 'Franklin basked on a moldy log and got an itchy rash!', 
      facts: ['Iguanas can drop their tails to escape predators.', 'They’re great swimmers.', 'They change color slightly with mood or temperature.'] },
    { name: 'Lucy', species: 'Dog', image: 'dog3.png', happyImage: 'dog3_happy.png', symptoms: ['Increased thirst', 'Frequent urination'], simpleSymptom: 'Is drinking lots and lots of water and needs to pee often', correctProcedure: 'Check blood sugar levels', treated: false, tier: 4, 
      backstory: 'Lucy drank from a sugary puddle and now feels off!', 
      facts: ['Dogs can detect some diseases in humans.', 'Their sense of smell is 10,000 times better than ours.', 'They wag tails to show emotions.'] },
    { name: 'Jasper', species: 'Cat', image: 'cat3.png', happyImage: 'cat3_happy.png', symptoms: ['Hiding', 'Weight loss'], simpleSymptom: 'Is hiding and has become very thin', correctProcedure: 'Run blood tests', treated: false, tier: 4, 
      backstory: 'Jasper got spooked by a loud noise and hasn’t been eating well!', 
      facts: ['Cats have 230 bones, more than humans.', 'They can rotate their ears 180 degrees.', 'They mark territory with scent glands.'] },
    { name: 'Peanut', species: 'Mouse', image: 'mouse.png', happyImage: 'mouse_happy.png', symptoms: ['Shaking', 'Rapid breathing'], simpleSymptom: 'Is shaking a little bit and breathing very fast', correctProcedure: 'Administer oxygen', treated: false, tier: 4, 
      backstory: 'Peanut ran too fast in a chilly attic and got winded!', 
      facts: ['Mice can squeeze through tiny gaps.', 'They have excellent hearing.', 'Their tails help with balance.'] },
    { name: 'Sunny', species: 'Cockatiel', image: 'cockatiel.png', happyImage: 'cockatiel_happy.png', symptoms: ['Coughing', 'Feather plucking'], simpleSymptom: 'Is coughing and pulling out their feathers', correctProcedure: 'Check for parasites', treated: false, tier: 4, 
      backstory: 'Sunny perched near a dusty fan and got itchy feathers!', 
      facts: ['Cockatiels can whistle tunes.', 'Their crests show their mood.', 'They’re native to Australia.'] },
    { name: 'Coco', species: 'Chinchilla', image: 'chinchilla.png', happyImage: 'chinchilla_happy.png', symptoms: ['Loss of appetite', 'Dental issues'], simpleSymptom: 'Doesn\'t want to eat their food and seems to have trouble chewing', correctProcedure: 'Trim overgrown teeth', treated: false, tier: 4, 
      backstory: 'Coco munched on tough twigs and wore out her teeth!', 
      facts: ['Chinchillas take dust baths to stay clean.', 'They can jump up to 6 feet.', 'Their fur is super soft and dense.'] },
    { name: 'Spike', species: 'Hedgehog', image: 'hedgehog.png', happyImage: 'hedgehog_happy.png', symptoms: ['Excessive grooming', 'Loss of quills'], simpleSymptom: 'Is licking themselves too much and losing their spikes', correctProcedure: 'Check for mites', treated: false, tier: 4, 
      backstory: 'Spike rolled through a buggy bush and picked up some pests!', 
      facts: ['Hedgehogs are immune to some snake venom.', 'They curl into balls for protection.', 'They’re nocturnal hunters.'] },
    { name: 'Max', species: 'Dog', image: 'dog4.png', happyImage: 'dog4_happy.png', symptoms: ['Diarrhea', 'Lethargy'], simpleSymptom: 'Has a poorly tummy and is very tired', correctProcedure: 'Give probiotics', treated: false, tier: 4, 
      backstory: 'Max ate some funky leftovers at a picnic and feels icky!', 
      facts: ['Dogs can understand up to 250 words.', 'They see best at dawn and dusk.', 'Their ears can move independently.'] },
    { name: 'Cleo', species: 'Cat', image: 'cat4.png', happyImage: 'cat4_happy.png', symptoms: ['Swollen abdomen', 'Difficulty breathing'], simpleSymptom: 'Has a big tummy and is struggling to breathe', correctProcedure: 'Drain fluid from abdomen', treated: false, tier: 4, 
      backstory: 'Cleo drank too much water after a hot day and got bloated!', 
      facts: ['Cats have a strong hunting instinct.', 'They can make over 100 vocal sounds.', 'Their tongues are rough like sandpaper.'] }
];

const allProcedures = [
    'Listen to heartbeat', 'Check for fleas', 'Take temperature', 'Give medicine', 'Put on a bandage', 'Give special food', 'Give medicine for stomach upset', 'Check for infection', 'Check for injury',
    'Check for respiratory infection', 'Give antibiotics', 'Check for fungal infection', 'Check blood sugar levels', 'Run blood tests', 'Administer oxygen', 'Check for parasites', 'Trim overgrown teeth', 'Check for mites', 'Give probiotics', 'Drain fluid from abdomen',
    'Give eye drops', 'Clean their ears', 'Perform X-ray', 'Do surgery', 'Give dietary advice', 'Give them a quiet space', 'Keep them warm', 'Check their teeth', 'Give special tummy food', 'Feel their tummy gently', 'Give an injection', 'Apply antiseptic cream', 'Monitor breathing', 'Provide pain relief'
];

const supplies = {
    medicine: 2,
    bandage: 2,
    antiseptic: 2,
    thermometer: 2,
    stethoscope: 2,
    fleaTreatment: 2,
    specialFood: 2
};

function updateSupplyDisplay() {
    supplyMedicineElement.textContent = `Medicine: ${supplies.medicine}`;
    supplyBandageElement.textContent = `Bandages: ${supplies.bandage}`;
    supplyAntisepticElement.textContent = `Antiseptic Cream: ${supplies.antiseptic}`;
    supplyThermometerElement.textContent = `Thermometers: ${supplies.thermometer}`;
    supplyStethoscopeElement.textContent = `Stethoscopes: ${supplies.stethoscope}`;
    supplyFleaTreatmentElement.textContent = `Flea Treatments: ${supplies.fleaTreatment}`;
    supplySpecialFoodElement.textContent = `Special Food: ${supplies.specialFood}`;

    buyMedicineButton.classList.toggle('available', supplies.medicine === 0);
    buyMedicineButton.disabled = supplies.medicine > 0;
    buyBandageButton.classList.toggle('available', supplies.bandage === 0);
    buyBandageButton.disabled = supplies.bandage > 0;
    buyAntisepticButton.classList.toggle('available', supplies.antiseptic === 0);
    buyAntisepticButton.disabled = supplies.antiseptic > 0;
    buyThermometerButton.classList.toggle('available', supplies.thermometer === 0);
    buyThermometerButton.disabled = supplies.thermometer > 0;
    buyStethoscopeButton.classList.toggle('available', supplies.stethoscope === 0);
    buyStethoscopeButton.disabled = supplies.stethoscope > 0;
    buyFleaTreatmentButton.classList.toggle('available', supplies.fleaTreatment === 0);
    buyFleaTreatmentButton.disabled = supplies.fleaTreatment > 0;
    buySpecialFoodButton.classList.toggle('available', supplies.specialFood === 0);
    buySpecialFoodButton.disabled = supplies.specialFood > 0;
}

function buyMoreSupplies(supplyType) {
    if (money >= 200 && supplies[supplyType] === 0) {
        money -= 200;
        moneyElement.textContent = `Money: £${money}`;
        supplies[supplyType] = 2;
        updateSupplyDisplay();
    } else if (supplies[supplyType] > 0) {
        feedbackElement.textContent = `You still have some ${supplyType} left!`;
    } else {
        feedbackElement.textContent = `Not enough money to buy more ${supplyType}!`;
    }
}

function showTierUpPopup(newTier) {
    tierUpMessageTitle.textContent = 'Hooray!';
    tierUpMessage.textContent = `You're now a super ${newTier}! Keep up the great work!`;
    tierUpPopup.style.display = 'block';
}

function closeTierUpPopup() {
    tierUpPopup.style.display = 'none';
    nextPatient();
}

function startGame() {
    console.log('Starting game...');
    score = 0;
    money = 0;
    scoreElement.textContent = `Score: ${score}`;
    moneyElement.textContent = `Money: £${money}`;
    currentPatientIndex = -1;
    feedbackElement.textContent = '';
    currentTierIndex = 0;
    treatedInCurrentTier = 0;
    vetTierElement.textContent = vetTiers[currentTierIndex];
    animalsData.forEach(animal => animal.treated = false);
    supplies.medicine = 2;
    supplies.bandage = 2;
    supplies.antiseptic = 2;
    supplies.thermometer = 2;
    supplies.stethoscope = 2;
    supplies.fleaTreatment = 2;
    supplies.specialFood = 2;
    updateSupplyDisplay();
    updateBadgesDisplay();

    const animalImages = ['dog.png', 'cat.png', 'hamster.png', 'parrot.png', 'rabbit.png', 'turtle.png', 'dog2.png', 'cat2.png', 'guineapig.png', 'macaw.png', 'ferret.png', 'iguana.png', 'dog3.png', 'cat3.png', 'mouse.png', 'cockatiel.png', 'chinchilla.png', 'hedgehog.png', 'dog4.png', 'cat4.png'];
    const happyAnimalImages = ['dog_happy.png', 'cat_happy.png', 'hamster_happy.png', 'parrot_happy.png', 'rabbit_happy.png', 'turtle_happy.png', 'dog2_happy.png', 'cat2_happy.png', 'guineapig_happy.png', 'macaw_happy.png', 'ferret_happy.png', 'iguana_happy.png', 'dog3_happy.png', 'cat3_happy.png', 'mouse_happy.png', 'cockatiel_happy.png', 'chinchilla_happy.png', 'hedgehog_happy.png', 'dog4_happy.png', 'cat4_happy.png'];

    animalImages.forEach((img, index) => {
        if (animalsData[index]) {
            animalsData[index].image = img;
            animalsData[index].happyImage = happyAnimalImages[index];
        }
    });

    nextPatient();
}

function nextPatient() {
    const currentTier = currentTierIndex;
    const untreatedInTier = animalsData.filter(animal => animal.tier === currentTier && !animal.treated);
    console.log(`Tier ${currentTier}: ${untreatedInTier.length} untreated animals available.`);

    if (untreatedInTier.length > 0) {
        const randomIndex = Math.floor(Math.random() * untreatedInTier.length);
        const currentPatient = untreatedInTier[randomIndex];
        currentPatientIndex = animalsData.indexOf(currentPatient);
        console.log(`Loading patient: ${currentPatient.name}, Image: ${currentPatient.image}`);
        animalImageElement.src = currentPatient.image || 'default_animal.png';
        animalImageElement.alt = currentPatient.name;
        symptomElement.textContent = `${currentPatient.backstory} Now ${currentPatient.name} the ${currentPatient.species} ${currentPatient.simpleSymptom}! What should we do?`;
        animalFactsElement.innerHTML = `<strong>Fun Facts about ${currentPatient.species}s:</strong><br>1. ${currentPatient.facts[0]}<br>2. ${currentPatient.facts[1]}<br>3. ${currentPatient.facts[2]}`;
        populateProcedureButtons();
        animalImageElement.classList.remove('happy-animal');
        currentBadgeElement.style.display = currentPatient.treated ? 'block' : 'none';
        
        // Check if image loads
        animalImageElement.onerror = () => {
            console.error(`Failed to load image: ${animalImageElement.src}, falling back to default.`);
            animalImageElement.src = 'default_animal.png';
        };
        animalImageElement.onload = () => {
            console.log(`Image loaded successfully: ${animalImageElement.src}`);
        };
    } else {
        if (treatedInCurrentTier >= treatmentsNeededPerTier) {
            const previousTierIndex = currentTierIndex;
            currentTierIndex++;
            treatedInCurrentTier = 0;
            if (currentTierIndex < vetTiers.length) {
                vetTierElement.textContent = vetTiers[currentTierIndex];
                showTierUpPopup(vetTiers[currentTierIndex]);
            } else {
                symptomElement.textContent = 'Congratulations! You have become a Zoologist and helped all the animals!';
                animalImageElement.src = '';
                procedureButtonsElement.innerHTML = '';
                animalFactsElement.innerHTML = '';
                currentBadgeElement.style.display = 'none';
            }
        } else if (currentTierIndex < vetTiers.length) {
            symptomElement.textContent = `Fantastic work as a ${vetTiers[currentTierIndex]}! You need to help ${treatmentsNeededPerTier - treatedInCurrentTier} more animals to get your next promotion! Let's see who else needs our care!`;
            animalFactsElement.innerHTML = '';
            if (animalsData.filter(animal => animal.tier === currentTier && !animal.treated).length === 0) {
                symptomElement.textContent = `You've seen all the patients in the ${vetTiers[currentTierIndex]} tier for now. Treat ${treatmentsNeededPerTier - treatedInCurrentTier} more to advance!`;
            }
        } else {
            symptomElement.textContent = 'Congratulations! You have become a Zoologist and helped all the animals!';
            animalImageElement.src = '';
            procedureButtonsElement.innerHTML = '';
            animalFactsElement.innerHTML = '';
            currentBadgeElement.style.display = 'none';
        }
    }
}

function populateProcedureButtons() {
    procedureButtonsElement.innerHTML = '';
    const currentPatient = animalsData[currentPatientIndex];
    const correctProcedure = currentPatient.correctProcedure;
    const otherProcedures = allProcedures.filter(proc => proc !== correctProcedure);
    const wrongChoices = [];

    const choices = [correctProcedure];
    while (wrongChoices.length < 2 && otherProcedures.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherProcedures.length);
        const wrongProcedure = otherProcedures[randomIndex];
        if (!wrongChoices.includes(wrongProcedure)) {
            wrongChoices.push(wrongProcedure);
        }
    }
    choices.push(...wrongChoices);
    choices.sort(() => Math.random() - 0.5);

    choices.forEach(procedure => {
        const button = document.createElement('button');
        button.textContent = procedure;
        button.addEventListener('click', () => checkProcedure(procedure));
        procedureButtonsElement.appendChild(button);
    });
}

function checkProcedure(chosenProcedure) {
    const currentPatient = animalsData[currentPatientIndex];
    if (chosenProcedure === currentPatient.correctProcedure) {
        feedbackElement.textContent = `Yay! You helped ${currentPatient.name} feel much better!`;
        score++;
        scoreElement.textContent = `Score: ${score}`;
        if (!currentPatient.treated) {
            money += 100;
            moneyElement.textContent = `Money: £${money}`;
        }

        if (!currentPatient.treated) {
            let supplyUsed = false;
            if (chosenProcedure === 'Give medicine' || chosenProcedure === 'Give medicine for stomach upset' || chosenProcedure === 'Give antibiotics' || chosenProcedure === 'Give probiotics' || chosenProcedure === 'Give eye drops' || chosenProcedure === 'Give an injection' || chosenProcedure === 'Provide pain relief') {
                if (supplies.medicine > 0) { supplies.medicine--; supplyUsed = true; }
            } else if (chosenProcedure === 'Put on a bandage') {
                if (supplies.bandage > 0) { supplies.bandage--; supplyUsed = true; }
            } else if (chosenProcedure === 'Apply antiseptic cream') {
                if (supplies.antiseptic > 0) { supplies.antiseptic--; supplyUsed = true; }
            } else if (chosenProcedure === 'Take temperature') {
                if (supplies.thermometer > 0) { supplies.thermometer--; supplyUsed = true; }
            } else if (chosenProcedure === 'Listen to heartbeat') {
                if (supplies.stethoscope > 0) { supplies.stethoscope--; supplyUsed = true; }
            } else if (chosenProcedure === 'Check for fleas') {
                if (supplies.fleaTreatment > 0) { supplies.fleaTreatment--; supplyUsed = true; }
            } else if (chosenProcedure === 'Give special food') {
                if (supplies.specialFood > 0) { supplies.specialFood--; supplyUsed = true; }
            }
            if (supplyUsed) {
                updateSupplyDisplay();
            }
        }

        animalImageElement.src = currentPatient.happyImage || currentPatient.image || 'default_animal_happy.png';
        animalImageElement.classList.add('happy-animal');
        if (!currentPatient.treated) {
            currentPatient.treated = true;
            treatedInCurrentTier++;
            updateBadgesDisplay();
        }
        setTimeout(() => {
            const remainingInTier = animalsData.filter(animal => animal.tier === currentTierIndex && !animal.treated).length;
            if (remainingInTier === 0 && treatedInCurrentTier >= treatmentsNeededPerTier) {
                nextPatient();
            } else {
                nextPatient();
            }
        }, 2000);
    } else {
        feedbackElement.textContent = `Oops! That didn't seem to help ${currentPatient.name}. Maybe try something else.`;
    }
}

function updateBadgesDisplay() {
    earnedBadgesContainer.innerHTML = '';
    animalsData.forEach(animal => {
        if (animal.treated) {
            const badge = document.createElement('span');
            badge.classList.add('badge');
            badge.textContent = animal.name;
            earnedBadgesContainer.appendChild(badge);
        }
    });
}

// Ensure the DOM is fully loaded before starting the game
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, starting game...');
    startGame();
});