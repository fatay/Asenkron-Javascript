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


function importTodo(newTodoItem, callback) {
  // Veritabanına yazmanın da zaman alacağını varsayalım.
  setTimeout(() => {
    allTodoList.push(newTodoItem);
    /* 
      Burada showTodoList() dersek çalışır ancak callback 
      ile modülerlik sağlanır yani diğer fonksiyonlar ile 
      de uyumlu çalışabilir bir hale getirilmiş olacaktır.
    */
    callback();
  }, 2000);
}

// Şu şekilde todo ekleyebiliriz;
importTodo({
  title : "Yapılacak İş #4",
  description: "Akşama teyzemi ziyaret edeceğim."
}, showTodoList);

/* 37 - 50
  Bu işlem aslında tam olarak şu anlama gelir;
  import işlemini tamamladıktan sonra, sana parametre 
  olarak gönderdiğim callback fonksiyonunu geri çağır.
  Zaten callback kelime anlamı olarak da "geri çağırma"
  demektir.
*/

importTodo(newTodoItem);
showTodoList();