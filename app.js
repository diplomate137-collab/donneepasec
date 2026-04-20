const cycleDefinitions = [
  {
    key: "PASEC2014",
    label: "PASEC2014",
    year: "2014",
    description: "Évaluation internationale sur 10 pays avec bases et documents complets.",
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
    key: "PASEC2019",
    label: "PASEC2019",
    year: "2019",
    description: "Cycle élargi à 14 pays avec ressources internationales et nationales.",
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
    key: "PASEC2024",
    label: "PASEC2024",
    year: "2024",
    description: "Cycle en déploiement avec publication progressive selon les statuts.",
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
    key: "Autres évaluations PASEC",
    label: "Autres évaluations PASEC",
    year: "Historique",
    description: "Évaluations historiques consultables par pays puis année.",
    countries: [],
  },
];

const historicalEntries = [
  { country: "Bénin", year: "2005", language: "Français" },
  { country: "Burkina Faso", year: "2006", language: "Français" },
  { country: "Burundi", year: "2008-2009", language: "Français" },
  { country: "Cambodge", year: "2011-2012", language: "Français" },
  { country: "Cameroun (zone anglophone)", year: "2005", language: "Anglais" },
  { country: "Cameroun (zone francophone)", year: "2005", language: "Français" },
  { country: "Comores", year: "2008-2009", language: "Français" },
  { country: "Congo", year: "2006", language: "Français" },
  { country: "Côte d'Ivoire", year: "2009", language: "Français" },
  { country: "Gabon", year: "2006", language: "Français" },
  { country: "Guinée", year: "2004", language: "Français" },
  { country: "Liban", year: "2010", language: "Français" },
  { country: "Madagascar", year: "2005", language: "Français" },
  { country: "Mali", year: "2011-2012", language: "Français" },
  { country: "Maurice", year: "2006", language: "Français" },
  { country: "Mauritanie", year: "2004", language: "Français" },
  { country: "RDP Lao", year: "2011-2012", language: "Français" },
  { country: "République démocratique du Congo", year: "2010", language: "Français" },
  { country: "Sénégal", year: "2006", language: "Français" },
  { country: "Tchad", year: "2004", language: "Français" },
  { country: "Tchad", year: "2010", language: "Français" },
  { country: "Togo", year: "2010", language: "Français" },
  { country: "Vietnam", year: "2011-2012", language: "Français" },
];

const usageOptions = [
  "Revue documentaire / consultation",
  "Utilisation dans une publication",
  "Analyse secondaire de données",
  "Utilisation dans un mémoire ou une thèse",
  "Appui à la décision / formulation de politique publique",
  "Usage pédagogique ou universitaire",
  "Autre",
];

const profileOptions = [
  "Décideur politique",
  "Chercheur",
  "Enseignant-chercheur / universitaire",
  "Étudiant",
  "Enseignant du primaire ou du secondaire",
  "Consultant / expert",
  "Partenaire technique et financier",
  "Autre",
];

const baseFileFormats = [
  { label: "SPSS (.sav)", extension: "sav", mime: "application/octet-stream" },
  { label: "Stata (.dta)", extension: "dta", mime: "application/octet-stream" },
];

const documentFormats = {
  questionnaire: [{ label: "PDF (.pdf)", extension: "pdf", mime: "application/pdf" }],
  manual: [{ label: "PDF (.pdf)", extension: "pdf", mime: "application/pdf" }],
  documentation: [{ label: "PDF (.pdf)", extension: "pdf", mime: "application/pdf" }],
  archive: [{ label: "ZIP (.zip)", extension: "zip", mime: "application/zip" }],
};

const appState = {
  accessRequest: null,
  unlocked: false,
  selectedResourceIds: new Set(),
  filters: {
    cycle: "all",
    country: "all",
    year: "all",
    type: "all",
    language: "all",
    status: "all",
    search: "",
  },
};

