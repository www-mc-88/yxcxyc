let users = []; // Hier werden die Benutzerdaten gespeichert (nur im aktuellen Sitzungsbeispiel)
const registrationPassword = "admin"; // Das extra Passwort, das für die Registrierung erforderlich ist

function showRegisterForm() {
    document.getElementById("loginFormContainer").style.display = "none";
    document.getElementById("registerFormContainer").style.display = "block";
}

function showLoginForm() {
    document.getElementById("registerFormContainer").style.display = "none";
    document.getElementById("loginFormContainer").style.display = "block";
}

// Registrierung
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Verhindert das tatsächliche Absenden des Formulars

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;
    const enteredRegistrationPassword = document.getElementById("registrationPassword").value;

    // Überprüfen, ob das zusätzliche Registrierungspasswort korrekt ist
    if (enteredRegistrationPassword !== registrationPassword) {
        document.getElementById("registerError").innerText = "Das Registrierungspasswort ist falsch!";
        return;
    }

    // Überprüfen, ob die Passwörter übereinstimmen
    if (password !== confirmPassword) {
        document.getElementById("registerError").innerText = "Die Passwörter stimmen nicht überein!";
        return;
    }

    // Überprüfen, ob das Passwort sicher genug ist (mindestens 8 Zeichen, 1 Zahl, 1 Großbuchstabe)
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById("registerError").innerText = "Das Passwort muss mindestens 8 Zeichen lang sein, eine Zahl und einen Großbuchstaben enthalten.";
        return;
    }

    // Benutzer speichern (Passwort wird gehasht, hier vereinfachend mit einer Base64-Codierung für das Beispiel)
    const hashedPassword = btoa(password);  // Dies ist nur zu Demonstrationszwecken (kein echter Sicherheitsmechanismus)

    users.push({ username, password: hashedPassword });
    alert("Registrierung erfolgreich!");

    // Zurück zum Login-Formular
    showLoginForm();
});

// Login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Verhindert das tatsächliche Absenden des Formulars

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Suchen nach dem Benutzer
    const user = users.find(user => user.username === username);

    if (user && user.password === btoa(password)) {  // Passwortvergleich (hier vereinfacht, echte Anwendungen sollten bcrypt verwenden)
        alert("Erfolgreich eingeloggt!");
        // Weiterleitung zur Dashboard-Seite
        window.location.href = "inkex.html";  // Beispiel-Weiterleitung
    } else {
        document.getElementById("loginError").innerText = "Ungültiger Benutzername oder Passwort!";
    }
});
