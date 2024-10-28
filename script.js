const form = document.querySelector("#form");

const resetButton = document.querySelector("#reset");

const processData = async function () {
  const formData = new FormData(form);
  const [initialUtil, finalUtil, initialQ, finalQ, marUtil] = formData.values();

  if (initialUtil && finalUtil && initialQ && finalQ && marUtil) alert("all the fields are populated, remove one");

  if (!initialUtil && (marUtil, finalUtil, initialQ, finalQ)) alert("empty initial Util")

  if (!finalUtil && (initialUtil, finalUtil, initialQ, finalQ)) alert("empty final Util")

  if (!initialQ && (marUtil, finalUtil, initialUtil, finalQ)) alert(`initialQ: ${await calcInitialQ(
    initialQ, finalUtil, finalQ, marUtil
  )}`)

  if (!finalQ && (marUtil, finalUtil, initialQ, initialUtil)) alert(`finalQ: ${await calcFinalQ(
    initialUtil, finalUtil, initialQ, marUtil
  )}`)

  if (!marUtil && (initialUtil, finalUtil, initialQ, finalQ))
    alert(
      `marginal util: ${await calcMarginalUtil(
        initialUtil,
        finalUtil,
        initialQ,
        finalQ
      )}`
    );
};

const calcMarginalUtil = async function (
  initialUtil,
  finalUtil,
  initialQ,
  finalQ
) {
  // formula: MU = (QF - QI) / (UF - UI)
  const deltaQ = finalQ - initialQ;
  const deltaUtil = finalUtil - initialUtil;

  return deltaUtil / deltaQ;
};

const calcInitialUtil = async function (
  finalUtil,
  initialQ,
  finalQ,
  marUtil
) {

  // 5 = 
  // formula: MU = ()
}

const calcFinalUtil = async function (
  initialUtil,
  initialQ,
  finalQ,
  marUtil
) {

}

const calcInitialQ = async function (
  initialUtil,
  finalUtil,
  finalQ,
  marUtil
) {
  const deltaUtil = finalUtil - initialUtil;

  // 5 = marUtil * (x - initialQ)
  // deltaUtil = marUtil * (x - initialQ)

  // marUtil - (marUtil * initialQ)
  let x1 = marUtil * finalQ;

  // marUtil = deltaUtil + x1
  x1 = deltaUtil + x1; // 7,5

  x1 = x1 * 100;
  let x2 = marUtil * 100;

  return x1 / x2;
}

const calcFinalQ = async function (
  initialUtil,
  finalUtil,
  initialQ,
  marUtil
) {

  const deltaUtil = finalUtil - initialUtil;

  // 5 = marUtil * (x - initialQ)
  // deltaUtil = marUtil * (x - initialQ)

  // marUtil - (marUtil * initialQ)
  let x1 = marUtil * initialQ;

  // marUtil = deltaUtil + x1
  x1 = deltaUtil + x1; // 7,5

  x1 = x1 * 100;
  let x2 = marUtil * 100;

  return x1 / x2;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  processData();
});

resetButton.addEventListener("onClick", e => {
  console.log("clicked reset");
})