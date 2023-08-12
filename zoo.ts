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
    animals?: AcceptedAnimal[];
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
                return action;

            case "CheckOut":
                checkOut(animal, aviary);
                return action;

            case "CalculateAllFood":
                return calculateAllFood(listAviary);;

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

function check(animal: AcceptedAnimal, aviary: Aviary): void | string | never {    
    var aviaryNumber: number = listAviary.indexOf(aviary);
    console.log(`are you trying to settle animal - ${animal.name} in the aviary - N${aviaryNumber} - ${aviary.biome}`)

    if(animal.type.biome === aviary.biome){
        console.log(`the biom - ${animal.type.biome} of the animal - ${animal.name} \n does not match biom of the aviary - N${aviaryNumber} - ${aviary.biome}`);
    }
    if(animal.type.pondDemand !== aviary.pondInStock){
        console.log(`${animal.type.pondDemand} !== ${aviary.pondInStock}`);
    }
    if(aviary.animals?.some(x=>x==animal)){
        console.log(`${animal.name} !== ${aviary.pondInStock}`);
    }
    if(animal.spaceDemand <= aviary.spaceAvailable){
        console.log(`space demand ${animal.name} <= space available ${aviary.spaceAvailable}`);
    }
}

function checkIn(animal: AcceptedAnimal, aviary: Aviary) {
    check(animal, aviary);
    aviary.animals?.push(animal)
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

let tom = new Admin();

houseAviary.animals?.push(dogSasa);
houseAviary.animals?.push(catMasha);
// tropicsAviary.animals?.push(dogSasa);