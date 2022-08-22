function swap(obj) {
  const res = {}

  Object.keys(obj).forEach(function (value) {
    var key = obj[value]
    res[key] = value
  })
  return res
}

const myObj = {
  first: 1,
  second: 2,
  third: 3,
}

const result = {}

Object.entries(myObj).forEach(([key, value]) => {
  result[value] = key
})

console.log(result)
// { "1": "first", "2": "second", "3": "third" }

const myObj = {
  first: 1,
  second: 2,
  third: 3,
}

function swap(obj) {
  const res = {}

  Object.keys(obj).forEach(function (value) {
    var key = obj[value]
    res[key] = value
  })
  return res
}

const myObj = {
  first: 1,
  second: 2,
  third: 3,
}

function swap(obj) {
  for (var key of Object.keys(obj)) {
    obj[obj[key]] = key
    delete obj[key]
  }
}

swap(myObj)

console.log(myObj)

console.log(swap(myObj))

console.log(Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key])))