const dom = {
  accessForm: document.querySelector("#access-form"),
  cycleOptions: document.querySelector("#cycle-options"),
  countryOptions: document.querySelector("#country-options"),
  usageOptions: document.querySelector("#usage-options"),
  profileSelect: document.querySelector("#profile-select"),
  allCountries: document.querySelector("#all-countries"),
  formFeedback: document.querySelector("#form-feedback"),
  savedRequestPreview: document.querySelector("#saved-request-preview"),
  portalSection: document.querySelector("#portal-section"),
  portalSummary: document.querySelector("#portal-summary"),
  spaceGrid: document.querySelector("#space-grid"),
  treeView: document.querySelector("#tree-view"),
  resultsList: document.querySelector("#results-list"),
  resultsCount: document.querySelector("#results-count"),
  selectionCount: document.querySelector("#selection-count"),
  metadataPreview: document.querySelector("#metadata-preview"),
  filterCycle: document.querySelector("#filter-cycle"),
  filterCountry: document.querySelector("#filter-country"),
  filterYear: document.querySelector("#filter-year"),
  filterType: document.querySelector("#filter-type"),
  filterLanguage: document.querySelector("#filter-language"),
  filterStatus: document.querySelector("#filter-status"),
  filterSearch: document.querySelector("#filter-search"),
  resetFilters: document.querySelector("#reset-filters"),
  downloadSelection: document.querySelector("#download-selection"),
  statusStats: document.querySelector("#status-stats"),
};

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildSuggestedUrl(parts, extension) {
  return `/downloads/${parts.map(slugify).join("/")}.${extension}`;
}

function buildDownloads(parts, formats) {
  return formats.map((format) => ({
    ...format,
    suggestedUrl: buildSuggestedUrl(parts, format.extension),
  }));
}

function languageForCountry(country) {
  if (country === "Nigéria") return "Anglais";
  if (country === "Mozambique") return "Portugais";
  if (country === "Djibouti") return "Français";
  return "Français";
}

function buildCycleStatuses(cycleKey, index) {
  if (cycleKey === "PASEC2024") {
    if (index <= 4) {
      return { base: "Disponible", questionnaire: "Disponible", documentation: "Disponible" };
    }
    if (index <= 12) {
      return { base: "À venir", questionnaire: "Disponible", documentation: "À venir" };
    }
    if (index <= 17) {
      return { base: "Restreint", questionnaire: "Disponible", documentation: "Restreint" };
    }
    return { base: "Non publié", questionnaire: "À venir", documentation: "Non publié" };
  }

  if (cycleKey === "PASEC2019" && index >= 11) {
    return { base: "Disponible", questionnaire: "Disponible", documentation: "Restreint" };
  }

  return { base: "Disponible", questionnaire: "Disponible", documentation: "Disponible" };
}

function createResource({
  id,
  title,
  cycle,
  year,
  scope,
  country,
  type,
  language,
  status,
  downloads,
  order,
  updatedAt,
}) {
  return {
    id,
    title,
    cycle,
    year,
    scope,
    country,
    type,
    language,
    status,
    downloads,
    updatedAt,
    order,
  };
}

