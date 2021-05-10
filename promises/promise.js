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

/*
  Promise, 'söz vermek' demektir. Bu nedenle sonuca doğru bir şekilde
  varılıp varılmamasına göre yeni bir işleme gidilir veya hata mesajı
  ekranda gösterilir.

  Kısacası, bir işlemin bitip-bitmediğini anlayarak devam etmek istiyorsak
  promise kullanabiliriz.
*/
