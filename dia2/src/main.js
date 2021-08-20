const john = {
  name: 'John',
  surname: 'Doe',
  age: 30,
  hobbies: ['Surf', 'Design'],
}

const jane = Object.assign({}, john)

jane.name = 'Jane'
jane.hobbies = ["MuayThai", "Programming"];

console.log('John:', john)
console.log('Jane:', jane)
