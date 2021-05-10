# Asenkron-Javascript
### Asenkron Javascript (Türkçe Açıklamalarıyla) ###

Javascript içerisindeki diğer bazı konulara göre biraz daha karmaşık olan asenkron javascripti Türkçe yorum satırlarıyla ifade ettim. 
Asenkron Javascriptin mantıksal olarak işleyişini aşağıdaki diyagramlar yardımıyla da takip edebilirsiniz.

### Callbacks ###
Birbirlerine mantıksal/verisel olarak bağlı iki işlemin önce gerçekleşene göre tekrar çağrılması gerektiğinde.

![alt text](https://github.com/fatay/Asenkron-Javascript/blob/main/callbacks/callback1.jpg)
![alt text](https://github.com/fatay/Asenkron-Javascript/blob/main/callbacks/callback2.jpg)

### Promises ###
Bir fonksiyonun verdiği sözdeki işlevi yerine getirip-getirememesine göre bir yön çizmek istediğinde ve sözünde duranları .then() ile, durmayanları .catch() ile yakalamak istediğinde.

![alt text](https://github.com/fatay/Asenkron-Javascript/blob/main/promises/promise.jpg)

### Promise All ###
Birden fazla kez verilen sözlerin tamamının düzgün bir şekilde yerine getirilip getirmediğine bakarak işlem yapmak istediğinde.

![alt text](https://github.com/fatay/Asenkron-Javascript/blob/main/promise_all/promise_all.jpg)

### Async & Await ###
Kodun mantıksal olarak lineer aktığı ve üstte tamamlanmamış bir işlemin; alttaki kullanımlarında hata almasının olası olduğu durumlarda.
-> fetch() ve forEach() ile sanal gönderileri çekmek ve async await ile sonuçları:

![alt text](https://github.com/fatay/Asenkron-Javascript/blob/main/async_await/console_result.jpg)


Fatih Aydin, 2021
