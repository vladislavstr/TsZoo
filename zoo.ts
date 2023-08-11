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
    animals?: AcceptedAnimal[];
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
    ): Aviary{
        let aviary = {
            biome: biome,
            pondInStock: pondInStock,
            spaceInTotal: spaceInTotal,
            spaceAvailable: spaceInTotal,
            animals: []
        }
        return aviary
    }
 
// function checkIn(animal: AcceptedAnimal, aviary: Aviary): void {
//     (animal.biome !== aviary.biome) ?
// }

type TypeOfBiome = "Tropics" | "House";

const dog: AnimalType = createAnimalType("Dog", "House", false, true);
const cat: AnimalType = createAnimalType("Cat", "House", false, true);
const jopa: AnimalType = createAnimalType("Dog", "Tropics", true, false);

var dogSasa = createAcceptedAnimal(dog, "Sasa", 5, 3);    
var catMasha = createAcceptedAnimal(cat, "Masha", 4, 2);

var tropicsAviary = createAviary("Tropics", false, 600);