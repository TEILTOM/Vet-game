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
const supplyStethoscopeElement = document.getElementById('supply-stethoscope');
const supplyBathBombsElement = document.getElementById('supply-bath-bombs');
const supplySpecialFoodElement = document.getElementById('supply-special-food');

const buyMedicineButton = document.getElementById('buy-medicine');
const buyBandageButton = document.getElementById('buy-bandage');
const buyStethoscopeButton = document.getElementById('buy-stethoscope');
const buyBathBombsButton = document.getElementById('buy-bath-bombs');
const buySpecialFoodButton = document.getElementById('buy-special-food');

let currentPatientIndex = -1;
let score = 0;
let money = 0;
let currentTierIndex = 0;
const vetTiers = ['Veterinary Nurse', 'Junior Vet', 'Vet', 'Senior Vet', 'Zoologist'];
let treatedInCurrentTier = 0;
const treatmentsNeededPerTier = 3;

const animalsData = [
    { name: 'Buddy', species: 'Dog', image: 'dog.png', happyImage: 'dog_happy.png', symptoms: ['Coughing'], simpleSymptom: 'Keeps coughing and sounds funny', correctProcedure: 'Check with a Stethoscope', treated: false, tier: 0, 
      backstory: 'Buddy got caught in a rainstorm while chasing squirrels and caught a cold!', 
      facts: ['Dogs have a sense of time and can predict routines.', 'They can hear sounds four times farther away than humans.', 'A dog’s nose print is as unique as a human fingerprint.'] },
    { name: 'Whiskers', species: 'Cat', image: 'cat.png', happyImage: 'cat_happy.png', symptoms: ['Scratching excessively'], simpleSymptom: 'Scratches all the time and feels itchy', correctProcedure: 'Give a Bath', treated: false, tier: 0, 
      backstory: 'Whiskers explored an old barn and picked up some itchy visitors!', 
      facts: ['Cats sleep for 12-16 hours a day.', 'They have five toes on front paws but four on back.', 'A group of cats is called a clowder.'] },
    { name: 'Pip', species: 'Hamster', image: 'hamster.png', happyImage: 'hamster_happy.png', symptoms: ['Lethargy'], simpleSymptom: 'Looks sleepy and won’t play', correctProcedure: 'Feed Special Treats', treated: false, tier: 0, 
      backstory: 'Pip stayed up too late running on his wheel and now feels under the weather!', 
      facts: ['Hamsters can store food in their cheeks.', 'They are nocturnal and love to burrow.', 'Their teeth never stop growing.'] },
    { name: 'Polly', species: 'Parrot', image: 'parrot.png', happyImage: 'parrot_happy.png', symptoms: ['Runny nose', 'Sneezing'], simpleSymptom: 'Has a drippy nose and keeps sneezing', correctProcedure: 'Give Yummy Medicine', treated: false, tier: 1, 
      backstory: 'Polly flew through a dusty attic and caught a little birdie cold!', 
      facts: ['Parrots can mimic human speech.', 'Some live over 50 years.', 'They use their feet like hands to eat.'] },
    { name: 'Barnaby', species: 'Rabbit', image: 'rabbit.png', happyImage: 'rabbit_happy.png', symptoms: ['Limping'], simpleSymptom: 'Hops funny and has a sore paw', correctProcedure: 'Put on a Bandage', treated: false, tier: 1, 
      backstory: 'Barnaby hopped too hard chasing carrots and twisted a paw!', 
      facts: ['Rabbits can jump up to 3 feet high.', 'Their ears help regulate body temperature.', 'They eat their own poop to digest food twice.'] },
    { name: 'Sheldon', species: 'Tortoise', image: 'turtle.png', happyImage: 'turtle_happy.png', symptoms: ['Loss of appetite'], simpleSymptom: 'Won’t eat his favorite snacks', correctProcedure: 'Feed Special Treats', treated: false, tier: 1, 
      backstory: 'Sheldon ate some weird weeds in the garden and lost his appetite!', 
      facts: ['Tortoises can live over 100 years.', 'They can retract their heads into their shells.', 'Some species hibernate in winter.'] },
    { name: 'Bella', species: 'Dog', image: 'dog2.png', happyImage: 'dog2_happy.png', symptoms: ['Vomiting', 'Diarrhea'], simpleSymptom: 'Has a yucky tummy and feels sick', correctProcedure: 'Give Yummy Medicine', treated: false, tier: 2, 
      backstory: 'Bella snuck into the trash and ate something she shouldn’t have!', 
      facts: ['Dogs dream, especially when they’re puppies.', 'They sweat through their paws.', 'There are over 340 dog breeds worldwide.'] },
    { name: 'Oliver', species: 'Cat', image: 'cat2.png', happyImage: 'cat_happy.png', symptoms: ['Watery eyes', 'Loss of energy'], simpleSymptom: 'Has teary eyes and feels tired', correctProcedure: 'Feed Special Treats', treated: false, tier: 2, 
      backstory: 'Oliver napped in a dusty windowsill and woke up feeling yucky!', 
      facts: ['Cats can jump up to 6 times their body length.', 'They purr to self-soothe.', 'Their whiskers help them navigate in the dark.'] },
    { name: 'Nibbles', species: 'Guinea Pig', image: 'guineapig.png', happyImage: 'guineapig_happy.png', symptoms: ['Swollen paw', 'Whimpering'], simpleSymptom: 'Has a puffy paw and squeaks a lot', correctProcedure: 'Put on a Bandage', treated: false, tier: 2, 
      backstory: 'Nibbles got his paw stuck in his cage while reaching for a treat!', 
      facts: ['Guinea pigs need vitamin C from their diet.', 'They communicate with squeaks and purrs.', 'They’re social and love company.'] },
    { name: 'Rio', species: 'Macaw', image: 'macaw.png', happyImage: 'macaw_happy.png', symptoms: ['Difficulty breathing', 'Tail bobbing'], simpleSymptom: 'Breathes funny and wiggles his tail', correctProcedure: 'Check with a Stethoscope', treated: false, tier: 3, 
      backstory: 'Rio flew through a smoky jungle and caught a cough!', 
      facts: ['Macaws have strong beaks to crack nuts.', 'They can fly up to 15 miles per day.', 'Their bright colors help them blend into rainforests.'] },
    { name: 'Daisy', species: 'Ferret', image: 'ferret.png', happyImage: 'ferret_happy.png', symptoms: ['Sneezing', 'Nasal discharge'], simpleSymptom: 'Sneezes a lot and has a runny nose', correctProcedure: 'Give Yummy Medicine', treated: false, tier: 3, 
      backstory: 'Daisy dug into a dusty burrow and caught a sniffle!', 
      facts: ['Ferrets sleep 14-18 hours a day.', 'They’re related to weasels and otters.', 'They love to stash shiny objects.'] },
    { name: 'Franklin', species: 'Iguana', image: 'iguana.png', happyImage: 'iguana_happy.png', symptoms: ['Skin rash', 'Lethargy'], simpleSymptom: 'Has itchy spots and feels sleepy', correctProcedure: 'Give a Bath', treated: false, tier: 3, 
      backstory: 'Franklin basked on a moldy log and got an itchy rash!', 
      facts: ['Iguanas can drop their tails to escape predators.', 'They’re great swimmers.', 'They change color slightly with mood or temperature.'] },
    { name: 'Lucy', species: 'Dog', image: 'dog3.png', happyImage: 'dog3_happy.png', symptoms: ['Increased thirst', 'Frequent urination'], simpleSymptom: 'Drinks lots and runs to potty all the time', correctProcedure: 'Give Yummy Medicine', treated: false, tier: 4, 
      backstory: 'Lucy drank from a sugary puddle and now feels off!', 
      facts: ['Dogs can detect some diseases in humans.', 'Their sense of smell is 10,000 times better than ours.', 'They wag tails to show emotions.'] },
    { name: 'Jasper', species: 'Cat', image: 'cat3.png', happyImage: 'cat3_happy.png', symptoms: ['Hiding', 'Weight loss'], simpleSymptom: 'Hides a lot and looks skinny', correctProcedure: 'Feed Special Treats', treated: false, tier: 4, 
      backstory: 'Jasper got spooked by a loud noise and hasn’t been eating well!', 
      facts: ['Cats have 230 bones, more than humans.', 'They can rotate their ears 180 degrees.', 'They mark territory with scent glands.'] },
    { name: 'Peanut', species: 'Mouse', image: 'mouse.png', happyImage: 'mouse_happy.png', symptoms: ['Shaking', 'Rapid breathing'], simpleSymptom: 'Shivers and breathes super fast', correctProcedure: 'Check with a Stethoscope', treated: false, tier: 4, 
      backstory: 'Peanut ran too fast in a chilly attic and got winded!', 
      facts: ['Mice can squeeze through tiny gaps.', 'They have excellent hearing.', 'Their tails help with balance.'] },
    { name: 'Sunny', species: 'Cockatiel', image: 'cockatiel.png', happyImage: 'cockatiel_happy.png', symptoms: ['Coughing', 'Feather plucking'], simpleSymptom: 'Coughs and pulls out feathers', correctProcedure: 'Give a Bath', treated: false, tier: 4, 
      backstory: 'Sunny perched near a dusty fan and got itchy feathers!', 
      facts: ['Cockatiels can whistle tunes.', 'Their crests show their mood.', 'They’re native to Australia.'] },
    { name: 'Coco', species: 'Chinchilla', image: 'chinchilla.png', happyImage: 'chinchilla_happy.png', symptoms: ['Loss of appetite', 'Dental issues'], simpleSymptom: 'Won’t eat and has sore teeth', correctProcedure: 'Feed Special Treats', treated: false, tier: 4, 
      backstory: 'Coco munched on tough twigs and wore out her teeth!', 
      facts: ['Chinchillas take dust baths to stay clean.', 'They can jump up to 6 feet.', 'Their fur is super soft and dense.'] },
    { name: 'Spike', species: 'Hedgehog', image: 'hedgehog.png', happyImage: 'hedgehog_happy.png', symptoms: ['Excessive grooming', 'Loss of quills'], simpleSymptom: 'Licks too much and loses spikes', correctProcedure: 'Give a Bath', treated: false, tier: 4, 
      backstory: 'Spike rolled through a buggy bush and picked up some pests!', 
      facts: ['Hedgehogs are immune to some snake venom.', 'They curl into balls for protection.', 'They’re nocturnal hunters.'] },
    { name: 'Max', species: 'Dog', image: 'dog4.png', happyImage: 'dog4_happy.png', symptoms: ['Diarrhea', 'Lethargy'], simpleSymptom: 'Has a poorly tummy and feels tired', correctProcedure: 'Give Yummy Medicine', treated: false, tier: 4, 
      backstory: 'Max ate some funky leftovers at a picnic and feels icky!', 
      facts: ['Dogs can understand up to 250 words.', 'They see best at dawn and dusk.', 'Their ears can move independently.'] },
    { name: 'Cleo', species: 'Cat', image: 'cat4.png', happyImage: 'cat4_happy.png', symptoms: ['Swollen abdomen', 'Difficulty breathing'], simpleSymptom: 'Has a big tummy and breathes hard', correctProcedure: 'Check with a Stethoscope', treated: false, tier: 4, 
      backstory: 'Cleo drank too much water after a hot day and got bloated!', 
      facts: ['Cats have a strong hunting instinct.', 'They can make over 100 vocal sounds.', 'Their tongues are rough like sandpaper.'] }
];

