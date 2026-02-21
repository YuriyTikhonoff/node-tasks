# Node.js Learning Plan: fs, Streams, Worker Threads, Child Process

## How to use this plan
- Complete tasks in order within each section
- Write your code in your IDE
- Ask Claude to review and analyze each task when done

---

## Section 1: `fs` Module

### Task 1.1 — Read and Write Files (sync vs async)
- Create a text file `data.txt` with some content using `fs.writeFileSync`
- Read it back using `fs.readFileSync` and log to console
- Repeat using the async versions: `fs.writeFile` and `fs.readFile` with callbacks
- **Goal:** Understand the difference between sync and async I/O and why sync blocks the event loop

### Task 1.2 — Working with Directories
- Create a directory `output/` using `fs.mkdirSync` (handle "already exists" error)
- List all files in the current directory using `fs.readdirSync`
- Delete a file using `fs.unlinkSync`, then delete the directory using `fs.rmdirSync`
- **Goal:** Understand basic directory operations and error handling

### Task 1.3 — File Watching
- Create a script that watches a file using `fs.watch`
- In a separate terminal, edit the watched file and observe the events fired
- Try watching a directory instead of a file
- **Goal:** Understand event-driven file system monitoring

### Task 1.4 — `fs/promises` and async/await
- Rewrite Task 1.1 using `fs/promises` with `async/await`
- Read multiple files in parallel using `Promise.all`
- **Goal:** Understand the modern promise-based fs API

---

## Section 2: Streams

### Task 2.1 — Readable Stream from a File
- Create a large text file (generate it with a loop and `fs.writeFileSync`)
- Read it using `fs.createReadStream` and log each chunk with its size
- Compare memory usage mentally vs reading the whole file with `fs.readFile`
- **Goal:** Understand what a stream is and why it matters for large files

### Task 2.2 — Writable Stream to a File
- Create a `fs.createWriteStream` and write 1000 lines to a file in a loop
- Listen to the `'finish'` and `'error'` events
- **Goal:** Understand writable streams and backpressure basics

### Task 2.3 — Piping Streams
- Read a file with `createReadStream` and pipe it directly to `createWriteStream` to copy it
- Add a `zlib.createGzip()` transform in the pipe chain to compress the file on the fly
- **Goal:** Understand pipe and transform streams

### Task 2.4 — Custom Transform Stream
- Use the `stream.Transform` class to create a transform that uppercases all text
- Pipe a readable file stream through your transform, then into a writable file stream
- **Goal:** Understand how to create custom transform streams

### Task 2.5 — Stream Pipeline and Error Handling
- Rewrite Task 2.3 using `stream.pipeline` (or `stream/promises` pipeline) instead of `.pipe()`
- Intentionally break the pipeline (e.g., wrong file path) and handle the error
- **Goal:** Understand why `pipeline` is safer than `pipe` for error propagation

---

## Section 3: Worker Threads

### Task 3.1 — Your First Worker Thread
- Create `main.js` that spawns a worker using the `worker_threads` module
- The worker (`worker.js`) should do a CPU-heavy computation (e.g., sum numbers 1 to 1 billion)
- The main thread should remain responsive (prove it by logging a counter while worker runs)
- **Goal:** Understand what worker threads are and why they exist (CPU-bound tasks)

### Task 3.2 — Passing Data with `parentPort` and `workerData`
- Pass input data from main to worker via `workerData`
- Send results back from the worker using `parentPort.postMessage`
- Receive the result in main with `worker.on('message', ...)`
- **Goal:** Understand the message-passing communication model

### Task 3.3 — Shared Memory with `SharedArrayBuffer`
- Create a `SharedArrayBuffer` in main and pass it to a worker
- Have the worker write values into the buffer using `Uint8Array`
- Read the values from main after the worker signals completion
- **Goal:** Understand how shared memory works across threads (and why synchronization matters)

### Task 3.4 — Worker Pool
- Create a simple pool of 4 workers
- Submit 10 tasks to the pool, distributing them across free workers
- When a worker finishes, it takes the next pending task
- **Goal:** Understand the worker pool pattern for real workloads

---

## Section 4: Child Process

### Task 4.1 — `exec` to Run a Shell Command
- Use `child_process.exec` to run `ls -la` (or `dir` on Windows)
- Capture stdout and stderr and log them
- **Goal:** Understand how to run shell commands and capture output

### Task 4.2 — `spawn` for Streaming Output
- Use `child_process.spawn` to run a long-running command (e.g., `ping localhost`)
- Stream its stdout line by line in real time using the `data` event
- Kill the process after 5 seconds using `childProcess.kill()`
- **Goal:** Understand `spawn` vs `exec` — streaming vs buffered output

### Task 4.3 — Fork a Node.js Child Process
- Use `child_process.fork` to create a child Node.js process
- Send messages from parent to child and back using `process.send` / `process.on('message')`
- **Goal:** Understand `fork` as a Node-to-Node IPC mechanism

### Task 4.4 — `execFile` and Error Handling
- Use `child_process.execFile` to run a script
- Handle exit codes and errors (try running a command that doesn't exist)
- **Goal:** Understand exit codes and error handling for child processes

### Task 4.5 — Worker Threads vs Child Process
- Implement the same CPU-heavy task (e.g., compute Fibonacci of 45) using:
  1. A worker thread
  2. A forked child process
- Compare: communication overhead, memory isolation, use cases
- **Goal:** Know when to choose worker threads vs child processes

---

## Final Project

Build a **log file processor**:
- Watch a directory for new `.log` files using `fs.watch`
- When a new file appears, read it as a stream
- Pass parsing work (e.g., counting error lines) to a worker thread
- Write a summary report to an `output/` directory using a writable stream
- Optionally: spawn a child process to compress the original log file with `gzip`

This combines all four modules into a realistic workflow.
