export default function todayAsDate(): string {
  const now = new Date();

    const date = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Helsinki",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    const weekday = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Helsinki",
      weekday: "long",
    }).format(now);

    const today : string = `Current date: ${date}. Today is ${weekday}. Timezone: Europe/Helsinki.`;


 return today;
}
