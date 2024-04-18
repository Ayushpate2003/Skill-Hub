const timeouts = [],
  BixCharts = [],
  debug_msg = !1,
  btnLogin = document.querySelector("#btnLogin"),
  btnTheme = document.querySelector("#btnTheme"),
  btnShare = document.querySelector("#btnShare"),
  btnSearch = document.querySelector("#btnSearch"),
  txtSearchKey = document.querySelector("#txtSearchKey"),
  searchFormBox = document.querySelector("#search-form-box"),
  _MSG_PLZ_WAIT =
    (isNotNull(btnLogin) &&
      isNotNull(btnTheme) &&
      isNotNull(btnShare) &&
      isNotNull(btnSearch) &&
      isNotNull(txtSearchKey) &&
      isNotNull(searchFormBox) &&
      (btnSearch.addEventListener("click", (e) => {
        btnShare.classList.add("d-none"),
          btnTheme.classList.add("d-none"),
          btnLogin.classList.add("d-none"),
          btnSearch.classList.add("d-none"),
          searchFormBox.classList.contains("d-none") &&
            searchFormBox.classList.remove("d-none"),
          txtSearchKey.focus();
      }),
      txtSearchKey.addEventListener("focusout", (e) => {
        setTimeout(() => {
          searchFormBox.classList.contains("d-none") ||
            (searchFormBox.classList.contains("d-sm-block") &&
              searchFormBox.classList.remove("d-sm-block"),
            searchFormBox.classList.add("d-none"),
            searchFormBox.classList.add("d-sm-block")),
            btnShare.classList.contains("d-none") &&
              btnShare.classList.remove("d-none"),
            btnTheme.classList.contains("d-none") &&
              btnTheme.classList.remove("d-none"),
            btnLogin.classList.contains("d-none") &&
              btnLogin.classList.remove("d-none"),
            btnSearch.classList.contains("d-none") &&
              btnSearch.classList.remove("d-none");
        }, 100);
      })),
    isNotNull(btnShare) &&
      btnShare.addEventListener("click", async () => {
        var e = document.querySelector('meta[name="description"]');
        let t = document.title.trim();
        isNotNull(e) && (t = e.content.trim());
        try {
          var n = {
            title: document.title,
            text: t,
            url: document.location.href,
          };
          await navigator.share(n);
        } catch (e) {
          console.log("Error: " + e);
        }
      }),
    '<span class="warning">Please wait...</span>'),
  spacedParagraph = document.querySelectorAll("p"),
  sidebarNavWrapper = document.querySelector(".sidebar-nav-wrapper"),
  mainWrapper = document.querySelector(".main-wrapper"),
  menuToggleButton = document.querySelector("#menu-toggle"),
  menuToggleButtonIcon = document.querySelector("#menu-toggle i"),
  overlay = document.querySelector(".overlay"),
  togTheme = document.querySelector("#btnTheme"),
  optSelect = document.querySelectorAll(".bix-td-option"),
  heartBtn = document.querySelectorAll(".user-heart"),
  submitBixReport = document.querySelectorAll(".bix-report-btn"),
  onchangeBixReporTxt = document.querySelectorAll(".bix-report-txt"),
  ansDiv = document.querySelectorAll(".bix-div-answer");
let titleEle = document.querySelector("h1.add-color");
if (isNotNull(titleEle)) {
  let e = titleEle.innerHTML;
  "" != e &&
    0 < e.search("-") &&
    (titleEle.innerHTML = e
      .trim()
      .replace(/^(.*?)\s?-\s?(.*)$/im, "$1 :: <span>$2</span>"));
}
function BookMark(n, e, t, r, s) {
  n.classList.add("mdi-spin");
  httpPostJsonAsync(
    "/ajax/question",
    (e) => {
      if (isJson(e)) {
        e = JSON.parse(e);
        if ("true" == e.needLoginMdl)
          n.classList.contains("mdi-spin") && n.classList.remove("mdi-spin"),
            replyModalHandler(e);
        else if ("true" == e.status) {
          e = e.message.split("-");
          if (2 == e.length) {
            var t = e[0],
              e = e[1];
            if (
              ((n = document.getElementById("boomark_btn_id_" + e)),
              "Success" == t && n)
            )
              return (
                n.classList.contains("mdi-spin") &&
                  n.classList.remove("mdi-spin"),
                n.classList.contains("mdi-star-outline") &&
                  (n.classList.remove("mdi-star-outline"),
                  n.classList.add("mdi-star")),
                n.classList.add("text-warning"),
                !1
              );
            if ("Removed" == t && n)
              n.classList.contains("mdi-spin") &&
                n.classList.remove("mdi-spin"),
                n.classList.contains("text-warning") &&
                  n.classList.remove("text-warning"),
                n.classList.contains("mdi-star") &&
                  (n.classList.remove("mdi-star"),
                  n.classList.add("mdi-star-outline"));
          }
        }
      }
      return !1;
    },
    { type: "bookmark-btn", userkey: s, sid: e, tid: t, qid: r }
  );
}
function postHeart(e, t) {
  document
    .getElementById("sendheart_" + e + "_" + t)
    .classList.contains("mdi-heart-pulse") &&
    (document
      .getElementById("sendheart_" + e + "_" + t)
      .classList.remove("mdi-heart-pulse"),
    document
      .getElementById("sendheart_" + e + "_" + t)
      .classList.add("mdi-heart"),
    httpPostJsonAsync(
      "/ajax/heart",
      (e) => {
        return (
          isJson(e) &&
            ("true" == (e = JSON.parse(e)).status && "Success" == e.message
              ? console.log("Hearts counted..")
              : console.log(e.message)),
          !1
        );
      },
      { type: "heart-send", TileID: e, ID: t }
    ));
}
function isJson(e) {
  try {
    JSON.parse(e);
  } catch (e) {
    return !1;
  }
  return !0;
}
function httpGetAsync(e, t) {
  let n = new XMLHttpRequest();
  (n.onreadystatechange = function () {
    4 == n.readyState && 200 == n.status && t(n.responseText);
  }),
    n.open("GET", e, !0),
    n.send(null);
}
function httpPostJsonAsync(e, t, n) {
  var r = document.querySelector("#hdn_host"),
    r = ((n.isHost = isNotNull(r)), JSON.stringify(n));
  let s = new XMLHttpRequest();
  (e = e + "/" + getRndNumber(11111, 99999)),
    (s.onreadystatechange = function () {
      4 == s.readyState && 200 == s.status && t(s.responseText);
    }),
    s.open("POST", e, !0),
    s.setRequestHeader("Content-type", "application/json; charset=utf-8"),
    s.send(r);
}
function httpPostAsync(e, t, n) {
  var r = new FormData(),
    n = JSON.stringify(n);
  r.append("data", n);
  let s = new XMLHttpRequest();
  (s.onreadystatechange = function () {
    4 == s.readyState && 200 == s.status && t(s.responseText);
  }),
    s.open("POST", e, !0),
    s.overrideMimeType("text/plain; charset=x-user-defined-binary"),
    s.setRequestHeader("Content-disposition", "form-data"),
    s.setRequestHeader("X-Requested-With", "xmlhttprequest"),
    s.send(r);
}
function respTheme(e) {
  e = JSON.parse(e);
  console.log(e.message + " New Theme:" + e.data.theme);
}
function getRndNumber(e, t) {
  return Math.floor(Math.random() * (t - e)) + e;
}
function reloadPage() {
  window.location.reload();
}
spacedParagraph.forEach(function (e) {
  e.innerHTML = e.innerHTML.trim();
}),
  isNotNull(menuToggleButton) &&
    menuToggleButton.addEventListener("click", () => {
      sidebarNavWrapper.classList.toggle("active"),
        overlay.classList.add("active"),
        mainWrapper.classList.toggle("active"),
        1200 < document.body.clientWidth
          ? menuToggleButtonIcon.classList.contains("mdi-menu")
            ? (menuToggleButtonIcon.classList.remove("mdi-menu"),
              menuToggleButtonIcon.classList.add("mdi-menu-open"))
            : (menuToggleButtonIcon.classList.remove("mdi-menu-open"),
              menuToggleButtonIcon.classList.add("mdi-menu"))
          : menuToggleButtonIcon.classList.contains("mdi-menu") &&
            (menuToggleButtonIcon.classList.remove("mdi-menu"),
            menuToggleButtonIcon.classList.add("mdi-menu-open"));
    }),
  isNotNull(overlay) &&
    overlay.addEventListener("click", () => {
      sidebarNavWrapper.classList.remove("active"),
        overlay.classList.remove("active"),
        mainWrapper.classList.remove("active"),
        menuToggleButtonIcon.classList.remove("mdi-menu-open"),
        menuToggleButtonIcon.classList.add("mdi-menu");
    }),
  optSelect.forEach(function (t) {
    t.addEventListener("click", () => {
      var e = t.id.split("_");
      3 == e.length &&
        "tdOptionNo" == e[0] &&
        (document.getElementById("hdnAnswer_" + e[2]).value == e[1]
          ? (document
              .getElementById("tdOptionDt_" + e[1] + "_" + e[2])
              .classList.add("correct-ans"),
            new bootstrap.Collapse(
              document.getElementById("divAnswer_" + e[2])
            ).show())
          : (t.classList.add("dime"),
            document
              .getElementById("tdOptionDt_" + e[1] + "_" + e[2])
              .classList.add("dime")));
    });
  }),
  heartBtn.forEach(function (n) {
    n.addEventListener("click", () => {
      let t = n.id.split("_");
      var e;
      3 == t.length &&
        "sendheart" == t[0] &&
        (n.classList.contains("mdi-heart-outline")
          ? (n.classList.remove("mdi-heart-outline"),
            n.classList.add("mdi-heart-pulse"),
            (e = setTimeout(function () {
              postHeart(t[1], t[2]);
            }, 3e3)),
            (e = { QID: t[2], TimerID: e }),
            timeouts.push(e))
          : n.classList.contains("mdi-heart-pulse") &&
            timeouts.forEach((e) => {
              e.QID == t[2] &&
                (clearTimeout(e.TimerID),
                n.classList.remove("mdi-heart-pulse"),
                n.classList.add("mdi-heart-outline"));
            }));
    });
  }),
  isNotNull(togTheme) &&
    togTheme.addEventListener("click", () => {
      document.body.classList.contains("darkTheme")
        ? (document.body.classList.remove("darkTheme"),
          httpPostJsonAsync("/ajax/set-theme", respTheme, {
            theme: "light-mode",
          }),
          BixCharts.forEach((e) => {
            e.updateOptions({ theme: { mode: "light" } }), e.resetSeries();
          }))
        : (document.body.classList.add("darkTheme"),
          httpPostJsonAsync("/ajax/set-theme", respTheme, {
            theme: "dark-mode",
          }),
          BixCharts.forEach((e) => {
            e.updateOptions({ theme: { mode: "dark" } }), e.resetSeries();
          }));
    }),
  submitBixReport.forEach(function (e) {
    e.addEventListener("click", (e) => {
      e.preventDefault();
      var e = e.target,
        t = e.dataset.qid,
        n = e.dataset.sid,
        r = e.dataset.qno,
        s = document.querySelector("#txtBixReport_" + t);
      if (null == t || null == n || null == s || null == r) return !1;
      httpPostJsonAsync(
        "/ajax/question",
        (e) => {
          var t, n;
          return (
            !!isJson(e) &&
            ((e = JSON.parse(e)),
            (t = document.querySelector("#ques_resp_" + e.data.qid)),
            "true" == e.status
              ? (isNotNull(
                  (n = document.querySelector("#btnBixReport_" + e.data.qid))
                ) &&
                  ("Success" == e.message
                    ? (n.value = "Reported")
                    : (n.value = "Failed !"),
                  n.classList.remove("bix-reporting")),
                isNotNull(t) &&
                  (t.innerHTML =
                    '<div class="message">Thanks for the report.</div>'),
                !1)
              : void (
                  isNotNull(t) &&
                  (t.innerHTML =
                    '<div class="error">Reporting failed ! Try after sometime.</div>')
                ))
          );
        },
        {
          type: "bix-report",
          sid: n,
          qid: t,
          qno: r,
          rtxt: s.value,
          url: window.location.href,
        }
      ),
        e.classList.add("bix-reporting"),
        (e.value = "Wait.."),
        e.setAttribute("disabled", "disabled");
    });
  }),
  onchangeBixReporTxt.forEach(function (e) {
    e.addEventListener("input", (e) => {
      e.preventDefault();
      var e = e.target,
        t = e.dataset.qid;
      if (null == t) return !1;
      t = document.querySelector("#btnBixReport_" + t);
      isNotNull(t) &&
        (10 < e.value.length
          ? ((t.value = "Send Report"), t.removeAttribute("disabled"))
          : t.setAttribute("disabled", "disabled"));
    });
  }),
  ansDiv.forEach((t) => {
    if (t.classList.contains("lg-trans-mode")) {
      var e = JSON.parse(t.innerHTML),
        n = e.ciphertext,
        r = CryptoJS.enc.Hex.parse(e.salt),
        e = CryptoJS.enc.Hex.parse(e.iv),
        r = CryptoJS.PBKDF2(window.location.host, r, {
          hasher: CryptoJS.algo.SHA512,
          keySize: 8,
          iterations: 999,
        }),
        n = CryptoJS.AES.decrypt(n, r, { iv: e });
      try {
        t.innerHTML = n.toString(CryptoJS.enc.Utf8);
      } catch (e) {
        t.innerHTML = "IndiaBix.com";
      }
      t.classList.contains("d-none") && t.classList.remove("d-none");
    }
  });
