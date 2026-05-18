import { iso, pts } from '../utils/iso'

export default function IsoFloor() {
  const tiles = []
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      const p1 = iso(c, r), p2 = iso(c + 1, r)
      const p3 = iso(c + 1, r + 1), p4 = iso(c, r + 1)
      const fill = (r + c) % 2 === 0 ? '#ecf4fa' : '#e2eef6'
      tiles.push(
        <polygon
          key={`${r}-${c}`}
          points={pts([p1, p2, p3, p4])}
          fill={fill}
          stroke="#c0d4e0"
          strokeWidth=".6"
        />
      )
    }
  }

  // Platform walls
  const lA = iso(0, 6), lB = iso(6, 6)
  const lC = { x: lB.x, y: lB.y + 18 }, lD = { x: lA.x, y: lA.y + 18 }
  const rA = iso(6, 0), rB = iso(6, 6)
  const rC = { x: rB.x, y: rB.y + 18 }, rD = { x: rA.x, y: rA.y + 18 }

  return (
    <>
      <polygon points={pts([lA, lB, lC, lD])} fill="#9ab4c2" />
      <polygon points={pts([rA, rB, rC, rD])} fill="#b4cad4" />
      {tiles}
    </>
  )
}
