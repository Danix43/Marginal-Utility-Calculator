const form = document.querySelector("#form");

const processData = async function () {
  const formData = new FormData(form);

  const [initialUtil, finalUtil, initialQ, finalQ] = formData.values();
  if ((initialUtil, finalUtil, initialQ, finalQ))
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
  return (finalQ - initialQ) / (finalUtil - initialUtil);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  processData();
});
