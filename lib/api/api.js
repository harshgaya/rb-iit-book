import { getUserSession } from "../utils/action";
import { API_URL } from "../utils/constants";

export async function getHomepageProducts() {
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/get-homepage-products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      next: { revalidate: 60 },
      //   body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log("homepage products response:", res);

    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }

    return res.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}
export async function getProducts({ search }) {
  console.log("se", search);
  try {
    const session = await getUserSession();
    const response = await fetch(`${API_URL}/search-products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      next: { revalidate: 60 },
      body: JSON.stringify({ search }),
    });
    const res = await response.json();
    console.log("homepage products response:", res);

    if (!response.ok) {
      const errorMsg = res.message || "Something went wrong";
      throw new Error(errorMsg);
    }

    return res.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}
