function createAnimalType(type, biome, pondDemand, isPredator) {
    var animalType = {
        type: type,
        biome: biome,
        pondDemand: pondDemand,
        isPredator: isPredator,
    };
    return animalType;
}
function createAcceptedAnimal(type, name, spaceDemand, foodDemand) {
    var animal = {
        type: type,
        name: name,
        spaceDemand: spaceDemand,
        foodDemand: foodDemand
    };
    return animal;
}
function createAviary(biome, pondInStock, spaceInTotal) {
    var aviary = {
        biome: biome,
        pondInStock: pondInStock,
        spaceInTotal: spaceInTotal,
        spaceAvailable: spaceInTotal,
        animals: []
    };
    return aviary;
}
var dog = createAnimalType("Dog", "House", false, true);
var cat = createAnimalType("Cat", "House", false, true);
var jopa = createAnimalType("Dog", "Tropics", true, false);
var dogSasa = createAcceptedAnimal(dog, "Sasa", 5, 3);
var catMasha = createAcceptedAnimal(cat, "Masha", 4, 2);
var tropicsAviary = createAviary("Tropics", false, 600);
tropicsAviary.spaceAvailable = 400;
