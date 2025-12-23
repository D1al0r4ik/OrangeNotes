let tema = document.getElementById("TitleInput")
let text = document.getElementById("TextInput")
let saveButton = document.querySelector(".SaveButton")
let plusButton = document.querySelector(".PlusNotes")
let ListOfNotes = document.querySelector(".ListOfNotes")
let notes = []
let currentNumber = null
let DeleteButton = document.querySelector(".DeleteButton")
function Save() {
    notes[currentNumber].title = tema.value
    notes[currentNumber].text = text.value
    renderNotes()
}

function renderNotes(){
    ListOfNotes.innerHTML = `<h1>Заметки:</h1>`
    notes.forEach((notes, index) => {
    let i = document.createElement("div")
    i.className = "Zametka"
    if (currentNumber==index) {
        i.classList.add("active")
    }
    i.addEventListener("click", ()=>{openNote(index)})
    let title = document.createElement("h1")
    title.innerHTML = notes.title.slice(0, 20) + (notes.title.length > 20 ? "..." : "")
        if (tema.value=="") {
        title.innerHTML = "Заметка №"+ (index+1)
    }
    i.appendChild(title)
    ListOfNotes.appendChild(i)
     })
     SaveLocal()
}
function addNotes() {
    let u = document.createElement("div")
    notes.push({
        title: "Новая заметка",
        text: ""
    })
    renderNotes()
    openNote(notes.length - 1)
}

function openNote (index){
    currentNumber = index
    tema.value = notes[index].title
    text.value = notes[index].text
    renderNotes()
}

function deleteNote (index) {
    notes.splice(currentNumber, 1)
    if (notes.length>0){
        currentNumber=notes.length-1
        openNote(currentNumber)
    } else{
        currentNumber==null
        tema.value = ""
        text.value = ""
    }
    renderNotes()
}

function SaveLocal() {
    localStorage.setItem("notesData", JSON.stringify(notes))

}

function loader(){
    const data = localStorage.getItem("notesData")

    if(data){
        notes = JSON.parse(data)
    }
}

saveButton.addEventListener("click", Save)
plusButton.addEventListener("click", addNotes)
DeleteButton.addEventListener("click", deleteNote)
loader()
renderNotes()
if(notes.length > 0){
    openNote(0)
} else{
    addNotes()
}