function generateCycleResources(definition) {
  const baseId = slugify(definition.key);
  const internationalStatus =
    definition.key === "PASEC2024"
      ? {
          base: "À venir",
          manual: "Disponible",
          documentation: "Disponible",
          questionnaire: "Disponible",
        }
      : {
          base: "Disponible",
          manual: "Disponible",
          documentation: "Disponible",
          questionnaire: "Disponible",
        };

  const internationalResources = [
    createResource({
      id: `${baseId}-international-base`,
      title: `Base de données internationale ${definition.label}`,
      cycle: definition.label,
      year: definition.year,
      scope: "Internationale",
      country: "International",
      type: "Base de données internationale",
      language: "Français",
      status: internationalStatus.base,
      downloads: buildDownloads(
        [definition.label, "international", "base-de-donnees"],
        baseFileFormats
      ),
      order: 1,
      updatedAt: "2026-04-20",
    }),
    createResource({
      id: `${baseId}-international-manuel`,
      title: `Manuel d'utilisation des données ${definition.label}`,
      cycle: definition.label,
      year: definition.year,
      scope: "Internationale",
      country: "International",
      type: "Manuel",
      language: "Français",
      status: internationalStatus.manual,
      downloads: buildDownloads(
        [definition.label, "international", "manuel-utilisation"],
        documentFormats.manual
      ),
      order: 2,
      updatedAt: "2026-04-20",
    }),
    createResource({
      id: `${baseId}-international-technique`,
      title: `Documentation technique ${definition.label}`,
      cycle: definition.label,
      year: definition.year,
      scope: "Internationale",
      country: "International",
      type: "Documentation technique",
      language: "Français",
      status: internationalStatus.documentation,
      downloads: buildDownloads(
        [definition.label, "international", "documentation-technique"],
        documentFormats.documentation
      ),
      order: 3,
      updatedAt: "2026-04-20",
    }),
    createResource({
      id: `${baseId}-international-questionnaires`,
      title: `Questionnaires ${definition.label}`,
      cycle: definition.label,
      year: definition.year,
      scope: "Internationale",
      country: "International",
      type: "Questionnaire",
      language: "Français",
      status: internationalStatus.questionnaire,
      downloads: buildDownloads(
        [definition.label, "international", "questionnaires"],
        documentFormats.archive
      ),
      order: 4,
      updatedAt: "2026-04-20",
    }),
  ];

  const countryResources = definition.countries.flatMap((country, index) => {
    const statuses = buildCycleStatuses(definition.key, index);
    const countrySlug = slugify(country);
    const language = languageForCountry(country);

    return [
      createResource({
        id: `${baseId}-${countrySlug}-base`,
        title: `Base de données nationale ${definition.label} - ${country}`,
        cycle: definition.label,
        year: definition.year,
        scope: "Nationale",
        country,
        type: "Base de données nationale",
        language,
        status: statuses.base,
        downloads: buildDownloads(
          [definition.label, country, "base-nationale"],
          baseFileFormats
        ),
        order: 10 + index,
        updatedAt: "2026-04-20",
      }),
      createResource({
        id: `${baseId}-${countrySlug}-questionnaire`,
        title: `Questionnaire ${definition.label} - ${country}`,
        cycle: definition.label,
        year: definition.year,
        scope: "Nationale",
        country,
        type: "Questionnaire",
        language,
        status: statuses.questionnaire,
        downloads: buildDownloads(
          [definition.label, country, "questionnaire"],
          documentFormats.questionnaire
        ),
        order: 120 + index,
        updatedAt: "2026-04-20",
      }),
      createResource({
        id: `${baseId}-${countrySlug}-documentation`,
        title: `Documentation ${definition.label} - ${country}`,
        cycle: definition.label,
        year: definition.year,
        scope: "Nationale",
        country,
        type: "Documentation technique",
        language,
        status: statuses.documentation,
        downloads: buildDownloads(
          [definition.label, country, "documentation"],
          documentFormats.documentation
        ),
        order: 220 + index,
        updatedAt: "2026-04-20",
      }),
    ];
  });

  return [...internationalResources, ...countryResources];
}

function generateHistoricalResources() {
  return historicalEntries.flatMap((entry, index) => {
    const baseId = `${slugify(entry.country)}-${slugify(entry.year)}`;
    const status =
      entry.country === "Liban" || entry.country === "Vietnam"
        ? { base: "Restreint", questionnaire: "Disponible", documentation: "Disponible" }
        : entry.country === "RDP Lao"
          ? { base: "Non publié", questionnaire: "Disponible", documentation: "Restreint" }
          : { base: "Disponible", questionnaire: "Disponible", documentation: "Disponible" };

    return [
      createResource({
        id: `historique-${baseId}-base`,
        title: `Base de données ${entry.country} ${entry.year}`,
        cycle: "Autres évaluations PASEC",
        year: entry.year,
        scope: "Historique",
        country: entry.country,
        type: "Base de données nationale",
        language: entry.language,
        status: status.base,
        downloads: buildDownloads(
          ["historique", entry.country, entry.year, "base-de-donnees"],
          baseFileFormats
        ),
        order: 300 + index,
        updatedAt: "2026-04-20",
      }),
      createResource({
        id: `historique-${baseId}-questionnaire`,
        title: `Questionnaire ${entry.country} ${entry.year}`,
        cycle: "Autres évaluations PASEC",
        year: entry.year,
        scope: "Historique",
        country: entry.country,
        type: "Questionnaire",
        language: entry.language,
        status: status.questionnaire,
        downloads: buildDownloads(
          ["historique", entry.country, entry.year, "questionnaire"],
          documentFormats.questionnaire
        ),
        order: 450 + index,
        updatedAt: "2026-04-20",
      }),
      createResource({
        id: `historique-${baseId}-documentation`,
        title: `Documentation ${entry.country} ${entry.year}`,
        cycle: "Autres évaluations PASEC",
        year: entry.year,
        scope: "Historique",
        country: entry.country,
        type: "Autre document",
        language: entry.language,
        status: status.documentation,
        downloads: buildDownloads(
          ["historique", entry.country, entry.year, "documentation"],
          documentFormats.documentation
        ),
        order: 600 + index,
        updatedAt: "2026-04-20",
      }),
    ];
  });
}

