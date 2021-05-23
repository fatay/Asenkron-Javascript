# Asenkron-Javascript
### Asenkron Javascript (Türkçe Açıklamalarıyla) ###

Javascript içerisindeki diğer bazı konulara göre biraz daha karmaşık olan asenkron javascripti Türkçe yorum satırlarıyla ifade ettim. 
Asenkron Javascriptin mantıksal olarak işleyişini aşağıdaki diyagramlar yardımıyla da takip edebilirsiniz.

### Callbacks ###
Birbirlerine mantıksal/verisel olarak bağlı iki işlemin önce gerçekleşene göre tekrar çağrılması gerektiğinde kullanılır. Örnek olarak bir to-do listesi uygulamasında callback yapısı kullanılmadığında neden listenin düzgün görüntülenmediğini ve neden callback kullanmamız gerektiğini açıklayalım. 

Örneğin şu şekilde bir to-do listemiz var;
```js
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
```

Bu listeyi görüntülemek için şöyle bir metodumuz olsun ve görüntüleme işlemi 1 saniye sürsün;
```js
function showTodoList() {
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
  }, 1000); // 1sn
}
```

Bu listeye yeni bir eleman eklemek için şöyle bir metodumuz olsun ve bu işlem 3 saniye sürsün;
```js
function importTodo(newTodoItem, callback) {
  setTimeout(() => {
    allTodoList.push(newTodoItem);
    callback();
  }, 3000); // 3sn
}

// yeni eleman ekleyelim
importTodo({
  title : "Yapılacak İş #4",
  description: "Akşama teyzemi ziyaret edeceğim."
}, showTodoList);

```

Buradaki temel problem; görüntüleme işlemi 1 saniye ve eleman ekleme 3 saniye süreceğinden, görüntüleme işlemi önce bitecektir. Bu nedenle ekleme işlemi daha tamamlanmadan görüntüleme işlemi yapılacağından son olarak eklediğimiz "Yapılacak İş #4" listede görüntülenmeyecektir. Bu nedenle ekleme işlemi bittikten sonra görüntüleme metodunu tekrar çağırmalıyız.

![alt text](https://github.com/fatay/Asenkron-Javascript/blob/main/callbacks/callback0.png)
![alt text](https://github.com/fatay/Asenkron-Javascript/blob/main/callbacks/callback1.jpg)
![alt text](https://github.com/fatay/Asenkron-Javascript/blob/main/callbacks/callback2.jpg)

Yukarıdaki problemi, birbirlerini bekleyen asenkron bir yapı(async/await) kurarak promise ile daha iyi bir şekilde çözebiliriz.

### Async & Await ###
Bildiğimiz üzere derleyiciler veya yorumlayıcılar kodu yukarıdan aşağıya lineer bir şekilde okurlar. Bu durum birbirlerinin işlerini beklemesi gereken metod kullanımlarında hataya yol açar. 

Örneğin bir API kullanarak gönderileri çektiğimiz bir yapı olsun. Verilerin tamamı çekilmeden forEach ile verilere erişilmeye çalışılacağından .forEach not a function hatasını alırız.

Hatalı kullanım:
```js
function fetchPosts() {
  const response = fetch('https://jsonplaceholder.typicode.com/posts');
  console.log(response);
  response.forEach(items => {
    console.log(items);
  });
}
fetchPosts();
```

Verilerin tamamının çekilmesini bekleyeceğimiz asenkron yapıyı şu şekilde oluşturabiliriz;
Doğru kullanım:
```js
async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  console.log(response);
  data.forEach(items => {
    console.log(items);
  });
}
fetchPosts();
```

-> fetch() ve forEach() ile sanal gönderileri çekmek ve async await ile sonuçları:

![alt text](https://github.com/fatay/Asenkron-Javascript/blob/main/async_await/console_result.jpg)

Not: async & await yapısının kullanıldığı fonksiyonlar eğer return varsa asenkron olduğundan promise objesi döndürür. Bu nedenle async & await kullanılan ve return olan fonksiyonları çağırmak için .then() ve .catch() kullanılmalıdır!

### Promises ###
Bir fonksiyonun verdiği sözdeki işlevi yerine getirip-getirememesine göre bir yön çizmek istediğinde ve sözünde duranları .then() ile, durmayanları .catch() ile yakalamak istediğimizde kullanırız. Yine to-do list örneği üzerinden giderek bir örnek yapalım.

```js
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
```

![alt text](https://github.com/fatay/Asenkron-Javascript/blob/main/promises/promise.jpg)

### Promise All ###
Birden fazla kez verilen sözlerin tamamının düzgün bir şekilde yerine getirilip getirmediğine bakarak işlem yapmak istediğimizde kullanırız. Örneğin p1, p2, p3, p4 adlı birden fazla promise yapımız olsun. Bunların hepsi doğru biçimde gerçekleştiğinde konsola yazdırmasını isteyelim:

```js
Promise.all([p1, p2, p3, p4]).then(promises => {
  console.log("promises", promises);
});
```

![alt text](https://github.com/fatay/Asenkron-Javascript/blob/main/promise_all/promise_all.jpg)

Fatih Aydin, 2021
