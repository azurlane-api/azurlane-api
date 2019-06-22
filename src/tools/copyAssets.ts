import { exec } from "child_process";

// Copy all the view templates
exec("cp -R src/views build/src", (error, _stdout, stderr) => {
    if (error) {
        console.error(error);
        process.exit(1);
    } else if (stderr) {
        console.error(stderr);
        process.exit(1);
    }
});
