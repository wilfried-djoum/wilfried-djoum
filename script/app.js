// menu
let menu = document.querySelector('.menuIcon');
let navbar = document.querySelector('.menu');
var scrollBtn = document.querySelector("#ScrollToTop")

menu.onclick = () => {
    navbar.classList.toggle('active');
    menu.classList.toggle('move')
    bell.classList.remove('active')
}


// custom scroll bar
window.onscroll = function () { mufunction() };
function mufunction() {
    var winscroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winscroll / height) * 100;
    document.getElementById('scroll-bar').style.width = scrolled + '%';
}

//scroll to top bottom
scrollBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
});

// apparition au scroll 
const ratio = .1
const options = {
    root: null,
    rootMargin: '0px',
    threshold: ratio,
}

const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.intersectionRatio > ratio) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
        }
    })
}

const observer = new IntersectionObserver(handleIntersect, options)
document.querySelectorAll('.reveal').forEach(function (s) {
    observer.observe(s)
})
document.querySelectorAll('[class*="reveal-"]').forEach(function (r) {
    observer.observe(r)
})

// pour le filtrage 
function filterSelection(category) {
    var items = document.getElementsByClassName('rowRealisations-item');
    if (category === "all") category = "";

    // Parcours des éléments pour afficher/cacher en fonction de la catégorie
    for (var i = 0; i < items.length; i++) {
        removeClass(items[i], "show");
        if (items[i].className.indexOf(category) > -1) addClass(items[i], "show");
    }
}

// Fonction pour ajouter une classe
function filterSelection(category) {
    var items = document.getElementsByClassName('rowRealisations-item');
    if (category === "all") category = "";

    // Parcours des éléments pour afficher/cacher en fonction de la catégorie
    for (var i = 0; i < items.length; i++) {
        removeClass(items[i], "show");
        if (items[i].className.indexOf(category) > -1) addClass(items[i], "show");
    }

    // Gérer l'état actif du bouton
    var buttons = document.getElementsByClassName("buttonCV");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }
    // Ajouter la classe active au bouton cliqué
    event.currentTarget.classList.add("active");
}

// Fonction pour ajouter une classe
function addClass(element, name) {
    var arr1 = element.className.split(" ");
    var arr2 = name.split(" ");
    for (var i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Fonction pour retirer une classe
function removeClass(element, name) {
    var arr1 = element.className.split(" ");
    var arr2 = name.split(" ");
    for (var i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}


document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const submitButton = document.querySelector('.btnSubmit');
    submitButton.classList.add('loading'); // Ajoute la classe de chargement
    submitButton.value = 'Envoi...'; // Modifie le texte du bouton

    emailjs.sendForm('service_if2mcg9', 'template_a3bjkas', this)
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Message envoyé avec succès!',
                text: 'Votre message a été envoyé avec succès.',
                showConfirmButton: false,
                timer: 3000 // Ferme la popup après 3 secondes
            });
            // Réinitialise le bouton de soumission
            submitButton.classList.remove('loading'); // Retire le loader
            submitButton.value = 'Envoyer le message'; // Remet le texte d'origine
            document.getElementById('contact-form').reset()
        }, function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Échec de l\'envoi du message. Veuillez réessayer.',
                showConfirmButton: true
            });
            // Réinitialise le bouton de soumission
            submitButton.classList.remove('loading'); // Retire le loader
            submitButton.value = 'Envoyer le message'; // Remet le texte d'origine
            document.getElementById('contact-form').reset()
        });

});
