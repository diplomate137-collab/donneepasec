const evaluations = [
  {
    id: "PASEC2024",
    label: "PASEC2024",
    subtitle: "21 pays",
    type: "cycle",
    highlight: "Bientôt disponible",
    countries: [
      "Bénin",
      "Burkina Faso",
      "Burundi",
      "Cameroun",
      "Congo",
      "Côte d'Ivoire",
      "Gabon",
      "Guinée",
      "Madagascar",
      "Niger",
      "République démocratique du Congo",
      "Sénégal",
      "Tchad",
      "Togo",
      "Mali",
      "Guinée-Bissau",
      "Centrafrique",
      "Sao Tomé-et-Principe",
      "Djibouti",
      "Mozambique",
      "Nigéria",
    ],
  },
  {
    id: "PASEC2019",
    label: "PASEC2019",
    subtitle: "14 pays",
    type: "cycle",
    countries: [
      "Bénin",
      "Burkina Faso",
      "Burundi",
      "Cameroun",
      "Congo",
      "Côte d'Ivoire",
      "Gabon",
      "Guinée",
      "Madagascar",
      "Niger",
      "République démocratique du Congo",
      "Sénégal",
      "Tchad",
      "Togo",
    ],
  },
  {
    id: "PASEC2014",
    label: "PASEC2014",
    subtitle: "10 pays",
    type: "cycle",
    countries: [
      "Bénin",
      "Burkina Faso",
      "Burundi",
      "Cameroun",
      "Congo",
      "Côte d'Ivoire",
      "Niger",
      "Sénégal",
      "Tchad",
      "Togo",
    ],
  },
  {
    id: "ANCIENNES",
    label: "Anciennes évaluations",
    subtitle: "Pays et années historiques",
    type: "historical",
    entries: [
      "Bénin — 2005",
      "Burkina Faso — 2006",
      "Burundi — 2008-2009",
      "Cambodge — 2011-2012",
      "Cameroun (zone anglophone) — 2005",
      "Cameroun (zone francophone) — 2005",
      "Comores — 2008-2009",
      "Congo — 2006",
      "Côte d'Ivoire — 2009",
      "Gabon — 2006",
      "Guinée — 2004",
      "Liban — 2010",
      "Madagascar — 2005",
      "Mali — 2011-2012",
      "Maurice — 2006",
      "Mauritanie — 2004",
      "RDP Lao — 2011-2012",
      "République démocratique du Congo — 2010",
      "Sénégal — 2006",
      "Tchad — 2004",
      "Tchad — 2010",
      "Togo — 2010",
      "Vietnam — 2011-2012",
    ],
  },
];

const appState = {
  accessGranted: false,
  request: null,
  selections: new Set(),
  disclosureState: {},
};

const dom = {
  accessForm: document.querySelector("#access-form"),
  formFeedback: document.querySelector("#form-feedback"),
  requestSummary: document.querySelector("#request-summary"),
  accessShell: document.querySelector("#access-shell"),
  goDownloads: document.querySelector("#go-downloads"),
  downloadSection: document.querySelector("#download-section"),
  downloadCount: document.querySelector("#download-count"),
  downloadList: document.querySelector("#download-list"),
};

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function selectionKey(evaluationId, kind, value = "") {
  return [evaluationId, kind, value].filter(Boolean).join("::");
}

function getSelectionCountForEvaluation(evaluation) {
  return [...appState.selections].filter((key) => key.startsWith(`${evaluation.id}::`)).length;
}

function getSelectionCountForGroup(evaluationId, kind) {
  return [...appState.selections].filter((key) => key.startsWith(`${evaluationId}::${kind}`)).length;
}

function isDisclosureOpen(key, defaultOpen = false) {
  return key in appState.disclosureState ? appState.disclosureState[key] : defaultOpen;
}

function getStatusForCycleSelection(evaluationId, kind, value = "") {
  if (evaluationId !== "PASEC2024") return "Disponible";

  if (kind === "international") return "À venir";
  if (kind === "manual") return "Disponible";
  if (kind === "technical") return "Disponible";
  if (kind === "questionnaires") return "Disponible";

  const availableCountries = new Set([
    "Bénin",
    "Burkina Faso",
    "Burundi",
    "Cameroun",
    "Congo",
  ]);

  const pendingCountries = new Set([
    "Côte d'Ivoire",
    "Gabon",
    "Guinée",
    "Madagascar",
    "Niger",
    "République démocratique du Congo",
    "Sénégal",
    "Tchad",
  ]);

  if (availableCountries.has(value)) return "Disponible";
  if (pendingCountries.has(value)) return "À venir";
  return "Restreint";
}

