const readline = require ('readline')
const fs = require ('fs')
const chalk = require ('chalk')
const { exit, exitCode } = require('process')

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

beginKro()

function beginKro() {
    console.log(chalk.blue.inverse('\n\nChoose any command: \n\n 1. Enter Details \n 2. Delete Details \n 3. View All Details \n\n'))

    r1.question('Enter: ', (val) => {
        switch(parseInt(val)){
            case 1:
                addData()
                break;
            case 2:
                deleteData()    
                break;
            case 3:
                viewData()        
                break;
            default:
                console.log(chalk.red.inverse('Hey hey, watch out! Choose only from these 3!'))    
                continueKro()
            
        }
    })   
}

function continueKro(){
    const x=0;

    r1.question(chalk.greenBright.inverse('\nYou added the data yo, wanna add some more?'), (x) => {
        if(x==="y" || x==="Y"){
            beginKro();
        }else{
            console.log(chalk.yellow.inverse("\nCiao, mate."))
            exit(0)
        }            
    })
}


const object ={
    name: null,
    address: null
}

function addData () {
    
    r1.question('Enter your name: ', (Name) => {
        r1.question('Enter your address: ', (Address) => {
            object.name = Name;
            object.address = Address;
            const jsonString = JSON.stringify(object)
            fs.writeFileSync("data.json", jsonString, { flag: 'a' })
            continueKro();
        })
    }) 
}

function deleteData () {
    
    const dataBuffer = fs.readFileSync("data.json");
    const data = JSON.parse(dataBuffer);
    const filter = [];

    r1.question(chalk.redBright('Enter name of person, whose data is to be removed: '), (Name) => {
        for(let i=0 ; i < data.length; i++) {
            if(data[i].name !== Name) {
                filter.filter(data[i])
                console.log('Data removed successfully')
            }else{
                console.log(chalk.red('Yo, find another name. This one is not available'))
            }
        }

        const jsonString = JSON.stringify(filter)
        fs.writeFileSync("data.json", jsonString)
        continueKro()
    })
}

function viewData() {
    
    const dataBuffer = fs.readFileSync("data.json");
    console.table(JSON.parse(dataBuffer.toString()))
    continueKro();
}