const allProcedures = [
    'Put on a Bandage', 'Give Yummy Medicine', 'Check with a Stethoscope', 'Give a Bath', 'Feed Special Treats'
];

const supplies = {
    medicine: 2,
    bandage: 2,
    stethoscope: 2,
    bathBombs: 2,
    specialFood: 2
};

function updateSupplyDisplay() {
    supplyMedicineElement.textContent = `Medicine: ${supplies.medicine}`;
    supplyBandageElement.textContent = `Bandages: ${supplies.bandage}`;
    supplyStethoscopeElement.textContent = `Stethoscopes: ${supplies.stethoscope}`;
    supplyBathBombsElement.textContent = `Bath Bombs: ${supplies.bathBombs}`;
    supplySpecialFoodElement.textContent = `Special Food: ${supplies.specialFood}`;

    buyMedicineButton.classList.toggle('available', supplies.medicine === 0);
    buyMedicineButton.disabled = supplies.medicine > 0;
    buyBandageButton.classList.toggle('available', supplies.bandage === 0);
    buyBandageButton.disabled = supplies.bandage > 0;
    buyStethoscopeButton.classList.toggle('available', supplies.stethoscope === 0);
    buyStethoscopeButton.disabled = supplies.stethoscope > 0;
    buyBathBombsButton.classList.toggle('available', supplies.bathBombs === 0);
    buyBathBombsButton.disabled = supplies.bathBombs > 0;
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
    supplies.stethoscope = 2;
    supplies.bathBombs = 2;
    supplies.specialFood = 2;
    updateSupplyDisplay();
    updateBadgesDisplay(); // Pre-populate badges
    nextPatient();
}

    const animalImages = ['dog.png', 'cat.png', 'hamster.png', 'parrot.png', 'rabbit.png', 'turtle.png', 'dog2.png', 'cat2.png', 'guineapig.png', 'macaw.png', 'ferret.png', 'iguana.png', 'dog3.png', 'cat3.png', 'mouse.png', 'cockatiel.png', 'chinchilla.png', 'hedgehog.png', 'dog4.png', 'cat4.png'];
    const happyAnimalImages = ['dog_happy.png', 'cat_happy.png', 'hamster_happy.png', 'parrot_happy.png', 'rabbit_happy.png', 'turtle_happy.png', 'dog2_happy.png', 'cat2_happy.png', 'guineapig_happy.png', 'macaw_happy.png', 'ferret_happy.png', 'iguana_happy.png', 'dog3_happy.png', 'cat3_happy.png', 'mouse_happy.png', 'cockatiel_happy.png', 'chinchilla_happy.png', 'hedgehog_happy.png', 'dog4_happy.png', 'cat4_happy.png'];

    animalImages.forEach((img, index) => {
        if (animalsData[index]) {
            animalsData[index].image = img;
            animalsData[index].happyImage = happyAnimalImages[index];
        }
    });

    nextPatient();

