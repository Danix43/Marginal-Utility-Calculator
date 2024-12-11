const form = document.querySelector("#form");

const resetButton = document.querySelector("#reset");

const sampleDataButton = document.querySelector("#addSampleData");

const initialUtilInput = document.querySelector("#initialUt");
const finalUtilInput = document.querySelector("#finalUt");
const initialQInput = document.querySelector("#initialQConsumed");
const finalQInput = document.querySelector("#finalQConsumed");
const marUtilInput = document.querySelector("#marUt");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    processData();
});

resetButton.addEventListener("click", e => {
    initialUtilInput.value = "";
    finalUtilInput.value = "";
    initialQInput.value = "";
    finalQInput.value = "";
    marUtilInput.value = "";

    location.reload();
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

    if (initialUtil && finalUtil && initialQ && finalQ && marUtil) {
        alert("Toate campurile sunt completate, indeparteaza unul pentru a calcula");
    }

    // works
    if (!initialUtil && (marUtil, finalUtil, initialQ, finalQ)) {
        const results = await calcInitialUtil(finalUtil, initialQ, finalQ, marUtil);

        const preExp = createElement("p", `Pasi: `);
        const exp1 = createElement("p", `1. Obtinem delta cantitate prin a scadea din cantitea finala consumata pe cea initiala: ${results[0]}`);
        const resultText = createElement("p", `2. Utilitea initiala este obtinuta prin a scadea din utilitea finala produsul dintre utilitea marginala si delta cantitatii: ${results[1]}`);

        addElementsToBox([preExp, exp1, resultText], "result-exp");

        initialUtilInput.value = results[1];
    }

    // works
    if (!finalUtil && (marUtil, initialUtil, initialQ, finalQ)) {
        const results = await calcFinalUtil(initialUtil, initialQ, finalQ, marUtil);

        const preExp = createElement("p", `Pasi: `);
        const exp1 = createElement("p", `1. Obtinem delta cantitate prin a scadea din cantitea finala consumata pe cea initiala: ${results[0]}`);
        const resultText = createElement("p", `2. Utilitea finala este obtinuta prin a scadea din utilitea initiala produsul dintre utilitea marginala si delta cantitatii: ${results[1]}`);

        addElementsToBox([preExp, exp1, resultText], "result-exp");

        finalUtilInput.value = results[1];
    }

    // works
    if (!initialQ && (marUtil, finalUtil, initialUtil, finalQ)) {
        const results = await calcInitialQ(finalUtil, initialUtil, finalQ, marUtil);

        const preExp = createElement("p", `Pasi: `);
        const exp1 = createElement("p",
            `1. Calculam delta utilite prin a scadea din utilitea finala pe cea initiala: ${results[0]}`
        )
        const exp2 = createElement("p",
            `2. Inmultim cantitea finala cu utilitea marginala: ${results[1]}`
        )
        const exp3 = createElement("p",
            `3. Adaugam produsului delta utilite`
        )
        const exp4 = createElement("p",
            `4. Inmultim ambele rezultate cu 100`
        )
        const exp5 = createElement("p",
            `5. Impartim ultimul rezultat la primul pentru a afla cantitea initiala: ${results[4]}`
        )

        addElementsToBox([preExp, exp1, exp2, exp3, exp4, exp5], "result-exp");

        initialQInput.value = results[4];
    }

    // works
    if (!finalQ && (marUtil, finalUtil, initialQ, initialUtil)) {
        const results = await calcFinalQ(initialUtil, finalUtil, initialQ, marUtil);

        const preExp = createElement("p", `Pasi: `);
        const exp1 = createElement("p",
            `1. Calculam delta utilite prin a scadea din utilitea finala pe cea initiala: ${results[0]}`
        )
        const exp2 = createElement("p",
            `2. Inmultim cantitea initiala cu utilitea marginala: ${results[1]}`
        )
        const exp3 = createElement("p",
            `3. Adaugam produsului delta utilite`
        )
        const exp4 = createElement("p",
            `4. Inmultim ambele rezultate cu 100`
        )
        const exp5 = createElement("p",
            `5. Impartim ultimul rezultat la primul pentru a afla cantitea finala: ${results[3]}`
        )

        addElementsToBox([preExp, exp1, exp2, exp3, exp4, exp5], "result-exp");

        finalQInput.value = results[3];
    }

    // works
    if (!marUtil && (initialUtil, finalUtil, initialQ, finalQ)) {
        const results = await calcMarginalUtil(
            initialUtil,
            finalUtil,
            initialQ,
            finalQ
        );

        const preExp = createElement("p", `Pasi: `);
        const exp1 = createElement("p", `1. Obtinem delta cantite prin a scadea din cantitea finala cantitatea initiala: ${results[0]}`);
        const exp2 = createElement("p", `2. Obtinem delta utilite prin a scadea din utilitea finala utilitea initiala: ${results[1]}`);
        const resultText = createElement("p", `3. Utilitea marginala este obtinuta prin a impartii delta utilite la delta cantitate: ${results[2]}`);

        addElementsToBox([preExp, exp1, exp2, resultText], "result-exp");

        marUtilInput.value = results[2];
    }
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

    return [deltaQ, deltaUtil, deltaUtil / deltaQ];
};

const calcInitialUtil = async function (
    finalUtil,
    initialQ,
    finalQ,
    marUtil
) {
    const deltaQ = finalQ - initialQ;

    return [deltaQ, (finalUtil - (marUtil * deltaQ))];
}

const calcFinalUtil = async function (
    initialUtil,
    initialQ,
    finalQ,
    marUtil
) {
    const deltaQ = initialQ - finalQ; // -4

    return [deltaQ, (initialUtil - (marUtil * deltaQ))];
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
    return [deltaUtil, x2, x3, x1, (x3 / x1)];
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

    return [deltaUtil, x2, x1, (x1 / x2)];
}

const createElement = (elmType, elmText, elmClasses = "") => {
    const newElm = document.createElement(elmType);

    newElm.textContent = elmText;
    newElm.classList = elmClasses;

    return newElm;
}

const addElementsToBox = (elms, targetBoxClassName) => {
    const documentFragment = document.createDocumentFragment();

    for (const elm of elms) {
        documentFragment.appendChild(elm);
    }
    const resultsBox = document.getElementsByClassName(targetBoxClassName)[0];
    resultsBox.classList.remove("hide");
    resultsBox.appendChild(documentFragment);
}
