export const TW = 60, TH = 30, GCX = 250, GCY = 110

export function iso(gx, gy, gz = 0) {
  return {
    x: GCX + (gx - gy) * TW / 2,
    y: GCY + (gx + gy) * TH / 2 - gz,
  }
}

export function pt(v) {
  return `${v.x.toFixed(1)},${v.y.toFixed(1)}`
}

export function pts(arr) {
  return arr.map(pt).join(' ')
}
