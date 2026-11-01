# COS 201 Track B: Java OOP — Topic 7
# I/O & File Handling

## The Central Idea

Java I/O is based on **streams** — sequences of data. **Byte streams** handle binary data; **character streams** handle text. The `java.nio` package provides modern, non-blocking I/O with better performance.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "I/O & File Handling: streams, readers/writers, serialization" | Core file I/O |

---

## Section 1 — Stream Hierarchy

```
java.io.InputStream (abstract) — Byte input
├── FileInputStream          — Read bytes from file
├── BufferedInputStream      — Buffered byte input
├── DataInputStream          — Read primitives
├── ObjectInputStream        — Deserialize objects
└── ByteArrayInputStream     — Read from byte[]

java.io.OutputStream (abstract) — Byte output
├── FileOutputStream         — Write bytes to file
├── BufferedOutputStream     — Buffered byte output
├── DataOutputStream         — Write primitives
├── ObjectOutputStream       — Serialize objects
└── ByteArrayOutputStream    — Write to byte[]

java.io.Reader (abstract) — Character input
├── FileReader               — Read chars from file
├── BufferedReader           — Buffered char input, readLine()
├── InputStreamReader        — Bytes → chars (encoding)
└── CharArrayReader          — Read from char[]

java.io.Writer (abstract) — Character output
├── FileWriter               — Write chars to file
├── BufferedWriter           — Buffered char output, newLine()
├── OutputStreamWriter       — Chars → bytes (encoding)
├── PrintWriter              — Print formatted output
└── CharArrayWriter          — Write to char[]
```

**Rule:** Use **Reader/Writer** for text; **InputStream/OutputStream** for binary.

---

## Section 2 — Text File I/O (Character Streams)

### Writing with FileWriter
```java
try (FileWriter fw = new FileWriter("output.txt");
     BufferedWriter bw = new BufferedWriter(fw)) {
    bw.write("Hello, World!");
    bw.newLine();
    bw.write("Second line");
} // Auto-closed
```

### Reading with FileReader
```java
try (FileReader fr = new FileReader("input.txt");
     BufferedReader br = new BufferedReader(fr)) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}
```

### PrintWriter (Formatted Output)
```java
try (PrintWriter pw = new PrintWriter("data.txt")) {
    pw.println("Name: " + name);
    pw.printf("Score: %.2f%n", score);
    pw.println("Passed: " + passed);
}
```

---

## Section 3 — Binary File I/O (Byte Streams)

### Copy File (Byte-by-Byte — Slow)
```java
try (FileInputStream in = new FileInputStream("src.dat");
     FileOutputStream out = new FileOutputStream("dest.dat")) {
    int b;
    while ((b = in.read()) != -1) {
        out.write(b);
    }
}
```

### Buffered Copy (Fast)
```java
try (BufferedInputStream in = new BufferedInputStream(new FileInputStream("src.dat"));
     BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream("dest.dat"))) {
    byte[] buffer = new byte[8192];
    int bytesRead;
    while ((bytesRead = in.read(buffer)) != -1) {
        out.write(buffer, 0, bytesRead);
    }
}
```

### DataInputStream / DataOutputStream (Primitives)
```java
// Write
try (DataOutputStream out = new DataOutputStream(new FileOutputStream("data.bin"))) {
    out.writeInt(42);
    out.writeDouble(3.14);
    out.writeUTF("Hello");
    out.writeBoolean(true);
}

// Read (MUST read in SAME ORDER)
try (DataInputStream in = new DataInputStream(new FileInputStream("data.bin"))) {
    int i = in.readInt();        // 42
    double d = in.readDouble();  // 3.14
    String s = in.readUTF();     // "Hello"
    boolean b = in.readBoolean(); // true
}
```

---

## Section 4 — Object Serialization

### Serializable Interface
```java
public class Student implements Serializable {
    private static final long serialVersionUID = 1L;  // Version control
    private String name;
    private int id;
    private transient String password;  // NOT serialized
    
    // constructors, getters, setters
}
```

### Write Object
```java
Student s = new Student("Alice", 1001, "secret");
try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("student.ser"))) {
    out.writeObject(s);
}
```

### Read Object
```java
try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("student.ser"))) {
    Student s = (Student) in.readObject();
    System.out.println(s.getName());  // Alice
    // password is null (transient)
}
```