const resources = [
  ...cycleDefinitions
    .filter((definition) => definition.key !== "Autres évaluations PASEC")
    .flatMap(generateCycleResources),
  ...generateHistoricalResources(),
].sort((left, right) => left.order - right.order || left.title.localeCompare(right.title));

function getAllCountriesForSelectedCycles(selectedCycles) {
  if (!selectedCycles.length) return [];

  const regularCountries = cycleDefinitions
    .filter((definition) => selectedCycles.includes(definition.label))
    .flatMap((definition) => definition.countries);

  const historicalCountries = selectedCycles.includes("Autres évaluations PASEC")
    ? historicalEntries.map((entry) => entry.country)
    : [];

  return [...new Set([...regularCountries, ...historicalCountries])].sort((a, b) =>
    a.localeCompare(b)
  );
}

function getCountrySectionModel(selectedCycles) {
  return {
    includeInternational: selectedCycles.some(
      (cycle) => cycle !== "Autres évaluations PASEC"
    ),
    countries: getAllCountriesForSelectedCycles(selectedCycles),
  };
}

function getUniqueValues(key, filterFn = () => true) {
  return [...new Set(resources.filter(filterFn).map((resource) => resource[key]))].sort((a, b) =>
    a.localeCompare(b)
  );
}

function isAvailable(resource) {
  return resource.status === "Disponible";
}