const validateEmail = (e) =>
  String(e)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
function formSubmit(e) {
  document.querySelector("#" + e).submit();
}
function isDobValid(e) {
  var t = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(e),
    e = new Date(e),
    n = new Date().getFullYear(),
    r = new Date(),
    s = (r.setFullYear(n - 12), new Date());
  return (
    s.setFullYear(n - 110),
    t
      ? isNaN(e)
        ? "You date of birth is invalid."
        : r < e
        ? "You have to be older than 12."
        : e < s
        ? "You have to be younger than 110."
        : "OK"
      : "Please enter your DOB in DD-MM-YYYY format."
  );
}
function isValidInput(e) {
  return !(null == e || "" == e.trim());
}
function isValidNumber(e) {
  return !(null == e || "" == e.trim() || isNaN(e));
}
function isNotNull(e) {
  return null != e;
}
function makeVisible(e) {
  e.classList.contains("d-none") && e.classList.remove("d-none");
}
function textProcesserInitilize() {
  var e = document.querySelectorAll(".need-text-processer");
  isNotNull(e) &&
    e.forEach((e) => {
      e.id = "textSourceId_1";
      var t = document.createElement("div"),
        n = document.createElement("textarea"),
        r =
          (t.classList.add("text-process-toolbar"),
          t.classList.add("d-none"),
          (t.innerHTML =
            '<div class="d-flex text-sm" ><button id="btn_process_[[[text-id]]]" type="button"  data-process-id = "[[[text-id]]]" data-type="process" class="text-process-btn ms-3 bix-btn bix-btn-light"> Beautify </button><button id="btn_reset_[[[text-id]]]" type="button"  data-process-id = "[[[text-id]]]" data-type="reset" class="text-process-btn ms-2 bix-btn bix-btn-light"> Reset </button> <button id="btn_ac_[[[text-id]]]" type="button"  data-process-id = "[[[text-id]]]" data-type="ac" class="text-process-btn ms-auto bix-btn bix-btn-light"> ABC </button> <button id="btn_fc_[[[text-id]]]" type="button"  data-process-id = "[[[text-id]]]" data-type="fc" class="text-process-btn ms-2 bix-btn bix-btn-light"> Abc </button> <button id="btn_al_[[[text-id]]]" type="button"  data-process-id = "[[[text-id]]]" data-type="al" class="text-process-btn ms-2 bix-btn bix-btn-light me-3"> abc </button></div>'),
          (t.innerHTML = t.innerHTML.replaceAll(
            "[[[text-id]]]",
            (1).toString()
          )),
          e.after(t),
          (e.value.match(/\n/g) || []).length);
      let s = Math.floor(30 * r);
      500 < (s = s < 200 ? 200 : s) && (s = 500),
        (e.style.height = s.toString() + "px"),
        n.classList.add("d-none"),
        (n.id = "textSourceText_1"),
        (n.value = e.value),
        t.after(n);
      r = document.querySelectorAll(".text-process-btn");
      isNotNull(r) &&
        r.forEach((e) => {
          e.addEventListener("click", (e) => {
            e.preventDefault();
            var e = e.currentTarget,
              t = e.dataset.processId,
              e = e.dataset.type;
            if (isNotNull(document.querySelector("#textSourceId_" + t)))
              switch (e) {
                case "process":
                  processText(t);
                  break;
                case "reset":
                  processTextReset(t);
                  break;
                case "fc":
                  processTextFC(t);
                  break;
                case "ac":
                  processTextAC(t);
                  break;
                case "al":
                  processTextAL(t);
              }
          });
        }),
        e.addEventListener("focus", (e) => {
          var t = document.querySelector(".text-process-toolbar"),
            e = e.currentTarget;
          e.classList.contains("textBtmBr-3") || e.classList.add("textBtmBr-3"),
            t.classList.contains("d-none") && t.classList.remove("d-none");
        });
    });
}
function processTextReset(e) {
  var t = document.querySelector("#textSourceId_" + e),
    e = document.querySelector("#textSourceText_" + e);
  return isNotNull(e) && isNotNull(t) && (t.value = e.value), !1;
}
function processText(e) {
  e = document.querySelector("#textSourceId_" + e);
  let t = e.value;
  for (
    var n = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t =
        (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t =
          t.replace(/\.+/g, ".")).replace(/\n+/g, "\n\n")).replace(
          /&quot;/g,
          '"'
        )).replace(" govt. ", " government ")).replace(
          " Govt. ",
          " Government "
        )).replace(" engg. ", " engineering ")).replace(
          " Engg. ",
          " Engineering "
        )).replace(" b.e", " BE")).replace(" B.E", " BE")).replace(
          " B.E., ",
          " BE,"
        )).replace(" M.E", " ME")).replace(" m.e", " ME")).replace(
          " B.Sc",
          " BSc"
        )).replace(" M.Sc", " MSc ")).replace(" I.T", " IT")).replace(
        " mba",
        " MBA"
      )).replace(" M.B.A", " MBA")).replace(" Mba", " MBA")).replace(
        " m.b.a",
        " MBA"
      )).replace(" B.Tech", " B-Tech")).replace(" B.tech", " B-Tech")).replace(
        " b.tech",
        " B-Tech"
      )).replace(" i.e. ", " <i*e*>1 ")).replace(
        " i.e., ",
        " <i*e*>2 "
      )).replace(" i.e.,", " <i*e*>3 ")).replace(" i.e ", " <i*e*>4 ")).replace(
        " i.e.",
        " <i*e*>5 "
      )).split("\n"),
      r = 0;
    r < n.length;
    r++
  )
    n[r] = ParaProcessor(n[r].toString());
  (t = (t = (t = (t = (t = (t = (t = (t = n.join("\n").trim()).replace(
    /\) \./g,
    ")."
  )).replace(" <i*e*>1 ", " i.e. ")).replace(" <i*e*>2 ", " i.e., ")).replace(
    " <i*e*>3 ",
    " i.e., "
  )).replace(" <i*e*>4 ", " i.e. ")).replace(" <i*e*>5 ", " i.e.")).replace(
    "?.",
    "?"
  )),
    (e.value = t);
}
function ParaProcessor(e) {
  if (0 == (e = e.trim()).length) return "";
  for (var t = e.split("."), n = 0; n < t.length; n++)
    t[n] = SentenceProcessor(t[n]);
  return (
    "." != (e = (e = t.join(". ")).trim()).charAt(e.length - 1) &&
      "?" != e.charAt(e.length - 1) &&
      "," != e.charAt(e.length - 1) &&
      "!" != e.charAt(e.length - 1) &&
      (e += "."),
    e
  );
}
function SentenceProcessor(e) {
  if (0 == (e = e.trim()).length) return "";
  for (
    var t = (e = (e = (e = (e = (e = (e = (e = e.replace(/ +/g, " ")).replace(
        /\?+/g,
        "?"
      )).replace(/!+/g, "!")).replace(/,+/g, ",")).replace(
        /ï¿½+/g,
        "'"
      )).replace(/ *, */g, ", "))
        .replace(/ *\( */g, " (")
        .replace(/ *\) */g, ") ")).split(" "),
      n = 0;
    n < t.length;
    n++
  )
    t[n] = WordProcessor(t[n].toString());
  return (
    1 == t[0].toString().length
      ? (t[0] = t[0].toUpperCase())
      : (t[0] = t[0].charAt(0).toUpperCase() + t[0].substring(1)),
    t.join(" ")
  );
}
function WordProcessor(e) {
  return (
    "Ur" == (e = "ur" == e ? "your" : e)
      ? (e = "your")
      : "u" == e || "U" == e
      ? (e = "you")
      : "r" == e || "R" == e
      ? (e = "are")
      : "i'm" == e || "im" == e || "iam" == e || "Iam" == e
      ? (e = "I'm")
      : "i" == e
      ? (e = "I")
      : "gud" == e || "Gud" == e
      ? (e = "good")
      : "cud" == e || "Cud" == e
      ? (e = "could")
      : "wud" == e
      ? (e = "would")
      : "v" == e
      ? (e = "we")
      : "india" == e
      ? (e = "India")
      : "indian" == e
      ? (e = "Indian")
      : "dont" == e
      ? (e = "don't")
      : "didnt" == e
      ? (e = "didn't")
      : "wil" == e || "Wil" == e
      ? (e = "will")
      : "coz" == e ||
        "Coz" == e ||
        "bcoz" == e ||
        "Bcoz" == e ||
        "bcz" == e ||
        "Bcz" == e
      ? (e = "because")
      : "grt" == e || "Grt" == e
      ? (e = "great")
      : "hv" == e
      ? (e = "have")
      : "hw" == e
      ? (e = "how")
      : "tat" == e || "dat" == e
      ? (e = "that")
      : "plz" == e || "Plz" == e || "Pls" == e || "pls" == e
      ? (e = "please")
      : "crct" == e
      ? (e = "correct")
      : "dis" == e || "tis" == e || "Dis" == e
      ? (e = "this")
      : "den" == e
      ? (e = "then")
      : "y" == e
      ? (e = "why")
      : "stmt" == e
      ? (e = "statement")
      : "wht" == e || "wat" == e
      ? (e = "what")
      : "xplanation" == e
      ? (e = "explanation")
      : "becoz" == e
      ? (e = "because")
      : "frm" == e
      ? (e = "from")
      : "knw" == e
      ? (e = "know")
      : "bt" == e
      ? (e = "but")
      : "wid" == e
      ? (e = "with")
      : "wont" == e
      ? (e = "won't")
      : "abt" == e
      ? (e = "about")
      : "yr" == e
      ? (e = "year")
      : "yrs" == e
      ? (e = "years")
      : "wen" == e
      ? (e = "when")
      : "frnds" == e || "frns" == e
      ? (e = "friends")
      : "Frnds" == e
      ? (e = "Friends")
      : "Thnq" == e
      ? (e = "Thank you")
      : "thnq" == e
      ? (e = "thank you")
      : "Thanq" == e || "thanq" == e
      ? (e = "Thank you")
      : "any1" == e
      ? (e = "anyone")
      : "every1" == e
      ? (e = "everyone")
      : "xplain" == e
      ? (e = "explain")
      : "Thanx" == e
      ? (e = "Thanks")
      : "thanx" == e
      ? (e = "thanks")
      : "cant" == e
      ? (e = "can't")
      : "shud" == e || "shd" == e || "shld" == e
      ? (e = "should")
      : "thx" == e
      ? (e = "thanks")
      : "vry" == e
      ? (e = "very")
      : "thankz" == e
      ? (e = "thanks")
      : "thankyou" == e
      ? (e = " thank you")
      : "evn" == e
      ? (e = "even")
      : "deg" == e
      ? (e = "degree")
      : "whr" == e
      ? (e = "where")
      : "sum1" == e
      ? (e = "someone")
      : "ckt" == e
      ? (e = "circuit")
      : "Bcz," == e
      ? (e = "Because")
      : "xplain" == e
      ? (e = "explain")
      : "dont" == e
      ? (e = "don't")
      : "Thnx" == e
      ? (e = "Thanks")
      : "ans" == e
      ? (e = "answer")
      : "Ans" == e
      ? (e = "Answer")
      : "Ques" == e
      ? (e = "Question")
      : "ques" == e && (e = "question"),
    e
  );
}
function processTextFC(e) {
  var e = document.querySelector("#textSourceId_" + e),
    t = e.value;
  e.value = t.charAt(0).toUpperCase() + t.slice(1);
}
function processTextAC(e) {
  var e = document.querySelector("#textSourceId_" + e),
    t = e.value;
  e.value = t.toUpperCase();
}
function processTextAL(e) {
  var e = document.querySelector("#textSourceId_" + e),
    t = e.value;
  e.value = t.toLowerCase();
}
function jsonReplyHandler(t, n, r = null) {
  if (isJson(t)) {
    let e = JSON.parse(t);
    "true" == e.needLoginMdl
      ? ((n.innerHTML = ""), replyModalHandler(e))
      : null != r && "true" == e.status && "true" == e.override
      ? (r.innerHTML = e.html)
      : ("true" == e.reloadCaptcha &&
          isNotNull((r = document.getElementById("img_captcha"))) &&
          (r.src = "/user/captcha/" + getRndNumber(2e3, 1e4)),
        (n.innerHTML = e.html),
        "true" == e.reload &&
          "" != e.reloadUrl &&
          setTimeout(function () {
            window.location = e.reloadUrl;
          }, 500),
        "true" == e.needTextProcess && textProcesserInitilize());
  } else
    debug_msg
      ? (n.innerHTML = "X: " + t)
      : (n.innerHTML = makeErrorHtml("The Response is in invalid format."));
  return !1;
}
function jsonReplyModalLoader(e, t) {
  var n = t.querySelector(".modal-body"),
    r = t.querySelector(".modal-content"),
    t = new bootstrap.Modal(t, {}),
    r =
      (isJson(e) ||
        (r.innerHTML = makeErrorHtml("The Response is in invalid format.")),
      JSON.parse(e));
  return (
    "true" == r.needLoginMdl
      ? replyModalHandler(r)
      : ((n.innerHTML = r.html),
        "true" == r.needTextProcess && textProcesserInitilize(),
        t.show()),
    !1
  );
}
function logout() {
  httpPostJsonAsync(
    "/ajax/profile",
    () => {
      delete_cookie("bix_ses1"),
        delete_cookie("bix_ses2"),
        delete_cookie("bix_ses3"),
        0 < window.location.href.search("/user/")
          ? (window.location.href = "/user/login/")
          : reloadPage();
    },
    { type: "logout" }
  );
}
function delete_cookie(e) {
  document.cookie = e + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
function makeErrorHtml(e, t = 0) {
  return 1 == t
    ? '<span class="message">' + e + "</span>"
    : 2 == t
    ? '<span class="warning">' + e + "</span>"
    : '<span class="error">' + e + "</span>";
}
function isAvailLocalStroage() {
  var e = "IndiaBix";
  try {
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch (e) {
    return !1;
  }
}
function getCookie(e) {
  var n = e + "=",
    r = document.cookie.split(";");
  for (let t = 0; t < r.length; t++) {
    let e = r[t];
    for (; " " == e.charAt(0); ) e = e.substring(1);
    if (0 == e.indexOf(n)) return e.substring(n.length, e.length);
  }
  return "";
}
function replyModalHandler(e) {
  var t = document.getElementById("LogExpModal");
  isNotNull(t) &&
    ((t.querySelector(".modal-content").innerHTML = e.html),
    new bootstrap.Modal(t, {}).show());
}
function fullNameBeautifier(e) {
  (e.value = e.value.replaceAll(/[^a-zA-Z .]/g, "")),
    (e.value = e.value.replaceAll(/^ +$/g, "")),
    (e.value = e.value.replaceAll(/(\.? +\.)+/g, ".")),
    (e.value = e.value.replaceAll(/\.+/g, ".")),
    (e.value = e.value.replaceAll(/^\.(.*)$/g, "$1")),
    (e.value = e.value.replaceAll(/  +/g, " "));
}
const editQuestionLink = document.querySelectorAll(".ques-edit"),
  quesDeleteBtn = document.querySelector("#user-delete-question"),
  quesUpdateBtn = document.querySelector("#user-update-question");
function undoDeleteQuestion(e, t) {
  let n = document.querySelector("#js_resp_qedit");
  httpPostJsonAsync("/ajax/question", (e) => jsonReplyHandler(e, n), {
    type: "undo-delete-ques",
    subjectId: e,
    questionId: t,
  }),
    (n.innerHTML = _MSG_PLZ_WAIT);
}
function loadQuestion(e, t, n) {
  t = { type: "get-ques-edit-form", sid: t, qid: e, tid: n };
  let r = document.querySelector("#EditQuestionModal");
  httpPostJsonAsync("/ajax/question", (e) => jsonReplyModalLoader(e, r), t);
}
editQuestionLink.forEach(function (e) {
  e.addEventListener("click", (e) => {
    e.preventDefault();
    var e = e.currentTarget,
      t = e.dataset.qid,
      n = e.dataset.tid,
      e = e.dataset.sid;
    if (null == t || null == e || null == n) return !1;
    loadQuestion(t, e, n);
  });
}),
  isNotNull(quesUpdateBtn) &&
    quesUpdateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e = document.querySelector("#ques-edit-modal-form");
      let t = document.querySelector("#js_resp_qedit");
      var n = e.inp_qtxt.value,
        r = e.inp_opt1.value,
        s = e.inp_opt2.value,
        a = e.inp_opt3.value,
        o = e.inp_opt4.value,
        i = e.inp_opt5.value,
        l = e.inp_ansopt.value,
        u = e.inp_seq.value,
        c = e.inp_anstxt.value,
        d = e.inp_sid.value,
        p = e.inp_tid.value,
        m = e.inp_requestid.value,
        v = e.inp_quesansid.value;
      return isValidInput(n)
        ? isValidInput(r)
          ? isValidInput(s)
            ? isValidInput(a)
              ? isValidInput(o)
                ? isValidInput(i)
                  ? !isValidInput(l) || l < 1 || 5 < l
                    ? ((t.innerHTML = makeErrorHtml(
                        "The Answer Option is incorrect !"
                      )),
                      e.inp_ansopt.focus(),
                      !1)
                    : isValidInput(c)
                    ? (httpPostJsonAsync(
                        "/ajax/question",
                        (e) => jsonReplyHandler(e, t),
                        {
                          type: "save-ques-edited",
                          requestId: m,
                          subjectId: d,
                          topicId: p,
                          questionId: v,
                          questionTxt: n,
                          optionA: r,
                          optionB: s,
                          optionC: a,
                          optionD: o,
                          optionE: i,
                          answerOpt: l,
                          questionSeq: u,
                          answerTxt: c,
                        }
                      ),
                      void (t.innerHTML = _MSG_PLZ_WAIT))
                    : ((t.innerHTML = makeErrorHtml(
                        "The Answer Text is incorrect !"
                      )),
                      e.inp_anstxt.focus(),
                      !1)
                  : ((t.innerHTML = makeErrorHtml(
                      "The Option E Text is incorrect !"
                    )),
                    e.inp_opt5.focus(),
                    !1)
                : ((t.innerHTML = makeErrorHtml(
                    "The Option D Text is incorrect !"
                  )),
                  e.inp_opt4.focus(),
                  !1)
              : ((t.innerHTML = makeErrorHtml(
                  "The Option C Text is incorrect !"
                )),
                e.inp_opt3.focus(),
                !1)
            : ((t.innerHTML = makeErrorHtml(
                "The Option B Text is incorrect !"
              )),
              e.inp_opt2.focus(),
              !1)
          : ((t.innerHTML = makeErrorHtml("The Option A Text is incorrect !")),
            e.inp_opt1.focus(),
            !1)
        : ((t.innerHTML = makeErrorHtml("The Question Text is incorrect !")),
          e.inp_qtxt.focus(),
          !1);
    }),
  isNotNull(quesDeleteBtn) &&
    quesDeleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e = document.querySelector("#ques-edit-modal-form");
      let t = document.querySelector("#js_resp_qedit");
      httpPostJsonAsync("/ajax/question", (e) => jsonReplyHandler(e, t), {
        type: "delete-ques",
        subjectId: e.inp_sid.value,
        questionId: e.inp_quesansid.value,
      }),
        (t.innerHTML = _MSG_PLZ_WAIT);
    });
