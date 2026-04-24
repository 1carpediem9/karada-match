import nodemailer from "nodemailer";

export const sendReservationNotification = async (reservation: any, therapistName: string) => {
  console.log("Starting email notification process...");
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Email configuration is missing (EMAIL_USER or EMAIL_PASS).");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "1.carpe.diem.9@gmail.com",
    subject: "【からだ施術マッチ】新しい予約が入りました",
    text: `
新しい予約が入りました。

【予約内容】
セラピスト: ${therapistName}
お名前: ${reservation.userName}
メールアドレス: ${reservation.userEmail}
電話番号: ${reservation.userPhone}
日付: ${new Date(reservation.date).toLocaleDateString('ja-JP')}
時間: ${reservation.timeSlot}
備考: ${reservation.notes || "なし"}

管理画面から詳細を確認してください。
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent successfully");
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
};