function downloadTextFile(filename, contents, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function buildResourceDemo(resource, download) {
  return [
    "Portail d'accès aux données PASEC - démonstration",
    "",
    `Ressource : ${resource.title}`,
    `Cycle / année : ${resource.cycle} / ${resource.year}`,
    `Pays : ${resource.country}`,
    `Type : ${resource.type}`,
    `Langue : ${resource.language}`,
    `Statut : ${resource.status}`,
    `Format demandé : ${download.label}`,
    `URL directe prévue : ${download.suggestedUrl}`,
    "",
    "Dans l'intégration réelle, ce bouton pointera vers le fichier final.",
  ].join("\n");
}

function renderCycleOptions() {
  dom.cycleOptions.innerHTML = cycleDefinitions
    .map(
      (definition) => `
        <label class="pill-option">
          <input type="checkbox" name="cycles" value="${definition.label}" />
          <span>${definition.label}</span>
        </label>
      `
    )
    .join("");
}

function renderUsageOptions() {
  dom.usageOptions.innerHTML = usageOptions
    .map(
      (option) => `
        <label class="country-option">
          <input type="checkbox" name="usage" value="${option}" />
          <span>${option}</span>
        </label>
      `
    )
    .join("");
}

function renderProfileOptions() {
  dom.profileSelect.innerHTML += profileOptions
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("");
}

function renderCountryOptions() {
  const selectedCycles = getSelectedCyclesFromForm();
  const previousSelections = new Set(
    [...dom.accessForm.querySelectorAll('input[name="countries"]:checked')].map(
      (input) => input.value
    )
  );
  const { includeInternational, countries } = getCountrySectionModel(selectedCycles);

  if (!countries.length && !includeInternational) {
    dom.countryOptions.innerHTML =
      '<p class="field-help">Sélectionnez d\'abord un ou plusieurs espaces de données.</p>';
    return;
  }

  const internationalMarkup = includeInternational
    ? `
      <div class="country-group">
        <p class="country-group-title">Accès international</p>
        <label class="country-option featured-option">
          <input
            type="checkbox"
            name="countries"
            value="International"
            ${previousSelections.has("International") ? "checked" : ""}
          />
          <span class="option-copy">
            <strong>International</strong>
            <small>
              Accéder directement à la base de données internationale, au
              manuel, à la documentation technique et aux questionnaires du ou
              des cycles sélectionnés.
            </small>
          </span>
        </label>
      </div>
    `
    : "";

  const countriesMarkup = countries.length
    ? `
      <div class="country-group">
        <p class="country-group-title">Accès par pays</p>
        <div class="checkbox-grid">
          ${countries
            .map(
              (country) => `
                <label class="country-option">
                  <input
                    type="checkbox"
                    name="countries"
                    value="${country}"
                    ${previousSelections.has(country) ? "checked" : ""}
                    ${dom.allCountries.checked ? "disabled" : ""}
                  />
                  <span>${country}</span>
                </label>
              `
            )
            .join("")}
        </div>
      </div>
    `
    : "";

  dom.countryOptions.innerHTML = `${internationalMarkup}${countriesMarkup}`;
}

function getSelectedCyclesFromForm() {
  return [...dom.accessForm.querySelectorAll('input[name="cycles"]:checked')].map(
    (input) => input.value
  );
}

function getSelectedCountriesFromForm() {
  const selectedCountries = [...dom.accessForm.querySelectorAll('input[name="countries"]:checked')].map(
    (input) => input.value
  );

  if (dom.allCountries.checked) {
    return selectedCountries.includes("International")
      ? ["Tous les pays", "International"]
      : ["Tous les pays"];
  }

  return selectedCountries;
}

function readAccessForm() {
  const formData = new FormData(dom.accessForm);
  const selectedCycles = getSelectedCyclesFromForm();
  const selectedCountries = getSelectedCountriesFromForm();
  const usage = [...dom.accessForm.querySelectorAll('input[name="usage"]:checked')].map(
    (input) => input.value
  );

  return {
    lastName: formData.get("lastName")?.toString().trim(),
    firstName: formData.get("firstName")?.toString().trim(),
    institution: formData.get("institution")?.toString().trim(),
    jobTitle: formData.get("jobTitle")?.toString().trim(),
    residenceCountry: formData.get("residenceCountry")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    cycles: selectedCycles,
    countries: selectedCountries,
    usage,
    otherUsage: formData.get("otherUsage")?.toString().trim(),
    profile: formData.get("profile")?.toString().trim(),
    otherProfile: formData.get("otherProfile")?.toString().trim(),
    consent: Boolean(formData.get("consent")),
    submittedAt: new Date().toLocaleString("fr-FR"),
  };
}

function validateAccessForm(payload) {
  const missingFields = [
    payload.lastName,
    payload.firstName,
    payload.institution,
    payload.jobTitle,
    payload.residenceCountry,
    payload.email,
  ].some((value) => !value);

  if (missingFields) return "Veuillez compléter toutes les informations d'identification.";
  if (!payload.cycles.length) return "Veuillez choisir au moins un espace de données.";
  if (!payload.countries.length) return "Veuillez sélectionner au moins un pays ou Tous les pays.";
  if (!payload.usage.length && !payload.otherUsage)
    return "Veuillez indiquer l'usage prévu des données.";
  if (!payload.profile) return "Veuillez sélectionner un profil utilisateur.";
  if (!payload.consent) return "La validation des conditions d'utilisation est obligatoire.";
  return "";
}

function saveAccessRequest(payload) {
  const saved = JSON.parse(localStorage.getItem("pasecAccessRequests") || "[]");
  saved.unshift(payload);
  localStorage.setItem("pasecAccessRequests", JSON.stringify(saved.slice(0, 10)));
}

function renderSavedRequestPreview() {
  const saved = JSON.parse(localStorage.getItem("pasecAccessRequests") || "[]");
  const latest = saved[0];

  if (!latest) {
    dom.savedRequestPreview.textContent = "Aucune demande enregistrée localement pour le moment.";
    return;
  }

  dom.savedRequestPreview.innerHTML = `
    <strong>${latest.firstName} ${latest.lastName}</strong><br />
    ${latest.institution} · ${latest.profile}<br />
    ${latest.cycles.join(", ")}<br />
    ${latest.countries.join(", ")}<br />
    <span>Enregistré le ${latest.submittedAt}</span>
  `;
}

function setDefaultFiltersFromRequest(request) {
  appState.filters.cycle = request.cycles.length === 1 ? request.cycles[0] : "all";
  appState.filters.country =
    request.countries.length === 1 && request.countries[0] !== "Tous les pays"
      ? request.countries[0]
      : "all";
  appState.filters.year = "all";
  appState.filters.type = "all";
  appState.filters.language = "all";
  appState.filters.status = "all";
  appState.filters.search = "";
}

function renderPortalSummary() {
  if (!appState.accessRequest) return;

  const request = appState.accessRequest;
  dom.portalSummary.innerHTML = `
    <span class="meta-pill">${request.firstName} ${request.lastName}</span>
    <span class="meta-pill">${request.institution}</span>
    <span class="meta-pill">${request.cycles.join(", ")}</span>
    <span class="meta-pill">${request.countries.join(", ")}</span>
  `;
}

function renderSpaceCards() {
  dom.spaceGrid.innerHTML = cycleDefinitions
    .map((definition) => {
      const cycleResources = resources.filter((resource) => resource.cycle === definition.label);
      const availableCount = cycleResources.filter((resource) => resource.status === "Disponible").length;
      const active = appState.filters.cycle === definition.label;

      return `
        <button type="button" class="space-card ${active ? "active" : ""}" data-cycle="${definition.label}">
          <h3>${definition.label}</h3>
          <p>${definition.description}</p>
          <div class="space-footer">
            <span class="space-count">${cycleResources.length} ressources</span>
            <span class="status-pill space-status">${availableCount} disponibles</span>
          </div>
        </button>
      `;
    })
    .join("");

  dom.spaceGrid.querySelectorAll(".space-card").forEach((button) => {
    button.addEventListener("click", () => {
      appState.filters.cycle = button.dataset.cycle;
      appState.filters.country = "all";
      syncFiltersToInputs();
      renderPortal();
    });
  });
}

function renderTreeView() {
  const historicalByCountry = historicalEntries.reduce((accumulator, entry) => {
    accumulator[entry.country] ||= [];
    accumulator[entry.country].push(entry.year);
    return accumulator;
  }, {});

  dom.treeView.innerHTML = cycleDefinitions
    .map((definition) => {
      if (definition.label === "Autres évaluations PASEC") {
        return `
          <details>
            <summary>${definition.label}</summary>
            <div class="tree-branch">
              ${Object.entries(historicalByCountry)
                .sort(([left], [right]) => left.localeCompare(right))
                .map(
                  ([country, years]) => `
                    <details>
                      <summary>${country}</summary>
                      <div class="tree-branch">
                        ${years
                          .map(
                            (year) => `
                              <button
                                type="button"
                                class="tree-button"
                                data-cycle="Autres évaluations PASEC"
                                data-country="${country}"
                                data-year="${year}"
                              >
                                <span>${year}</span>
                                <span>Voir</span>
                              </button>
                            `
                          )
                          .join("")}
                      </div>
                    </details>
                  `
                )
                .join("")}
            </div>
          </details>
        `;
      }

      return `
        <details>
          <summary>${definition.label}</summary>
          <div class="tree-branch">
            <button
              type="button"
              class="tree-button"
              data-cycle="${definition.label}"
              data-country="International"
            >
              <span>International</span>
              <span>Voir</span>
            </button>
            ${definition.countries
              .map(
                (country) => `
                  <button
                    type="button"
                    class="tree-button"
                    data-cycle="${definition.label}"
                    data-country="${country}"
                  >
                    <span>${country}</span>
                    <span>Voir</span>
                  </button>
                `
              )
              .join("")}
          </div>
        </details>
      `;
    })
    .join("");

  dom.treeView.querySelectorAll(".tree-button").forEach((button) => {
    button.addEventListener("click", () => {
      appState.filters.cycle = button.dataset.cycle || "all";
      appState.filters.country = button.dataset.country || "all";
      appState.filters.year = button.dataset.year || "all";
      syncFiltersToInputs();
      renderPortal();
    });
  });
}

function populateFilterSelect(selectElement, options, placeholder) {
  selectElement.innerHTML = [
    `<option value="all">${placeholder}</option>`,
    ...options.map((option) => `<option value="${option}">${option}</option>`),
  ].join("");
}

function refreshFilterOptions() {
  populateFilterSelect(
    dom.filterCycle,
    cycleDefinitions.map((definition) => definition.label),
    "Tous les cycles"
  );

  const cycleFilterFn =
    appState.filters.cycle === "all"
      ? () => true
      : (resource) => resource.cycle === appState.filters.cycle;

  populateFilterSelect(
    dom.filterCountry,
    getUniqueValues("country", cycleFilterFn),
    "Tous les pays"
  );

  const countryFilterFn = (resource) =>
    cycleFilterFn(resource) &&
    (appState.filters.country === "all" || resource.country === appState.filters.country);

  populateFilterSelect(dom.filterYear, getUniqueValues("year", countryFilterFn), "Toutes les années");
  populateFilterSelect(
    dom.filterType,
    getUniqueValues("type", cycleFilterFn),
    "Tous les types"
  );
  populateFilterSelect(
    dom.filterLanguage,
    getUniqueValues("language", cycleFilterFn),
    "Toutes les langues"
  );
  populateFilterSelect(
    dom.filterStatus,
    getUniqueValues("status", cycleFilterFn),
    "Tous les statuts"
  );
}

function syncFiltersToInputs() {
  refreshFilterOptions();
  dom.filterCycle.value = appState.filters.cycle;
  dom.filterCountry.value = appState.filters.country;
  dom.filterYear.value = appState.filters.year;
  dom.filterType.value = appState.filters.type;
  dom.filterLanguage.value = appState.filters.language;
  dom.filterStatus.value = appState.filters.status;
  dom.filterSearch.value = appState.filters.search;
}

function getFilteredResources() {
  return resources.filter((resource) => {
    const searchHaystack = [
      resource.title,
      resource.cycle,
      resource.country,
      resource.type,
      resource.language,
      resource.year,
    ]
      .join(" ")
      .toLowerCase();

    return (
      (appState.filters.cycle === "all" || resource.cycle === appState.filters.cycle) &&
      (appState.filters.country === "all" || resource.country === appState.filters.country) &&
      (appState.filters.year === "all" || resource.year === appState.filters.year) &&
      (appState.filters.type === "all" || resource.type === appState.filters.type) &&
      (appState.filters.language === "all" || resource.language === appState.filters.language) &&
      (appState.filters.status === "all" || resource.status === appState.filters.status) &&
      (!appState.filters.search ||
        searchHaystack.includes(appState.filters.search.toLowerCase()))
    );
  });
}

function renderStatusStats(filteredResources) {
  const statuses = ["Disponible", "À venir", "Restreint", "Non publié"];
  dom.statusStats.innerHTML = statuses
    .map((status) => {
      const count = filteredResources.filter((resource) => resource.status === status).length;
      return `<span class="status-pill ${statusClassName(status)}">${status} : ${count}</span>`;
    })
    .join("");
}

function statusClassName(status) {
  return `status-${slugify(status)}`;
}

function renderResults() {
  const filteredResources = getFilteredResources();
  renderStatusStats(filteredResources);

  dom.resultsCount.textContent = `${filteredResources.length} ressource${
    filteredResources.length > 1 ? "s" : ""
  } trouvée${filteredResources.length > 1 ? "s" : ""}`;

  dom.resultsList.innerHTML = filteredResources.length
    ? filteredResources
        .map((resource) => {
          const selected = appState.selectedResourceIds.has(resource.id);
          return `
            <article class="resource-card">
              <div class="resource-header">
                <label class="resource-selector">
                  <input
                    type="checkbox"
                    value="${resource.id}"
                    ${selected ? "checked" : ""}
                    ${isAvailable(resource) ? "" : "disabled"}
                  />
                  <span class="resource-title">${resource.title}</span>
                </label>
                <span class="status-pill ${statusClassName(resource.status)}">${resource.status}</span>
              </div>
              <div class="resource-body">
                <p class="resource-subtitle">
                  ${resource.cycle} · ${resource.year} · ${resource.country} · ${resource.scope}
                </p>
                <div class="resource-meta">
                  <span class="meta-pill">${resource.type}</span>
                  <span class="meta-pill">${resource.language}</span>
                  <span class="meta-pill">Mise à jour : ${resource.updatedAt}</span>
                </div>
                <div class="resource-tags">
                  ${resource.downloads
                    .map((download) => `<span class="mini-chip">${download.label}</span>`)
                    .join("")}
                </div>
                <div class="resource-actions">
                  ${
                    isAvailable(resource)
                      ? resource.downloads
                          .map(
                            (download, index) => `
                              <button
                                type="button"
                                class="download-button ${index > 0 ? "alt" : ""}"
                                data-resource-id="${resource.id}"
                                data-format="${download.extension}"
                              >
                                Télécharger ${download.extension.toUpperCase()}
                              </button>
                            `
                          )
                          .join("")
                      : `<span class="resource-unavailable">${resource.status}</span>`
                  }
                </div>
              </div>
            </article>
          `;
        })
        .join("")
    : `
      <article class="resource-card">
        <p class="resource-title">Aucune ressource ne correspond aux filtres actuels.</p>
        <p class="resource-subtitle">
          Ajustez les filtres ou revenez à une vue plus large du catalogue.
        </p>
      </article>
    `;

  dom.resultsList.querySelectorAll('.resource-selector input[type="checkbox"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        appState.selectedResourceIds.add(input.value);
      } else {
        appState.selectedResourceIds.delete(input.value);
      }
      updateSelectionUi();
    });
  });

  dom.resultsList.querySelectorAll(".download-button").forEach((button) => {
    button.addEventListener("click", () => {
      const resource = resources.find((entry) => entry.id === button.dataset.resourceId);
      const download = resource.downloads.find(
        (entry) => entry.extension === button.dataset.format
      );
      const filename = `${slugify(resource.title)}-${download.extension}-demo.txt`;
      downloadTextFile(filename, buildResourceDemo(resource, download));
    });
  });

  const sample = filteredResources[0] || resources[0];
  dom.metadataPreview.textContent = JSON.stringify(
    {
      id: sample.id,
      titre: sample.title,
      cycle: sample.cycle,
      annee: sample.year,
      portee: sample.scope,
      pays: sample.country,
      type: sample.type,
      langue: sample.language,
      statut: sample.status,
      urlTelechargement: sample.downloads.map((download) => download.suggestedUrl),
      dateMiseAJour: sample.updatedAt,
      ordreAffichage: sample.order,
    },
    null,
    2
  );
}

