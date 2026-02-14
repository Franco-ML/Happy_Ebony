// Fecha correcta: 08/12/2025
const CORRECT_DATE = {
    day: '08',
    month: '12',
    year: '2025'
};

// Elementos del DOM
const lockScreen = document.getElementById('lockScreen');
const mainScreen = document.getElementById('mainScreen');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const unlockBtn = document.getElementById('unlockBtn');
const lock = document.querySelector('.lock');
const cards = document.querySelectorAll('.card-container');

// Activar pantalla inicial
lockScreen.classList.add('active');

// ============ CARTAS FLOTANTES ============
function openCard(card) {
    // Abrir carta
    card.classList.add('opened');

    // Atenuar las demás cartas
    cards.forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.style.opacity = '0';
            otherCard.style.pointerEvents = 'none';
        }
    });

    // Atenuar el candado
    lock.parentElement.style.opacity = '0.2';
    lock.parentElement.style.pointerEvents = 'none';

    // Sonido de apertura (opcional)
    // new Audio('open.mp3').play();
}

function closeCard(card) {
    // Cerrar carta
    card.classList.remove('opened');

    // Restaurar las demás cartas
    cards.forEach(otherCard => {
        otherCard.style.opacity = '1';
        otherCard.style.pointerEvents = 'all';
    });

    // Restaurar el candado
    lock.parentElement.style.opacity = '1';
    lock.parentElement.style.pointerEvents = 'all';
}

cards.forEach(card => {
    // Click en el sobre para abrir
    const envelope = card.querySelector('.envelope-front, .envelope-flap');
    card.addEventListener('click', (e) => {
        // Solo abrir si no está ya abierta y no se hizo click en el botón de cerrar
        if (!card.classList.contains('opened') && !e.target.classList.contains('close-letter')) {
            openCard(card);
        }
    });

    // Click en el botón de cerrar
    const closeBtn = card.querySelector('.close-letter');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que se propague al card
        closeCard(card);
    });

    // Click en el backdrop (fondo oscuro) para cerrar
    card.addEventListener('click', (e) => {
        if (card.classList.contains('opened') && e.target === card) {
            closeCard(card);
        }
    });
});

// ============ AUTO-FOCUS Y VALIDACIÓN DE INPUTS ============
const inputs = [dayInput, monthInput, yearInput];

inputs.forEach((input, index) => {
    // Solo permitir números
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');

        // Auto-avanzar al siguiente input
        const maxLength = input.getAttribute('maxlength');
        if (e.target.value.length >= maxLength && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    // Retroceder con backspace
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputs[index - 1].focus();
        }
    });

    // Validar con Enter
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            validateDate();
        }
    });
});

// ============ VALIDAR FECHA ============
function validateDate() {
    const day = dayInput.value.padStart(2, '0');
    const month = monthInput.value.padStart(2, '0');
    const year = yearInput.value;

    if (day === CORRECT_DATE.day &&
        month === CORRECT_DATE.month &&
        year === CORRECT_DATE.year) {
        // ¡FECHA CORRECTA!
        unlockSuccess();
    } else {
        // Fecha incorrecta
        unlockError();
    }
}

// ============ ANIMACIÓN DE ÉXITO ============
function unlockSuccess() {
    // Animar candado
    lock.classList.add('unlock');

    // Ocultar cartas
    cards.forEach(card => {
        card.style.animation = 'none';
        card.style.opacity = '0';
        card.style.transform = 'scale(0)';
        card.style.transition = 'all 0.5s ease';
    });

    // Esperar animación y cambiar a la pantalla de pregunta
    setTimeout(() => {
        lockScreen.classList.remove('active');
        // mainScreen.classList.add('active'); // Antes iba directo a main
        document.getElementById('questionScreen').classList.add('active');
    }, 1000);
}

// ============ LÓGICA DE PREGUNTA ============
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const questionScreen = document.getElementById('questionScreen');
const successMessage = document.getElementById('successMessage');

let noClickCount = 0;
const noTexts = [
    "No 💔",
    "¿Seguro?",
    "¡Piénsalo bien!",
    "No me hagas esto...",
    "¡Por favor!",
    "¡Di que sí!"
];

btnNo.addEventListener('click', () => {
    noClickCount++;

    // Hacer más pequeño el botón No
    const currentSizeNo = 1 - (noClickCount * 0.1);
    btnNo.style.transform = `scale(${Math.max(0, currentSizeNo)})`;

    // Hacer más grande el botón Sí
    const currentSizeYes = 1 + (noClickCount * 0.5);
    btnYes.style.transform = `scale(${currentSizeYes})`;

    // Cambiar texto del botón No
    if (noClickCount < noTexts.length) {
        btnNo.innerText = noTexts[noClickCount];
    }
});

btnYes.addEventListener('click', () => {
    // Ocultar pantalla de pregunta
    questionScreen.style.opacity = '0';

    // Mostrar mensaje de éxito
    successMessage.classList.add('active');

    // Lanzar confeti (opcional, si pudiéramos añadir librería)

    // Esperar y mostrar jardín
    setTimeout(() => {
        successMessage.classList.remove('active');
        questionScreen.classList.remove('active');
        mainScreen.classList.add('active');
    }, 3000);
});

// ============ MÚSICA DE FONDO ============
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const startScreen = document.getElementById('startScreen');

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.textContent = '🔊';
        musicBtn.classList.add('playing');
    } else {
        bgMusic.pause();
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('playing');
    }
}

musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
});

// Pantalla de inicio para activar audio
startScreen.addEventListener('click', () => {
    bgMusic.play().then(() => {
        musicBtn.textContent = '🔊';
        musicBtn.classList.add('playing');

        // Ocultar pantalla de inicio
        startScreen.classList.add('hidden');
    }).catch(error => {
        console.log("Error al reproducir audio:", error);
        // Aun si falla, ocultamos para no bloquear
        startScreen.classList.add('hidden');
    });
});

// ============ ANIMACIÓN DE ERROR ============
function unlockError() {
    // Shake del candado
    lock.classList.add('shake');
    setTimeout(() => lock.classList.remove('shake'), 500);

    // Números cayendo
    inputs.forEach((input, index) => {
        setTimeout(() => {
            input.classList.add('fall');

            // Restaurar después de la animación
            setTimeout(() => {
                input.classList.remove('fall');
                input.value = '';
            }, 800);
        }, index * 100);
    });

    // Re-focus en el primer input
    setTimeout(() => {
        dayInput.focus();
    }, 1000);
}

// ============ BOTÓN DESBLOQUEAR ============
unlockBtn.addEventListener('click', validateDate);

// Focus inicial en el día
dayInput.focus();

// ============ EFECTOS ADICIONALES ============
// Crear más corazones dinámicamente (opcional)
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 3 + 's';

    document.querySelector('.hearts-background').appendChild(heart);
}

// Agregar algunos corazones extra
for (let i = 0; i < 5; i++) {
    createFloatingHeart();
}





const users = [
    {
        id: 19278879123,
        name: "Gerald",
        rol: "admin"
    },
    {
        id: 2,
        name: "Harry",
        rol: "cliente"
    },
    {
        id: 3,
        name: "Gonzales",
        email: "ahibsua@gmail.com",
        password: 1234,
        rol: "cliente"
    },
]