let techQuesEditMdl = document.querySelector("#EditTechQuesModal");
if (isNotNull(techQuesEditMdl)) {
  const Zb = document.querySelectorAll(".tech-ques-edit"),
    $b = document.querySelector("#tech-ques-delete"),
    _b = document.querySelector("#tech-ques-update");
  isNotNull(Zb) &&
    Zb.forEach(function (e) {
      e.addEventListener("click", (e) => {
        e.preventDefault();
        e = e.currentTarget.dataset.qid;
        if (null == e) return !1;
        e = { type: "get-tech-ques", techId: e };
        let t = document.querySelector("#EditTechQuesModal");
        httpPostJsonAsync(
          "/ajax/techques",
          (e) => jsonReplyModalLoader(e, t),
          e
        );
      });
    }),
    isNotNull(_b) &&
      _b.addEventListener("click", (e) => {
        e.preventDefault();
        e = document.querySelector("#tech-edit-modal-form");
        let t = document.querySelector("#js_resp_tedit");
        var n = e.inp_tech_ques.value,
          r = e.inp_tech_ans.value,
          s = e.inp_seq_no.value,
          a = e.inp_qid.value;
        return isValidInput(n)
          ? isValidInput(r)
            ? isValidNumber(s)
              ? (httpPostJsonAsync(
                  "/ajax/techques",
                  (e) => jsonReplyHandler(e, t),
                  {
                    type: "save-tech-ques-edited",
                    techId: a,
                    techQues: n,
                    techAns: r,
                    seqNo: s,
                  }
                ),
                void (t.innerHTML = _MSG_PLZ_WAIT))
              : ((t.innerHTML = makeErrorHtml(
                  "The Sequence is not valid number !"
                )),
                e.inp_seq_no.focus(),
                !1)
            : ((t.innerHTML = makeErrorHtml("The Answer Text is incorrect !")),
              e.inp_tech_ans.focus(),
              !1)
          : ((t.innerHTML = makeErrorHtml("The Question Text is incorrect !")),
            e.inp_tech_ques.focus(),
            !1);
      }),
    isNotNull($b) &&
      $b.addEventListener("click", (e) => {
        e.preventDefault();
        e = document.querySelector("#tech-edit-modal-form");
        let t = document.querySelector("#js_resp_tedit");
        httpPostJsonAsync("/ajax/techques", (e) => jsonReplyHandler(e, t), {
          type: "delete-tech-ques",
          techId: e.inp_qid.value,
        }),
          (t.innerHTML = _MSG_PLZ_WAIT);
      });
}
function undoDeleteTech(e) {
  let t = document.querySelector("#js_resp_tedit");
  httpPostJsonAsync("/ajax/techques", (e) => jsonReplyHandler(e, t), {
    type: "undo-delete-tech",
    techId: e,
  }),
    (t.innerHTML = _MSG_PLZ_WAIT);
}
const paperSubmitForm = document.querySelector("#paper-post-form");
if (isNotNull(paperSubmitForm)) {
  let e = document.querySelector("#inp_post_submit");
  isNotNull(paperSubmitForm.txtFullName) &&
    ["keyup", "focusout"].forEach(function (e) {
      paperSubmitForm.txtFullName.addEventListener(e, (e) => {
        fullNameBeautifier(e.currentTarget);
      });
    }),
    isNotNull(e) &&
      e.addEventListener("click", (e) => {
        e.preventDefault();
        let n = document.querySelector("#js_resp_paper");
        var e = paperSubmitForm.inp_paper_text.value.trim(),
          t = paperSubmitForm.inp_company_name.value.trim(),
          r = paperSubmitForm.inp_loc_date.value.trim(),
          s = paperSubmitForm.inp_location.value.trim(),
          a = paperSubmitForm.txtFullName.value.trim(),
          o = paperSubmitForm.txtEmailID.value.trim(),
          i = document.getElementById("anonymousPost").checked;
        return isValidInput(t)
          ? isValidInput(r)
            ? isValidInput(s)
              ? !isValidInput(e) || e.length < 50
                ? ((n.innerHTML = makeErrorHtml(
                    "The Paper Text length should be at least 50 characters long."
                  )),
                  paperSubmitForm.inp_paper_text.focus(),
                  !1)
                : (httpPostJsonAsync(
                    "/ajax/paper",
                    (e) => {
                      var t = document.querySelector("#inp_post_submit");
                      return (
                        isJson(e)
                          ? "true" == (e = JSON.parse(e)).needLoginMdl
                            ? ((n.innerHTML = ""), replyModalHandler(e))
                            : ("true" == e.status && (t.disabled = !0),
                              (n.innerHTML = e.html))
                          : (n.innerHTML = makeErrorHtml(
                              "The Response is in invalid format."
                            )),
                        !1
                      );
                    },
                    {
                      type: "new-paper-submit",
                      paperAuthor: a,
                      emailID: o,
                      location: s,
                      companyName: t,
                      paperText: e,
                      paperDate: r,
                      isAnonymous: i,
                    }
                  ),
                  void (n.innerHTML = _MSG_PLZ_WAIT))
              : ((n.innerHTML = makeErrorHtml(
                  "Please enter a valid location name."
                )),
                paperSubmitForm.inp_location.focus(),
                !1)
            : ((n.innerHTML = makeErrorHtml("Please select a date.")),
              paperSubmitForm.inp_loc_date.focus(),
              !1)
          : ((n.innerHTML = makeErrorHtml(
              "Please enter a valid company name."
            )),
            paperSubmitForm.inp_company_name.focus(),
            !1);
      });
}
const editPaperLink = document.querySelectorAll(".paper-edit"),
  paperDeleteBtn = document.querySelector("#user-delete-paper"),
  paperUpdateBtn = document.querySelector("#user-update-paper");
