# Cloudflare Worker - Dissonant Gambit Promo Codes API

Worker serverless para entrega y descuento en tiempo real de claves promocionales de Google Play para Dissonant Gambit.

## 🚀 Cómo Desplegarlo en 1 Minuto (Panel Web de Cloudflare)

1. Entra en tu panel de [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **Workers & Pages**.
2. Haz clic en **Create Application** -> **Create Worker**.
3. Nómbralo (ej. `dissonant-gambit-promo`) y pulsa **Deploy**.
4. Haz clic en **Edit Code** y pega todo el contenido de `worker.js`.
5. Pulsa **Deploy** (arriba a la derecha).
6. Copia tu URL generada (ej. `https://dissonant-gambit-promo.<tu-usuario>.workers.dev`).
7. Pega esa URL en `app.js` en la variable `CLOUDFLARE_WORKER_URL` (o en `index.html` en `window.CLOUDFLARE_WORKER_URL = '...'`).

---

## ⚡ (Opcional) Persistencia Avanzada con KV
Si quieres que las claves queden guardadas en Cloudflare KV:
1. En Cloudflare -> **Workers & Pages** -> **KV**.
2. Crea un namespace llamado `PROMO_KV`.
3. En la configuración de tu Worker -> **Settings** -> **Variables & KV** -> Añade el enlace de KV con el nombre `PROMO_KV`.
