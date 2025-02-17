const back_to_top_btn = document.getElementsByClassName("back-to-top")[0];

back_to_top_btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const cart_buttons = document.querySelectorAll(".add-to-cart-button");
const reset_cart_btn = document.querySelector(".delete_cart");
let quantity_counter = JSON.parse(localStorage.getItem("quantity_counter")) || [
  0, 0, 0, 0
];
let quantity_counter_total =
  JSON.parse(localStorage.getItem("quantity_counter_total")) ||
  quantity_counter.reduce((a, b) => a + b, 0);
let button_states = JSON.parse(localStorage.getItem("button_states")) || [
  false,
  false,
  false,
  false,
];

function updateLocalStorage() {
  localStorage.setItem("quantity_counter", JSON.stringify(quantity_counter));
  localStorage.setItem(
    "quantity_counter_total",
    JSON.stringify(quantity_counter_total)
  );
  localStorage.setItem("button_states", JSON.stringify(button_states));
}

cart_buttons.forEach((button, index) => {
  if (button_states[index]) {
    button.classList.add("add-to-cart-clicked");
    button.innerHTML = "Added to Cart";
  }

  const quantityInput = document.querySelector(`.counter_${index + 1}`);

  quantityInput.value = quantity_counter[index] || 1;

  quantityInput.addEventListener("input", () => {
    if (button_states[index]) {
      button.innerHTML = "Add to Cart";
      button.classList.remove("add-to-cart-clicked");
      button_states[index] = false;
      quantity_counter[index] = 1;
      updateLocalStorage();
    }
  });
});

document.querySelector(".quantity-in-cart").innerText = quantity_counter_total;

cart_buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    button.classList.toggle("add-to-cart-clicked");

    const quantityInput = document.querySelector(`.counter_${index + 1}`);

    if (button.innerText === "Add to Cart") {
      button.innerHTML = "Added to Cart";
      button_states[index] = true;
      if (quantity_counter[index] === 0) {
        quantity_counter[index] = 1;
      }
    } else {
      button.innerHTML = "Add to Cart";
      button_states[index] = false;
      quantity_counter[index] = 0;
      if (quantityInput) {
        quantityInput.value = 1;
      }
    }

    if (button.innerHTML === "Added to Cart" && quantityInput) {
      quantity_counter[index] = Number(quantityInput.value) || 1;
    }

    quantity_counter_total = quantity_counter.reduce((a, b) => a + b, 0);
    document.querySelector(".quantity-in-cart").innerText =
      quantity_counter_total;

    updateLocalStorage();
  });
});

reset_cart_btn.addEventListener("click", () => {
  quantity_counter = [0, 0, 0, 0];
  quantity_counter_total = 0;
  button_states = [false, false, false, false];

  cart_buttons.forEach((button, index) => {
    button.classList.remove("add-to-cart-clicked");
    button.innerHTML = "Add to Cart";

    const quantityInput = document.querySelector(`.counter_${index + 1}`);
    if (quantityInput) {
      quantityInput.value = 1;
    }
  });

  document.querySelector(".quantity-in-cart").innerText =
    quantity_counter_total;

  updateLocalStorage();
});