function undoDeletePaper(e) {
  let t = document.querySelector("#js_resp_pedit");
  httpPostJsonAsync("/ajax/paper", (e) => jsonReplyHandler(e, t), {
    type: "undo-delete-paper",
    paperId: e,
  }),
    (t.innerHTML = _MSG_PLZ_WAIT);
}
function loadPaper(e) {
  e = { type: "get-paper", paperId: e };
  let t = document.querySelector("#EditPaperModal");
  httpPostJsonAsync("/ajax/paper", (e) => jsonReplyModalLoader(e, t), e);
}
isNotNull(editPaperLink) &&
  editPaperLink.forEach(function (e) {
    e.addEventListener("click", (e) => {
      e.preventDefault();
      e = e.currentTarget.dataset.pid;
      if (null == e) return !1;
      loadPaper(e);
    });
  }),
  isNotNull(paperUpdateBtn) &&
    paperUpdateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e = document.querySelector("#paper-edit-modal-form");
      let t = document.querySelector("#js_resp_pedit");
      var n = e.inp_paper_head.value,
        r = e.inp_author_name.value,
        s = e.inp_paper_text.value,
        a = e.inp_pid.value;
      return isValidInput(n)
        ? isValidInput(r)
          ? isValidInput(s)
            ? (httpPostJsonAsync("/ajax/paper", (e) => jsonReplyHandler(e, t), {
                type: "save-paper-edited",
                paperId: a,
                paperAuthor: r,
                paperHeadText: n,
                paperText: s,
              }),
              void (t.innerHTML = _MSG_PLZ_WAIT))
            : ((t.innerHTML = makeErrorHtml("The Paper Text is incorrect !")),
              e.inp_paper_text.focus(),
              !1)
          : ((t.innerHTML = makeErrorHtml(
              "The Author name is incorrect format !"
            )),
            e.inp_author_name.focus(),
            !1)
        : ((t.innerHTML = makeErrorHtml(
            "The Paper Heading Text is incorrect !"
          )),
          e.inp_paper_head.focus(),
          !1);
    }),
  isNotNull(paperDeleteBtn) &&
    paperDeleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e = document.querySelector("#paper-edit-modal-form");
      let t = document.querySelector("#js_resp_pedit");
      httpPostJsonAsync("/ajax/paper", (e) => jsonReplyHandler(e, t), {
        type: "delete-paper",
        paperId: e.inp_pid.value,
      }),
        (t.innerHTML = _MSG_PLZ_WAIT);
    });
