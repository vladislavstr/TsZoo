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
    existPredators: boolean;
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
                checkIn(animal, aviary);
                return action;
            case "CheckOut":
                checkOut(animal, aviary);
                return action;
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

function checkThePossibility(animal: AcceptedAnimal, aviary: Aviary): boolean {    
    var aviaryNumber: number = listAviary.indexOf(aviary);

    console.log("#####################################################");
    console.log(`## are you trying to settle animal - ${animal.name} in the aviary - N${aviaryNumber} - ${aviary.biome} ##`);
    console.log("#####################################################");
    
    if(aviary.animals?.some(x=>x==animal)) { // I did not do the implementation of the search in the list of aviary
        console.log(`the animal - ${animal.name} already living in the aviary - N${aviaryNumber} - ${aviary.biome}`);
        return false;
    }
    if(aviary.spaceAvailable <= animal.spaceDemand){
        console.log(`space demand animal - ${animal.name} more than space available of the aviary - N${aviaryNumber} = ${aviary.spaceAvailable}`);
        return false;
    }
    if(animal.type.biome !== aviary.biome) {
        console.log(`the biom - ${animal.type.biome} of the animal - ${animal.name} \n does not match biom of the aviary - N${aviaryNumber} - ${aviary.biome}`);
        return false;
    }
    if(animal.type.pondDemand === true && aviary.pondInStock === false) {
        console.log(`the aviary - N${aviaryNumber} - ${aviary.biome} hase not pond. - ${animal.name} needs pond`);
        return false;
    }
    if(animal.type.isPredator === true && (aviary.animals[0].type !== animal.type)){
        console.log(`predators cannot live with other types of predators`);
        console.log(`in the aviary - N${aviaryNumber} - ${aviary.biome} already living ${aviary.animals[0].type} predators`);
        return false;
    }
    else{
        return true;
    }
}

function checkIn(animal: AcceptedAnimal, aviary: Aviary) {
    if(checkThePossibility(animal, aviary)){
        aviary.spaceAvailable -= animal.spaceDemand;
        aviary.animals?.push(animal);
        return `the animal - ${animal.name} settled in the aviary - N${listAviary.indexOf(aviary)}. \n Now - available space = ${aviary.biome}`;
    }
    else{
        return
    }
}

function checkOut(animal: AcceptedAnimal, aviary: Aviary) {
    if(aviary.animals?.some(x=>x==animal)){
        delete aviary.animals[aviary.animals?.indexOf(animal)];
        aviary.spaceAvailable += animal.spaceDemand;
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
const hippopotamus: AnimalType = createAnimalType("Hippopotamus", "Tropics", true, false);

let dogSasa = createAcceptedAnimal(dog, "Sasa", 5, 3);    
let catMasha = createAcceptedAnimal(cat, "Masha", 4, 2);
let hippopotamusSerj = createAcceptedAnimal(hippopotamus, "Serj", 80, 20);

let tropicsAviary = createAviary("Tropics", false, 600);
let houseAviary = createAviary("House", false, 600);

let admin = new Admin();

houseAviary.animals?.push(dogSasa);
houseAviary.animals?.push(catMasha);
// tropicsAviary.animals?.push(dogSasa);