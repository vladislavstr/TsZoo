type AdminAction = "CheckIn" | "CheckOut" | "CalculateAllFood";
type TypeOfBiome = "Tropics" | "House";
let listAviary: Aviary[] = [];

interface AnimalType {
    type: string;
    biome: TypeOfBiome;
    pondDemand: boolean;
    isPredator: boolean;
}

interface AcceptedAnimal {
    readonly type: AnimalType;
    name: string;
    spaceDemand: number;
    foodDemand: number;
}

interface Aviary {
    biome: TypeOfBiome;
    pondInStock: boolean;
    readonly spaceInTotal: number;
    spaceAvailable: number;
    animals: AcceptedAnimal[];
}

class NeverError extends Error {
    constructor(value: never) {
        super(`Unreachable statement: ${value}`);
    }
}

class Admin {
    doAction(action: AdminAction, animal: AcceptedAnimal, aviary: Aviary) {
        switch (action) {
            case "CheckIn":
                return checkIn(animal, aviary);
            case "CheckOut":
                return checkOut(animal, aviary);
            case "CalculateAllFood":
                return calculateAllFood(listAviary);; //I wonder why it works without an optional function parameter pointer
            default:
                throw new NeverError(action);
        }
    }
}

function createAnimalType(
    type: string,
    biome: TypeOfBiome,
    pondDemand: boolean,
    isPredator: boolean
    ): AnimalType {
        let animalType = {
            type: type,
            biome: biome,
            pondDemand: pondDemand,
            isPredator: isPredator,
        }
        
        return animalType
    }

function createAcceptedAnimal(
    type: AnimalType,
    name: string,
    spaceDemand: number,
    foodDemand: number
    ): AcceptedAnimal {
        let animal = {
            type: type,
            name: name,
            spaceDemand: spaceDemand,
            foodDemand: foodDemand
        }

        return animal
    }

function createAviary(
    biome: TypeOfBiome,
    pondInStock: boolean,
    spaceInTotal: number,
    ): Aviary {
        let aviary = {
            biome: biome,
            pondInStock: pondInStock,
            existPredators: false,
            spaceInTotal: spaceInTotal,
            spaceAvailable: spaceInTotal,
            animals: []
        }
        listAviary.push(aviary);

        return aviary
    }

function checkPredatorsTypeInAviary(aviary: Aviary) {
    var animals = aviary.animals;
    if(aviary.animals.length !== 0) {
        return animals[0].type;
    }
    else return true;
}    

function checkThePossibility(animal: AcceptedAnimal, aviary: Aviary): boolean {    
    var aviaryNumber: number = listAviary.indexOf(aviary);

    console.log("#####################################################");
    console.log(`## are you trying to settle animal - ${animal.name} in the aviary - N${aviaryNumber} - ${aviary.biome} ##`);
    console.log("#####################################################");
    
    if(aviary.animals.length !== 0) {
        if(aviary.animals?.some(x=>x==animal)) { // I did not do the implementation of the search in the list of aviary
            console.log(`the animal - ${animal.name} already living in the aviary - N${aviaryNumber} - ${aviary.biome}`);
            return false;
        }
        else if(animal.type.isPredator === false && aviary.animals[0].type.isPredator === true) {
            console.log(`the animal - ${animal.name} cannot live with predators`);
            console.log(`in the aviary - N${aviaryNumber} - ${aviary.biome} already living ${aviary.animals[0].type.type} predators`);
            return false;
        }
        else if(animal.type.isPredator === true && (aviary.animals[0].type !== animal.type)) {
            console.log(`predators cannot live with other types of predators`);
            console.log(`in the aviary - N${aviaryNumber} - ${aviary.biome} already living ${aviary.animals[0].type.type} predators`);
            return false;
        }
    }
    if(animal.type.biome != aviary.biome) {
        console.log(`the biome - ${animal.type.biome} of the animal - ${animal.name} \n does not match biom of the aviary - N${aviaryNumber} - ${aviary.biome}`);
        return false;
    }
    else if(animal.type.pondDemand === true && aviary.pondInStock == false) {
        console.log(`the aviary - N${aviaryNumber} - ${aviary.biome} hase not pond. - ${animal.name} needs pond`);
        return false;
    }
    else {
        return true;
    }
}

