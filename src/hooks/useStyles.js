export default function useStyles(styles) {
  return (global, local) => {
    const module = local
      ?.split(/\s+/)
      .map(c => styles[c])
      .reduce((list, c) => (!list ? c : c ? `${list} ${c}` : list))
    const className = `${global ?? ''} ${module ?? ''}`.trim()
    return className ? className : null
  }
}