function getStatusForHistoricalEntry(entry) {
  if (entry.includes("Liban") || entry.includes("Vietnam")) return "Restreint";
  if (entry.includes("RDP Lao")) return "À venir";
  return "Disponible";
}

function buildDownloadEntries() {
  const entries = [];

  [...appState.selections]
    .sort((left, right) => left.localeCompare(right))
    .forEach((key) => {
      const [evaluationId, kind, value] = key.split("::");
      const evaluation = evaluations.find((item) => item.id === evaluationId);

      if (!evaluation) return;

      if (evaluation.type === "cycle") {
        if (kind === "international") {
          const status = getStatusForCycleSelection(evaluationId, kind);
          entries.push(
            createDownloadEntry(
              evaluation.label,
              `Base de données internationale ${evaluation.label}`,
              "Base de données internationale",
              status,
              ["SPSS (.sav)", "Stata (.dta)"]
            )
          );
        }

        if (kind === "manual") {
          entries.push(
            createDownloadEntry(
              evaluation.label,
              `Manuel d'utilisation des données ${evaluation.label}`,
              "Document",
              getStatusForCycleSelection(evaluationId, kind),
              ["PDF (.pdf)"]
            )
          );
        }

        if (kind === "technical") {
          entries.push(
            createDownloadEntry(
              evaluation.label,
              `Rapport technique ${evaluation.label}`,
              "Document",
              getStatusForCycleSelection(evaluationId, kind),
              ["PDF (.pdf)"]
            )
          );
        }

        if (kind === "questionnaires") {
          entries.push(
            createDownloadEntry(
              evaluation.label,
              `Questionnaires contextuels ${evaluation.label}`,
              "Document",
              getStatusForCycleSelection(evaluationId, kind),
              ["PDF (.pdf)"]
            )
          );
        }

        if (kind === "country") {
          const status = getStatusForCycleSelection(evaluationId, kind, value);
          entries.push(
            createDownloadEntry(
              evaluation.label,
              `Base de données ${evaluation.label} - ${value}`,
              "Base de données pays",
              status,
              ["SPSS (.sav)", "Stata (.dta)"]
            )
          );
        }
      }

      if (evaluation.type === "historical" && kind === "entry") {
        const status = getStatusForHistoricalEntry(value);
        entries.push(
          createDownloadEntry(
            evaluation.label,
            `Base de données ${value}`,
            "Base historique",
            status,
            ["SPSS (.sav)", "Stata (.dta)"]
          )
        );
        entries.push(
          createDownloadEntry(
            evaluation.label,
            `Questionnaires contextuels ${value}`,
            "Document",
            status,
            ["PDF (.pdf)"]
          )
        );
        entries.push(
          createDownloadEntry(
            evaluation.label,
            `Documentation ${value}`,
            "Document",
            status,
            ["PDF (.pdf)"]
          )
        );
      }
    });

  return entries;
}

function createDownloadEntry(group, title, type, status, formats) {
  return {
    id: slugify(`${group}-${title}-${type}`),
    group,
    title,
    type,
    status,
    formats,
  };
}

function downloadDemoFile(entry, format) {
  const content = [
    "Portail d'accès aux données PASEC - démonstration",
    "",
    `Groupe : ${entry.group}`,
    `Ressource : ${entry.title}`,
    `Type : ${entry.type}`,
    `Statut : ${entry.status}`,
    `Format demandé : ${format}`,
    "",
    "Dans la version finale, ce bouton téléchargera le fichier réel.",
  ].join("\n");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugify(entry.title)}-${slugify(format)}-demo.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function readFormPayload() {
  const formData = new FormData(dom.accessForm);
  return {
    lastName: formData.get("lastName")?.toString().trim(),
    firstName: formData.get("firstName")?.toString().trim(),
    institution: formData.get("institution")?.toString().trim(),
    jobTitle: formData.get("jobTitle")?.toString().trim(),
    residenceCountry: formData.get("residenceCountry")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    usage: formData.get("usage")?.toString().trim(),
    profile: formData.get("profile")?.toString().trim(),
    consent: Boolean(formData.get("consent")),
  };
}

function validateForm(payload) {
  if (
    !payload.lastName ||
    !payload.firstName ||
    !payload.institution ||
    !payload.jobTitle ||
    !payload.residenceCountry ||
    !payload.email ||
    !payload.usage ||
    !payload.profile
  ) {
    return "Veuillez renseigner tous les champs du formulaire.";
  }

  if (!payload.consent) {
    return "Veuillez accepter les conditions d'utilisation.";
  }

  return "";
}

function saveAccessRequest(payload) {
  localStorage.setItem("pasecAccessRequest", JSON.stringify(payload));
}

