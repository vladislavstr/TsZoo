interface Animal {
    id: number;
    type: string;
    biome: TypeOfBiome;
    pondDemand: boolean;
    spaceDemand: number;
    isPredator: boolean;
}

interface AcceptedAnimal extends Animal {
    name: string;
    foodDemand: number;
}

interface Aviary {
    id: number;
    biome: TypeOfBiome;
    pondInStock: boolean;
    spaceAvailable: number;
    animals: [number];
}

type TypeOfBiome = "Tropics" | "House";

// function checkIn(animal: AcceptedAnimal, aviary: Aviary): void {
//     (animal.biome !== aviary.biome) ?
// }

const tigre: Animal = {
    id: 1,
    type: "Tigre",
    biome: "Tropics",
    pondDemand: false,
    spaceDemand: 5,
    isPredator: true,
}

const A: AcceptedAnimal{
    
}

