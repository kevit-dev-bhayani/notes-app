const chalk=require('chalk');
const yargs=require('yargs')
const notes=require('./notes.js')


//yargs.version('1.1.0')
yargs.command({
    command:'add',
    describe:"Add a new note",
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            // type:"string"
        },
        body:{
            describe:'Note body',
            demandOption:true,
            // type:"string"
        }
    },
    handler:(argv)=>{
        notes.addNotes(argv.title,argv.body)
    }
});

yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            // type:"string"
        }
    },
    handler:(argv)=>{
        notes.removeNotes(argv.title)
    }
});

yargs.command({
    command:'list',
    describe:'list all notes',
    handler:(argv)=>{
        notes.list()
    }
})

yargs.command({
    command:'read',
    describe:'read a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true
        }
    },
    handler:(argv)=>{
        notes.readNotes(argv.title)
    }
})

yargs.command({
    command:'update',
    describe:'updating a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true
        },
        body:{
            describe:'Note body',
            demandOption:true
        }
    },
    handler:(argv)=>{
        notes.updateNotes(argv.title,argv.body)
    }
    
})

// console.log(yargs.argv)

yargs.parse()