const fs = require('fs');
const chalk=require('chalk');

const getNotes=()=>"Your Notes..."

const addNotes=(title,body)=>{
    const notes=loadNotes();
    const checkDuplicate=notes.filter((note)=>{
        return title===note.title
    })
    if(checkDuplicate.length===0){
        notes.push({
            title:title,
            body:body
        })
        console.log(chalk.green.inverse("Note added"))
    }
    else{
        console.log(chalk.red.inverse.bold('same title is already in notes'))
    }    
    saveNotes(notes)
    
}

const loadNotes=()=>{
    try {
        const dataStr=fs.readFileSync('notes.json')
        const data=JSON.parse(dataStr.toString())
        return data;
    } catch (error) {
        // console.log("here is err")
        return []        
    }
}

const removeNotes=(title)=>{
    const notes=loadNotes();
    const notesToKeep=notes.filter((note)=>{
        return title!==note.title
    })
    // console.log(notesToKeep)
    if(notes.length===0){
        console.log(chalk.red.inverse.bold('Notes is empty'))
    }
    else if(notes.length!==notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse("Note removed!"))
    }else{
        console.log(chalk.red.inverse.bold('No title found'))
    }
}

const saveNotes=(notes)=>{
    const data=JSON.stringify(notes)
    fs.writeFileSync('notes.json',data,(err)=>{
        if(err){
            throw err;
        }
    })
}

const readNotes=(title)=>{
    const notes=loadNotes();
    const check=notes.find(note=> note.title==title)
    if(check){
        console.log(chalk.blue(check.title)+" : "+check.body)
    }
    else{
        console.log(chalk.red.inverse.bold('Title not found'))
    }
}

const list=()=>{
    const notes=loadNotes()
    notes.forEach(element => {
        console.log(chalk.blue(element.title)+" : "+element.body)
    });
}

const updateNotes=(title,body)=>{
    const notes=loadNotes();
    const check=notes.find(note=>note.title===title)
    if(check){
        check.body=body
        saveNotes(notes)
        console.log(chalk.green.inverse.bold("Note updated!"))
    }
    else{
        console.log(chalk.red.inverse.bold('Title not found'))
    }
}

module.exports={
    addNotes:addNotes,
    getNotes:getNotes,
    removeNotes:removeNotes,
    readNotes:readNotes,
    list:list,
    updateNotes:updateNotes
}