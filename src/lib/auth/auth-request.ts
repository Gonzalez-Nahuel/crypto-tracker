export const authRequest = async (url: string, form: FormData) => {
  const username = form.get("username")?.toString().trim();
  const email = form.get("email");
  const password = form.get("password");

  const body = {
    email,
    password,
    ...(username ? { username } : {}),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), //Asdlk478"
    });

    const data = await res.json();

    if (!data.ok || !res.ok) {
      return {
        ok: false,
        message: data.message || "Ocurrio un error",
      };
    }

    return { ok: true };
  } catch (_) {
    return {
      ok: false,
      message: "Ocurrio un error",
    };
  }
};
