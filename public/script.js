// ====================================
// INTERACTIVE PIRATE GUILDS
// ====================================

const guildData = {
    computer: {
        icon: "💻",
        title: "Computer Sorcery",
        description:
            "Welcome to the forbidden chamber of code. " +
            "Here, students summon software, battle mysterious bugs, " +
            "and occasionally sacrifice an entire night to a missing semicolon.",
        courses: [
            "Programming & the Ancient Art of C",
            "Data Structures: The Treasure Map",
            "Web Development & Digital Shipbuilding",
            "Artificial Intelligence: Summoning the Machines"
        ],
        fact:
            "PIRATE LAW: If your code works on the first try, " +
            "check whether the compiler is possessed."
    },

    mechanical: {
        icon: "⚙️",
        title: "Mechanical Mayhem",
        description:
            "Enter the engine room. Learn how machines work, " +
            "how to repair them, and how to explain that strange noise " +
            "coming from the ship's engine.",
        courses: [
            "Engineering Mechanics",
            "Thermodynamics of the Seven Seas",
            "Machine Design & Ship Repairs",
            "Manufacturing: Forging the Fleet"
        ],
        fact:
            "PIRATE LAW: Never ask an engineer how long a repair will take."
    },

    electrical: {
        icon: "⚡",
        title: "Electrical Witchcraft",
        description:
            "Harness the mysterious forces of electricity. " +
            "Master circuits, control systems, and the ancient ritual " +
            "known as finding which wire is faulty.",
        courses: [
            "Circuit Theory & Electrical Spells",
            "Digital Logic: The Binary Curse",
            "Power Systems of the Fleet",
            "Control Systems & Automation"
        ],
        fact:
            "PIRATE LAW: If the lights go out during an exam, " +
            "the examination is officially cursed."
    },

    arts: {
        icon: "📚",
        title: "Arts of Deception",
        description:
            "For students who can turn one sentence into ten pages. " +
            "Study communication, creativity, storytelling, " +
            "and the mysterious art of surviving presentation day.",
        courses: [
            "Creative Writing & Storytelling",
            "Communication & Public Speaking",
            "History of Lost Civilizations",
            "Presentation Skills & Academic Survival"
        ],
        fact:
            "PIRATE LAW: A confident introduction can buy you " +
            "at least three extra seconds to remember your speech."
    }
};

const guildModal = document.getElementById("guildModal");
const guildTitle = document.getElementById("guildTitle");
const guildIcon = document.getElementById("guildIcon");
const guildDescription = document.getElementById("guildDescription");
const guildCourses = document.getElementById("guildCourses");
const guildFact = document.getElementById("guildFact");
const closeGuild = document.getElementById("closeGuild");
const chooseGuild = document.getElementById("chooseGuild");

let activeGuild = null;
let previousFocus = null;

function openGuild(guildKey) {
    const guild = guildData[guildKey];

    if (!guild || !guildModal) return;

    activeGuild = guildKey;
    previousFocus = document.activeElement;

    guildIcon.textContent = guild.icon;
    guildTitle.textContent = guild.title;
    guildDescription.textContent = guild.description;
    guildFact.textContent = guild.fact;

    guildCourses.replaceChildren();

    guild.courses.forEach(course => {
        const item = document.createElement("li");
        item.textContent = "⚓ " + course;
        guildCourses.appendChild(item);
    });

    guildModal.hidden = false;
    document.body.style.overflow = "hidden";
    closeGuild.focus();
}

function closeGuildModal() {
    guildModal.hidden = true;
    document.body.style.overflow = "";

    if (previousFocus) {
        previousFocus.focus();
    }
}

// Clicking a card or its button opens the details.
document.querySelectorAll(".card[data-guild]").forEach(card => {
    card.addEventListener("click", () => {
        openGuild(card.dataset.guild);
    });

    // Keyboard accessibility.
    card.addEventListener("keydown", event => {
        if (
            (event.key === "Enter" || event.key === " ") &&
            event.target === card
        ) {
            event.preventDefault();
            openGuild(card.dataset.guild);
        }
    });
});

// Close button.
closeGuild.addEventListener("click", closeGuildModal);

// Clicking the dark backdrop closes the popup.
guildModal.addEventListener("click", event => {
    if (event.target === guildModal) {
        closeGuildModal();
    }
});

// Escape key closes the popup.
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !guildModal.hidden) {
        closeGuildModal();
    }
});

// Selecting a guild fills in the admission form.
// ====================================
// CURSED PIRATE ADMISSION SYSTEM
// ====================================

const admissionForm = document.getElementById("admissionForm");

