# Java I/O and File Handling

## Input and output move information across a boundary

A program needs ways to receive and produce data: read a file, print a result, or send bytes over a network. Java models many such operations as **streams**, ordered flows of data from a source to a destination.

Byte streams handle raw bytes, making them suitable for images or other binary files. Character streams handle text and its character encoding. Choose the type that matches the data; reading arbitrary binary data through a text reader can corrupt it.

## Read and write text safely

`Path` represents a file-system path, while `Files` provides common operations. A buffered reader reads text efficiently:

```java
Path path = Path.of("notes.txt");
try (BufferedReader reader = Files.newBufferedReader(path)) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}
```

End-of-file is represented by `null` from `readLine()`. The try-with-resources statement closes the reader even if reading fails.

To write text, `Files.newBufferedWriter(path)` returns a writer. Choose options deliberately: creating a new file, truncating an existing file, and appending are different behaviours. Never assume an append when the API defaults to replacing content.

## Byte streams for binary data

`InputStream` and `OutputStream` work with bytes. Use them for binary content and close them with try-with-resources. For larger files, process chunks rather than loading the entire file into memory.

## Handle encoding and failures

Text is bytes encoded using a character set such as UTF-8. Using the wrong encoding may produce unreadable text even when the file is intact. Prefer APIs that make the charset explicit when interoperability matters.

File operations can fail because the path does not exist, permissions are insufficient, or storage is unavailable. These conditions are represented by checked I/O exceptions such as `IOException`; callers should handle or declare them rather than silently pretending the operation succeeded.

**Pause and decide:** Copying an image requires byte streams because image bytes are not text characters. Reading a human-authored `.txt` file calls for a character reader and a known encoding.

## A safe file-handling routine

1. Validate or construct the path.
2. Select character or byte APIs based on the content.
3. Decide whether to create, replace, or append.
4. Close resources using try-with-resources.
5. Handle expected I/O failures with a useful message or recovery action.

**Practice:** What happens if a program opens a file and never closes it? It can leak a system resource and prevent other code from using it. Try-with-resources closes it reliably.
