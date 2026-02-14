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
cards.forEach(card => {
    card.addEventListener('click', () => {
        if (!card.classList.contains('opened')) {
            card.classList.add('opened');

            // Sonido de apertura (opcional)
            // new Audio('open.mp3').play();
        } else {
            card.classList.remove('opened');
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

    // Esperar animación y cambiar de pantalla
    setTimeout(() => {
        lockScreen.classList.remove('active');
        mainScreen.classList.add('active');
    }, 1000);
}

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



const comentarios = [
    {
        id: 1,
        mensaje: "Aaah, se partió la calle",
        tipo: "baches",
        user_id: 19278879123
    },
    {
        id: 2,
        mensaje: "Niggers, juajsaus",
        tipo: "alcantarillados",
        user_id: 3
    },
]

