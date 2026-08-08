const CART_KEY = "shopify-cart-id";

export function getCartId() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(CART_KEY);
}

export function saveCartId(id: string) {
  if (typeof window === "undefined") return;

  localStorage.setItem(CART_KEY, id);
}

export async function createCart() {
  const response = await fetch("/api/cart/create", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el carrito");
  }

  const cart = await response.json();

  saveCartId(cart.id);

  return cart.id;
}

export async function getOrCreateCart() {
  let cartId = getCartId();

  if (!cartId) {
    cartId = await createCart();
  }

  return cartId;
}

export async function addToCart(
  merchandiseId: string,
  quantity: number
) {
  const cartId = await getOrCreateCart();

  const response = await fetch("/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartId,
      merchandiseId,
      quantity,
    }),
  });

  const data = await response.json();

  console.log("Respuesta API:", data);

  if (!response.ok) {
    throw new Error(
      data.error || "Error al añadir producto"
    );
  }

  window.dispatchEvent(
    new CustomEvent("cartUpdated", {
      detail: data,
    })
  );

  return data;
}