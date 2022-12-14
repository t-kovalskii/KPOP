interface WorkerItem {
    id: number,
    Name: string,
    surname: string,
    available: boolean,
    salary: number,
    category: Category
    markPrize?: PrizeLogger
}
enum Category {
    BusinessAnalyst, Developer, Desginer, QA, ScrumMaster
}

const getAllWorkers = () => {
    let workers: WorkerItem[] = [
        {id: 5, Name: 'Ivan', surname: 'Ivanov', available: true, salary: 1000, category: Category.BusinessAnalyst},
        {id: 8, Name: 'Petro', surname: 'Petrov', available: true, salary: 1500, category: Category.Desginer},
        {id: 9, Name: 'Vasyl', surname: 'Vasyliev', available: false, salary: 1600, category: Category.Developer},
        {id: 3, Name: 'Evgen', surname: 'Zhukov', available: true, salary: 1300, category: Category.QA}
    ];

    return workers;
}

const logFirstAvailable = (workers: WorkerItem[] = getAllWorkers()) => {
    console.log(`Workerns count: ${workers.length}`);

    for (let worker of workers) {
        if (worker.available) console.log(`Worker available: ${worker.Name} ${worker.surname}`);
    }
}

logFirstAvailable(getAllWorkers());


const getWorkersNameByCategory = (category: Category = Category.Desginer) => {
    const workers: Array<string> = [];

    for (let worker of getAllWorkers()) {
        if (worker.category === category) workers.push(worker.Name);
    }

    return workers;
}

const logWorkersName = (workers: string[]): void => {
    for (let name of workers) console.log(`${name}\n`);
}

logWorkersName(getWorkersNameByCategory(Category.Developer));

getAllWorkers().forEach(worker => console.log(`${worker.Name} ${worker.surname}`));

const getWorkerById = (id: number) => {
    const workers = getAllWorkers();
    const worker = workers.find(w => w.id === id);

    return [worker?.Name, worker?.surname, worker?.salary];
}

const createCustomerId = (name: string, id: number) => `${name} ${id}`;

let myId = 'sgfdrshsrhn';
console.log(createCustomerId('Ann', 10));

let idGenerator: typeof createCustomerId = (name: string, id: number) => `${name} ${id}`;
idGenerator = createCustomerId;
idGenerator('Ann', 20);

const createCustomer = (name: string, age?: number, city?: string) => {
    console.log(`name: ${name} ${age ? `age: ${age}` : ''} ${city ? `city: ${city} ` : ''}`);
}

createCustomer('Mike');
createCustomer('Mike', 34);
createCustomer('Mike', 34, 'Kyiv');

console.log(getWorkersNameByCategory());

logFirstAvailable();

const checkoutWorkers = (customer: string, ...workerIds: number[]) => {
    const result: string[] = []

    for (let worker of getAllWorkers()) {
        if (worker.id in workerIds) result.push(getWorkerById(worker.id).join(' '));
    }

    console.log(`cutomer: ${customer}`)

    return result;
}

const myWorkers = checkoutWorkers('Ann', 1, 2, 3, 4);
myWorkers.forEach(w => console.log(w));

const printWorker = (worker: WorkerItem) => `${worker.Name} ${worker.surname} got salary ${worker.salary}`;

type PrizeLogger = (s: string) => void;
const logPrize: PrizeLogger = (s: string) => undefined;
logPrize('abc');

interface Person {
    name: string,
    email: string
}
interface Author extends Person {
    numBooksPublished: number
}
interface Librarian extends Person {
    department: string,
    assistCustomer: (custName: string) => void
}

const favouriteAuthor: Author = {
    numBooksPublished: 133,
    name: "Name",
    email: "mail@mail.com"
};

// const favouriteLibrarian: Librarian = {
//     department: "department",
//     assistCustomer: (custName: string): void => {
//         console.log('customer assisted');
//     },
//     name: "Name",
//     email: "mail@mail.com"
// };

class UniversityLibrarian implements Librarian {
    constructor(name: string, department: string, email: string) {
        this.name = name;
        this.department = department;
        this.email = email;
    }

    department: string;
    assistCustomer(custName: string) {
        console.log(`${this.name} is assisting ${custName}`);
    }
    name: string;
    email: string;
}

const favouriteLibrarian: Librarian = new UniversityLibrarian('Mike', 'dep', 'mail');
favouriteLibrarian.assistCustomer('Mike');

abstract class ReferenceItem {
    constructor(newTitle: string, newYear: number) {
        this.title = newTitle;
        this.year = newYear;
        this._publisher = 'publisher';
    }

    protected title: string;
    protected year: number;

    static department: string = 'deparment';

    private _publisher: string;
    public get publisher() {
        return this._publisher.toUpperCase();
    }
    public set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    printItem(): void {
        console.log(`Department: ${ReferenceItem.department}`)
        console.log(`${this.title} was published ${this.year}`);
    }

    abstract printCitation(): void;
}

// const ref: ReferenceItem = new ReferenceItem('Title', 2022);
// ref.printItem();

// ref.publisher = 'publisher';
// console.log(ref.publisher);

class Encyclopedia extends ReferenceItem {
    constructor(newTitle: string, newYear: number, edition: number) {
        super(newTitle, newYear);
        this.edition = edition;
    }

    printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition}`)
    }

    printCitation() {
        console.log(`${this.title} - ${this.year}`);
    }

    public edition: number;
}

const refBook = new Encyclopedia('Enc title', 2022, 2);
refBook.printItem();
