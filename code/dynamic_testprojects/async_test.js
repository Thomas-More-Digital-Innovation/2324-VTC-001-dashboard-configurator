async function f1() {
    console.log("function 1!")
  }
  
async function f2() {
    console.log("function 2!")
}

async function f3() {
    console.log("function 3!")
}

async function execute() {
    await f2()
    await f1()
    f3()
}

execute()