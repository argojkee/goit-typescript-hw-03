interface IKey {
  getSignature(): number;
}

interface IPerson {
  getKey(): IKey;
}

interface IHouse {
  key: IKey;
  tenants: IPerson[];
  comeIn(person: IPerson): void;
  openDoor(key: IKey): void;
}

class Key implements IKey {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }

  getSignature() {
    return this.signature;
  }
}

class Person implements IPerson {
  constructor(private key: IKey) {}

  getKey() {
    return this.key;
  }
}

abstract class House implements IHouse {
  protected door: boolean = false;
  tenants: IPerson[] = [];

  constructor(public key: IKey) {
    this.key = key;
  }

  comeIn(person: IPerson) {
    if (this.door) {
      this.tenants.push(person);
    }
  }

  abstract openDoor(key: IKey): void;
}

class MyHouse extends House {
  constructor(key: IKey) {
    super(key);
  }

  openDoor(key: IKey) {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
