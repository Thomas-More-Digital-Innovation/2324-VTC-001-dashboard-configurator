function manipulateArray(array) {
  array.sort((a, b) => a.followNumber - b.followNumber);
  console.log(array.map((item) => item.name));
}

let array = [
  { name: "John", followNumber: 5 },
  { name: "Jane", followNumber: 1 },
  { name: "Doe", followNumber: 3 },
];

manipulateArray(array)
