export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));

export const daysLeft = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((target - today) / (1000 * 60 * 60 * 24)));
};

export const priorityClass = (priority) => {
  if (priority === "high" || Number(priority) >= 4) return "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300";
  if (priority === "medium" || Number(priority) === 3) return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300";
  return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300";
};

export const quotes = [
  "Small steps every day become serious momentum.",
  "Focus is a skill, and today is practice.",
  "Your future self is built in quiet sessions.",
  "Progress loves consistency more than drama.",
  "A planned hour beats a vague afternoon.",
  "Learn it once, review it twice, own it forever.",
  "You do not need perfect energy to begin.",
  "Clarity comes after the first page.",
  "The best study plan is the one you can repeat.",
  "Finish the next tiny promise."
];