function checkIn(animal: AcceptedAnimal, aviary: Aviary) {
    if(checkThePossibility(animal, aviary)) {
        if(aviary.spaceAvailable <= animal.spaceDemand){
            console.log(`space demand animal - ${animal.name} = ${animal.spaceDemand} more than space available of the aviary - N${listAviary.indexOf(aviary)} = ${aviary.spaceAvailable}`);
            return false;
        }
        aviary.spaceAvailable -= animal.spaceDemand;
        aviary.animals?.push(animal);
        console.log(`the animal - ${animal.name} settled in the aviary - N${listAviary.indexOf(aviary)}. \n Now - available space = ${aviary.spaceAvailable}`);
        return aviary;
    }
    else {
        return `try another one aviary for the animal - ${animal.name}`;
    }
}

function checkOut(animal: AcceptedAnimal, aviary: Aviary) {
    if(aviary.animals?.some(x=>x==animal)){
        delete aviary.animals[aviary.animals?.indexOf(animal)];
        aviary.spaceAvailable += animal.spaceDemand;
        aviary.animals.sort((a, b) => (a.name < b.name ? -1 : 1));
        console.log(`Ok ${animal.name} moved out from ${listAviary.indexOf(aviary)} - ${aviary.biome}`);

        return aviary;
    }
    else {
        return console.log(`${animal.name} not at ${aviary.biome}`);
    }
}

function calculateAllFood(listAviary: Array<Aviary>) {
    let sum: number = 0;
    listAviary.forEach(item => {
        item.animals?.forEach(item =>{
            sum += item.foodDemand;
        });
    });
    return sum;
}

const dog: AnimalType = createAnimalType("Dog", "House", false, true);
const cat: AnimalType = createAnimalType("Cat", "House", false, true);
const cow: AnimalType = createAnimalType("Cow", "House", false, false);
const hippopotamus: AnimalType = createAnimalType("Hippopotamus", "Tropics", true, false);

let dogSasa = createAcceptedAnimal(dog, "Sasa", 5, 3);
let dogVova = createAcceptedAnimal(dog, "Vova", 5, 3);
let dogLiza = createAcceptedAnimal(dog, "Liza", 5, 3);
let cowMusa = createAcceptedAnimal(cow, "Musa", 5, 1);        
let catMasha = createAcceptedAnimal(cat, "Masha", 4, 2);
let hippopotamusSerj = createAcceptedAnimal(hippopotamus, "Serj", 80, 20);

let tropicsAviary = createAviary("Tropics", false, 600);
let tropicsAviaryWithoutPound = createAviary("Tropics", false, 600);
let tropicsAviarySmallSize = createAviary("Tropics", false, 6);
let houseAviary = createAviary("House", false, 11);

let admin = new Admin();

admin.doAction("CheckIn", cowMusa, houseAviary);
admin.doAction("CheckIn", hippopotamusSerj, houseAviary);
admin.doAction("CheckIn", hippopotamusSerj, houseAviary);
admin.doAction("CheckIn", hippopotamusSerj, tropicsAviaryWithoutPound);
admin.doAction("CheckIn", hippopotamusSerj, tropicsAviarySmallSize);

admin.doAction("CheckIn", hippopotamusSerj, tropicsAviary);
admin.doAction("CheckIn", dogSasa, tropicsAviary);
admin.doAction("CheckIn", dogSasa, houseAviary);
admin.doAction("CheckIn", dogSasa, houseAviary);
admin.doAction("CheckIn", catMasha, houseAviary);
admin.doAction("CheckIn", dogVova, houseAviary);
admin.doAction("CheckOut", dogSasa, houseAviary);
admin.doAction("CheckOut", cowMusa, houseAviary);
admin.doAction("CheckIn", cowMusa, houseAviary);