const admissionMessages = [
    "CONGRATULATIONS, MORTAL. YOUR SOUL IS NOW UNIVERSITY PROPERTY.",
    "APPLICATION ACCEPTED. ESCAPE REQUESTS WILL BE IGNORED.",
    "WELCOME ABOARD. YOUR FIRST EXAMINATION BEGINS IN YOUR NIGHTMARES.",
    "THE CONTRACT IS SEALED. THE SEA HAS ACCEPTED YOU.",
    "RECRUITMENT COMPLETE. YOUR DESTINY IS NOW UNDER NEW MANAGEMENT."
];

admissionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("studentName")
        .value.trim();

    const email = document.getElementById("studentEmail")
        .value.trim();

    const department = document.getElementById("studentDepartment")
        .value;

    if (!name || !email || !department) {
        document.getElementById("admissionMessage").textContent =
            "☠️ THE CAPTAIN REQUIRES ALL THREE DETAILS, MORTAL.";

        return;
    }

    // Generate a pirate-style application ID.
    const pirateId =
        "BP-" +
        Math.random().toString(36).substring(2, 6).toUpperCase() +
        "-" +
        Math.floor(1000 + Math.random() * 9000);

    const randomMessage =
        admissionMessages[
            Math.floor(Math.random() * admissionMessages.length)
        ];

    // Display the dramatic response.
    document.getElementById("admissionMessage").textContent =
        "☠️ " + randomMessage;

    // Fill in the certificate.
    document.getElementById("certificateName").textContent = name;
    document.getElementById("certificateGuild").textContent = department;
    document.getElementById("pirateId").textContent = pirateId;

    document.getElementById("certificateCurse").textContent =
        "Your attendance shall be monitored. Your deadlines shall multiply. " +
        "Your escape attempts shall be remembered for eternity.";

    // Reveal the certificate.
    const certificate =
        document.getElementById("admissionCertificate");

    certificate.hidden = false;

    // Change the button's message temporarily.
    const submitButton = admissionForm.querySelector(
        'button[type="submit"]'
    );

    submitButton.textContent = "☠️ CONTRACT SEALED!";

    // Scroll the certificate into view.
    certificate.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// ====================================
// DOWNLOAD ADMISSION CERTIFICATE
// ====================================

document.getElementById("downloadCertificate")
    .addEventListener("click", function () {

        const certificate =
            document.getElementById("admissionCertificate");

        const printWindow = window.open("", "_blank");

        if (!printWindow) {
            alert("Please allow pop-ups to print your pirate certificate.");
            return;
        }

        const safeName =
            document.getElementById("certificateName").textContent;

        const safeGuild =
            document.getElementById("certificateGuild").textContent;

        const safeId =
            document.getElementById("pirateId").textContent;

        const safeCurse =
            document.getElementById("certificateCurse").textContent;

        const safeMessage =
            document.getElementById("admissionMessage").textContent;

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Black Pearl University - Soul Contract</title>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: Georgia, serif;
                        background: #e8d5aa;
                        color: #291b0d;
                        padding: 40px;
                        text-align: center;
                    }

                    .paper {
                        max-width: 650px;
                        margin: auto;
                        padding: 40px 25px;
                        border: 8px double #604626;
                        background: #e8d5aa;
                    }

                    h1, h2 {
                        color: #8c1019;
                    }

                    .skull {
                        font-size: 50px;
                    }

                    .name {
                        font-size: 32px;
                        font-weight: bold;
                        overflow-wrap: anywhere;
                    }

                    .divider {
                        margin: 25px;
                    }

                    .curse {
                        border-top: 1px dashed #604626;
                        border-bottom: 1px dashed #604626;
                        padding: 20px 0;
                        line-height: 1.8;
                    }

                    .signature {
                        text-align: right;
                        margin-top: 35px;
                        font-style: italic;
                    }

                    @media print {
                        body { padding: 0; }
                    }
                </style>
            </head>
            <body>
                <div class="paper">
                    <div class="skull">☠</div>
                    <h2>BLACK PEARL UNIVERSITY</h2>
                    <h1>THE SOUL CONTRACT</h1>
                    <p class="divider">⚓ ✦ ⚓</p>
                    <p>${escapeHTML(safeMessage)}</p>
                    <p>By the authority of Captain Blackbeard,</p>
                    <p class="name">${escapeHTML(safeName)}</p>
                    <p>has officially been recruited into</p>
                    <h2>${escapeHTML(safeGuild)}</h2>
                    <p><strong>PIRATE ID:</strong> ${escapeHTML(safeId)}</p>
                    <p class="curse">${escapeHTML(safeCurse)}</p>
                    <p class="signature">
                        Signed in blood,<br>
                        Captain Blackbeard
                    </p>
                    <p>NO REFUNDS. NO RESCUE. NO RE-ADMISSION.</p>
                </div>

                <script>
                    window.onload = function () {
                        window.print();
                    };
                <\/script>
            </body>
            </html>
        `);

        printWindow.document.close();
    });

// Escape text before inserting it into the printable document.
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}