import Process from "../models/Process.js";
export async function cron(req, res) {
  try {
    const now = new Date();

    const tomorrowStart = new Date(now);
    tomorrowStart.setDate(now.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0); // Start of tomorrow

    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setHours(23, 59, 59, 999); // End of tomorrow

    const processes = await Process.find({});

    const dueProcesses = processes.filter((process) => {
      return process.status != "completed" && new Date(process.dueDate) > now;
    });

    const dueTommrow = dueProcesses.filter((process) => {
        const dueDate=process.dueDate;
        return dueDate>=tomorrowStart && dueDate<=tomorrowEnd;
    });

    return res.status(200).json({message:"Tasks due tommrow:", dueTommrow});
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Couldn't execute cron job", error: err.message });
  }
}