function updateSelectionUi() {
  const selectedCount = appState.selectedResourceIds.size;
  dom.selectionCount.textContent = `${selectedCount} ressource${
    selectedCount > 1 ? "s" : ""
  } sélectionnée${selectedCount > 1 ? "s" : ""}`;
  dom.downloadSelection.disabled = selectedCount === 0;
}

function renderPortal() {
  dom.portalSection.classList.remove("hidden");
  renderPortalSummary();
  renderSpaceCards();
  renderTreeView();
  syncFiltersToInputs();
  renderResults();
  updateSelectionUi();
}

function handleAccessSubmit(event) {
  event.preventDefault();
  const payload = readAccessForm();
  const validationMessage = validateAccessForm(payload);

  if (validationMessage) {
    dom.formFeedback.textContent = validationMessage;
    return;
  }

  saveAccessRequest(payload);
  renderSavedRequestPreview();
  appState.accessRequest = payload;
  appState.unlocked = true;
  appState.selectedResourceIds.clear();
  setDefaultFiltersFromRequest(payload);
  dom.formFeedback.textContent = "Accès enregistré. Le portail de données est maintenant disponible.";
  renderPortal();
  dom.portalSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleGroupDownload() {
  const selectedResources = resources.filter((resource) =>
    appState.selectedResourceIds.has(resource.id)
  );

  if (!selectedResources.length) return;

  const manifest = [
    "titre,cycle,annee,pays,type,langue,statut,formats,url_suggeree",
    ...selectedResources.map((resource) => {
      const formats = resource.downloads.map((download) => download.label).join(" | ");
      const urls = resource.downloads.map((download) => download.suggestedUrl).join(" | ");
      return `"${resource.title}","${resource.cycle}","${resource.year}","${resource.country}","${resource.type}","${resource.language}","${resource.status}","${formats}","${urls}"`;
    }),
  ].join("\n");

  downloadTextFile("selection-portail-pasec.csv", manifest, "text/csv;charset=utf-8");
}

function attachFilterListeners() {
  [
    ["cycle", dom.filterCycle],
    ["country", dom.filterCountry],
    ["year", dom.filterYear],
    ["type", dom.filterType],
    ["language", dom.filterLanguage],
    ["status", dom.filterStatus],
  ].forEach(([key, element]) => {
    element.addEventListener("change", () => {
      appState.filters[key] = element.value;
      renderPortal();
    });
  });

  dom.filterSearch.addEventListener("input", () => {
    appState.filters.search = dom.filterSearch.value.trim();
    renderResults();
  });

  dom.resetFilters.addEventListener("click", () => {
    appState.filters = {
      cycle: "all",
      country: "all",
      year: "all",
      type: "all",
      language: "all",
      status: "all",
      search: "",
    };
    renderPortal();
  });

  dom.downloadSelection.addEventListener("click", handleGroupDownload);
}

function attachFormListeners() {
  dom.accessForm.addEventListener("change", (event) => {
    if (event.target.name === "cycles") {
      renderCountryOptions();
    }

    if (event.target === dom.allCountries) {
      renderCountryOptions();
    }
  });

  dom.accessForm.addEventListener("submit", handleAccessSubmit);
}

function initialise() {
  renderCycleOptions();
  renderUsageOptions();
  renderProfileOptions();
  renderCountryOptions();
  renderSavedRequestPreview();
  attachFormListeners();
  attachFilterListeners();
  syncFiltersToInputs();
  renderResults();
}

initialise();
