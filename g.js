const { exec } = require("child_process");
let args = process.argv;
args = args.slice(2);
let str = args.join(" ");

const cb = (err, strout, stdin) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(strout);
  }
};

exec("git add .", cb);
exec(`git commit -m "${str}"`, cb);
exec(`npm version patch -m "${str}"`, cb);
exec("npm publish", cb);
