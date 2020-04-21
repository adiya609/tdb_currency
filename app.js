var DomStrings = {
  head: ".head",
  head1: ".head__text1",
  head2: ".head__text2",
  head3: ".head__text3",
  table: ".table",
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
    addListItem: function (tooTsoo) {
      var html;
      var too = tooTsoo;
      console.log(too);
      html =
        '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

      html = html.replace("%id%", too.items.cur[0]);
      html = html.replace("$$DESCRIPTION$$", too.totals.rateTotal);
      html = html.replace("$$VALUE$$", too.items.rate[0]);
      // Бэлтгэсэн HTML ээ DOM хийж өгнө
      console.log(too.items.cur);
      console.log(too.totals.rateTotal);
      console.log(too.items.rate);
      //document
      //  .querySelector(domStrings.table)
      //  .insertAdjacentHTML("beforeend", html);
    },
  };
})();

// Хадгаламжийн хүүг тооцоолох хэсэг
var calculateController = (function () {
  var TermOrTime = function (type, currency, month, procent, addMoney) {
    this.type = type;
    this.currency = currency;
    this.month = month;
    this.procent = procent;
    this.addMoney = addMoney;
  };

  var Permanent = function (type, currency, month, procent, addMoney) {
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
        if (addMoney !== 0) {
          for (var i = 0; i < month; i++) {
            data.items.cur.push(currency);
            data.items.rate.push((currency / 100) * procent);
            currency = currency + addMoney;
          }
          var x = 0;
          for (var i = 0; i < month; i++) {
            x = x + data.items.rate[i];
          }
          data.totals.rateTotal = x;
          data.totals.curTotal = data.items.cur[month - 1] + x;
        } else {
          for (var i = 0; i < month; i++) {
            data.items.cur.push(currency);
            data.items.rate.push((currency / 100) * procent);
          }
          data.totals.curTotal = currency + (currency / 100) * procent * month;
          data.totals.rateTotal = (currency / 100) * procent * month;
        }
        //console.log(data);
        return data;
      } else alert("....");
    },
  };
})();

// Програмын холбогч контроллер хэсэг
var appController = (function (uiController, calculateController) {
  // 1. Өгөгдлийг дэлгэцнээс олж авна
  var ctrlAddItem = function () {
    // 2. Өгөгдсөн мэдээлэлд тулгуурлаж үр дүнг тооцоолно
    var input = uiController.getData();
    var tooTsoo = calculateController.addItm(
      input.type,
      parseInt(input.currency),
      parseInt(input.month),
      parseFloat(input.procent),
      parseInt(input.addMoney)
    );
    uiController.addListItem(tooTsoo);
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

// Динамик хүснэгт үүсгээд тухайн өгөгдөлийг харуулах эсвэл өгөгдлийг баганан хэлбэртэй харуулах