function nextPatient() {
    const currentTier = currentTierIndex;
    const untreatedInTier = animalsData.filter(animal => animal.tier === currentTier && !animal.treated);
    console.log(`Tier ${currentTier}: ${untreatedInTier.length} untreated animals available.`);

    // Hide the Next Patient button initially
    document.getElementById('next-patient-button').style.display = 'none';

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
        
        animalImageElement.onerror = () => {
            console.error(`Failed to load image: ${animalImageElement.src}, falling back to default.`);
            animalImageElement.src = 'default_animal.png';
        };
        animalImageElement.onload = () => {
            console.log(`Image loaded successfully: ${animalImageElement.src}`);
        };
        // Re-enable procedure buttons
        procedureButtonsElement.querySelectorAll('button').forEach(button => button.disabled = false);
        feedbackElement.textContent = '';
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
                animalImageElement.src = 'zoologist.png';
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
            // Show Next Patient button if there are more tiers to explore
            document.getElementById('next-patient-button').style.display = 'block';
        } else {
            symptomElement.textContent = 'Congratulations! You have become a Zoologist and helped all the animals!';
            animalImageElement.src = 'zoologist.png';
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
            if (chosenProcedure === 'Give Yummy Medicine') {
                if (supplies.medicine > 0) { supplies.medicine--; supplyUsed = true; }
            } else if (chosenProcedure === 'Put on a Bandage') {
                if (supplies.bandage > 0) { supplies.bandage--; supplyUsed = true; }
            } else if (chosenProcedure === 'Check with a Stethoscope') {
                if (supplies.stethoscope > 0) { supplies.stethoscope--; supplyUsed = true; }
            } else if (chosenProcedure === 'Give a Bath') {
                if (supplies.bathBombs > 0) { supplies.bathBombs--; supplyUsed = true; }
            } else if (chosenProcedure === 'Feed Special Treats') {
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
        // Show the Next Patient button instead of auto-advancing
        document.getElementById('next-patient-button').style.display = 'block';
        // Disable procedure buttons to prevent further clicks
        procedureButtonsElement.querySelectorAll('button').forEach(button => button.disabled = true);
    } else {
        feedbackElement.textContent = `Oops! That didn’t cheer up ${currentPatient.name}. Let’s try something else!`;
        // Ensure the Next Patient button remains hidden if procedure is incorrect
        document.getElementById('next-patient-button').style.display = 'none';
    }
}

function updateBadgesDisplay() {
    earnedBadgesContainer.innerHTML = '';
    // Get all unique species
    const allSpecies = [...new Set(animalsData.map(animal => animal.species))];
    // Get treated species
    const treatedSpecies = [...new Set(animalsData.filter(animal => animal.treated).map(animal => animal.species))];

    allSpecies.forEach(species => {
        const badge = document.createElement('span');
        badge.classList.add('badge');
        badge.setAttribute('data-species', species.toLowerCase());
        badge.textContent = species;
        if (treatedSpecies.includes(species)) {
            badge.classList.add('treated'); // Turn green if treated
        }
        earnedBadgesContainer.appendChild(badge);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, starting game...');
    startGame();
});
