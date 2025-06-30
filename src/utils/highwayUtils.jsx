export function isDex(name) {
  if (name.includes("DEx")) {
    return {
      background: "#e00a0a",
    };
  }

  return {
    background: "#198754",
  };
}
