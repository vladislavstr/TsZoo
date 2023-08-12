var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var listAviary = [];
var NeverError = /** @class */ (function (_super) {
    __extends(NeverError, _super);
    function NeverError(value) {
        return _super.call(this, "Unreachable statement: ".concat(value)) || this;
    }
    return NeverError;
}(Error));
var Admin = /** @class */ (function () {
    function Admin() {
    }
    Admin.prototype.doAction = function (action, animal, aviary) {
        switch (action) {
            case "CheckIn":
                return checkIn(animal, aviary);
            case "CheckOut":
                return checkOut(animal, aviary);
            case "CalculateAllFood":
                return calculateAllFood(listAviary);
                ; //I wonder why it works without an optional function parameter pointer
            default:
                throw new NeverError(action);
        }
    };
    return Admin;
}());
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
        existPredators: false,
        spaceInTotal: spaceInTotal,
        spaceAvailable: spaceInTotal,
        animals: []
    };
    listAviary.push(aviary);
    return aviary;
}
function checkPredatorsTypeInAviary(aviary) {
    var animals = aviary.animals;
    if (aviary.animals.length !== 0) {
        return animals[0].type;
    }
    else
        return true;
}
function checkThePossibility(animal, aviary) {
    var _a;
    var aviaryNumber = listAviary.indexOf(aviary);
    console.log("#####################################################");
    console.log("## are you trying to settle animal - ".concat(animal.name, " in the aviary - N").concat(aviaryNumber, " - ").concat(aviary.biome, " ##"));
    console.log("#####################################################");
    if (aviary.animals.length !== 0) {
        if ((_a = aviary.animals) === null || _a === void 0 ? void 0 : _a.some(function (x) { return x == animal; })) { // I did not do the implementation of the search in the list of aviary
            console.log("the animal - ".concat(animal.name, " already living in the aviary - N").concat(aviaryNumber, " - ").concat(aviary.biome));
            return false;
        }
        // else if(aviary.spaceAvailable <= animal.spaceDemand){
        //     console.log(`space demand animal - ${animal.name} more than space available of the aviary - N${aviaryNumber} = ${aviary.spaceAvailable}`);
        //     return false;
        // }
        else if (animal.type.isPredator === false && aviary.animals[0].type.isPredator === true) {
            console.log("the animal - ".concat(animal.name, " cannot live with predators"));
            console.log("in the aviary - N".concat(aviaryNumber, " - ").concat(aviary.biome, " already living ").concat(aviary.animals[0].type.type, " predators"));
            return false;
        }
        else if (animal.type.isPredator === true && (aviary.animals[0].type !== animal.type)) {
            console.log("predators cannot live with other types of predators");
            console.log("in the aviary - N".concat(aviaryNumber, " - ").concat(aviary.biome, " already living ").concat(aviary.animals[0].type.type, " predators"));
            return false;
        }
        // else{
        //     return true;
        // }
    }
    if (animal.type.biome != aviary.biome) {
        console.log("the biome - ".concat(animal.type.biome, " of the animal - ").concat(animal.name, " \n does not match biom of the aviary - N").concat(aviaryNumber, " - ").concat(aviary.biome));
        return false;
    }
    else if (animal.type.pondDemand === true && aviary.pondInStock == false) {
        console.log("the aviary - N".concat(aviaryNumber, " - ").concat(aviary.biome, " hase not pond. - ").concat(animal.name, " needs pond"));
        return false;
    }
    else {
        return true;
    }
}
function checkIn(animal, aviary) {
    var _a;
    if (checkThePossibility(animal, aviary)) {
        if (aviary.spaceAvailable <= animal.spaceDemand) {
            console.log("space demand animal - ".concat(animal.name, " more than space available of the aviary - N").concat(listAviary.indexOf(aviary), " = ").concat(aviary.spaceAvailable));
            return false;
        }
        aviary.spaceAvailable -= animal.spaceDemand;
        (_a = aviary.animals) === null || _a === void 0 ? void 0 : _a.push(animal);
        console.log("the animal - ".concat(animal.name, " settled in the aviary - N").concat(listAviary.indexOf(aviary), ". \n Now - available space = ").concat(aviary.spaceAvailable));
        return aviary;
    }
    else {
        return "try another one aviary for the animal - ".concat(animal.name);
    }
}
function checkOut(animal, aviary) {
    var _a, _b;
    if ((_a = aviary.animals) === null || _a === void 0 ? void 0 : _a.some(function (x) { return x == animal; })) {
        delete aviary.animals[(_b = aviary.animals) === null || _b === void 0 ? void 0 : _b.indexOf(animal)];
        aviary.spaceAvailable += animal.spaceDemand;
        aviary.animals.sort(function (a, b) { return (a.name < b.name ? -1 : 1); });
        console.log("Ok ".concat(animal.name, " moved out from ").concat(listAviary.indexOf(aviary), " - ").concat(aviary.biome));
        return aviary;
    }
    else {
        return console.log("".concat(animal.name, " not at ").concat(aviary.biome));
    }
}
function calculateAllFood(listAviary) {
    var sum = 0;
    listAviary.forEach(function (item) {
        var _a;
        (_a = item.animals) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
            sum += item.foodDemand;
        });
    });
    return sum;
}
var dog = createAnimalType("Dog", "House", false, true);
var cat = createAnimalType("Cat", "House", false, true);
var cow = createAnimalType("Cow", "House", false, false);
var hippopotamus = createAnimalType("Hippopotamus", "Tropics", true, false);
var dogSasa = createAcceptedAnimal(dog, "Sasa", 5, 3);
var dogVova = createAcceptedAnimal(dog, "Vova", 5, 3);
var dogLiza = createAcceptedAnimal(dog, "Liza", 5, 3);
var cowMusa = createAcceptedAnimal(cow, "Musa", 5, 1);
var catMasha = createAcceptedAnimal(cat, "Masha", 4, 2);
var hippopotamusSerj = createAcceptedAnimal(hippopotamus, "Serj", 80, 20);
var tropicsAviary = createAviary("Tropics", false, 600);
var tropicsAviaryWithoutPound = createAviary("Tropics", false, 600);
var tropicsAviarySmallSize = createAviary("Tropics", false, 6);
var houseAviary = createAviary("House", false, 11);
var admin = new Admin();
// admin.doAction("CheckIn", cowMusa, houseAviary);
// admin.doAction("CheckIn", hippopotamusSerj, houseAviary);
// admin.doAction("CheckIn", hippopotamusSerj, houseAviary);
// admin.doAction("CheckIn", hippopotamusSerj, tropicsAviaryWithoutPound);
// admin.doAction("CheckIn", hippopotamusSerj, tropicsAviarySmallSize);
// admin.doAction("CheckIn", hippopotamusSerj, tropicsAviary);
// admin.doAction("CheckIn", dogSasa, tropicsAviary);
// admin.doAction("CheckIn", dogSasa, houseAviary);
// admin.doAction("CheckIn", dogSasa, houseAviary);
// admin.doAction("CheckIn", catMasha, houseAviary);
// admin.doAction("CheckIn", dogVova, houseAviary);
// admin.doAction("CheckOut", dogSasa, houseAviary);
// admin.doAction("CheckOut", cowMusa, houseAviary);
// admin.doAction("CheckIn", cowMusa, houseAviary);