function renderRequestSummary() {
  if (!appState.accessGranted || !appState.request) {
    dom.requestSummary.textContent =
      "Remplissez le formulaire pour activer cet espace.";
    return;
  }

  const request = appState.request;
  dom.requestSummary.innerHTML = `
    <strong>${request.firstName} ${request.lastName}</strong> ·
    ${request.institution} ·
    ${request.profile}
  `;
}

function renderAccessShell() {
  dom.accessShell.classList.toggle("locked", !appState.accessGranted);

  dom.accessShell.innerHTML = evaluations
    .map((evaluation, index) => {
      const selectionCount = getSelectionCountForEvaluation(evaluation);
      const countLabel = selectionCount
        ? `${selectionCount} choix`
        : "Aucun choix";

      if (evaluation.type === "cycle") {
        const evaluationDisclosure = `evaluation::${evaluation.id}`;
        return `
          <article class="evaluation-card">
            <details
              data-disclosure="${evaluationDisclosure}"
              ${isDisclosureOpen(evaluationDisclosure, index === 0) ? "open" : ""}
            >
              <summary>
                <div class="evaluation-summary">
                  <h3>${evaluation.label}</h3>
                  <p>${evaluation.subtitle}</p>
                </div>
                <div class="status-tags">
                  ${evaluation.highlight ? `<span class="coming-soon">${evaluation.highlight}</span>` : ""}
                  <span class="badge">${countLabel}</span>
                </div>
              </summary>
              <div class="selection-body">
                ${renderSelectionGroup(
                  evaluation,
                  "international",
                  "Base de données",
                  renderCycleCheckbox(
                    evaluation,
                    "international",
                    "Base de données internationale",
                    "SPSS et/ou Stata",
                    true
                  ),
                  true
                )}
                ${renderSelectionGroup(
                  evaluation,
                  "country",
                  "Liste des pays",
                  `
                    <div class="country-grid">
                      ${evaluation.countries
                        .map((country) => renderCountryCheckbox(evaluation, country))
                        .join("")}
                    </div>
                  `
                )}
                ${renderSelectionGroup(
                  evaluation,
                  "manual",
                  "Manuel d'utilisation des données",
                  renderCycleCheckbox(
                    evaluation,
                    "manual",
                    "Manuel d'utilisation des données",
                    "PDF",
                    false
                  )
                )}
                ${renderSelectionGroup(
                  evaluation,
                  "technical",
                  "Rapport technique",
                  renderCycleCheckbox(
                    evaluation,
                    "technical",
                    "Rapport technique",
                    "PDF",
                    false
                  )
                )}
                ${renderSelectionGroup(
                  evaluation,
                  "questionnaires",
                  "Questionnaires contextuels",
                  renderCycleCheckbox(
                    evaluation,
                    "questionnaires",
                    "Questionnaires contextuels",
                    "PDF",
                    false
                  )
                )}
              </div>
            </details>
          </article>
        `;
      }

      const evaluationDisclosure = `evaluation::${evaluation.id}`;
      return `
        <article class="evaluation-card">
          <details
            data-disclosure="${evaluationDisclosure}"
            ${isDisclosureOpen(evaluationDisclosure, false) ? "open" : ""}
          >
            <summary>
              <div class="evaluation-summary">
                <h3>${evaluation.label}</h3>
                <p>${evaluation.subtitle}</p>
              </div>
              <span class="badge">${countLabel}</span>
            </summary>
            <div class="selection-body">
              ${renderSelectionGroup(
                evaluation,
                "entry",
                "Liste des pays et années",
                `
                  <div class="country-grid">
                    ${evaluation.entries
                      .map((entry) => renderHistoricalCheckbox(evaluation, entry))
                      .join("")}
                  </div>
                `,
                true
              )}
            </div>
          </details>
        </article>
      `;
    })
    .join("");

  dom.accessShell.querySelectorAll("details[data-disclosure]").forEach((detailsElement) => {
    detailsElement.addEventListener("toggle", () => {
      appState.disclosureState[detailsElement.dataset.disclosure] = detailsElement.open;
    });
  });

  dom.accessShell.querySelectorAll("input[data-selection]").forEach((input) => {
    input.addEventListener("change", () => {
      if (!appState.accessGranted) return;

      const key = input.dataset.selection;
      if (input.checked) {
        appState.selections.add(key);
      } else {
        appState.selections.delete(key);
      }

      renderAccessShell();
      renderDownloads();
    });
  });
}