const recoverForm = document.querySelector("#acc_recover_form"),
  loginForm =
    (isNotNull(recoverForm) &&
      recoverForm.addEventListener("submit", (e) => {
        e.preventDefault();
        var e = recoverForm.inp_username.value.trim(),
          t = recoverForm.inp_sec_ans.value.trim(),
          n = recoverForm.inp_captcha.value.trim();
        let r = document.querySelector("#js_resp");
        httpPostJsonAsync(
          "/ajax/user",
          (e) => {
            if (isJson(e)) {
              var t,
                e = JSON.parse(e);
              if ("true" == e.status) {
                recoverForm.parentElement.innerHTML = e.html;
                let a = document.querySelector("#acc_set_pass_form");
                isNotNull(a) &&
                  a.addEventListener("submit", (e) => {
                    e.preventDefault();
                    let t = document.querySelector("#js_pass_resp");
                    var e = a.inp_pass.value,
                      n = a.inp_pass1.value,
                      r = a.hash_key.value,
                      s = a.user_key.value;
                    if (!(patt = /^(.){8,49}$/).test(e))
                      return (
                        (t.innerHTML = makeErrorHtml(
                          "Password: Minimum 8 characters long."
                        )),
                        (a.inp_pass.value = ""),
                        a.inp_pass.focus(),
                        !1
                      );
                    if (e != n)
                      return (
                        (t.innerHTML = makeErrorHtml(
                          "Password and Confirm Password does not match."
                        )),
                        a.inp_pass1.focus(),
                        !1
                      );
                    (a.inp_pass.value = ""),
                      (a.inp_pass1.value = ""),
                      (t.innerHTML = "");
                    httpPostJsonAsync(
                      "/ajax/user",
                      (e) => jsonReplyHandler(e, t, a.parentElement),
                      {
                        type: "set-new-pass",
                        userPass: SHA256(e),
                        secKey: r,
                        userKey: s,
                      }
                    ),
                      (t.innerHTML =
                        "<span class='message'>Please wait...</span>");
                  });
              } else
                "true" == e.reloadCaptcha &&
                  (isNotNull((t = document.getElementById("img_captcha"))) &&
                    (t.src = "/user/captcha/" + getRndNumber(2e3, 1e4)),
                  (recoverForm.inp_captcha.value = ""),
                  recoverForm.inp_captcha.focus());
              r.innerHTML = e.html;
            } else
              r.innerHTML = makeErrorHtml("The Response is in invalid format.");
            return !1;
          },
          { type: "forgot-pass", userName: e, ans1: t, userCaptcha: n }
        ),
          (r.innerHTML = "<span class='message'>Please wait...</span>");
      }),
    document.querySelector("#login_form")),
  bkMarkDeleteBtns =
    (isNotNull(loginForm) &&
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        var e = loginForm.inp_username.value.trim(),
          t = loginForm.inp_pass.value.trim(),
          n = !!loginForm.inp_chkbox.checked;
        let r = document.querySelector("#js_resp");
        (t = SHA256(t)),
          (loginForm.inp_pass.value = ""),
          (e = { type: "login", username: e, pass: t, rendme: n });
        httpPostJsonAsync("/ajax/user", (e) => jsonReplyHandler(e, r), e),
          (r.innerHTML = _MSG_PLZ_WAIT);
      }),
    document.querySelectorAll(".bookmark-delete-btn")),
  submitDiscussBtn =
    (bkMarkDeleteBtns.forEach(function (e) {
      e.addEventListener("click", (e) => {
        e.preventDefault();
        var t,
          e = e.currentTarget;
        return (
          "disabled" != e.getAttribute("disabled") &&
          null != (t = e.dataset.bid) &&
          (httpPostJsonAsync(
            "/ajax/question",
            (e) => {
              var t;
              return (
                isJson(e) &&
                  ("true" == (e = JSON.parse(e)).status &&
                  "Success" == e.message
                    ? isNotNull(
                        (t = document.querySelector(
                          "#bookmarkDeleteBtn_" + e.data.id
                        ))
                      ) && (t.innerHTML = "Deleted..")
                    : console.log(e.message)),
                !1
              );
            },
            { type: "bookmark-delete", bId: t }
          ),
          (e.innerHTML =
            '<span class="mdi mdi-spin mdi-loading"> Wait..</span>'),
          void e.setAttribute("disabled", "disabled"))
        );
      });
    }),
    document.querySelector("#btnPostComment")),
  discussEditForm = document.querySelector("#discussPostForm"),
  editDiscussionLink =
    (isNotNull(discussEditForm) &&
      ["keyup", "focusout"].forEach(function (e) {
        discussEditForm.txtFullName.addEventListener(e, (e) => {
          fullNameBeautifier(e.currentTarget);
        });
      }),
    isNotNull(submitDiscussBtn) &&
      submitDiscussBtn.addEventListener("click", (e) => {
        e.preventDefault();
        var e = discussEditForm.SubjectID.value,
          t = discussEditForm.QuesAnsID.value,
          n = discussEditForm.txtDiscussionText.value.trim(),
          r = discussEditForm.txtFullName.value.trim(),
          s = discussEditForm.txtEmailID.value.trim();
        let a = document.querySelector("#js_resp_discuss");
        var o = document.getElementById("anonymousPost").checked;
        if (n.length < 5)
          return (
            (a.innerHTML = makeErrorHtml(
              "The message length should be at least 5 characters long."
            )),
            !1
          );
        if (
          (null == document.getElementById("hdn_host") || o) &&
          !/^[a-zA-Z]([ ]?[a-zA-Z.]){2,49}$/.test(r)
        )
          return (
            (a.innerHTML = makeErrorHtml(
              "The full name should be at least 3 characters long."
            )),
            discussEditForm.txtFullName.focus(),
            !1
          );
        httpPostJsonAsync(
          "/ajax/discussion",
          (e) => {
            if (isJson(e)) {
              e = JSON.parse(e);
              if ("true" == e.needLoginMdl)
                (a.innerHTML = ""), replyModalHandler(e);
              else {
                if ("true" == e.status && "Success" == e.message)
                  return (
                    (discussEditForm.txtDiscussionText.value = ""),
                    submitDiscussBtn.setAttribute("disabled", "disabled"),
                    !(a.innerHTML =
                      "<span class='message'>Posted successfully.</span>")
                  );
                a.innerHTML = e.html;
              }
            } else
              a.innerHTML = makeErrorHtml("The Response is in invalid format.");
            return !1;
          },
          {
            type: "new-discuss-submit",
            subjectId: e,
            questionId: t,
            fullName: r,
            discussText: n,
            emailID: s,
            isAnonymous: o,
            url: window.location.href,
          }
        ),
          (a.innerHTML = _MSG_PLZ_WAIT);
      }),
    document.querySelectorAll(".discuss-edit")),
  discussDeleteBtn = document.querySelector("#user-delete-discussion"),
  discussUpdateBtn = document.querySelector("#user-update-discussion");
