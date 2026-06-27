import { spawn } from "child_process";

const runPythonPipeline = () => {
  return new Promise((resolve, reject) => {

    const python = spawn(
      process.env.PYTHON_PATH,
      [process.env.PYTHON_PIPELINE, "--json"],
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

    python.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(errorOutput || `Python exited with code ${code}`)
        );
      }

      try {
        resolve(JSON.parse(output));
      } catch {
        reject(new Error("Invalid JSON received from Python"));
      }
    });
  });
};

export default runPythonPipeline;