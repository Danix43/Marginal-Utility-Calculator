const form = document.querySelector("#form");

const resetButton = document.querySelector("#reset");

const sampleDataButton = document.querySelector("#addSampleData");

const initialUtilInput = document.querySelector("#initialUt");
const finalUtilInput = document.querySelector("#finalUt");
const initialQInput = document.querySelector("#initialQConsumed");
const finalQInput = document.querySelector("#finalQConsumed");
const marUtilInput = document.querySelector("#marUt");


resetButton.addEventListener("click", e => {
  initialUtilInput.value = "";
  finalUtilInput.value = "";
  initialQInput.value = "";
  finalQInput.value = "";
  marUtilInput.value = "";
})

sampleDataButton.addEventListener("click", e => {
  initialUtilInput.value = "5";
  finalUtilInput.value = "10";
  initialQInput.value = "6";
  finalQInput.value = "10";
  marUtilInput.value = "1.25";
})

const processData = async function () {
  const formData = new FormData(form);
  const [initialUtil, finalUtil, initialQ, finalQ, marUtil] = formData.values();

  if (initialUtil && finalUtil && initialQ && finalQ && marUtil)
    alert("all the fields are populated, remove one");

  // works
  if (!initialUtil && (marUtil, finalUtil, initialQ, finalQ))
    alert(`initialUtil: ${await calcInitialUtil(finalUtil, initialQ, finalQ, marUtil)}`)

  // works
  if (!finalUtil && (marUtil, initialUtil, initialQ, finalQ)) {
    console.log(`data from if: \n initialUtil: ${initialUtil} \n initialQ: ${initialQ}\n finalQ: ${finalQ} \n marUtil: ${marUtil}`);
    alert(`finalUtil: ${await calcFinalUtil(initialUtil, initialQ, finalQ, marUtil)}`)
  }

  // works
  if (!initialQ && (marUtil, finalUtil, initialUtil, finalQ))
    alert(`initialQ: ${await calcInitialQ(finalUtil, initialUtil, finalQ, marUtil)}`)

  // works
  if (!finalQ && (marUtil, finalUtil, initialQ, initialUtil))
    alert(`finalQ: ${await calcFinalQ(initialUtil, finalUtil, initialQ, marUtil)}`)

  // works
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
  // formula: MU = (UF - UI) / (QF - QI)
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
  const deltaQ = finalQ - initialQ;

  return finalUtil - (marUtil * deltaQ);
}

const calcFinalUtil = async function (
  initialUtil,
  initialQ,
  finalQ,
  marUtil
) {
  const leftSide = marUtil;
  const denominator = initialQ - finalQ; // -4

  return initialUtil - (leftSide * denominator);
}

const calcInitialQ = async function (
  finalUtil,
  initialUtil,
  finalQ,
  marUtil
) {
  const deltaUtil = initialUtil - finalUtil

  let x1 = marUtil // 1.25
  let x2 = finalQ * marUtil // 12.5

  let x3 = x2 + deltaUtil
  x3 = x3 * 100
  x1 = x1 * 100
  return x3 / x1;
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
