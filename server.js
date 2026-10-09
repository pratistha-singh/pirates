// ====================================
// BLACK PEARL UNIVERSITY
// Pirate website + horror sound effects
// ====================================

let audioContext;
let masterGain;
let soundEnabled = false;
let soundTimer;

// Create a dark ambient drone using Web Audio.
// No external audio file is required.
function startHorrorSound() {
    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
        alert("Your browser does not support Web Audio.");
        return;
    }

    if (!audioContext) {
        audioContext = new AudioContextClass();

        masterGain = audioContext.createGain();
        masterGain.gain.value = 0.0001;
        masterGain.connect(audioContext.destination);

        // Two low oscillators create an eerie drone.
        const frequencies = [48, 51.5];

        frequencies.forEach((frequency, index) => {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            oscillator.type = index === 0 ? "sawtooth" : "sine";
            oscillator.frequency.value = frequency;

            gain.gain.value = index === 0 ? 0.12 : 0.18;

            oscillator.connect(gain);
            gain.connect(masterGain);

            oscillator.start();
        });
    }

    audioContext.resume();

    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
    masterGain.gain.setTargetAtTime(
        0.045,
        audioContext.currentTime,
        1.2
    );

    soundEnabled = true;

    document.getElementById("soundBtn").textContent =
        "🔊 Sound ON";

    // Random ghostly sound effects.
    clearInterval(soundTimer);

    soundTimer = setInterval(() => {
        if (soundEnabled) {
            playGhostSound();
        }
    }, 9000);
}

function stopHorrorSound() {
    if (audioContext && masterGain) {
        masterGain.gain.cancelScheduledValues(audioContext.currentTime);
        masterGain.gain.setTargetAtTime(
            0.0001,
            audioContext.currentTime,
            0.3
        );
    }

    soundEnabled = false;
    clearInterval(soundTimer);

    document.getElementById("soundBtn").textContent =
        "🔇 Sound OFF";
}

function toggleSound() {
    if (soundEnabled) {
        stopHorrorSound();
    } else {
        startHorrorSound();
    }
}

// Short eerie high-pitched sound.
function playGhostSound() {
    if (!audioContext || !soundEnabled) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    const now = audioContext.currentTime;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(
        850 + Math.random() * 500,
        now
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        180,
        now + 2
    );

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2);

    oscillator.connect(gain);
    gain.connect(masterGain);

    oscillator.start(now);
    oscillator.stop(now + 2.1);
}

// Fake pirate admission form.
document.getElementById("admissionForm").addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const name =
            document.getElementById("studentName").value.trim();

        const department =
            document.getElementById("studentDepartment").value;

        if (!name || !department) return;

        document.getElementById("admissionMessage").textContent =
            `☠️ ${name}, your soul has been registered! ` +
            `Welcome to ${department}. There is no turning back.`;

        this.reset();
    }
);


// Console easter egg.
console.log(
    "%c☠ WELCOME TO BLACK PEARL UNIVERSITY ☠",
    "color: crimson; font-size: 18px; font-weight: bold;"
);

console.log(
    "%cIf you're reading this, you're already part of the crew.",
    "color: goldenrod; font-size: 13px;"
);