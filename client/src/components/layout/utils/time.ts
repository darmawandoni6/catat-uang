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

// Buat expiredAt dari createdAt + 7 hari
export function getExpiredAt(days = 7): number {
  const createdAt = Date.now();
  return createdAt + days * 24 * 60 * 60 * 1000; // tambah hari dalam ms
}
