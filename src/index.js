const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let showForm = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  showForm = !showForm
  if (showForm) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

const formEl = document.querySelector('.add-toy-form')
const toyCollection = document.querySelector('#toy-collection')

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
}


//add a single toy to the page

  function addToy(toy) {
    const newToyCard = document.createElement('div')
    newToyCard.className="card"
    newToyCard.innerHTML=(`<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>Likes: ${toy.likes}</p>
    <button class="like-btn">Like <3</button>`)
    toyCollection.append(newToyCard)
  }

// add multiple toys to the page

  function addToys(toys) {
    toys.forEach(toy => addToy(toy))
  }

// create a new toy using the form
formEl.addEventListener('submit', function(event) {
  event.preventDefault()

  const toy = {
    name: formEl.name.value,
    image: formEl.image.value,
    likes: 0
  }

  createToy(toy)
    .then(toy => addToy(toy))
    formEl.reset()
})

function createToy(toy) {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
} 

function updateToy(toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: { 
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: {
      "likes": toy.likes++
    }
  }).then(resp => resp.json())
} 


// const likeButton = document.querySelectorAll('.like-btn')
// likeButton.addEventListener('click', updateToy(toy))



// OR HERE!

getToys()
.then(toys => addToys(toys))