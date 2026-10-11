
const CART_KEY = "shopify-cart-id";

export function getCartId(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(CART_KEY);
}

export function saveCartId(id: string): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(CART_KEY, id);
}

export function clearCartId(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(CART_KEY);
}

export async function createCart(): Promise<string> {
  const response = await fetch("/api/cart/create", {
    method: "POST",
    cache: "no-store",
  });

  const cart = await response.json();

  if (!response.ok || !cart.id) {
    throw new Error(
      cart.error || "No se pudo crear un nuevo carrito."
    );
  }

  saveCartId(cart.id);

  window.dispatchEvent(new CustomEvent("cartUpdated"));

  return cart.id;
}

export async function getOrCreateCart(): Promise<string> {
  const cartId = getCartId();

  if (!cartId) {
    return createCart();
  }

  return cartId;
}

async function sendAddRequest(
  cartId: string,
  merchandiseId: string,
  quantity: number
) {
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

  return { response, data };
}

export async function addToCart(
  merchandiseId: string,
  quantity: number
) {
  if (!merchandiseId) {
    throw new Error("No se ha seleccionado una variante válida.");
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("La cantidad debe ser como mínimo 1.");
  }

  let cartId = await getOrCreateCart();

  let result = await sendAddRequest(
    cartId,
    merchandiseId,
    quantity
  );

  // Si Shopify indica que el carrito ya no existe,
  // creamos uno nuevo y repetimos la operación una vez.
  if (
    !result.response.ok &&
    /cart.{0,40}(not found|does not exist|doesn't exist|invalid)|carrito.{0,40}(no existe|no válido)/i.test(
      String(result.data.error || result.data.message || "")
    )
  ) {
    clearCartId();
    cartId = await createCart();

    result = await sendAddRequest(
      cartId,
      merchandiseId,
      quantity
    );
  }

  if (!result.response.ok) {
    console.error("Error de la API del carrito:", result.data);

    throw new Error(
      result.data.error ||
        result.data.message ||
        "No se pudo añadir el producto al carrito."
    );
  }

  window.dispatchEvent(
    new CustomEvent("cartUpdated", {
      detail: result.data,
    })
  );

  return result.data;
}
