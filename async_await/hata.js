/*
	const veri = ... Veritabanından gelen bir sonucu veri değişkenine atıyor olalım.
	veri.foreach(item => {
		console.log(item);
	});
	
	
	Burada verinin veritabanından çekilmesi uzun süreceğinden; alt satıra geçip elemanlara
	ulaşılmak istendiğinde hata mesajı verecektir. Bu durumda async ve await kullanılmalı.

	Örnek olarak hatalı kullanım aşağıda verilmiştir. Promise pending<bekliyor> durumdayken;
	forEach() ile erişmek hata verecektir.

	Hata!: forEach() is not a function
*/

function fetchPosts() {
  const response = fetch('https://jsonplaceholder.typicode.com/posts');
  console.log(response);
  response.forEach(items => {
    console.log(items);
  });
}

fetchPosts();


