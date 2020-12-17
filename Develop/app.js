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


const addmanager = ()=>(inquirer.prompt(manager)).then(responseAnswers =>{
    addemployee ()
});

const addEngineer = ()=>(inquirer.prompt(engineer)).then(responseAnswers =>{
    addemployee ()
});

const addIntern = ()=>(inquirer.prompt(intern)).then(responseAnswers =>{
    addemployee ()
});

const employees = [];

// function to initialize program
function init() {
    addmanager();
    return fs.writeFileSync (outputPath, render(employees))
}
init();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
