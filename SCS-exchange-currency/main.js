//1. 박스 2개 만들기
//2. 드랍 다운 리스트 만들기
//3. 환율 정보 가져오기
//4. 드랍 다운 리스트에서 아이템 선택하면 아이템이 바뀜
//5. 금액을 입력하면 환전이 자동으로 된다.
//6. 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위 기준으로 환전이 됨
//7. 숫자를 한국어로 읽는 법
//8. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 환율이 적용이 된다.

//내가 넣고 싶은 값이 여러 개일때 객체 타입을 사용하는 것이 좋다.
let currencyRatio = {
  USD:{
    KRW: 1383.94,
    USD: 1,
    VND: 23532.50,
    unit:"달러",
  },
  KRW:{
    USD:0.00072,
    KRW:1,
    VND:17.01,
    unit:"원",
  },
  VND:{
    USD:0.000042,
    KRW:0.059,
    VND:1,
    unit:"동",
  }
}
var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;
let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");
let fromCurrency = 'USD';
let toCurrency = 'USD';
// 1.console.log(currencyRatio.KRW.unit);

//2.console.log(currencyRatio['VND']['unit']);

//document라는 객체는 우리가 HTML 파일에 태그들을 들고올 수 있는 유용한 기능들을 제공
document
  .querySelectorAll("#from-currency-list a")
  .forEach((menu) => menu.addEventListener("click", function(item){
    //1. 버튼을 가져온다.
    //2. 버튼에 값을 바꾼다. (.textContent)
    document.getElementById("from-button").textContent = this.textContent;
    //3. 선택된 currency값을 변수에 저장해준다.
    fromCurrency = this.textContent;
    convert("from");
  }));

document
  .querySelectorAll("#to-currency-list a")
  .forEach((menu) => menu.addEventListener("click", function(item){
    document.getElementById("to-button").textContent = this.textContent;
    toCurrency = this.textContent;
    convert("from");
  }));

//키를 입력하는 순간/ 환전이되서/ 환전된 값이 보인다.
function convert(type){
  //1. 환전
  //얼마를 환전? 가지고 있는 돈의 종류가 뭔지, 바꾸고자 하는 돈의 종류가 뭔지?
  //돈 * 환율 = 환전금액
  let amount = 0;
  if (type == "from"){
    //입력값 받기
    amount = document.getElementById("from-input").value;
    //환전하기
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    //환전한값 보여주기
    document.getElementById("to-input").value = convertedAmount;
    //환전한값 한국어로
    renderKoreaNumber(amount, convertedAmount);
  } else {
    amount = document.getElementById("to-input").value;
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency]
    document.getElementById("from-input").value = convertedAmount;
    renderKoreaNumber(convertedAmount, amount);
  }
};


function renderKoreaNumber(from, to) {
  document.getElementById("fromNumToKorea").textContent =
    readNum(from) + currencyRatio[fromCurrency].unit;
  document.getElementById("toNumToKorea").textContent =
    readNum(to) + currencyRatio[toCurrency].unit;
}

function readNum(num) {
  let resultString = "";
  let resultArray = [];
  for (let i = 0;i < unitWords.length; i++){
    let unitResult =
      (num % Math.pow(splitUnit, i+1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
      resultString = String(resultArray[i] + unitWords[i] +  resultString)
  }
  return resultString;
}


