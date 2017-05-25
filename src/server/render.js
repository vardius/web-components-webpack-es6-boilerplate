export function createServerRenderer(htmlTemplate) {
  return () =>
    new Promise((resolve, reject) => {
      try {
        const appHtml = "<hello-world></hello-world>";
        const html = htmlTemplate.replace(
          /(<div\s*id="app">)(<\/div>)/,
          `$1${appHtml}$2`
        );

        resolve({
          html
        });
      } catch (e) {
        reject(e);
      }
    });
}
