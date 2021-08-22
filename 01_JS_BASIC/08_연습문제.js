const num1 = 2000;
const num2 = 3;
const text = `${num1} 원짜리 모자를 ${num2}개 구입하여, ${num1*num2}원을 지출하였습니다`;
console.log(text);















Product  = function(num, name, price, cost){
    this.num=num,
    this.name=name,
    this.price=price,
    this.cost=cost,
    this.getCost = function() {return this.cost;},
    this.getPrice = function() {return this.price;},
    this.toString = function() {
        console.log(`상품번호 : ${this.num}`);
        console.log(`상품명 : ${this.name}`);
        console.log(`가격 : ${this.prince}`);
        console.log(`원가 : ${this.cost}`);
    }
}
Product.prototype.getMargin = function(){
    return this.getPrice() - this.getCost();
}
product1 = new Product(1, '가방', 2000, 500);
product1.toString();
console.log( product1.getMargin() );












Product1  = function(num, name, price, cost){
    this.num=num,
    this.name=name,
    this.price=price,
    this.cost=cost,
    this.getCost = () => {return this.cost;},
    this.getPrice = () => {return this.price;},
    this.toString = () => {
        console.log(`상품번호 : ${this.num}`);
        console.log(`상품명 : ${this.name}`);
        console.log(`가격 : ${this.prince}`);
        console.log(`원가 : ${this.cost}`);
    }
}
Product1.prototype.getMargin = function(){
    return this.getPrice() - this.getCost();
}
product1 = new Product1(1, '가방', 2000, 500);
product1.toString();
console.log( product1.getMargin() );










const product2 = {
    num:101,
    name:'가방',
    price:2000,
    cost:1000,
    getCost:function(){return this.cost;},
    getPrice:function(){return this.price;},
    toString:function(){
        console.log(`상품번호 : ${this.num}`);
        console.log(`상품명 : ${this.name}`);
        console.log(`가격 : ${this.price}`);
        console.log(`원가 : ${this.cost}`);
    },
} 
product2.getMargin = function(){
    return this.getPrice() - this.getCost();
}
product2.toString();
console.log( product2.getMargin() );














const k = 20; 
const pm = new Promise( (resolve, reject) => {
  if (k%2 == 0) resolve('짝수입니다');
  else reject('홀수입니다');
} );
pm
    .then( ( message )=>{ 
        console.log( message ); 
     } )
    .catch( ( error )=>{ 
        console.error( error ); 
     } );















const k = 20; 
const pm = new Promise( (resolve, reject) => {
  if (k%2 == 0)     resolve('짝수입니다');
  else reject('홀수입니다');
} );
pm
    .then( ( message )=>{ 
        console.log( message ); 
        return new Promise( (resolve, reject)=>{
            resolve("짝수입니다");
        });
     })
     .then( ( message )=>{ 
        console.log( message );  
        return new Promise( (resolve, reject)=>{resolve("짝수입니다");} );
     } )
     .then( ( message )=>{ 
        console.log( message ); 
     } )
    .catch( ( error )=>{ 
        console.error( error ); 
     } );


     