// Modern JavaScript (ES6+)
// Training examples

import { apiUrl, employeeList } from './constants.js';
import Employee from './Employee.js';
import Department from './Department.js';

console.log('===== 01. let, const and var =====');

function varExample() {
  if (false) {
    var num = 5;
  }
  console.log('var example:', num); // undefined
}

varExample();

let number = 2;
if (number === 2) {
  number = 5;
}
console.log('let can be reassigned:', number);

const developer = {
  name: 'James'
};
developer.name = 'Tom'; // The object property can change.
console.log('const object after property change:', developer);

console.log('===== 02. Template Literals =====');

const firstName = 'James';
const lastName = 'White';
const fullName = `${firstName} ${lastName}`;

console.log(`This full name is ${fullName}.`);

console.log('===== 03. Objects and Object Shorthand =====');

function addressMaker(city, state) {
  const newAddress = {
    city,
    state,
    country: 'US'
  };

  console.log(newAddress);
}

addressMaker('Riverwoods', 'Illinois');

const employee = {
  name: 'James',
  talk() {
    console.log(`${this.name} is talking.`);
  }
};

employee.talk();

console.log('===== 04. Object Destructuring =====');

const employeeDetails = {
  name: 'James White',
  role: 'Developer',
  address: {
    city: 'Riverwoods',
    state: 'Illinois'
  }
};

const {
  name,
  role,
  address: { city, state }
} = employeeDetails;

console.log(`${name} is a ${role} from ${city}, ${state}.`);

console.log('===== 05. Array Destructuring =====');

const names = ['James', 'White', 'New York'];
let [first, last, homeCity] = names;

first = 'Peter';

console.log(`${first} ${last} is from ${homeCity}.`);

console.log('===== 06. for...of =====');

const incomes = [62000, 70000, 80000];
let total = 0;

for (const income of incomes) {
  console.log(income);
  total += income;
}

console.log('Total income:', total);

const employees = [
  { name: 'Peter', city: 'New York' },
  { name: 'James', city: 'Paris' },
  { name: 'John', city: 'London' }
];

for (const emp of employees) {
  console.log(`${emp.name} lives in ${emp.city}`);
}

console.log('===== 07. Spread =====');

const teamFresh = ['Peter', 'James', 'John'];
const preserveOldTeam = [...teamFresh];

teamFresh.push('Bob');

console.log('Original team:', teamFresh);
console.log('Copied team:', preserveOldTeam);

const teamOTP = ['Jane', 'Jasper', 'Bob'];
const teamRoyals = ['Jerry', 'Mary'];

const combinedTeam = [
  ...teamFresh,
  ...teamOTP,
  'Manager Jerry',
  ...teamRoyals
];

console.log('Combined team:', combinedTeam);

const person = {
  name: 'James White',
  age: 26,
  city: 'New York'
};

const employeeWithDetails = {
  ...person,
  salary: 80000,
  role: 'Developer'
};

console.log('Combined object:', employeeWithDetails);

console.log('===== 08. Rest Parameters =====');

function add(...nums) {
  console.log('Numbers:', nums);
  return nums.reduce((sum, num) => sum + num, 0);
}

console.log('Sum:', add(1, 2, 3));

console.log('===== 09. Default Parameters =====');

function prodInstallSupport(developerName = 'Samson') {
  console.log(`Developer available for support: ${developerName}`);
}

prodInstallSupport('James');
prodInstallSupport();

console.log('===== 10. this =====');

const thisEmployee = {
  name: 'James',
  salaryCalc() {
    console.log('Object method this:', this);
    console.log(`${this.name}'s salary calculation`);
  }
};

thisEmployee.salaryCalc();

const salaryFunction = thisEmployee.salaryCalc.bind(thisEmployee);
salaryFunction();

console.log('===== 11. Arrow Functions =====');

const square = (num) => num * num;
console.log('Square:', square(5));

const employeeWithCities = {
  name: 'James',
  visitedCities: ['New York', 'Chicago', 'Riverwoods'],

  salaryCalc() {
    this.visitedCities.forEach((city) => {
      console.log(`${this.name} visited ${city}`);
    });
  }
};

employeeWithCities.salaryCalc();

console.log('===== 12. map() =====');

const bankList = [
  'Bank of America',
  'Discover',
  'Chase',
  'Wells Fargo'
];

const bankItems = bankList.map((bank) => `<li>${bank}</li>`);
document.querySelector('#array-results').innerHTML = bankItems.join('');

console.log('Mapped banks:', bankItems);

console.log('===== 13. filter() =====');

const developers = employeeList.filter(
  (emp) => emp.role === 'Developer'
);

