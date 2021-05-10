/*
  Diyelim ki;
  Multi-Thread yapısına sahip bir servisimiz var.
  İş parçacıklarının tamamı bittikten sonra verileri
  göstermek istediğimiz bir durum hayal edelim.

  promise1 -> promise2 -> promise3...-> promiseN

  şeklinde zincirleme bir promise yazmak; refactoring
  açısından problem oluşturacaktır. İşte tam da bu
  durumda Promise.all(işler) metodunu kullanmamız gerekir.
*/

// Bir to-do listemiz olsun.
const allTodoList = [
  {
    title: "Yapılacak İş #1",
    description: "Odamı toplayacağım."
  },
  {
    title: "Yapılacak İş #2",
    description: "Asenkron JS öğreneceğim."
  },
  {
    title: "Yapılacak İş #3",
    description: "Markete uğrayıp elma alacağım."
  }
];

const todoList = document.getElementById("todoList");

// Yapılacaklar listesini göstereceğimiz fonksiyon.
function showTodoList() {
  // Verinin databaseden 2 saniyede geldiğini varsayalım.
  setTimeout(() => {
    let todoItems = "";
    allTodoList.forEach(item => {
      todoItems += `
        <li> 
          <b>${item.title}</b>
          <p>${item.description}</p> 
        </li>
      `;
    });
    todoList.innerHTML = todoItems;
  }, 1000);
}


function importTodo(newTodoItem) {
  // Bu fonksiyon bir promise geri döndürmelidir.
  return new Promise((resolve, reject) => {
    // Gelen itemın yazılmasının 2sn olduğunu varsayalım.
    setTimeout(() => {
      allTodoList.push(newTodoItem);
      const isErrorExist = false;
      /*
        İşlemin başarılı olup olmadığını belirten değişkenimiz
        isErrorExist adlı değişkenimiz olsun.

        Eğer işlem başarılıysa resolve, başarılı değilse reject
        metodu yürütülür. Promise muhakkak bu ikisinden biri
        yordamıyla çalışacaktır.
      */
      if(!isErrorExist) {
        resolve();
      } else {
        reject("Hata mevcut!");
      }
    }, 2000);
  });
}

// Şu şekilde todo ekleyebiliriz;
importTodo({
  title : "Yapılacak İş #4",
  description: "Akşama teyzemi ziyaret edeceğim."
}, showTodoList)
.then(response => { // Eğer işlem başarılıysa then bloguna girer.
  showTodoList();   // İşlem başarılı, to-do listesini göster.
})
.catch(e => {       // İşlem başarısızsa catch bloguna girecektir.
  console.log(e);    // Hata mesajını gösterebiliriz.
});

// Promise All için 4 adet farklı işlem tanımlayalım.
const p1 = Promise.resolve("P1");
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Ben ikinci promise.");
  }, 2000);
}); 
const p3 = 163924;
const p4 = fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());

// p1, p2, p3 ve p4 tamamlandığında (promise all) konsola yazdır.
Promise.all([p1, p2, p3, p4]).then(promises => {
  console.log("promises", promises);
});