/* const xss = require("xss");

console.log(xss("<script>alert('Hola')</script>"));
 */

const bcrypt = require("bcryptjs");
(async () => {
    const res = await bcrypt.hash("Matias123", 10)
    console.log(res);

})();