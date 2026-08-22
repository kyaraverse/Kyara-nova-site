import { ENV } from "./_core/env";

type MuralEmailInput = {
  name: string;
  email: string;
  purpose: string;
  message: string;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

export async function sendMuralEmail(input: MuralEmailInput) {
  if (!ENV.resendApiKey || !ENV.resendFromEmail) return false;

  const subject = `[KYARA NOVA] ${input.purpose} | ${input.name}`;
  const text = `Nome: ${input.name}\nE-mail: ${input.email}\nFinalidade: ${input.purpose}\n\nMensagem:\n${input.message}`;
  const html = `<h1>Nova mensagem do Mural</h1><p><strong>Nome:</strong> ${escapeHtml(input.name)}</p><p><strong>E-mail:</strong> ${escapeHtml(input.email)}</p><p><strong>Finalidade:</strong> ${escapeHtml(input.purpose)}</p><p><strong>Mensagem:</strong><br>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ENV.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: ENV.resendFromEmail,
        to: ["K.Nova@kyaraverse.com"],
        reply_to: input.email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error("[Mural email] Delivery failed", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[Mural email] Delivery failed", error);
    return false;
  }
}
