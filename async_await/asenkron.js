/*
  Tüm postların fetch ile çekilerek 'response' adlı değişkene
  aktarılmadan bir sonraki satıra geçmeyi engellememiz gerekiyor.

  Bu nedenle beklemesini istediğimiz işlemin başına await, bu
  anahtar kelimeyi kullandığımız fonksiyonun başına da async yani
  asenkron ifadesini koyuyoruz. Veriyi json'a çevirirken; çevirme
  işlemine de fetch işlemine bağlı olması nedeniyle await ifadesini
  koymamız gerektiğine dikkat et!

  await => asynchronous wait
  async => asynchronous function 

  şeklinde aklında tutabilirsin.
*/

async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  console.log(response);
  data.forEach(items => {
    console.log(items);
  });
}

fetchPosts();

