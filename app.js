var DomStrings = {
  head: ".head",
  head1: ".head__text1",
  head2: ".head__text2",
  head3: ".head__text3",
};
var reply_click = function () {
  if (this.id === "1") {
    document.querySelector(DomStrings.head1).style.background = "#fff";
    document.querySelector(DomStrings.head2).style.background = "#0984e3";
    document.querySelector(DomStrings.head3).style.background = "#0984e3";
  } else if (this.id === "2") {
    document.querySelector(DomStrings.head2).style.background = "#fff";
    document.querySelector(DomStrings.head1).style.background = "#0984e3";
    document.querySelector(DomStrings.head3).style.background = "#0984e3";
  } else {
    document.querySelector(DomStrings.head3).style.background = "#fff";
    document.querySelector(DomStrings.head1).style.background = "#0984e3";
    document.querySelector(DomStrings.head2).style.background = "#0984e3";
  }
};
document.getElementById("1").onclick = reply_click;
document.getElementById("2").onclick = reply_click;
document.getElementById("3").onclick = reply_click;
var i = 0;
html = `<form class="col-sm-8">
  <div class="row">
      <div class="col-md-4 label-input">Данс нээх мөнгөн дүн:
      </div>
      <div class="col-md-4 box">
          <input value="1,000,000,00"> </input>
      </div>
      <div class="col-md-4 label-currency">ТӨГРӨГ
      </div>
  </div>
  <div class="row">
      <div class="col-md-4 label-input">Хадгаламжийн төрөл:
      </div>
      <div class="col-md-4 box">
          <select onchange="mmm"> </select>
      </div>

  </div>
  <div class="row">
      <div class="col-md-4 label-input">Хугацааны төрөл:
      </div>
      <div class="col-md-4 box">
          <select onchange="mmm"> </select>
      </div>
  </div>
  <div class="row">
      <div class="row">
          <div class="col-md-4 label-input">Хугацаа:
          </div>
          <div class="col-md-4 box">
              <input> </input>
          </div>
          <div class="col-md-4 label-currency">САР
          </div>
      </div>
      <div class="row">
          <div class="row">
              <div class="col-md-4 label-input">Данс нээх мөнгөн дүн:
              </div>
              <div class="col-md-4 box">
                  <input value="15.00"> </input>
              </div>
              <div class="col-md-4 label-currency">%САРААР
              </div>
          </div>
          <div class="row">
              <div class="row">
                  <div class="col-md-4 label-input">Сар бүр нэмэх дүн:
                  </div>
                  <div class="col-md-4 box">
                      <input value="0.00"> </input>
                  </div>

              </div>
              <div class="row">
                  <div class="row">
                      <div class="col-md-4 label-input">
                      </div>
                      <div class="col-md-4 box">
                          <button value="ТООЦООЛОХ"> ТООЦООЛОХ</button>
                      </div>

                  </div>
</form>`;
//document
//  .querySelector(".fa-chevron-right")
//  .addEventListener("click", function () {
//    console.log(i);
//    if (i === 0) {
//      ctrlAddItem(html);
//      // console.log(html);
//      i = 1;
//    } else {
//      html = ``;
//      ctrlAddItem(html);
//      i = 0;
//    }
//  });
//var ctrlAddItem = function (html) {
//  var y = html;
//  document.querySelector(".list").insertAdjacentHTML("beforeend", html);
//};

//document.querySelector(".submit").addEventListener("click", function () {
//  insert();
//});

//var insert = function () {
//  var items = [];
//  var x1 = document.querySelector(".money").value;
//  var m = document.querySelector(".month").value;
//  var addM = document.querySelector(".addMoney").value;
//  var procent = document.querySelector(".procent").value;
//  var x = parseInt(x1);
//  var proc = parseInt(procent);
//  var addMo = parseInt(addM);
//  var month = parseInt(m);
//  for (var i = 0; i < month; i++) {
//    var res;
//    x = x + addMo;
//    x = x + (x % 100) * proc;
//    alert(x);
//    res = res + result;
//    // items.push(x);
//  }
//  // alert(items);
//};

// Дэлгэцтэй ажиллах хэсэг
var uiController = (function () {
  var domStrings = {
    add__type: ".add__type",
    currency: ".currency",
    month: ".month",
    procent: ".procent",
    addMoney: ".addMoney",
    addBtn: ".addBtn",
  };

  return {
    getData: function () {
      return {
        type: document.querySelector(domStrings.add__type).value,
        currency: document.querySelector(domStrings.currency).value,
        month: document.querySelector(domStrings.month).value,
        procent: document.querySelector(domStrings.procent).value,
        addMoney: document.querySelector(domStrings.addMoney).value,
      };
    },
    getDomstrings: function () {
      return domStrings;
    },
  };
})();

// Хадгаламжийн хүүг тооцоолох хэсэг
var calculateController = (function () {
  var termOrTime = function (type, currency, month, procent, addMoney) {
    this.type = type;
    this.currency = currency;
    this.month = month;
    this.procent = procent;
    this.addMoney = addMoney;
  };

  var permanent = function (type, currency, month, procent, addMoney) {
    this.type = type;
    this.currency = currency;
    this.month = month;
    this.procent = procent;
    this.addMoney = addMoney;
  };
  var data = {
    items: {
      cur: [],
      rate: [],
    },
    totals: {
      curTotal: 0,
      rateTotal: 0,
    },
  };
  return {
    addItm: function (type, currency, month, procent, addMoney) {
      if (type === "inc") {
        for (var i = 0; i < month; i++) {
          data.items.cur.push(currency);
          data.items.rate.push((currency / 100) * procent);
        }

        data.totals.curTotal = currency + (currency / 100) * procent * month;
        data.totals.rateTotal = (currency / 100) * procent * month;
        console.log(data);
      } else {
        alert("hhaha");
      }
    },
  };
})();

// Програмын холбогч контроллер хэсэг
var appController = (function (uiController, calculateController) {
  // 1. Өгөгдлийг дэлгэцнээс олж авна
  var ctrlAddItem = function () {
    // 2. Өгөгдсөн мэдээлэлд тулгуурлаж үр дүнг тооцоолно
    var input = uiController.getData();
    calculateController.addItm(
      input.type,
      parseInt(input.currency),
      parseInt(input.month),
      parseFloat(input.procent),
      parseInt(input.addMoney)
    );
  };
  var setupEventListener = function () {
    var DOM = uiController.getDomstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function () {
      console.log("Application starting.....");
      setupEventListener();
    },
  };
})(uiController, calculateController);

appController.init();

// Дараагийн хийгдэх ажилууд......

// 1.calculateController-оор мэдээлэлүүдээ хүлээн аваад тухайн хэсэгт оруулсан өгөгдөлт харгалзах тооцоог бодож дэлгэцийн модуль руу дамжуулж үр дүнг харуулна
//....
// console.log-oor data-г харуулж байгаа. Дараагийн хийгдэх ажил бол тооцоог бүрэн дуусгаад DOM руу мэдээлэлийг харуулдаг байхааар гүйцээж хийнэ
