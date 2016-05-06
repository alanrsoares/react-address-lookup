export const bind = (t, members) => members.forEach(e => t[e] = t[e].bind(t))

export const camelizeKeys = o =>
  Object.keys(o).reduce((acc, k) => ({ ...acc, [camelize(k)]: o[k] }), {})

export const camelize = s => s.replace(/_./g, ([_, x]) => x.toUpperCase())
