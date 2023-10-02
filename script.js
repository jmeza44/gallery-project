document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    const filterSelect = document.getElementById("filter-select");

    // Obtener datos de la API y crear las cards
    fetch("https://jsonplaceholder.typicode.com/photos")
        .then((response) => response.json())
        .then((data) => {
            data.slice(0, 12).forEach((item) => {
                const card = document.createElement("div");
                card.classList.add("gallery-card", "col-12", "col-sm-3");
                card.innerHTML = `
                    <img src="${item.url}" alt="${item.title}" class="img-fluid"/>
                    <h2 class="fs-4">${item.title}</h2>
                `;
                cardContainer.appendChild(card);

                // Agregar los títulos/nombres al filtro select
                const option = document.createElement("option");
                option.value = item.title;
                option.textContent = item.title;
                filterSelect.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error al cargar datos desde la API:", error);
        });

    // Agregar un evento para manejar el cambio en el filtro select
    filterSelect.addEventListener("change", () => {
        const selectedTitle = filterSelect.value;
        const cards = document.querySelectorAll(".gallery-card");

        cards.forEach((card) => {
            if (selectedTitle === "all" || card.querySelector("h2").textContent === selectedTitle) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
