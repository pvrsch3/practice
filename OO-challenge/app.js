//Part One
class Vehicle {
    constructor(make, model, year) {
        this.a = make;
        this.model = model; 
        this.year = year;
    }
    honk() {
        return "Beep.";
    }
    toString() {
        return ("The vehicle is a ${this.make} ${this.model} from ${this.year}.");
    }
}


//Part Two
class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

//Part Three
class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine () {
        return "VROOM!!!";
    }
}

//Part Four

class Garage {
    constructor(capacity) {
        this.vehicles = []; //array, not a number
        this.capacity = capacity;
    }
    add (newVehicle) {
        //if add something that is not a vehicle
        if(!(newVehicle instanceof Vehicle)) {
            return "Only vehicles are allowed in here!";
        }
        //garage is at capacity
        if (this.vehicles.length >= this.capacity) {
            return "Sorry, we're full.";
        }
        //if all is fine, vehicle added
        this.vehicles.push(newVehicle);
        return "Vehicle added!";
    }
}

