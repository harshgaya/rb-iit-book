// Every call here hits this same Next.js app's own /api routes - there is
// no external API server anymore, so paths are relative.

async function handle(response) {
  const res = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(res.message || "Something went wrong");
  }
  return res.data;
}

// ---- Public (customer-facing) ----

export async function getHome() {
  try {
    const response = await fetch(`/api/home`, {
      next: { revalidate: 300, tags: ["home"] },
    });
    return await handle(response);
  } catch (error) {
    return null;
  }
}

// filters: { class, subject, category, search, page, limit }
export async function getBooks(filters = {}) {
  try {
    const params = new URLSearchParams(
      Object.entries(filters).filter(
        ([, v]) => v !== undefined && v !== null && v !== "",
      ),
    );
    const response = await fetch(`/api/books?${params.toString()}`, {
      cache: "no-store",
    });
    const data = await handle(response);
    return data?.items || [];
  } catch (error) {
    return [];
  }
}

export async function getProductById({ product_id }) {
  try {
    const response = await fetch(`/api/books/${product_id}`, {
      cache: "no-store",
    });
    return await handle(response);
  } catch (error) {
    return null;
  }
}

export async function submitLead(payload) {
  const response = await fetch(`/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(response);
}

export async function websiteTrack({ type, meta }) {
  try {
    const response = await fetch(`/api/track/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meta || {}),
      cache: "no-store",
    });
    return await handle(response);
  } catch (error) {
    return null;
  }
}

// ---- Admin ----

function adminToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("admin_token");
}

async function adminFetch(path, options = {}) {
  const response = await fetch(`/api/admin${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken()}`,
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
  return handle(response);
}

export async function adminLogin({ username, password }) {
  const response = await fetch(`/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await handle(response);
  if (typeof window !== "undefined" && data?.token) {
    window.localStorage.setItem("admin_token", data.token);
  }
  return data;
}

export function adminLogout() {
  if (typeof window !== "undefined")
    window.localStorage.removeItem("admin_token");
}

export function isAdminLoggedIn() {
  return Boolean(adminToken());
}

export async function adminGetAnalytics() {
  return adminFetch("/analytics");
}

export async function adminGetBooks({ page = 1, limit = 20, search } = {}) {
  const params = new URLSearchParams({
    page,
    limit,
    ...(search ? { search } : {}),
  });
  return adminFetch(`/books?${params.toString()}`);
}

export async function adminGetBookById(id) {
  return adminFetch(`/books/${id}`);
}

export async function adminCreateBook(payload) {
  return adminFetch("/books", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminUpdateBook(id, payload) {
  return adminFetch(`/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function adminDeleteBook(id) {
  return adminFetch(`/books/${id}`, { method: "DELETE" });
}

export async function adminGetLeads({ page = 1, limit = 20 } = {}) {
  const params = new URLSearchParams({ page, limit });
  return adminFetch(`/leads?${params.toString()}`);
}

// Returns { uploadUrl, publicUrl }. Caller PUTs the file to uploadUrl directly.
export async function adminGetUploadUrl({ fileName, contentType }) {
  return adminFetch("/upload-url", {
    method: "POST",
    body: JSON.stringify({ fileName, contentType }),
  });
}

export async function adminUploadFile(file) {
  const { uploadUrl, publicUrl } = await adminGetUploadUrl({
    fileName: file.name,
    contentType: file.type,
  });
  const putRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!putRes.ok) throw new Error("Upload to storage failed");
  return publicUrl;
}
export async function adminGetUnseenLeadsCount() {
  const data = await adminFetch("/leads/unseen-count");
  return data?.count || 0;
}

export async function adminMarkLeadSeen(id) {
  return adminFetch(`/leads/${id}/seen`, { method: "PUT" });
}