function undoDeleteDiscussion(e, t) {
  let n = document.querySelector("#js-resp-dedit");
  httpPostJsonAsync("/ajax/discussion", (e) => jsonReplyHandler(e, n), {
    type: "undo-delete-discuss",
    subjectId: e,
    discussionId: t,
  }),
    (n.innerHTML = _MSG_PLZ_WAIT);
}
function loadDiscussion(e, t, n) {
  t = { type: "get-discuss-edit-form", sid: t, did: e, kid: n };
  let r = document.querySelector("#EditDiscussionModal");
  httpPostJsonAsync("/ajax/discussion", (e) => jsonReplyModalLoader(e, r), t);
}
isNotNull(editDiscussionLink) &&
  editDiscussionLink.forEach(function (e) {
    e.addEventListener("click", (e) => {
      e.preventDefault();
      var e = e.currentTarget,
        t = e.dataset.did,
        n = e.dataset.sid,
        e = e.dataset.kid;
      if (null == t || null == n || null == e) return !1;
      loadDiscussion(t, n, e);
    });
  }),
  isNotNull(discussUpdateBtn) &&
    discussUpdateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e = document.querySelector("#discuss-edit-modal-form");
      let t = document.querySelector("#js-resp-dedit");
      var n = e.inp_discuss_txt.value.trim(),
        r = e.inp_sid.value,
        s = e.inp_qid.value,
        a = e.inp_kid.value,
        o = e.inp_requestid.value,
        i = e.inp_discuss_id.value,
        l = e.inp_full_name.value.trim(),
        u = e.querySelector("#anonymousPost").checked;
      return isValidInput(l)
        ? isValidInput(n)
          ? (httpPostJsonAsync(
              "/ajax/discussion",
              (e) => jsonReplyHandler(e, t),
              {
                type: "save-discuss-edited",
                requestId: o,
                subjectId: r,
                keyID: a,
                discussionId: i,
                questionId: s,
                discussionText: n,
                fullName: l,
                url: window.location.href,
                isAnonymous: u,
              }
            ),
            void (t.innerHTML = _MSG_PLZ_WAIT))
          : ((t.innerHTML = makeErrorHtml(
              "The Discussion Text is incorrect !",
              2
            )),
            e.inp_discuss_txt.focus(),
            !1)
        : ((t.innerHTML = makeErrorHtml("The Full Name is incorrect !", 2)),
          e.inp_full_name.focus(),
          !1);
    }),
  isNotNull(discussDeleteBtn) &&
    discussDeleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e = document.querySelector("#discuss-edit-modal-form");
      let t = document.querySelector("#js-resp-dedit");
      httpPostJsonAsync("/ajax/discussion", (e) => jsonReplyHandler(e, t), {
        type: "delete-discuss",
        subjectId: e.inp_sid.value,
        discussionId: e.inp_discuss_id.value,
      }),
        (t.innerHTML = _MSG_PLZ_WAIT);
    });
const myDateModal = document.querySelector("#GotoDatePageModal");
if (isNotNull(myDateModal)) {
  let t = document.querySelector("#js_resp_goto_page"),
    n = document.querySelector("#inp_pg_date"),
    e = document.querySelector("#goto_date_page_submit");
  n &&
    (n.addEventListener("keyup", changeInputDate),
    n.addEventListener("change", changeInputDate)),
    myDateModal &&
      myDateModal.addEventListener("show.bs.modal", function (e) {
        t.innerHTML = "";
      }),
    myDateModal &&
      myDateModal.addEventListener("shown.bs.modal", function (e) {
        document.querySelector("#inp_pg_date").focus();
      }),
    e &&
      e.addEventListener("click", function (e) {
        e.preventDefault(),
          n.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13 }));
      });
}
function changeInputDate(e) {
  var t = document.querySelector("#js_resp_goto_page"),
    n = document.querySelector("#inp_pg_date"),
    r = document.querySelector("#inp_date_max"),
    s = document.querySelector("#inp_date_min"),
    a = document.querySelector("#base_page_url"),
    o = document.querySelector("#goto_date_page_submit");
  let i = document.querySelector("#goto_page_url");
  return "13" == (e.keyCode || e.which)
    ? ("#" != i.href &&
        "" != i.href &&
        (e.preventDefault(),
        (t.innerHTML = "<span>Loading...</span>"),
        setTimeout(function () {
          window.location = i.value;
          var e = document.getElementById("GotoDatePageModal");
          bootstrap.Modal.getInstance(e).hide();
        }, 1e3)),
      !1)
    : "" == (e = n.value.trim())
    ? ((t.innerHTML = ""),
      o.setAttribute("disabled", "disabled"),
      !(i.value = "#"))
    : ((n = new Date(e)),
      (r = new Date(r.value)),
      (s = new Date(s.value)),
      (a = a.value),
      void (n < s || r < n
        ? ((t.innerHTML = "<span>Invalid date.</span>"),
          o.setAttribute("disabled", "disabled"),
          (i.value = "#"))
        : ((t.innerHTML = " "),
          (i.value = a.replace("[[[goto-date]]]", e)),
          o.removeAttribute("disabled"))));
}
const myGotoModal = document.querySelector("#GotoPageModal");
if (isNotNull(myGotoModal)) {
  let a = document.querySelector("#js_resp_goto_page"),
    o = document.querySelector("#inp_pg_no"),
    i = document.querySelector("#inp_pg_no_max"),
    l = document.querySelector("#inp_pg_link_pad"),
    u = document.querySelector("#inp_pg_no_url"),
    c = document.querySelector("#home_page_url"),
    d = document.querySelector("#is_default_dir"),
    p = document.querySelector("#goto_page_submit"),
    m = document.querySelector("#goto_page_url");
  o &&
    o.addEventListener("keyup", function (t) {
      if ("13" == (t.keyCode || t.which))
        return (
          "#" != m.href &&
            "" != m.href &&
            (t.preventDefault(),
            (a.innerHTML = "<span>Loading...</span>"),
            setTimeout(function () {
              window.location = m.value;
              var e = document.getElementById("GotoPageModal");
              bootstrap.Modal.getInstance(e).hide();
            }, 1e3)),
          !1
        );
      if ("" == o.value.trim())
        return (
          (o.value = ""),
          (a.innerHTML = ""),
          p.setAttribute("disabled", "disabled"),
          !(m.value = "#")
        );
      var t = parseInt(d.value),
        n = c.value.trim(),
        r = parseInt(o.value.trim()),
        e = parseInt(i.value),
        s = u.value;
      if (r < 1 || isNaN(r) || e < r)
        (a.innerHTML = "<span>Invalid page number.</span>"),
          p.setAttribute("disabled", "disabled"),
          (m.value = "#");
      else {
        a.innerHTML = " ";
        let e = r.toString();
        (e =
          1 == r && 1 == t
            ? n
            : ("NeedPad" === l.value && (e = r.toString().padStart(3, "0")),
              s.replace("[[[p-no]]]", e))),
          (m.value = e),
          p.removeAttribute("disabled");
      }
    }),
    myGotoModal &&
      myGotoModal.addEventListener("show.bs.modal", function (e) {
        (document.querySelector("#inp_pg_no").value = ""), (a.innerHTML = "");
      }),
    myGotoModal &&
      myGotoModal.addEventListener("shown.bs.modal", function (e) {
        document.querySelector("#inp_pg_no").focus();
      }),
    p &&
      p.addEventListener("click", function (e) {
        e.preventDefault(),
          o.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13 }));
      });
}
function loadPersonalEditMdl() {
  let t = document.querySelector("#PerModal");
  httpPostJsonAsync("/ajax/profile", (e) => jsonReplyModalLoader(e, t), {
    type: "get-personal-form",
  });
}
function loadAboutEditMdl() {
  let t = document.querySelector("#ProAboutModal");
  httpPostJsonAsync("/ajax/profile", (e) => jsonReplyModalLoader(e, t), {
    type: "get-about-form",
  });
}
function loadAvatarMdl() {
  httpPostJsonAsync(
    "/ajax/profile",
    (e) => {
      var t = document.querySelector("#PerAvatarModal"),
        n = t.querySelector(".modal-body");
      return (
        isJson(e)
          ? "true" == (e = JSON.parse(e)).needLoginMdl
            ? replyModalHandler(e)
            : "true" == e.status &&
              ((t = new bootstrap.Modal(t, {})),
              (n.innerHTML = e.html),
              t.show(),
              document.querySelectorAll(".sel-avatar").forEach(function (n) {
                n.addEventListener("click", (e) => {
                  var t = document.getElementsByClassName(n.id + "-tick");
                  1 == t.length &&
                    (t[0].classList.contains("d-none")
                      ? (clearTick(),
                        t[0].classList.remove("d-none"),
                        document
                          .getElementById("avatar_img_name")
                          .setAttribute("value", n.id))
                      : clearTick(),
                    e.stopPropagation(),
                    e.preventDefault());
                });
              }))
          : (n.innerHTML = makeErrorHtml("The Response is in invalid format.")),
        !1
      );
    },
    { type: "get-avatar-form" }
  );
}
const profileAvatarFormBtn = document.querySelector(
    "#profile-avatar-modal-btn"
  ),
  personalFormBtn = document.querySelector("#personal-modal-btn"),
  profileAboutFormBtn = document.querySelector("#about_modal_form_btn");
