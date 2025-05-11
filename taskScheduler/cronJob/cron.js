import Process from "../models/Process.js";
import { sendEmail } from "../utils/emailSender.js";

export async function cron(req, res) {
  try {
    const now = new Date();

    // IST offset in minutes (+5:30 = 330 mins)
    const IST_OFFSET = 330;

    // Current IST time
    const nowIST = new Date(now.getTime() + IST_OFFSET * 60000);

    // Get tomorrow's IST date
    const tomorrow = new Date(nowIST);
    tomorrow.setDate(nowIST.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Start of tomorrow in IST

    // Tomorrow start and end in IST
    const tomorrowStartIST = new Date(tomorrow);
    const tomorrowEndIST = new Date(tomorrow);
    tomorrowEndIST.setHours(23, 59, 59, 999); // End of tomorrow in IST

    // Convert IST start/end back to UTC for MongoDB query
    const tomorrowStartUTC = new Date(
      tomorrowStartIST.getTime() - IST_OFFSET * 60000
    );
    const tomorrowEndUTC = new Date(
      tomorrowEndIST.getTime() - IST_OFFSET * 60000
    );

    const processes = await Process.find({
      status: { $ne: "completed" },
      dueDate: { $gte: tomorrowStartUTC, $lte: tomorrowEndUTC },
    });

    const result = processes
  .map((task) => `Title: ${task.title}\nDescription: ${task.description}`)
  .join("\n\n");

    sendEmail('gaganraghav143@gmail.com','Tasks due tommmrow',result)

    return res
      .status(200)
      .json({ message: "Tasks due tomorrow (IST):", result });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Couldn't execute cron job", error: err.message });
  }
}
