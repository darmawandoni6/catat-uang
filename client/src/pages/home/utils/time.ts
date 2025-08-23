export function getGreeting() {
  const hour = new Date().getHours(); // 0-23

  if (hour >= 6 && hour < 12) {
    return 'Selamat pagi';
  } else if (hour >= 12 && hour < 18) {
    return 'Selamat siang';
  } else {
    return 'Selamat malam'; // 18:00–23:59 dan 00:00–05:59
  }
}