function clearTick() {
  document.querySelectorAll(".avatar-select").forEach(function (e) {
    e.classList.contains("d-none") ||
      (e.classList.add("d-none"),
      document.getElementById("avatar_img_name").setAttribute("value", ""));
  });
}
isNotNull(personalFormBtn) &&
  personalFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e = document.querySelector("#personal-modal-form");
    if (!isNotNull(e)) return !1;
    let t = document.querySelector("#js_resp");
    t.innerHTML = "";
    e.inp_fn.value.trim();
    var n = e.inp_email.value.trim(),
      r = e.inp_cell.value.trim(),
      s = e.inp_gender.value.trim(),
      a = e.inp_dob.value.trim(),
      o = e.inp_city.value.trim(),
      i = e.inp_country.value.trim(),
      l = /^[a-zA-Z]([\s]?[a-zA-Z0-9-\.,\(\)]){1,30}$/;
    if (!validateEmail(n))
      return (
        (t.innerHTML = makeErrorHtml("Please enter a valid email address.")),
        e.inp_email.focus(),
        !1
      );
    if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(r))
      return (
        (t.innerHTML = makeErrorHtml("Please enter a valid mobile number.")),
        e.inp_cell.focus(),
        !1
      );
    if (!/^Male|Female|Other$/.test(s))
      return (
        (t.innerHTML = makeErrorHtml("Please select a gender.")),
        e.inp_gender.focus(),
        !1
      );
    var u = isDobValid(a);
    if ("OK" != u)
      return (t.innerHTML = makeErrorHtml(u)), e.inp_dob.focus(), !1;
    if (!l.test(o))
      return (
        (t.innerHTML = makeErrorHtml("Please enter a valid city name.")),
        e.inp_city.focus(),
        !1
      );
    if (!l.test(i))
      return (
        (t.innerHTML = makeErrorHtml("Please enter a valid country name.")),
        e.inp_country.focus(),
        !1
      );
    t.innerHTML = "";
    httpPostJsonAsync("/ajax/profile", (e) => jsonReplyHandler(e, t), {
      type: "personal",
      country: i,
      city: o,
      gender: s,
      dob: a,
      email: n,
      cell: r,
    }),
      (t.innerHTML = _MSG_PLZ_WAIT);
  }),
  isNotNull(profileAboutFormBtn) &&
    profileAboutFormBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e = document.querySelector("#about_modal_form");
      if (null == e) return !1;
      let t = document.querySelector("#js_resp_about"),
        n = e.profile_text_org.value.trim();
      httpPostJsonAsync("/ajax/profile", (e) => jsonReplyHandler(e, t), {
        type: "about-me",
        abt: (n = 0 == n.length ? "__/\\__" : n),
      }),
        (t.innerHTML = _MSG_PLZ_WAIT);
    }),
  isNotNull(profileAvatarFormBtn) &&
    profileAvatarFormBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e = document.querySelector("#avatar_modal_form");
      if (null == e) return !1;
      let t = document.querySelector("#js_resp_avatar");
      t.innerHTML = "";
      e = e.avatar_img_name.value;
      if (e.length < 3)
        return (
          (t.innerHTML = makeErrorHtml(
            "Please select any one of this Avatar."
          )),
          !1
        );
      t.innerHTML = "";
      httpPostJsonAsync("/ajax/profile", (e) => jsonReplyHandler(e, t), {
        type: "profile-img",
        avn: e,
      }),
        (t.innerHTML =
          "<ul class='error'><li>Please wait...<i class='mdi mdi-loading mdi-spin'></i> </li></ul>");
    });
