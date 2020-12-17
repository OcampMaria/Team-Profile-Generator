const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const manager = [
    {
        type: 'input',
        name: 'name',
        message: "what is the Manager's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "what is the Manager's id?"
    },
    {
        type: 'input',
        name: 'email',
        message: "what is the Manager's email?"
    },
    {
        type: 'input',
        name: 'officenum',
        message: "what is the Manager's office number?"
    },
]

const engineer = [
    {
        type: 'input',
        name: 'name',
        message: "what is the engineer's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "what is the engineer's id?"
    },
    {
        type: 'input',
        name: 'email',
        message: "what is the engineer's email?"
    },
    {
        type: 'github',
        name: 'officenum',
        message: "what is the engineer's github username?"
    },
]
const intern = [
    {
        type: 'input',
        name: 'name',
        message: "what is the intern's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "what is the intern's id?"
    },
    {
        type: 'input',
        name: 'email',
        message: "what is the intern's email?"
    },
    {
        type: 'school',
        name: 'officenum',
        message: "what is the intern's school name?"
    },
]

const addemployee = () => {
    inquirer.prompt({
        type: 'confirm',
        name: 'addemployee',
        message: 'Do you want to add another employee?'
    }).then(response => {
        if (response.addemployee === true){
            inquirer.prompt({
                type: 'list',
                name: 'kind',
                choices:['manager', 'intern', 'engineer'],
                message: 'What kind of employee do you want to add?'
        }).then(response => {
            switch (response.kind) {
                case 'manager':
                    addmanager();
                    break;
                case 'engineer':
                    addEngineer();
                    break;
                case 'intern':
                    addIntern();
                    break;
                default:
                   console.log("done");
                
            }
        })
    }
    })
};


const addManager = ()=>(inquirer.prompt(manager)).then(data =>{
    const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
    employees.push(manager);
    addemployee ();

});

const addEngineer = ()=>(inquirer.prompt(engineer)).then(data =>{
    
    const engineer = new Engineer(data.name, data.id, data.email, data.github);
    employees.push(engineer);

    addemployee ()
});

const addIntern = ()=>(inquirer.prompt(intern)).then(data =>{
    const intern = new Intern(data.name, data.id, data.email, data.school);
    employees.push(intern);

    addemployee ()
});

const employees = [];

// function to initialize program
function init() {
    addManager();
    return fs.writeFileSync (outputPath, render(employees))
}
init();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