### Rules
- Class must implement `Serializable`
- `transient` fields skipped
- `static` fields skipped
- `serialVersionUID` recommended for versioning
- All referenced objects must be serializable

---

## Section 5 — NIO.2 (Java 7+) — Modern File API

### Path & Files
```java
Path path = Paths.get("data", "input.txt");

// Read all lines
List<String> lines = Files.readAllLines(path);

// Read all bytes
byte[] data = Files.readAllBytes(path);

// Write lines
Files.write(path, List.of("Line 1", "Line 2"), StandardCharsets.UTF_8);

// Write bytes
Files.write(path, data);

// Copy
Files.copy(src, dest, StandardCopyOption.REPLACE_EXISTING);

// Move/Rename
Files.move(src, dest, StandardCopyOption.ATOMIC_MOVE);

// Delete
Files.deleteIfExists(path);

// Directory operations
Files.createDirectories(Paths.get("a/b/c"));
Files.list(dir).forEach(System.out::println);
Files.walk(dir).forEach(System.out::println);  // Recursive
Files.find(dir, 2, (p, a) -> a.isRegularFile()).forEach(System.out::println);
```

### Try-with-resources with NIO
```java
try (BufferedReader br = Files.newBufferedReader(path)) {
    br.lines().forEach(System.out::println);
}

try (BufferedWriter bw = Files.newBufferedWriter(path, StandardCharsets.UTF_8)) {
    bw.write("Hello NIO!");
}
```

---

## Section 6 — RandomAccessFile (Random Access)

```java
try (RandomAccessFile raf = new RandomAccessFile("data.dat", "rw")) {
    raf.seek(100);           // Move to byte 100
    raf.writeInt(42);        // Write at position 100
    raf.seek(0);             // Move to start
    int first = raf.readInt(); // Read first int
    long len = raf.length();   // File size
}
```

---

## Section 7 — File & Directory Operations (Legacy File Class)

```java
File file = new File("data.txt");
File dir = new File("mydir");

// Checks
file.exists();
file.isFile();
file.isDirectory();
file.canRead();
file.canWrite();
file.length();        // Bytes
file.lastModified();  // Timestamp

// Create
file.createNewFile();
dir.mkdir();
dir.mkdirs();  // Parent dirs too

// List
File[] files = dir.listFiles();
for (File f : files) {
    System.out.println(f.getName() + " " + f.length());
}

// Delete
file.delete();
```

---

## Section 8 — Character Encoding

```java
// Explicit UTF-8
try (BufferedReader br = new BufferedReader(
        new InputStreamReader(new FileInputStream("file.txt"), StandardCharsets.UTF_8))) {
    // ...
}

// Write with encoding
Files.write(path, lines, StandardCharsets.UTF_8);

// Default encoding
Charset.defaultCharset();  // Usually UTF-8 on modern systems
```

---

## Section 9 — Self-Check Questions

1. When to use Reader vs InputStream?
2. What does `transient` do in serialization?
3. What is `serialVersionUID` for?
4. How to read a file line by line?
5. Difference between `File` and `Path`?
6. How to copy a file efficiently?

---

## Solutions

1. Reader/Writer for text; InputStream/OutputStream for binary
2. Field excluded from serialization
3. Version control for deserialization compatibility
4. `BufferedReader.readLine()` or `Files.lines()`
5. `Path` = immutable, modern NIO; `File` = legacy, mutable
6. `Files.copy()` or buffered streams with 8KB buffer

---

## Glossary Terms

[[inputstream]], [[outputstream]], [[reader]], [[writer]], [[fileinputstream]], [[fileoutputstream]], [[filereader]], [[filewriter]], [[bufferedinputstream]], [[bufferedoutputstream]], [[bufferedreader]], [[bufferedwriter]], [[datainputstream]], [[dataoutputstream]], [[objectinputstream]], [[objectoutputstream]], [[serializable]], [[transient]], [[serialversionuid]], [[serialization]], [[deserialization]], [[nio]], [[path]], [[files]], [[randomaccessfile]], [[printwriter]], [[inputstreamreader]], [[outputstreamwriter]], [[charset]], [[standardcharsets]], [[try-with-resources]], [[autocloseable]], [[file]], [[standardcopyoption]], [[bytebuffer]], [[channel]], [[filechannel]], [[memory-mapped-file]]