function renderSelectionGroup(evaluation, kind, title, body, open = false) {
  const count = getSelectionCountForGroup(evaluation.id, kind);
  const countLabel = count ? `${count} sélection${count > 1 ? "s" : ""}` : "Aucune sélection";
  const disclosureKey = `group::${evaluation.id}::${kind}`;

  return `
    <div class="selection-group">
      <details
        data-disclosure="${disclosureKey}"
        ${isDisclosureOpen(disclosureKey, open) ? "open" : ""}
      >
        <summary>
          <span class="selection-group-title">${title}</span>
          <span class="selection-group-count">${countLabel}</span>
        </summary>
        <div class="selection-group-body">
          ${body}
        </div>
      </details>
    </div>
  `;
}

function renderCycleCheckbox(evaluation, kind, title, formatLabel, featured = false) {
  const key = selectionKey(evaluation.id, kind);
  const checked = appState.selections.has(key);

  return `
    <label class="choice-line compact ${featured ? "featured" : ""}">
      <input type="checkbox" data-selection="${key}" ${checked ? "checked" : ""} />
      <span class="option-copy">
        <strong>${title}</strong>
        <small>${formatLabel}</small>
      </span>
    </label>
  `;
}

function renderCountryCheckbox(evaluation, country) {
  const key = selectionKey(evaluation.id, "country", country);
  const checked = appState.selections.has(key);

  return `
    <label class="country-choice compact">
      <input type="checkbox" data-selection="${key}" ${checked ? "checked" : ""} />
      <span>${country}</span>
    </label>
  `;
}

function renderHistoricalCheckbox(evaluation, entry) {
  const key = selectionKey(evaluation.id, "entry", entry);
  const checked = appState.selections.has(key);

  return `
    <label class="country-choice compact">
      <input type="checkbox" data-selection="${key}" ${checked ? "checked" : ""} />
      <span>${entry}</span>
    </label>
  `;
}

function statusClass(status) {
  if (status === "Disponible") return "available";
  if (status === "À venir") return "pending";
  return "restricted";
}

function renderDownloads() {
  const downloadEntries = buildDownloadEntries();
  dom.downloadCount.textContent = `${downloadEntries.length} fichier${
    downloadEntries.length > 1 ? "s" : ""
  }`;
  dom.goDownloads.disabled = downloadEntries.length === 0 || !appState.accessGranted;

  if (!downloadEntries.length) {
    dom.downloadList.innerHTML = `
      <article class="empty-state">
        Sélectionnez un ou plusieurs éléments dans l'espace d'accès aux données.
      </article>
    `;
    return;
  }

  dom.downloadList.innerHTML = downloadEntries
    .map(
      (entry) => `
        <article class="download-card">
          <div class="download-card-header">
            <div>
              <h3>${entry.title}</h3>
              <p>${entry.group} · ${entry.type}</p>
            </div>
            <span class="status-tag ${statusClass(entry.status)}">${entry.status}</span>
          </div>
          <div class="download-meta">
            ${entry.formats.map((format) => `<span class="file-tag">${format}</span>`).join("")}
          </div>
          <div class="download-actions">
            ${
              entry.status === "Disponible"
                ? entry.formats
                    .map(
                      (format) => `
                        <button
                          type="button"
                          class="download-button"
                          data-download-id="${entry.id}"
                          data-download-format="${format}"
                        >
                          Télécharger ${format.includes("SPSS") ? "SPSS" : format.includes("Stata") ? "Stata" : "PDF"}
                        </button>
                      `
                    )
                    .join("")
                : `<span class="status-note">Fichier non téléchargeable pour le moment.</span>`
            }
          </div>
        </article>
      `
    )
    .join("");

  dom.downloadList.querySelectorAll("[data-download-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = downloadEntries.find((item) => item.id === button.dataset.downloadId);
      if (!entry) return;
      downloadDemoFile(entry, button.dataset.downloadFormat);
    });
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const payload = readFormPayload();
  const errorMessage = validateForm(payload);

  if (errorMessage) {
    dom.formFeedback.textContent = errorMessage;
    return;
  }

  appState.accessGranted = true;
  appState.request = payload;
  saveAccessRequest(payload);
  dom.formFeedback.textContent = "Accès activé.";
  renderRequestSummary();
  renderAccessShell();
  renderDownloads();
}

function restoreAccessRequest() {
  const saved = localStorage.getItem("pasecAccessRequest");
  if (!saved) return;

  try {
    appState.request = JSON.parse(saved);
    appState.accessGranted = true;
  } catch {
    appState.request = null;
    appState.accessGranted = false;
  }
}

function attachEvents() {
  dom.accessForm.addEventListener("submit", handleFormSubmit);

  dom.goDownloads.addEventListener("click", () => {
    dom.downloadSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function initialise() {
  restoreAccessRequest();
  renderRequestSummary();
  renderAccessShell();
  renderDownloads();
  attachEvents();
}

initialise();
