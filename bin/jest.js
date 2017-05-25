const mock = () => {
  let name;
  let target;
  let options;

  return {
    define: (n, t, o) => {
      name = n;
      target = t;
      options = o;
    }
  };
};

Object.defineProperty(window, "customElements", { value: mock() });
