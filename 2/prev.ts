interface WorkerItem {
    id: number,
    Name: string,
    surname: string,
    available: boolean,
    salary: number,
    category: Category
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
