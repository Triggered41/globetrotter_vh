
// const payload = {
//   "qr_code_data": "https://vehdathamid-vh.web.app",
//   "text_prompt": "Banh Mi Sandwich, Restaurant photography, HD, Golden light"
// };

const prompts = ["Pokeball, eevee, pokemon", "Ben 10's dymond head"]

export async function generateQR(url) {
    const payload = { "qr_code_data": url, text_prompt: prompts[0] }
    const response = await fetch("https://api.gooey.ai/v2/art-qr-code", {
        method: "POST",
        headers: {
        "Authorization": "bearer " + process.env["GOOEY_API_KEY"],
        "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(response.status);
    }

    const result = await response.json();
    return result
}