console.log('Developers:', developers);

console.log('===== 14. find() =====');

const james = employeeList.find(
  (emp) => emp.name === 'James'
);

console.log('Found employee:', james);

console.log('===== 15. reduce() =====');

const salaries = employeeList.map((emp) => emp.salary);

const totalSalary = salaries.reduce(
  (totalAmount, salary) => totalAmount + salary,
  0
);

console.log('Total salary:', totalSalary);

console.log('===== 16. some() =====');

const hasHighSalary = salaries.some(
  (salary) => salary > 90000
);

console.log('At least one salary is above 90,000:', hasHighSalary);

console.log('===== 17. every() =====');

const allAboveMinimum = salaries.every(
  (salary) => salary > 50000
);

console.log('All salaries are above 50,000:', allAboveMinimum);

console.log('===== 18. includes() =====');

const cities = ['New York', 'Chicago', 'London'];

console.log('Includes Chicago:', cities.includes('Chicago'));
console.log('Name includes James:', 'James White'.includes('James'));

console.log('===== 19. Set =====');

const uniqueCities = new Set([
  'New York',
  'Chicago',
  'New York',
  'London'
]);

uniqueCities.add('Paris');

console.log('Unique cities:', uniqueCities);
console.log('Has Paris:', uniqueCities.has('Paris'));
console.log('Number of unique cities:', uniqueCities.size);

console.log('===== 20. Map =====');

const employeeMap = new Map();

employeeMap.set('emp1', 'James');
employeeMap.set('emp2', 'Jane');
employeeMap.set('emp3', 'John');

console.log('Employee emp1:', employeeMap.get('emp1'));
console.log('Has emp2:', employeeMap.has('emp2'));
console.log('Employee count:', employeeMap.size);

console.log('===== 21. Object.keys / values / entries =====');

console.log('Keys:', Object.keys(employeeDetails));
console.log('Values:', Object.values(employeeDetails));
console.log('Entries:', Object.entries(employeeDetails));

for (const [key, value] of Object.entries(employeeDetails)) {
  console.log(key, value);
}

console.log('===== 22. Classes =====');

const employee1 = new Employee('Jane');
const employee2 = new Employee('John');

employee1.salaryCalc();
employee2.salaryCalc();

console.log('===== 23. Inheritance =====');

const emp1 = new Department('James', 'BT');

emp1.departmentDetails();
emp1.salaryCalc();

console.log('===== 24. Promises =====');

const orderPizza = (flavor) => {
  return new Promise((resolve, reject) => {
    console.log('Ordering pizza...');

    setTimeout(() => {
      if (flavor === 'cheese') {
        resolve(`Your ${flavor} pizza is ready.`);
      } else {
        reject('Sorry, that pizza is not available.');
      }
    }, 1000);
  });
};

orderPizza('cheese')
  .then((success) => console.log(success))
  .catch((error) => console.log(error))
  .finally(() => console.log('Pizza order process completed.'));

console.log('===== 25. Promise.all / any / race =====');

const firstRequest = Promise.resolve('Users loaded');
const secondRequest = Promise.resolve('Products loaded');
const thirdRequest = Promise.resolve('Orders loaded');

Promise.all([firstRequest, secondRequest, thirdRequest])
  .then((results) => console.log('Promise.all:', results))
  .catch((error) => console.log('Promise.all error:', error));

Promise.any([
  Promise.reject('First request failed'),
  Promise.resolve('Second request succeeded'),
  Promise.resolve('Third request succeeded')
])
  .then((result) => console.log('Promise.any:', result))
  .catch((error) => console.log('Promise.any error:', error));

Promise.race([
  new Promise((resolve) => setTimeout(() => resolve('Fast request succeeded'), 500)),
  new Promise((resolve) => setTimeout(() => resolve('Slow request succeeded'), 1500))
])
  .then((result) => console.log('Promise.race:', result))
  .catch((error) => console.log('Promise.race error:', error));

console.log('===== 26. Fetch with Promise chaining =====');

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('Fetched comments:', data.slice(0, 3));
  })
  .catch((error) => {
    console.log('Fetch error:', error);
  });

console.log('===== 27. async / await =====');

async function getComments() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    console.log('async/await comments:', data.slice(0, 3));
  } catch (error) {
    console.log('async/await error:', error);
  }
}

getComments();

console.log('===== 28. POST with fetch =====');

async function createComment() {
  const comment = {
    name: 'James',
    email: 'james@example.com',
    body: 'Great post!'
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Created comment:', data);
  } catch (error) {
    console.log('POST error:', error);
  }
}

createComment();

console.log('Modern JavaScript training examples loaded.');
