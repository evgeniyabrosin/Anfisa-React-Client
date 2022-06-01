const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <>
      <path d="M4 4L12 12" strokeWidth="1" strokeLinecap="round" />
      <path d="M12 4L4 12" strokeWidth="1" strokeLinecap="round" />
    </>
  ),
}
