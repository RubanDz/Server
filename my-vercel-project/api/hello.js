// /api/sendToTelegram.js
export default async function handler(req, res) {
  const { message } = req.body;

  const telegramToken = "8081439320:AAGJmFOuwvllL6q4U9GcZi2gtRocWg3YYu4";
  const chatId = "5884865975"; // Ваш chat_id

  const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

  // Настроим CORS заголовки для разрешения доступа с вашего домена
  res.setHeader('Access-Control-Allow-Origin', 'https://seashell-app-oqd4m.ondigitalocean.app'); // Разрешаем доступ только с вашего домена
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Если это preflight запрос (OPTIONS), то возвращаем 200
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      const data = await response.json();
      res.status(500).json({ success: false, message: `Failed to send message: ${data.description}` });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: `Error: ${error.message}` });
  }
}

  