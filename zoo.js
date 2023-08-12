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
var _a, _b, _c;
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
                return action;
            case "CheckOut":
                checkOut(animal, aviary);
                return action;
            case "CalculateAllFood":
                return calculateAllFood(listAviary);
                ;
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
function check(animal, aviary) {
    var _a;
    var aviaryNumber = listAviary.indexOf(aviary);
    console.log("are you trying to settle animal - ".concat(animal.name, " in the aviary - N").concat(aviaryNumber, " - ").concat(aviary.biome));
    if (animal.type.biome === aviary.biome) {
        console.log("the biom - ".concat(animal.type.biome, " of the animal - ").concat(animal.name, " \n does not match biom of the aviary - N").concat(aviaryNumber, " - ").concat(aviary.biome));
    }
    if (animal.type.pondDemand !== aviary.pondInStock) {
        console.log("".concat(animal.type.pondDemand, " !== ").concat(aviary.pondInStock));
    }
    if ((_a = aviary.animals) === null || _a === void 0 ? void 0 : _a.some(function (x) { return x == animal; })) {
        console.log("".concat(animal.name, " !== ").concat(aviary.pondInStock));
    }
    if (animal.spaceDemand <= aviary.spaceAvailable) {
        console.log("space demand ".concat(animal.name, " <= space available ").concat(aviary.spaceAvailable));
    }
}
function checkIn(animal, aviary) {
    var _a;
    check(animal, aviary);
    (_a = aviary.animals) === null || _a === void 0 ? void 0 : _a.push(animal);
}
function checkOut(animal, aviary) {
    var _a, _b;
    if ((_a = aviary.animals) === null || _a === void 0 ? void 0 : _a.some(function (x) { return x == animal; })) {
        delete aviary.animals[(_b = aviary.animals) === null || _b === void 0 ? void 0 : _b.indexOf(animal)];
        aviary.spaceAvailable += animal.spaceDemand;
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
var hippopotamus = createAnimalType("Hippopotamus", "Tropics", true, false);
var dogSasa = createAcceptedAnimal(dog, "Sasa", 5, 3);
var catMasha = createAcceptedAnimal(cat, "Masha", 4, 2);
var hippopotamusSerj = createAcceptedAnimal(hippopotamus, "Serj", 80, 20);
var tropicsAviary = createAviary("Tropics", false, 600);
var houseAviary = createAviary("House", false, 600);
var tom = new Admin();
(_a = houseAviary.animals) === null || _a === void 0 ? void 0 : _a.push(dogSasa);
(_b = houseAviary.animals) === null || _b === void 0 ? void 0 : _b.push(catMasha);
(_c = tropicsAviary.animals) === null || _c === void 0 ? void 0 : _c.push(dogSasa);
