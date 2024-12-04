// /api/sendToTelegram.js
export default async function handler(req, res) {
    const { message } = req.body;
    const telegramToken = "8081439320:AAGJmFOuwvllL6q4U9GcZi2gtRocWg3YYu4";
    const chatId = "5884865975"; // ID чата, куда будут отправляться сообщения
  
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
  
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
      res.status(500).json({ success: false, message: "Failed to send message" });
    }
  }
  