const registerForm = document.querySelector("#register_form");
if (isNotNull(registerForm)) {
  let r = document.querySelector("#inp_username"),
    t = document.querySelector("#inp_fullname");
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var e = registerForm.inp_username.value.trim(),
      t = registerForm.inp_fullname.value.trim(),
      n = registerForm.inp_pass.value,
      r = registerForm.inp_pass1.value,
      s = registerForm.inp_captcha.value.trim();
    let a = document.querySelector("#js_resp"),
      o = /^[a-zA-Z]([ ]?[a-zA-Z.]){2,49}$/;
    return o.test(t)
      ? (o = /^[a-z]([a-z0-9]){7,49}$/).test(e)
        ? (o = /^(.){8,50}$/).test(n)
          ? n != r
            ? ((a.innerHTML = makeErrorHtml(
                "The password and confirmation password did not match."
              )),
              registerForm.inp_pass1.focus(),
              !1)
            : (o = /^[0-9]{5}$/).test(s)
            ? ((r = SHA256(n)),
              (registerForm.inp_pass.value = ""),
              (registerForm.inp_pass1.value = ""),
              (a.innerHTML = ""),
              httpPostJsonAsync(
                "/ajax/user",
                (e) => jsonReplyHandler(e, a, registerForm.parentElement),
                {
                  type: "register",
                  username: e,
                  fullname: t,
                  pass: r,
                  captcha: s,
                }
              ),
              void (a.innerHTML = _MSG_PLZ_WAIT))
            : ((a.innerHTML = makeErrorHtml(
                "The captcha you entered is incorrect."
              )),
              registerForm.inp_captcha.focus(),
              !1)
          : ((a.innerHTML = makeErrorHtml(
              "The password should be at least 8 characters long."
            )),
            (registerForm.inp_pass.value = ""),
            registerForm.inp_pass.focus(),
            !1)
        : ((a.innerHTML = makeErrorHtml(
            "The username should be at least 8 characters long."
          )),
          registerForm.inp_username.focus(),
          !1)
      : ((a.innerHTML = makeErrorHtml(
          "The full name should be at least 3 characters long."
        )),
        registerForm.inp_fullname.focus(),
        !1);
  }),
    isNotNull(r) &&
      r.addEventListener("focusout", () => {
        var e = document.querySelector("#inp_username_icon"),
          t = r.value.trim();
        let n = document.querySelector("#js_resp");
        if ("" == t) return !1;
        if (!/^[a-z]([a-z0-9]){7,49}$/.test(t))
          return (
            (n.innerHTML = makeErrorHtml(
              "Username: Minimum 8 alphanumeric characters and starting with a letter."
            )),
            !(e.innerHTML = '<i class = "mdi mdi-close-thick invalid"></i>')
          );
        (n.innerHTML = ""),
          (e.innerHTML =
            '<i class = "mdi mdi-loading mdi-spin processing"></i>');
        httpPostJsonAsync(
          "/ajax/user",
          (e) => {
            if (isJson(e)) {
              var e = JSON.parse(e),
                t = document.querySelector("#inp_username_icon");
              if ("true" == e.status && "OK" == e.message)
                return !(t.innerHTML =
                  '<i class = "mdi mdi-check-all verified"></i>');
              (t.innerHTML = '<i class = "mdi mdi-close-thick invalid"></i>'),
                (n.innerHTML =
                  '<ul class="error"><li>' + e.message + "</li> </ul>");
            } else
              n.innerHTML = makeErrorHtml("The Response is in invalid format.");
            return !1;
          },
          { type: "username-verify", username: t }
        );
      }),
    isNotNull(r) &&
      r.addEventListener("keyup", () => {
        (r.value = r.value.toLowerCase()),
          (r.value = r.value.replaceAll(/^[0-9]+$/g, "")),
          (r.value = r.value.replaceAll(/[^a-z0-9]+/g, ""));
      }),
    isNotNull(t) &&
      ["keyup", "focusout"].forEach(function (e) {
        t.addEventListener(e, (e) => {
          fullNameBeautifier(e.currentTarget);
        });
      });
}
function changeSecurityAnswer() {
  let t = document.querySelector("#sec_ques_change_form");
  if (!isNotNull(t)) return !1;
  var e = t.inp_curr_pass.value.trim(),
    n = t.inp_sec_ans1.value.trim(),
    r = t.inp_sec_ans2.value.trim();
  let s = document.querySelector("#js_resp");
  return (patt = /^(.){5,49}$/).test(n)
    ? patt.test(r)
      ? ((e = SHA256(e)),
        (t.inp_curr_pass.value = ""),
        httpPostJsonAsync(
          "/ajax/profile",
          (e) => jsonReplyHandler(e, s, t.parentElement),
          { type: "update-sec-ans", update: 2, pass: e, ans1: n, ans2: r }
        ),
        void (s.innerHTML = _MSG_PLZ_WAIT))
      : ((s.innerHTML = makeErrorHtml("Person: Minimum 5 characters long")),
        t.inp_sec_ans2.focus(),
        !1)
    : ((s.innerHTML = makeErrorHtml("Place: Minimum 5 characters long")),
      t.inp_sec_ans1.focus(),
      !1);
}
function setSecurityAnswer() {
  let t = document.querySelector("#sec_ques_form");
  if (!isNotNull(t)) return !1;
  var e = (t.inp_sec_ans1.value = t.inp_sec_ans1.value.trim()),
    n = (t.inp_sec_ans2.value = t.inp_sec_ans2.value.trim());
  let r = document.querySelector("#js_resp");
  return (patt = /^(.){5,49}$/).test(e)
    ? patt.test(n)
      ? (httpPostJsonAsync(
          "/ajax/profile",
          (e) => jsonReplyHandler(e, r, t.parentElement),
          {
            type: "update-sec-ans",
            update: 1,
            pass: SHA256(getRndNumber(10, 20).toString()),
            ans1: e,
            ans2: n,
          }
        ),
        void (r.innerHTML = _MSG_PLZ_WAIT))
      : ((r.innerHTML = makeErrorHtml("Person: Minimum 5 characters long.")),
        t.inp_sec_ans2.focus(),
        !1)
    : ((r.innerHTML = makeErrorHtml("Place: Minimum 5 characters long.")),
      t.inp_sec_ans1.focus(),
      !1);
}
function changeUserPassword() {
  let t = document.querySelector("#pass_change_form");
  if (!isNotNull(t)) return !1;
  var e = t.inp_curr_pass.value,
    n = t.inp_new_pass.value,
    r = t.inp_re_new_pass.value;
  let s = t.querySelector("#js_resp");
  if (!(patt = /^(.){8,49}$/).test(n))
    return (
      (s.innerHTML = makeErrorHtml("New Password: Minimum 8 characters long.")),
      (t.inp_new_pass.value = ""),
      t.inp_new_pass.focus(),
      !1
    );
  if (n != r)
    return (
      (s.innerHTML = makeErrorHtml(
        "The password and confirmation password did not match."
      )),
      t.inp_re_new_pass.focus(),
      !1
    );
  (t.inp_curr_pass.value = ""),
    (t.inp_new_pass.value = ""),
    (t.inp_re_new_pass.value = ""),
    (s.innerHTML = "");
  httpPostJsonAsync(
    "/ajax/profile",
    (e) => jsonReplyHandler(e, s, t.parentElement),
    { type: "change-pass", userCurrPass: SHA256(e), userNewPass: SHA256(n) }
  ),
    (s.innerHTML = _MSG_PLZ_WAIT);
}
const contactSubmitBtn = document.querySelector("#inp_contact_us_submit"),
  ulFilterElements =
    (isNotNull(contactSubmitBtn) &&
      contactSubmitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let n = document.querySelector("#contact-us-form"),
          r = document.querySelector("#js_resp_contact");
        n.txtFullName.value = n.txtFullName.value.trim().replaceAll(/ +/g, " ");
        var e = n.inp_contact_type.value,
          t = n.inp_message_text.value.trim(),
          s = n.inp_caption_text.value.trim(),
          a = n.txtFullName.value.trim(),
          o = n.txtEmailID.value.trim(),
          i = n.inp_captcha.value.trim(),
          l = document.getElementById("anonymousPost").checked;
        return isValidInput(s)
          ? (e = parseInt(e)) < 1 || 3 < e
            ? ((r.innerHTML = makeErrorHtml("Please select a contact type.")),
              n.inp_contact_type.focus(),
              !1)
            : isValidInput(t)
            ? isValidInput(a)
              ? isValidNumber(i)
                ? (httpPostJsonAsync(
                    "/ajax/contact",
                    (e) => {
                      var t = document.querySelector("#inp_contact_us_submit"),
                        e =
                          (isJson(e) ||
                            (r.innerHTML = makeErrorHtml(
                              "The Response is in invalid format."
                            )),
                          JSON.parse(e));
                      return "true" == e.status
                        ? ((r.innerHTML =
                            "<span class='message'>Your message has been sent!</span>"),
                          !(t.disabled = !0))
                        : ("true" == e.reloadCaptcha &&
                            (isNotNull(
                              (t = document.getElementById("img_captcha"))
                            ) &&
                              (t.src =
                                "/user/captcha/" + getRndNumber(2e3, 1e4)),
                            (n.inp_captcha.value = ""),
                            n.inp_captcha.focus()),
                          (r.innerHTML = e.message),
                          !1);
                    },
                    {
                      type: "new-contact-submit",
                      fullName: a,
                      emailID: o,
                      captionText: s,
                      contactText: t,
                      contactType: e,
                      isAnonymous: l,
                      captcha: i,
                    }
                  ),
                  void (r.innerHTML = _MSG_PLZ_WAIT))
                : ((r.innerHTML = makeErrorHtml(
                    "The captcha you entered is incorrect."
                  )),
                  n.inp_captcha.focus(),
                  !1)
              : ((r.innerHTML = makeErrorHtml(
                  "The full name should be at least 3 characters long."
                )),
                n.txtFullName.focus(),
                !1)
            : ((r.innerHTML = makeErrorHtml("Please enter a valid message.")),
              n.inp_message_text.focus(),
              !1)
          : ((r.innerHTML = makeErrorHtml("Please enter a valid subject.")),
            n.inp_caption_text.focus(),
            !1);
      }),
    document.querySelectorAll(".need-ul-filter"));
let _idIncrement = 1;
function ulFilteration(e, t, n) {
  let r, s, a, o, i;
  for (
    r = t.value.toLowerCase().trim(),
      s = e.getElementsByTagName("li"),
      i = 0,
      o = 0;
    o < s.length;
    o++
  )
    (a = s[o].getElementsByTagName("a")[0]),
      -1 < (a.textContent || a.innerText).toLowerCase().indexOf(r) ||
      -1 < s[o].className.indexOf("always-show")
        ? (s[o].classList.contains("d-none") && s[o].classList.remove("d-none"),
          i++)
        : s[o].classList.add("d-none");
  s.length == i && 0 == r.length
    ? (n.innerHTML = "")
    : (n.innerHTML = "Filtered " + i + " from " + s.length);
}
ulFilterElements.forEach((t) => {
  var e =
      '<div><div class="input-style-3">\n                    <input id="filterInput_' +
      _idIncrement +
      '" type="search" class="py-2" placeholder="Filter">\n                    <span class="icon py-2"><i class="mdi mdi-filter-variant"></i></span>\n                    <div class="text-dull py-2 filter-count-text" id="filterResultCount_' +
      _idIncrement +
      '"></div>\n                </div></div>',
    e =
      (t.insertAdjacentHTML("beforebegin", e),
      document.querySelector("#filterInput_" + _idIncrement));
  let n = document.querySelector("#filterResultCount_" + _idIncrement);
  isNotNull(e) &&
    e.addEventListener("input", (e) => {
      ulFilteration(t, e.currentTarget, n);
    }),
    _idIncrement++;
});
