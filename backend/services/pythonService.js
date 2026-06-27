import { spawn } from "child_process";

const runPythonPipeline = () => {

  return new Promise((resolve, reject) => {

    const python = spawn(
      process.env.PYTHON_PATH,
      [
        process.env.PYTHON_PIPELINE,
        "--json",
      ],
      {
        env: {
          ...process.env,
          PYTHONIOENCODING: "utf-8",
        },
      }
    );

    let output = "";
    let errorOutput = "";

    python.stdout.setEncoding("utf8");
    python.stderr.setEncoding("utf8");

    python.stdout.on("data", (data) => {
      output += data;
    });

    python.stderr.on("data", (data) => {
      errorOutput += data;
    });

    // Handle process startup errors
    python.on("error", (error) => {

      reject(
        new Error(
          `Failed to start Python process: ${error.message}`
        )
      );

    });

    python.on("close", (code) => {

      if (code !== 0) {

        return reject(
          new Error(
            errorOutput.trim() ||
            `Python exited with code ${code}`
          )
        );

      }

      try {

        const result = JSON.parse(output.trim());

        resolve(result);

      } catch (error) {

        console.error("========== PYTHON OUTPUT ==========");
        console.error(output);

        if (errorOutput.trim()) {

          console.error("========== PYTHON STDERR ==========");
          console.error(errorOutput);

        }

        reject(
          new Error(
            `Invalid JSON received from Python: ${error.message}`
          )
        );

      }

    });

  });

};

export default runPythonPipeline;