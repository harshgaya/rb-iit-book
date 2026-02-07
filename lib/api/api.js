import { getUserSession } from "../utils/action";
import { API_URL } from "../utils/constants";

export async function getBanner() {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/get-banners`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      next: {
        revalidate: 86400,
        tags: ["banners"],
      },
      //   body: JSON.stringify(data),
    });
    const res = await response.json();

    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      return [];
    }

    return res.data;
  } catch (error) {
    return [];
    throw new Error(error.message || "Something went wrong");
  }
}

export async function getOrders(data) {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/get-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify({
        ...data,
        user_id: session.userId,
      }),
    });
    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }
    const res = await response.json();

    return res.data;
  } catch (error) {
    return [];
  }
}

export async function updateCart(data) {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/update-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify({
        ...data,
        user_id: session.userId,
      }),
    });
    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }
    const res = await response.json();

    return res.data;
  } catch (error) {
    return null;
  }
}

export async function addToCartApi(data) {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify({
        product_id: data.product_id,
        user_id: session.userId,
      }),
    });
    console.log("Add to Cart Response:", response);
    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }
    const res = await response.json();

    return res.data;
  } catch (error) {
    return null;
  }
}

export async function getCart() {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/get-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify({ user_id: session.userId }),
    });
    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }
    const res = await response.json();

    return res.data;
  } catch (error) {
    return [];
  }
}

export async function checkPayment(data) {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/check-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify({ ...data, user_id: session.userId }),
    });
    const res = await response.json();
    console.log("Check Payment Response 2:", res);

    return res.data;
  } catch (error) {
    return null;
  }
}

export async function getRazorpayOrderId(data) {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/create-razorpay-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify({ ...data, user_id: session.userId }),
    });
    const res = await response.json();

    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }

    return res.data;
  } catch (error) {
    return null;
  }
}
export async function updateAddress(data) {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/update-address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify({ ...data, user_id: session.userId }),
    });
    const res = await response.json();

    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }

    return res.data;
  } catch (error) {
    return null;
  }
}

export async function getUserAddress() {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/get-address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify({ user_id: session.userId }),
    });

    const res = await response.json();

    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      return null;
    }

    return res.data;
  } catch (error) {
    console.error("Error fetching user address:", error);
    return [];
  }
}

export async function addAddress(data) {
  console.log(data);
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/add-address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify({ ...data, user_id: session.userId }),
    });
    const res = await response.json();

    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }

    return res.data;
  } catch (error) {
    return null;
  }
}
export async function getProductById({ product_id }) {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/product-byId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify({ product_id }),
    });
    const res = await response.json();

    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }

    return res.data;
  } catch (error) {
    return null;
  }
}
export async function getProductByClass({ className }) {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/product-byClass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify({ class: className }),
    });
    const res = await response.json();

    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }

    return res.data;
  } catch (error) {
    return null;
  }
}

export async function getHomepageProducts() {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/get-homepage-products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      //   body: JSON.stringify(data),
    });
    const res = await response.json();

    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      return null;
    }

    return res.data;
  } catch (error) {
    return null;
    throw new Error(error.message || "Something went wrong");
  }
}
export async function getProducts({ search }) {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/search-products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ search }),
    });
    const res = await response.json();

    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }

    return res.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}
export async function websiteTrack({ type }) {
  const res = await fetch(`${API_URL}website-track/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json();
    return null;
  }

  const json = await res.json();

  return json.data;
}
