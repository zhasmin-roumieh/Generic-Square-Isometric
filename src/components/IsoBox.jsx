import { iso, pts } from '../utils/iso'

export default function IsoBox({
  gx, gy, w, d, h,
  ct = '#d8e8f0', cr = '#a8c4d4', cl = '#88aac0',
}) {
  const q = (x, y, z) => iso(gx + x, gy + y, z)
  const top  = [q(0,0,h), q(w,0,h), q(w,d,h), q(0,d,h)]
  const rgt  = [q(w,0,h), q(w,d,h), q(w,d,0), q(w,0,0)]
  const lft  = [q(0,d,h), q(w,d,h), q(w,d,0), q(0,d,0)]
  return (
    <>
      <polygon points={pts(lft)} fill={cl} stroke="#607888" strokeWidth=".6" />
      <polygon points={pts(rgt)} fill={cr} stroke="#607888" strokeWidth=".6" />
      <polygon points={pts(top)} fill={ct} stroke="#80a0b4" strokeWidth=".6" />
    </>
  )
}
