// Generated rewrite — replaces the broken file content entirely.
const coursesData = [
  {
    id: "COS201",
    title: "Programming Concepts",
    description:
      "Mastering fundamental programming concepts and coding challenges.",
    topics: [
      {
        id: "cos201-t1",
        title: "Introduction to Programming",
        notes: "# Introduction to Programming\n\n## 1. Definition\nProgramming is the process of designing, writing, and checking precise instructions that a computer can execute to solve a defined problem. A program is the written set of those instructions; an algorithm is the ordered method for solving the problem before or while it is translated into code.\n\n## 2. Purpose and Significance\nProgramming turns repeatable rules into reliable actions. It helps people calculate results, process records, automate routine work, and model systems. In a university, a program could total course units and grade points to calculate a student\u0027s CGPA consistently.\n\n## 3. Fundamental Components\nA programming task usually involves understanding requirements, identifying inputs and outputs, designing an algorithm, expressing it in a programming language, running it, and testing or debugging the result. The computer follows the written instructions; it does not infer missing steps.\n\n## 4. Illustrative Example\nA CGPA calculation can be described before choosing a language:\n\n```text\nINPUT each course\u0027s grade points and credit units\nSET totalPoints = 0\nSET totalUnits = 0\nFOR each course\n    totalPoints = totalPoints + gradePoints * creditUnits\n    totalUnits = totalUnits + creditUnits\nCGPA = totalPoints / totalUnits\nOUTPUT CGPA\n```\n\nThis plan identifies data, processing, and a result that can be checked.\n\n## 5. Counterexample or Common Error\nThe instruction “calculate the student\u0027s CGPA” is not yet an executable algorithm. It does not say which data to use, how to weight courses by credit units, or what to do if total units are zero.\n\n## 6. Related Distinction\nAn algorithm describes a solution method independently of a particular language. Source code expresses instructions in a language such as Java, C, or JavaScript. A compiler or interpreter translates or executes that source according to the language implementation.\n\n## 7. Conceptual Model\nThink of a program as a carefully specified process: receive inputs, transform them through steps, and produce outputs. Testing checks whether the transformation follows the requirements.\n\n## 8. Related Terminology\n- **Algorithm:** A finite, ordered method for solving a problem.\n- **Source code:** Instructions written in a programming language.\n- **Input:** Data supplied to a program.\n- **Output:** Information produced by a program.\n- **Debugging:** Finding and correcting defects in a program.\n\n## 9. Common Misconception\nProgramming is not simply typing code. Most of the reasoning is deciding what the problem means, what information is needed, and what steps will produce a correct result.\n\n## 10. Precise Definition\n\u003e Programming is the disciplined creation and verification of executable instructions that transform specified inputs into intended outputs.\n\n## 11. Knowledge Check\n**Question:** Before coding a CGPA calculator, what should be identified?\n\n**Answer:** Its required inputs, the weighted calculation steps, expected output, and constraints such as handling zero total credit units.",
      },
      {
        id: "cos201-t2",
        title: "Data Types and Variables",
        learningGuide: {
          why: "This is the foundation for every later programming topic. Learning to describe a problem clearly is more important than memorising syntax.",
          mentalModel:
            "A program transforms inputs into outputs through precise steps: problem -> inputs -> process -> output.",
          plainExplanation:
            "Programming is like writing a very detailed recipe for a fast but literal assistant. The computer will not guess missing steps.",
          misconception:
            "Programming is not mainly typing code; it is structured problem-solving expressed through code.",
          check:
            "Describe a CGPA calculator as inputs, processing steps, and outputs before writing code.",
        },
        notes: "# Data Types and Variables\n\n## 1. Definition\nA variable is a named place in a program for referring to a value. A data type describes the kind of value represented and the operations that make sense for it. For example, a student\u0027s name is text, while the number of registered units is numeric.\n\n## 2. Purpose and Significance\nVariables let a program retain and update information as it runs. Types help make intended operations clear and can prevent incompatible values from being combined. Correct data representation is essential for calculations, comparisons, and stored records.\n\n## 3. Fundamental Components\nKey ideas include identifiers (names), declaration, initialization, assignment, constants, scope, and data types. Common types include integers, real numbers, characters, strings, and Boolean values. Exact type rules vary between languages; JavaScript, for instance, is dynamically typed, while Java requires declared types for variables.\n\n## 4. Illustrative Example\nIn typed pseudocode, a student record might begin like this:\n\n```text\nDECLARE studentName AS String = \"Amina\"\nDECLARE creditUnits AS Integer = 18\nDECLARE averageScore AS Real = 76.5\nDECLARE passed AS Boolean = true\n```\n\nEach name communicates its role, and each type describes its value.\n\n## 5. Counterexample or Common Error\nIn a statically typed language, assigning the text \"eighteen\" to an integer variable for credit units is a type error. In any language, storing a student\u0027s name in a field later treated as a number can cause incorrect processing.\n\n## 6. Related Distinction\nA variable is the named reference used by the program; its value is the current data it refers to; its type describes the category and permitted operations. Assignment changes the value, not the variable\u0027s name.\n\n## 7. Conceptual Model\nA variable is like a labelled container. Its name helps locate it, its value is what it currently holds, and its type indicates what kind of content and operations are expected.\n\n## 8. Related Terminology\n- **Identifier:** A legal name for a program element.\n- **Declaration:** Introducing a variable to the program.\n- **Initialization:** Giving a variable its first value.\n- **Assignment:** Setting or changing a variable\u0027s value.\n- **Constant:** A named value intended not to be reassigned.\n- **Scope:** The region of a program where a name is accessible.\n\n## 9. Common Misconception\nA variable is not the same thing as its value. The value can change during execution while the variable remains the same named program element.\n\n## 10. Precise Definition\n\u003e A variable is a named program reference whose current value is interpreted according to a data type and may be read or, where permitted, updated during execution.\n\n## 11. Knowledge Check\n**Question:** What is the difference between initializing `creditUnits` to 18 and assigning it 20 later?\n\n**Answer:** Initialization gives it its first value; the later assignment updates its existing value.",
      },
      {
        id: "cos201-t3",
        title: "Control Structures",
        learningGuide: {
          why: "Programs must store, change, and compare information safely. Data types make the intended operations clear.",
          mentalModel:
            "A variable is a labelled container; its data type describes the kind of value the container holds.",
          plainExplanation:
            "Think of a variable as a labelled box. The label helps you find it, and the type tells you whether it holds a number, text, or a true/false value.",
          misconception:
            "A variable is not the value itself; it is the named storage location or reference holding the current value.",
          check:
            "Why should a student's name and age normally use different data types?",
        },
        notes: "# Control Structures\n\n## 1. Definition\nControl structures determine the order in which a program\u0027s instructions execute. The basic forms are sequence (steps in order), selection (choose a path based on a condition), and repetition (repeat steps while or for a defined set of conditions).\n\n## 2. Purpose and Significance\nMost useful programs must do more than execute one fixed list of instructions. They need to make decisions, handle different cases, and process repeated records. Control structures express these behaviors explicitly and consistently.\n\n## 3. Fundamental Components\nA condition evaluates to true or false. An `if` or `if-else` statement selects a branch. A loop repeats a block, usually with an initialization, a continuation condition, and an update. A loop must make progress toward a stopping condition.\n\n## 4. Illustrative Example\nA program can classify a score and inspect several scores:\n\n```text\nIF score \u003e= 40\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit\"\n\nFOR each score in classScores\n    OUTPUT score\n```\n\nThe first structure selects one result; the second repeats an operation for each item.\n\n## 5. Counterexample or Common Error\nA loop whose condition never becomes false may run forever. For example, repeatedly checking `count \u003c 5` without increasing `count` does not make progress and can prevent the rest of the program from running.\n\n## 6. Related Distinction\nSelection chooses between alternatives; repetition performs an action multiple times. An `if` statement does not repeat by itself, and a loop does not automatically choose the right action unless it contains suitable conditions.\n\n## 7. Conceptual Model\nSequence is a route followed step by step, selection is a junction that chooses a route, and repetition is a loop in the route with a clear exit condition.\n\n## 8. Related Terminology\n- **Condition:** An expression evaluated as true or false.\n- **Branch:** One of the possible paths in a selection.\n- **Iteration:** One execution of a loop body.\n- **Loop invariant:** A fact that remains true across loop iterations.\n- **Infinite loop:** Repetition that does not reach a stopping condition.\n\n## 9. Common Misconception\nUsing a loop does not guarantee that a task is repeated the correct number of times. The starting value, condition, update, and boundary must all agree.\n\n## 10. Precise Definition\n\u003e A control structure is a programming construct that specifies sequential execution, conditional choice, or repetition of instructions.\n\n## 11. Knowledge Check\n**Question:** What must change in a counting loop so that it can eventually stop?\n\n**Answer:** Its state must make progress so that the loop\u0027s continuation condition eventually becomes false.",
      },
      {
        id: "cos201-t4",
        title: "Functions and Modular Programming",
        learningGuide: {
          why: "Programs need to make decisions and repeat useful work instead of following one unchanging path.",
          mentalModel:
            "Sequence gives order, selection chooses a path, and repetition performs a path again.",
          plainExplanation:
            "Control structures are the program's traffic rules: proceed in order, choose a route, or go around a route again.",
          misconception:
            "An if statement does not repeat by itself, and a loop does not know when to stop without a controlling condition.",
          check:
            "Which structure would process every student's score, and what would make it stop?",
        },
        notes: "# Functions and Modular Programming\n\n## 1. Definition\nA function is a named, reusable block of instructions that performs a defined task. It may receive inputs called parameters and may return a result. Modular programming organizes a larger program as smaller components with clear responsibilities.\n\n## 2. Purpose and Significance\nFunctions reduce repeated code, make complex programs easier to read, and allow individual tasks to be tested and changed independently. A CGPA program, for example, can separate grade-point calculation from record input and report display.\n\n## 3. Fundamental Components\nA function has a name, parameter list, body, and sometimes a return value. A function call supplies arguments and transfers control to the function. Local variables belong to a limited scope; a well-designed function states its assumptions and handles expected edge cases.\n\n## 4. Illustrative Example\nThis pseudocode calculates the mean of a non-empty list:\n\n```text\nFUNCTION calculateAverage(scores)\n    SET total = 0\n    FOR each score in scores\n        total = total + score\n    RETURN total / LENGTH(scores)\n```\n\nThe caller supplies scores and uses the returned result.\n\n## 5. Counterexample or Common Error\nA function that calculates an average must define what happens for an empty list. Dividing by its length without checking can produce an invalid result or error. Another design problem is a single function that reads input, calculates several unrelated values, and prints everything, making it difficult to test or reuse.\n\n## 6. Related Distinction\nA parameter is a placeholder in the function definition; an argument is the actual value supplied by a call. A function generally returns a value, while a procedure may perform an action without returning one; terminology varies between languages.\n\n## 7. Conceptual Model\nA function is like a small service: it has a clear task, receives the information it needs, performs its work, and returns a result or performs a defined action.\n\n## 8. Related Terminology\n- **Call:** An instruction to execute a function.\n- **Parameter:** A named input in a function definition.\n- **Argument:** A value supplied to a function call.\n- **Return value:** The result sent back to the caller.\n- **Scope:** The area where a variable or name can be used.\n- **Modularity:** Dividing a program into manageable components.\n\n## 9. Common Misconception\nPutting code inside a function does not automatically make it reusable or correct. Its responsibility, inputs, outputs, and assumptions must be clearly defined.\n\n## 10. Precise Definition\n\u003e A function is a named program unit that encapsulates a task, accepts zero or more arguments, and may return a value to its caller.\n\n## 11. Knowledge Check\n**Question:** Why should a function that calculates an average check whether its input list is empty?\n\n**Answer:** An empty list has no values to average, and dividing by its length would mean dividing by zero; the function needs a defined response for that case.",
      },
      {
        id: "cos201-t5",
        title: "Arrays and Strings",
        learningGuide: {
          why: "Functions make large programs understandable, reusable, testable, and easier to change safely.",
          mentalModel:
            "A function takes inputs, performs one responsibility, and optionally returns an output.",
          plainExplanation:
            "A function is like a service counter: provide the required information, let it do one defined job, and receive the result.",
          misconception:
            "Parameters are placeholders in the function definition; arguments are the actual values supplied during a call.",
          check:
            "What single responsibility could you extract from a CGPA calculator into a reusable function?",
        },
        notes: "# Arrays and Strings\n\n## 1. Definition\nAn array is an ordered collection of values accessed by position, usually called an index. A string is a sequence of text characters. Arrays and strings let programs work with collections and text without creating a separate variable for every item.\n\n## 2. Purpose and Significance\nCollections make it practical to store and process class scores, names, or other related data. Strings support messages, identifiers, and user input. Loops can process each element systematically, while indexing retrieves a particular element.\n\n## 3. Fundamental Components\nImportant ideas include elements, indexes, length, traversal, insertion, searching, and string operations. In many languages the first index is 0, so an array of length n uses indexes 0 through n-1. Array size and allowed element types depend on the language and collection type.\n\n## 4. Illustrative Example\nIn JavaScript, an array can hold class scores and a loop can total them:\n\n```javascript\nconst scores = [72, 81, 65];\nlet total = 0;\n\nfor (const score of scores) {\n  total += score;\n}\n```\n\nThe total is 218. A string such as `\"MTH201\"` can be inspected by character or processed with string methods.\n\n## 5. Counterexample or Common Error\nFor an array of length 3, `scores[3]` is outside the valid indexes; the final element is at index 2. Confusing length with the last index creates off-by-one errors, especially in loops.\n\n## 6. Related Distinction\nAn array stores a collection of values; a string represents text. Some languages expose strings as character sequences, but strings may be immutable even where arrays can be changed. Do not assume every language uses identical collection rules.\n\n## 7. Conceptual Model\nAn array is a row of numbered positions: the array name identifies the collection and the index selects a position. A string is an ordered run of characters that forms text.\n\n## 8. Related Terminology\n- **Element:** One value stored in an array.\n- **Index:** A position used to access an element.\n- **Length:** The number of elements or characters.\n- **Traversal:** Visiting elements in sequence.\n- **Substring:** A portion of a string.\n- **Off-by-one error:** A boundary mistake caused by counting positions incorrectly.\n\n## 9. Common Misconception\nThe final index is not always the same as the collection\u0027s length. In zero-based indexing, it is one less than the length. Also, array and string mutability differs by language.\n\n## 10. Precise Definition\n\u003e An array is an ordered, index-addressable collection, while a string is an ordered sequence of text characters; their exact storage and mutation rules depend on the language.\n\n## 11. Knowledge Check\n**Question:** If an array has 8 elements and indexing starts at 0, what is its last valid index?\n\n**Answer:** 7, because the valid indexes run from 0 through length minus 1.",
      },
      {
        id: "cos201-t6",
        title: "Recursion",
        learningGuide: {
          why: "Collections let programs handle many related values with loops instead of creating separate variables for every item.",
          mentalModel:
            "An array is a collection accessed by position; a string is a sequence of characters that can also be processed by position.",
          plainExplanation:
            "An array is like a row of numbered lockers. The array name identifies the row, and the index identifies one locker.",
          misconception:
            "The first array position is usually index 0, and the last index is one less than the array length.",
          check:
            "If an array contains five scores, what is the index of its last score?",
        },
        notes: "# Recursion\n\n## 1. Definition\nRecursion is a problem-solving technique in which a function calls itself to solve a smaller instance of the same problem. A correct recursive solution has a base case and a recursive case.\n\n## 2. Purpose and Significance\nRecursion can express problems that naturally contain smaller versions of themselves, such as traversing nested folders, processing trees, or defining factorials. It can make the structure of a solution clear, although it may use more call-stack memory than an iterative alternative.\n\n## 3. Fundamental Components\nThe base case gives an answer directly and stops further calls. The recursive case reduces the problem and calls the function again. Each call has its own local state on the call stack. A measure such as the input size should move toward the base case.\n\n## 4. Illustrative Example\nFactorial uses the rule n! = n * (n-1)! and the base case 0! = 1:\n\n```text\nFUNCTION factorial(n)\n    IF n == 0\n        RETURN 1\n    RETURN n * factorial(n - 1)\n```\n\nFor n = 3, the calls reduce to 3 * 2 * 1 * 1 = 6.\n\n## 5. Counterexample or Common Error\nA recursive call that repeats the same input without reaching a base case does not make progress. It continues creating calls until the program exhausts its call stack or otherwise fails.\n\n## 6. Related Distinction\nRecursion repeats work through function calls; iteration repeats work through loops. Both can solve many of the same problems, but recursion makes subproblem structure explicit and uses call-stack space.\n\n## 7. Conceptual Model\nImagine solving a task by asking the same procedure to solve a smaller version. The process ends only when it reaches a small case that can be answered immediately.\n\n## 8. Related Terminology\n- **Base case:** A case solved without another recursive call.\n- **Recursive case:** The step that calls the function on a smaller problem.\n- **Call stack:** Memory tracking active function calls.\n- **Termination:** Reaching a condition that ends computation.\n- **Stack overflow:** Failure caused by excessive call-stack use.\n\n## 9. Common Misconception\nRecursion is not inherently infinite or inherently better than a loop. It terminates when each recursive step progresses toward a valid base case; its suitability depends on the problem and resource limits.\n\n## 10. Precise Definition\n\u003e A recursive function solves a problem by calling itself on smaller instances until a base case returns directly.\n\n## 11. Knowledge Check\n**Question:** What two conditions make a recursive function terminate correctly?\n\n**Answer:** It must have a reachable base case, and every recursive call must make progress toward that base case.",
      },
      {
        id: "cos201-t7",
        title: "File Handling",
        learningGuide: {
          why: "Recursion naturally describes nested or self-similar structures such as folders, trees, and divide-and-conquer problems.",
          mentalModel:
            "Solve a problem by applying the same rule to a smaller version, with a base case that stops the process.",
          plainExplanation:
            "It is like asking a smaller copy of yourself to solve the smaller part of a task. You must define the simplest task you can answer directly.",
          misconception:
            "A function calling itself is not enough; each call must move toward a base case or it will exhaust memory.",
          check:
            "For factorial, what is the base case and how does each call get closer to it?",
        },
        notes: "# File Handling\n\n## 1. Definition\nFile handling is the process by which a program creates, opens, reads, writes, appends, and closes files on persistent storage. Unlike ordinary variables in memory, files can preserve information after a program ends.\n\n## 2. Purpose and Significance\nPrograms use files to retain records, configuration, and reports between runs. A student-registration program, for example, must save records so they are still available the next time it starts.\n\n## 3. Fundamental Components\nFile operations involve a path or file name, an access mode, an open file handle, data transfer, error handling, and closing or releasing the resource. Common modes include read, write, and append, though exact APIs and mode names vary across languages. Write mode may replace existing contents.\n\n## 4. Illustrative Example\nA language-independent workflow for adding a record is:\n\n```text\nOPEN \"students.txt\" IN APPEND MODE\nWRITE the new student record\nCLOSE the file\n```\n\nIn real code, the program should also handle cases such as a missing path or a write failure.\n\n## 5. Counterexample or Common Error\nOpening an existing record file in a mode that truncates it can erase earlier records before the new one is written. Choose append mode when preserving existing contents is required, and confirm the language\u0027s exact behavior.\n\n## 6. Related Distinction\nRAM is fast working memory and is normally volatile; a file is persistent storage. A file handle is the program\u0027s access to an opened file, not the file\u0027s contents themselves.\n\n## 7. Conceptual Model\nTreat a file like a notebook stored outside the program: locate it, choose whether to read or change it, perform the operation, and close it safely when finished.\n\n## 8. Related Terminology\n- **Path:** A location identifying a file.\n- **File handle:** A reference used to access an open file.\n- **Read mode:** Opens data for reading.\n- **Write mode:** Opens data for writing and may replace contents.\n- **Append mode:** Adds data while preserving earlier contents.\n- **Persistent storage:** Storage that remains after program execution ends.\n\n## 9. Common Misconception\nClosing a file is not optional housekeeping. Failing to release it can risk incomplete writes, locked resources, or other errors; many languages provide a context manager or equivalent to close files reliably.\n\n## 10. Precise Definition\n\u003e File handling is the controlled interaction between a program and persistent files through operations such as opening, reading, writing, appending, and closing.\n\n## 11. Knowledge Check\n**Question:** Which access mode is normally chosen to add a record without discarding existing file contents?\n\n**Answer:** Append mode, subject to the behavior defined by the programming language or file API.",
      },
      {
        id: "cos201-t8",
        title: "Debugging and Testing",
        learningGuide: {
          why: "Persistent storage keeps records such as student data and transactions after the program stops.",
          mentalModel:
            "File handling follows a lifecycle: open the file, read or write, then close it.",
          plainExplanation:
            "RAM is your temporary working desk; a file is a notebook you can return to later.",
          misconception:
            "Write mode can replace existing content, while append mode adds new content without deleting what is already there.",
          check:
            "Which mode adds a new student record without deleting existing records?",
        },
        notes: "# Debugging and Testing\n\n## 1. Definition\nTesting is the deliberate execution or inspection of software to determine whether it behaves as required. Debugging is the process of locating, understanding, and correcting the cause of a defect.\n\n## 2. Purpose and Significance\nTesting finds problems before users rely on a program; debugging helps remove their causes. Together they improve correctness, reliability, and confidence that later changes have not broken existing behavior.\n\n## 3. Fundamental Components\nCommon defects include syntax errors (invalid language structure), runtime errors (failures during execution), and logical errors (valid code that produces the wrong result). A test case specifies input, setup, and expected behavior. Useful tests include normal cases, boundaries, invalid inputs, and interactions between components.\n\n## 4. Illustrative Example\nFor a pass rule of 40 or above, useful test cases include scores of 39, 40, and 41. Their expected results are fail, pass, and pass. Testing the boundary at 40 checks that the comparison uses the correct condition.\n\n## 5. Counterexample or Common Error\nChecking only one ordinary score, such as 75, does not show that scores near the pass boundary work. A program can pass that test while still mishandling 39 or 40.\n\n## 6. Related Distinction\nTesting reveals evidence of defects; debugging traces a defect to its cause and changes the code. A test can fail without explaining why, so debugging follows the failure with investigation and a focused correction.\n\n## 7. Conceptual Model\nTreat debugging as a repeatable investigation: reproduce the problem, narrow down where it occurs, form a cause, change one relevant thing, and rerun the test. Keep a regression test so the fixed defect is less likely to return.\n\n## 8. Related Terminology\n- **Test case:** Inputs and conditions paired with expected behavior.\n- **Unit test:** Checks a small function or component.\n- **Integration test:** Checks components working together.\n- **Boundary test:** Checks values at or near a limit.\n- **Regression test:** Rechecks behavior after changes.\n- **Defect:** A flaw that can cause incorrect or unwanted behavior.\n\n## 9. Common Misconception\nA program that runs without crashing is not necessarily correct. Logical errors can produce plausible but incorrect results, so output must be compared with an expected result.\n\n## 10. Precise Definition\n\u003e Testing evaluates software behavior against expectations; debugging identifies and corrects the defects responsible for unexpected behavior.\n\n## 11. Knowledge Check\n**Question:** How do testing and debugging differ when a score of 40 is incorrectly marked as a fail?\n\n**Answer:** A boundary test exposes the incorrect result; debugging traces the cause, such as using `score \u003e 40` instead of `score \u003e= 40`, and fixes it.",
      },
    ],
  },
  {
    id: "CSC203",
    learningGuide: {
      why: "Errors are normal in programming, so a systematic way to find and verify fixes is essential.",
      mentalModel:
        "Observe a failure, form a hypothesis, isolate the cause, change one thing, and test again.",
      plainExplanation:
        "Debugging is detective work; testing creates evidence that the program behaves correctly in expected and unexpected situations.",
      misconception:
        "A program that runs without crashing can still be wrong because logical errors produce incorrect results.",
      check:
        "How would you distinguish syntax, runtime, and logical errors in a CGPA calculator?",
    },
    title: "Computer Architecture",
    description: "Understanding how computer hardware and logic systems work.",
    topics: [
      {
        id: "csc203-t1",
        title: "Number Systems and Data Representation",
        notes: "# Number Systems and Data Representation\n\n## 1. Definition\nA number system represents quantities using symbols and rules for positional value. Data representation is the method a computer uses to encode numbers, characters, and other information as bit patterns that digital circuits can store and process.\n\n## 2. Purpose and Significance\nElectronic circuits reliably distinguish two signal states, so binary is the basic representation inside digital computers. Decimal, binary, octal, and hexadecimal are different ways to write values; conversions let people read, design, and debug machine-level data without changing the underlying value.\n\n## 3. Fundamental Components\nA positional system has a base (radix), a set of digits, and place values that are powers of the base. Computers group bits into bytes and use encoding rules for signed integers, real numbers, and characters. Two\u0027s complement represents signed integers; floating-point formats represent a wide range of approximate real values. Text encodings such as ASCII and Unicode map characters to numeric codes.\n\n## 4. Illustrative Example\nThe decimal value 45 can be decomposed into powers of two:\n\n```text\n45 = 32 + 8 + 4 + 1\n45 in base 10 = 101101 in base 2\n101101 in base 2 = 32 + 8 + 4 + 1 = 45 in base 10\n```\n\nGrouping the binary digits as 0010 1101 gives hexadecimal 2D.\n\n## 5. Counterexample or Common Error\n`102` is not a valid binary numeral because base 2 permits only the digits 0 and 1. Also, the written digits `101101` have different values in base 2 and base 10; a numeral must be interpreted with its base.\n\n## 6. Related Distinction\nA value is the quantity being represented; a numeral is its written representation. For example, decimal 45, binary 101101, and hexadecimal 2D express the same value. Different bit encodings can also represent different data types, so a bit pattern needs an agreed interpretation.\n\n## 7. Conceptual Model\nThink of each digit as contributing its value times a place weight. In base b, the places from right to left have weights 1, b, b squared, and so on. Binary uses powers of 2; hexadecimal uses powers of 16.\n\n## 8. Related Terminology\n- **Bit:** A binary digit, 0 or 1.\n- **Byte:** A group of 8 bits.\n- **Radix/base:** The number of distinct digits in a positional system.\n- **Two\u0027s complement:** A common fixed-width signed-integer encoding.\n- **Floating point:** An encoding for real values with finite precision.\n- **Character encoding:** A rule mapping text characters to numeric codes.\n\n## 9. Common Misconception\nBinary is not a different kind of quantity; it is a representation system. A computer\u0027s bit pattern does not identify its meaning by itself; the data type and encoding provide that interpretation.\n\n## 10. Precise Definition\n\u003e Data representation is the use of agreed bit encodings to represent values and information so digital systems can store, transmit, and process them.\n\n## 11. Knowledge Check\n**Question:** Convert binary 1101 to decimal and explain how you know.\n\n**Answer:** It is 13, because 1 times 8 plus 1 times 4 plus 0 times 2 plus 1 times 1 equals 13.",
      },
      {
        id: "csc203-t2",
        title: "Logic Gates and Boolean Algebra",
        notes: "# Logic Gates and Boolean Algebra\n\n## 1. Definition\nBoolean algebra is a system for working with variables that take one of two logical values, usually written 0 and 1. Logic gates are electronic circuits that implement Boolean operations on binary inputs to produce binary outputs.\n\n## 2. Purpose and Significance\nDigital systems make decisions and transform data using combinations of simple logical operations. Boolean algebra provides a precise way to describe and simplify those operations before they are built as circuits.\n\n## 3. Fundamental Components\nThe basic operations are AND, OR, and NOT. Common derived gates include NAND, NOR, XOR, and XNOR. A truth table lists an operation\u0027s output for every possible input combination. Boolean expressions combine variables and operations; identities and De Morgan\u0027s laws can simplify expressions.\n\n## 4. Illustrative Example\nFor Y = A AND B, the output is 1 only when both inputs are 1:\n\n```text\nA B | Y\n0 0 | 0\n0 1 | 0\n1 0 | 0\n1 1 | 1\n```\n\nFor Y = A OR B, either input being 1 makes the output 1. NOT reverses a single input.\n\n## 5. Counterexample or Common Error\nBoolean OR is not ordinary arithmetic addition: 1 OR 1 equals 1, not 2. Confusing the two systems leads to incorrect truth tables and circuit equations.\n\n## 6. Related Distinction\nA Boolean expression is the abstract logical rule; a gate is a physical circuit that implements that rule. NAND and NOR are universal gates because suitable combinations of either can implement any Boolean function.\n\n## 7. Conceptual Model\nTreat each input as a yes/no condition. AND requires every condition to be true, OR requires at least one, and NOT reverses a condition. Gates apply these rules to voltage levels representing binary values.\n\n## 8. Related Terminology\n- **Boolean variable:** A variable restricted to 0 or 1.\n- **Truth table:** A list of outputs for every input combination.\n- **Complement:** The NOT of a Boolean value or expression.\n- **NAND/NOR:** The negation of AND/OR, respectively.\n- **XOR:** 1 when its two inputs differ.\n- **De Morgan\u0027s laws:** Rules for complementing AND and OR expressions.\n\n## 9. Common Misconception\nThe symbols 0 and 1 in Boolean algebra describe logical states, not ordinary quantities. Their operations follow logical rules, so arithmetic intuition cannot be applied without checking the operator.\n\n## 10. Precise Definition\n\u003e Boolean algebra is a two-valued algebra whose operations describe logical relationships and provide a mathematical basis for digital logic circuits.\n\n## 11. Knowledge Check\n**Question:** When does a two-input XOR gate produce 1?\n\n**Answer:** When its inputs differ: one is 0 and the other is 1.",
      },
      {
        id: "csc203-t3",
        title: "Combinational Circuits",
        notes: "# Combinational Circuits\n\n## 1. Definition\nA combinational circuit is a digital logic circuit whose outputs depend only on the current input values. It has no stored state, so its output does not depend on earlier inputs.\n\n## 2. Purpose and Significance\nCombinational circuits perform the immediate transformations used throughout a computer, including arithmetic, comparisons, selection, and decoding. They form the data-processing paths that connect registers and other state-holding components.\n\n## 3. Fundamental Components\nA combinational design is built from logic gates and wires. Its behavior can be described by a truth table or Boolean expressions. Design commonly proceeds from a specification to a truth table, a simplified expression, and then a circuit. Adders, multiplexers, decoders, and comparators are common examples.\n\n## 4. Illustrative Example\nA full adder combines two bits and a carry-in:\n\n```text\nSum       = A XOR B XOR Cin\nCarry-out = (A AND B) OR (Cin AND (A XOR B))\n```\n\nFor A=1, B=1, and Cin=0, the sum is 0 and the carry-out is 1.\n\n## 5. Counterexample or Common Error\nA circuit with feedback that stores a previous result is not purely combinational. Calling it combinational because it contains gates ignores whether its behavior depends on stored state.\n\n## 6. Related Distinction\nCombinational logic maps current inputs to outputs. Sequential logic also depends on an internal state retained from earlier inputs. A processor combines both: combinational logic performs operations, while registers and flip-flops preserve state.\n\n## 7. Conceptual Model\nImagine a calculator whose display is recomputed from the keys currently pressed, with no memory of prior presses. A combinational circuit behaves this way: the same current inputs produce the same outputs, assuming stable conditions.\n\n## 8. Related Terminology\n- **Input combination:** The current values supplied to a circuit.\n- **Truth table:** A complete description of input-output behavior.\n- **Full adder:** A circuit adding two bits and a carry-in.\n- **Multiplexer:** A circuit selecting one of several inputs.\n- **Decoder:** A circuit translating an encoded input into output lines.\n- **Propagation delay:** Time for an input change to affect an output.\n\n## 9. Common Misconception\nA combinational circuit is not defined by being simple or having no clock alone. Its defining property is that its output is determined by current inputs, without remembered state.\n\n## 10. Precise Definition\n\u003e A combinational circuit is a logic network whose output at a given time is a function only of its current input values.\n\n## 11. Knowledge Check\n**Question:** Does a full adder remember the result of a previous addition?\n\n**Answer:** No. It is combinational; a separate state element would be needed to store a result or carry between operations.",
      },
      {
        id: "csc203-t4",
        title: "Sequential Circuits",
        notes: "# Sequential Circuits\n\n## 1. Definition\nA sequential circuit is a digital circuit whose output depends on current inputs and an internal state representing stored information. The state is updated as inputs change, often at specific clock events.\n\n## 2. Purpose and Significance\nComputers need circuits that retain values between operations. Sequential circuits provide the memory used in registers, counters, control units, and other stateful systems. Without them, a computer could calculate from current signals but could not store a program\u0027s progress or intermediate values.\n\n## 3. Fundamental Components\nSequential circuits combine logic with state elements such as latches and flip-flops. A clock can coordinate state updates. Feedback carries state into the next computation; next-state logic determines what will be stored. Timing requirements such as setup and hold times affect reliable operation.\n\n## 4. Illustrative Example\nA D flip-flop captures its D input at the active clock edge and holds the captured value at Q until a later update. A chain of such elements can store a multi-bit value; connecting them with next-state logic can create a counter.\n\n## 5. Counterexample or Common Error\nTreating a flip-flop output as if it immediately followed its input misses the storage behavior. For a clocked D flip-flop, changes at D between active edges do not immediately become the stored Q value.\n\n## 6. Related Distinction\nCombinational circuits have no stored state; sequential circuits do. A latch is generally level-sensitive, while a flip-flop is generally edge-triggered. Synchronous circuits use a shared clock; asynchronous circuits can change state without waiting for a clock edge.\n\n## 7. Conceptual Model\nA sequential circuit is like a machine with a notebook: it reads current inputs, consults its saved state, computes a result, then updates what it remembers at the appropriate time.\n\n## 8. Related Terminology\n- **State:** Information retained by a circuit.\n- **Latch:** A level-sensitive storage element.\n- **Flip-flop:** An edge-triggered storage element.\n- **Clock:** A timing signal coordinating state changes.\n- **Feedback:** A path returning output or state to circuit inputs.\n- **Setup/hold time:** Timing constraints around a state-capture event.\n\n## 9. Common Misconception\nA clock does not itself store data. Storage elements retain state; the clock determines when synchronous state elements are permitted to update.\n\n## 10. Precise Definition\n\u003e A sequential circuit is a digital system whose behavior depends on both present inputs and stored internal state, with state transitions governed by its design and timing.\n\n## 11. Knowledge Check\n**Question:** What makes a sequential circuit different from a combinational circuit?\n\n**Answer:** A sequential circuit retains state, so its output can depend on previous inputs as well as current inputs.",
      },
      {
        id: "csc203-t5",
        title: "CPU Organization",
        notes: "# CPU Organization\n\n## 1. Definition\nCPU organization describes how the processor\u0027s internal components and data paths work together to execute instructions. It includes the control unit, arithmetic and logic unit, registers, buses, and their connections to memory and input/output devices.\n\n## 2. Purpose and Significance\nUnderstanding CPU organization explains how program instructions become hardware actions. It connects number representation, logic circuits, memory, and control into the fetch-decode-execute process used to run software.\n\n## 3. Fundamental Components\nThe arithmetic and logic unit (ALU) performs operations. The control unit interprets instructions and coordinates signals. Registers provide fast storage, including the program counter and instruction register. Buses carry data, addresses, and control signals between the CPU, memory, and I/O. In a stored-program architecture, instructions and data reside in memory.\n\n## 4. Illustrative Example\nFor an instruction that adds two register values, the CPU fetches the instruction from the address in the program counter, decodes which registers and operation it specifies, sends operands to the ALU, then writes the sum to the destination register. The program counter advances to the next instruction unless control flow changes it.\n\n## 5. Counterexample or Common Error\nThe CPU is not only the ALU. The ALU performs arithmetic and logical operations, but the control unit, registers, buses, memory interface, and instruction sequencing are also necessary to execute a program.\n\n## 6. Related Distinction\nComputer architecture describes the programmer-visible behavior, such as instructions and registers. Organization describes how a particular processor implements that behavior internally. Two processors can support similar instructions while using different internal designs.\n\n## 7. Conceptual Model\nThink of the CPU as a coordinated workbench: memory supplies instructions and data, registers hold immediate items, the control unit directs the steps, and the ALU performs selected operations.\n\n## 8. Related Terminology\n- **ALU:** Unit that performs arithmetic and logic operations.\n- **Control unit:** Coordinates instruction execution.\n- **Program counter:** Register holding the next instruction address.\n- **Instruction register:** Holds the instruction currently being handled.\n- **Register:** Small, fast storage inside the CPU.\n- **System bus:** Communication paths carrying data, addresses, and control signals.\n\n## 9. Common Misconception\nThe fetch-decode-execute cycle is a useful model, but modern processors may overlap or reorder work through pipelining and other techniques. The model describes core responsibilities, not every timing detail of a modern CPU.\n\n## 10. Precise Definition\n\u003e CPU organization is the arrangement and operation of processor components and data paths that fetch, interpret, and execute instructions.\n\n## 11. Knowledge Check\n**Question:** What is the difference between the ALU and the control unit?\n\n**Answer:** The ALU performs arithmetic and logical operations; the control unit interprets instructions and coordinates the signals that make execution proceed.",
      },
    ],
  },
  {
    id: "CSC215",
    title: "Digital Logic",
    description:
      "Binary systems, logic gates, and computer architecture basics.",
    topics: [
      {
        id: "csc215-t1",
        title: "Number Systems and Codes",
        notes: "# Number Systems and Codes\n\n## 1. Definition\nA number system represents values using a base and a set of digits. A code is an agreed mapping between information and bit patterns. In digital logic, number systems and codes describe how numeric and symbolic information is represented using binary signals.\n\n## 2. Purpose and Significance\nCircuits process binary values, but engineers and users need readable ways to express quantities and text. Conversions between decimal, binary, octal, and hexadecimal support hardware design and debugging. Codes such as BCD and character encodings assign bit patterns to specific kinds of information.\n\n## 3. Fundamental Components\nA positional number has digits weighted by powers of its base. Binary uses 0 and 1; octal uses 0 through 7; hexadecimal uses 0 through 9 and A through F. BCD encodes each decimal digit separately. Signed integer codes include sign-magnitude, one\u0027s complement, and two\u0027s complement. Character codes map symbols to bit patterns.\n\n## 4. Illustrative Example\nDecimal 59 converts to binary by expressing it as powers of two:\n\n```text\n59 = 32 + 16 + 8 + 2 + 1\n59 in base 10 = 111011 in base 2\n111011 in base 2 = 3B in base 16\n```\n\nIn BCD, decimal 59 is encoded digit by digit as `0101 1001`, not as the ordinary binary representation of 59.\n\n## 5. Counterexample or Common Error\nBCD `0101 1001` and binary `111011` represent the same decimal quantity under different encoding rules. Reading BCD as an ordinary binary integer gives a different value; always identify the code before interpreting bits.\n\n## 6. Related Distinction\nA numeral is a written representation of a number; the value is the quantity it denotes. A code is broader: it can assign bits to digits, letters, or control symbols. Hexadecimal is a compact way to write binary patterns, not a different stored value.\n\n## 7. Conceptual Model\nA representation is a shared agreement: each pattern is assigned a meaning by its encoding. Positional systems assign meaning through place weights; character and decimal codes assign meaning through lookup rules.\n\n## 8. Related Terminology\n- **Base/radix:** Number of distinct digits in a positional system.\n- **Bit:** A binary digit, 0 or 1.\n- **BCD:** A code that represents each decimal digit with a binary group.\n- **Two\u0027s complement:** A widely used signed-integer representation.\n- **Character code:** A mapping between characters and numeric patterns.\n- **Hexadecimal:** Base 16, often used to abbreviate binary patterns.\n\n## 9. Common Misconception\nA sequence of bits has no single meaning without an agreed representation. The same bit pattern may represent an integer, part of a character, or another value depending on the circuit or software interpreting it.\n\n## 10. Precise Definition\n\u003e A number system or code is a rule for mapping values or symbols to written forms or bit patterns so they can be interpreted consistently.\n\n## 11. Knowledge Check\n**Question:** Why is BCD `0101 1001` not interchangeable with binary `111011`, even though both can represent decimal 59?\n\n**Answer:** They use different encoding rules: BCD encodes each decimal digit separately, while `111011` is the positional binary representation of the whole value.",
      },
      {
        id: "csc215-t2",
        title: "Boolean Algebra & Logic Gates",
        notes: "# Boolean Algebra & Logic Gates\n\n## 1. Definition\nBoolean algebra is an algebra for variables with two possible values, commonly 0 and 1. Logic gates are circuits that implement Boolean operations such as AND, OR, and NOT on binary inputs.\n\n## 2. Purpose and Significance\nBoolean algebra describes the decisions made by digital systems and provides a way to design and reason about logic circuits. It connects a required behavior to a truth table, an expression, and a physical network of gates.\n\n## 3. Fundamental Components\nBoolean variables and constants combine through operators. AND is 1 only when all inputs are 1; OR is 1 when at least one input is 1; NOT complements a value. NAND and NOR negate AND and OR. XOR is 1 when inputs differ; XNOR is 1 when they match. Truth tables enumerate input-output behavior.\n\n## 4. Illustrative Example\nLet Y = A AND B. Both conditions must hold:\n\n```text\nA B | Y\n0 0 | 0\n0 1 | 0\n1 0 | 0\n1 1 | 1\n```\n\nA gate diagram would connect A and B to a two-input AND gate and take its output as Y.\n\n## 5. Counterexample or Common Error\nBoolean OR is not arithmetic addition. In Boolean algebra, `1 OR 1` is 1 because the result means “at least one is true”; adding the integers 1 and 1 gives 2.\n\n## 6. Related Distinction\nBoolean expressions are mathematical descriptions; gates are implementations. A truth table specifies the intended behavior independently of how the circuit is built. NAND and NOR are universal gates because networks of either can implement any Boolean function.\n\n## 7. Conceptual Model\nInterpret 1 as a condition being true and 0 as false. AND requires every condition, OR accepts at least one, and NOT reverses a condition. The gate applies the corresponding rule to its electrical inputs.\n\n## 8. Related Terminology\n- **Complement:** The NOT of a variable or expression.\n- **Truth table:** A complete listing of outputs for every input combination.\n- **XOR:** Exclusive OR; true when inputs differ.\n- **XNOR:** True when inputs match.\n- **De Morgan\u0027s laws:** Rules for complementing Boolean products and sums.\n- **Universal gate:** A gate type that can be combined to implement any Boolean function.\n\n## 9. Common Misconception\nThe symbols 0 and 1 denote logical states here, not ordinary numeric quantities. The operator determines how the values combine, so arithmetic rules cannot be applied blindly.\n\n## 10. Precise Definition\n\u003e Boolean algebra is a two-valued algebra for expressing and manipulating logical relationships that digital gates can implement.\n\n## 11. Knowledge Check\n**Question:** What output does a two-input OR gate produce for inputs 0 and 1?\n\n**Answer:** 1, because at least one input is true.",
      },
      {
        id: "csc215-t3",
        title: "Simplification of Boolean Functions",
        notes:
          "# Simplification of Boolean Functions\n\n## 1. Definition\nBoolean-function simplification transforms a logical expression into an equivalent expression with fewer or simpler terms, without changing its output for any input combination.\n\n## 2. Purpose and Significance\nA simpler expression can require fewer gates and connections, reducing circuit area, cost, delay, and power. Simplification also makes a design easier to inspect and verify.\n\n## 3. Fundamental Components\nMethods include Boolean identities, algebraic factoring, Karnaugh maps, and algorithmic minimization such as Quine-McCluskey. A truth table or minterm list captures the function to be preserved. In Karnaugh maps, adjacent cells differ in one input bit and can be grouped to remove changing variables.\n\n## 4. Illustrative Example\nThe distributive law gives an equivalent shorter expression:\n\n```text\n(A AND B) OR (A AND NOT B)\n= A AND (B OR NOT B)\n= A AND 1\n= A\n```\n\nThe original expression needs several operations; the simplified form is just A.\n\n## 5. Counterexample or Common Error\nDropping a term because it “looks redundant” is not safe unless equivalence is proved. For example, `A AND B` is not equivalent to A: when A=1 and B=0, the first is 0 and the second is 1.\n\n## 6. Related Distinction\nEquivalent expressions have identical truth tables, but they may map to circuits with different cost or delay. Algebraic minimality under one measure does not automatically guarantee the fastest physical implementation under all technology constraints.\n\n## 7. Conceptual Model\nSimplification preserves a circuit\u0027s contract while removing unnecessary work. Think of it as finding a shorter route that still produces exactly the same destination for every possible input.\n\n## 8. Related Terminology\n- **Boolean function:** A mapping from Boolean inputs to a Boolean output.\n- **Minterm:** A product term true for one input combination.\n- **Karnaugh map:** A visual method for grouping adjacent minterms.\n- **Prime implicant:** A product term that cannot be further combined into a larger implicant.\n- **Equivalent expression:** An expression with the same output for every input.\n- **Logic minimization:** Finding a lower-cost equivalent implementation.\n\n## 9. Common Misconception\nThe fewest literal symbols do not always produce the best real circuit. Fan-out, gate delays, available gate types, and physical layout can affect the final design.\n\n## 10. Precise Definition\n\u003e Boolean-function simplification is the derivation of a lower-complexity expression or circuit that preserves a Boolean function\u0027s complete input-output behavior.\n\n## 11. Knowledge Check\n**Question:** Why can `(A AND B) OR (A AND NOT B)` be simplified to A?\n\n**Answer:** Factoring A leaves `B OR NOT B`, which is always 1; therefore the expression becomes `A AND 1`, equal to A.",
      },
      {
        id: "csc215-t4",
        title: "Combinational Logic Circuits",
        notes: "# Combinational Logic Circuits\n\n## 1. Definition\nA combinational logic circuit is a network of gates whose outputs depend only on the present input values. It does not store a state from earlier inputs.\n\n## 2. Purpose and Significance\nCombinational circuits perform the calculations and selections used in digital systems. Adders, subtractors, multiplexers, decoders, encoders, and comparators are common building blocks in processors and controllers.\n\n## 3. Fundamental Components\nA design begins with a specification and input-output behavior, often captured in a truth table. Boolean equations can be simplified and implemented with gates. A half adder adds two bits; a full adder also includes carry-in. A multiplexer selects an input, while a decoder activates an output corresponding to a coded input.\n\n## 4. Illustrative Example\nA half adder combines bits A and B:\n\n```text\nSum   = A XOR B\nCarry = A AND B\n```\n\nFor A=1 and B=1, Sum is 0 and Carry is 1, representing binary 10.\n\n## 5. Counterexample or Common Error\nA circuit that feeds a previous output back into its logic and stores it is not purely combinational. Its behavior can depend on previous activity, so it belongs to sequential logic.\n\n## 6. Related Distinction\nCombinational logic has no memory and is described as a function of current inputs. Sequential logic has state. Combinational circuits may still have propagation delay; “no memory” does not mean the physical output changes with zero delay.\n\n## 7. Conceptual Model\nA combinational circuit behaves like a fixed calculation: provide the current inputs, apply its logic, and obtain an output. With stable inputs, the same combination yields the same result.\n\n## 8. Related Terminology\n- **Half adder:** Adds two bits and produces sum and carry.\n- **Full adder:** Adds two bits and a carry-in.\n- **Multiplexer:** Selects one of multiple data inputs.\n- **Decoder:** Activates outputs based on an encoded input.\n- **Comparator:** Determines the relationship between input values.\n- **Propagation delay:** Time for a change to pass through a circuit.\n\n## 9. Common Misconception\nA combinational circuit is not necessarily small or instantaneous. It may contain many gates and have measurable delay; its defining feature is the absence of stored state.\n\n## 10. Precise Definition\n\u003e A combinational logic circuit implements an output function determined solely by its current input combination, without retaining previous state.\n\n## 11. Knowledge Check\n**Question:** What are the sum and carry outputs of a half adder when A=1 and B=1?\n\n**Answer:** Sum is 0 and carry is 1, so the two-bit result is binary 10.",
      },
      {
        id: "csc215-t5",
        title: "Sequential Logic Circuits",
        notes: "# Sequential Logic Circuits\n\n## 1. Definition\nA sequential logic circuit is a digital circuit whose behavior depends on current inputs and stored internal state. The state represents information retained from earlier events.\n\n## 2. Purpose and Significance\nSequential circuits let systems remember values, count events, and control multi-step operations. They provide the storage and state transitions required for registers, counters, and finite-state machines.\n\n## 3. Fundamental Components\nLatches and flip-flops are storage elements. Latches are generally level-sensitive; flip-flops are generally edge-triggered. Synchronous circuits coordinate state updates with a clock, while asynchronous circuits can change state without waiting for a clock edge. Feedback and next-state logic determine the following state.\n\n## 4. Illustrative Example\nA D flip-flop samples its D input at an active clock edge and holds the captured value at Q until a later active edge. Connecting several flip-flops stores a multi-bit word; adding logic that advances the value creates a counter.\n\n## 5. Counterexample or Common Error\nA combinational network that only calculates `nextState` has not stored that state. A latch or flip-flop is required to retain the value after the input or calculation changes.\n\n## 6. Related Distinction\nCombinational circuits compute from current inputs only; sequential circuits incorporate memory. A latch responds while its enable level is active, whereas an edge-triggered flip-flop captures at a transition of its clock.\n\n## 7. Conceptual Model\nImagine a machine that checks its inputs, consults a saved state, computes what should happen next, and records the new state at a defined update event. The stored state gives the machine a history.\n\n## 8. Related Terminology\n- **State:** Information held by a sequential circuit.\n- **Latch:** A level-sensitive storage element.\n- **Flip-flop:** An edge-triggered storage element.\n- **Clock edge:** A rising or falling transition used to coordinate updates.\n- **Next-state logic:** Logic determining the state to store next.\n- **Finite-state machine:** A system with a finite set of states and defined transitions.\n\n## 9. Common Misconception\nA clock signal is not the memory itself. Storage elements retain state; the clock coordinates when synchronous elements capture new values.\n\n## 10. Precise Definition\n\u003e A sequential logic circuit is a digital system that combines logic and storage so its outputs and state transitions can depend on present inputs and remembered state.\n\n## 11. Knowledge Check\n**Question:** Why can a sequential circuit respond differently to identical current inputs at two different times?\n\n**Answer:** Its internal state may differ because of earlier inputs, and that stored state also affects its behavior.",
      },
      {
        id: "csc215-t6",
        title: "Registers and Counters",
        notes:
          "# Registers and Counters\n\n## 1. Definition\nA register is a group of storage elements used to hold a multi-bit value. A counter is a sequential circuit that changes its stored value according to a counting rule, often in response to clock pulses.\n\n## 2. Purpose and Significance\nRegisters hold operands, instructions, addresses, and intermediate results close to the CPU. Counters track events or sequence through states. Together they support instruction execution, timing, data movement, and control.\n\n## 3. Fundamental Components\nRegisters are commonly built from flip-flops with shared clock and control signals. Special-purpose CPU registers include the program counter and instruction register. Shift registers move bits left or right. Counters can be asynchronous (ripple) or synchronous; synchronous designs update their flip-flops from a common clock.\n\n## 4. Illustrative Example\nA 4-bit binary counter can cycle upward on each active clock edge:\n\n```text\n0000 -\u003e 0001 -\u003e 0010 -\u003e 0011 -\u003e 0100 -\u003e ... -\u003e 1111 -\u003e 0000\n```\n\nIt has 16 possible states before returning to zero, assuming modulo-16 behavior.\n\n## 5. Counterexample or Common Error\nA 4-bit counter does not represent an unlimited count. Its bit width gives 16 distinct patterns; if it increments past 1111 without extra bits or special logic, it wraps to 0000 in a modulo-16 counter.\n\n## 6. Related Distinction\nA register stores a value; a counter is a register plus logic that changes the value according to a sequence. An asynchronous ripple counter allows changes to propagate from one stage to the next, while a synchronous counter updates stages from a shared clock.\n\n## 7. Conceptual Model\nA register is a row of bit-sized memory cells. A counter adds a rule for changing that row at each event, much like an odometer advances when a wheel turns.\n\n## 8. Related Terminology\n- **Register:** A collection of flip-flops storing a word.\n- **Program counter:** Holds the address used to fetch the next instruction.\n- **Shift register:** Moves stored bits between positions.\n- **Counter modulus:** Number of states in a repeating count sequence.\n- **Ripple counter:** A counter where stage transitions propagate serially.\n- **Synchronous counter:** A counter whose stages share a clock event.\n\n## 9. Common Misconception\nA register and a counter are not interchangeable terms. Both may use flip-flops, but a counter includes logic that determines a counting sequence.\n\n## 10. Precise Definition\n\u003e A register stores a multi-bit state; a counter is a state-holding circuit that advances through a defined sequence of values in response to events.\n\n## 11. Knowledge Check\n**Question:** How many distinct states can a 4-bit modulo counter represent?\n\n**Answer:** Sixteen, because four bits produce 2^4 possible patterns, from 0000 through 1111.",
      },
      {
        id: "csc215-t7",
        title: "Memory Devices",
        notes:
          "# Memory Devices\n\n## 1. Definition\nA memory device stores data or instructions for later retrieval. Computer systems use different memory technologies and storage media to balance speed, capacity, persistence, and cost.\n\n## 2. Purpose and Significance\nThe processor needs instructions and data while it works, and users need files to remain available after power is removed. A hierarchy of memory devices places frequently used data close to the CPU and keeps larger, persistent data in secondary storage.\n\n## 3. Fundamental Components\nRegisters hold immediate CPU values. Cache stores copies of likely-to-be-reused data near the processor. RAM holds active programs and data and is typically volatile. ROM or flash memory preserves firmware. Secondary storage such as SSDs and hard drives offers persistent, larger-capacity storage. Device characteristics include access time, capacity, volatility, endurance, and cost per bit.\n\n## 4. Illustrative Example\nWhen a program runs, the CPU may first check a cache for requested data. If it is not present, the system retrieves it from RAM; if needed data is not in RAM, the operating system may load it from an SSD. Each layer trades speed against capacity and cost.\n\n## 5. Counterexample or Common Error\nRAM is not permanent storage. Unsaved data held only in volatile RAM is normally lost when power is removed. Conversely, secondary storage is persistent but typically slower than CPU registers and cache.\n\n## 6. Related Distinction\nMemory hierarchy levels are not simply “better” or “worse.” Registers and cache prioritize low latency; RAM balances speed and capacity for active work; secondary storage prioritizes persistence and capacity. ROM is nonvolatile memory, while RAM commonly refers to volatile working memory in this context.\n\n## 7. Conceptual Model\nThink of storage as a set of workspaces: a tiny desk within reach (registers), nearby shelves (cache and RAM), and a large archive farther away (secondary storage). Frequently used items are kept closer for faster access.\n\n## 8. Related Terminology\n- **Volatile memory:** Loses stored contents when power is removed.\n- **Nonvolatile memory:** Retains information without continuous power.\n- **Cache hit/miss:** Whether requested data is found in cache.\n- **Latency:** Time required to access data.\n- **Capacity:** Amount of information a device can hold.\n- **Firmware:** Low-level software stored in nonvolatile memory.\n\n## 9. Common Misconception\nROM does not mean that every such device is permanently unchangeable. Modern nonvolatile memories such as flash can be rewritten, though their write behavior and endurance differ from RAM.\n\n## 10. Precise Definition\n\u003e A memory device is a hardware component that stores encoded information for retrieval, with its speed, capacity, persistence, and cost determined by its technology and role.\n\n## 11. Knowledge Check\n**Question:** Where should a computer keep unsaved active data for fast access, and what is the risk?\n\n**Answer:** In RAM for fast working access; because it is typically volatile, the data can be lost if power is removed before it is saved to persistent storage.",
      },
    ],
  },
  {
    id: "MTH201",
    title: "Calculus II",
    description:
      "Functions of several variables, calculus, and mathematical modeling.",
    topics: [
      {
        id: "mth201-t1",
        title: "Real-valued functions of a real variable",
        notes: "# Real-Valued Functions of a Real Variable\n\n## Section 1 — Conceptual Introduction\n\n### What is a Function?\nBefore jumping into formal definitions, symbols, or equations, let us ask a simple question: **What is a function?**\n\nIn plain terms, a function is a predictable machine or rule that takes an input, processes it according to a fixed formula, and returns a single, unambiguous output.\n\nThink of a vending machine:\n* If you enter code `A1`, it dispenses a water bottle.\n* If you enter code `B2`, it dispenses fruit juice.\n* You never enter `A1` and get a water bottle on Monday, but a sports drink on Tuesday. The outcome is deterministic and unique.\n\nIn everyday life, quantities depend on other quantities:\n1. **Temperature over Time:** The temperature in Zaria depends on the time of day.\n2. **Fuel Cost vs. Distance:** The total cost of fuel for a trip depends on the distance driven.\n3. **Square Area:** The area of a square tile ground depends on the length of its side.\n\nIn mathematics, when both the input and output values are **[[real-number|real numbers]]**, we call the rule a **[[real-valued|real-valued function]]** of a **[[variable|real variable]]**.\n\n---\n\n## Section 2 — Required Terminology\n\nTo successfully master this topic, you must become familiar with its foundational vocabulary. Hover or tap on any term below to view its definition:\n\n* **[[function|Function]]**: A mathematical relationship assigning exactly one output to each allowed input.\n* **[[variable|Variable]]**: A symbol (like $x$ or $y$) representing an unspecified number from a set.\n* **[[real-number|Real Number]]**: Any value along the continuous number line ($mathbb{R}$), including integers, fractions, and irrationals.\n* **[[input|Input]]**: The independent value $x$ supplied to a function.\n* **[[output|Output]]**: The dependent value $y = f(x)$ generated by the function.\n* **[[domain|Domain]]**: The complete set of allowed input values for which a function is defined.\n* **[[range|Range]]**: The set of all actual output values produced by the function.\n* **[[relation|Relation]]**: Any set of ordered pairs $(x, y)$, pairing inputs with outputs.\n* **[[mapping|Mapping]]**: A rule that pairs elements from a starting set to a target set.\n* **[[real-valued|Real-Valued]]**: Describing a function whose outputs are real numbers ($f(x) in mathbb{R}$).\n\n---\n\n## Section 3 — Intuitive Explanation\n\nLet us build an intuitive mental model using a concrete, familiar rule:\n\n$f(x) = x^2$\n\nHere, the function rule says: *\"Take whatever input $x$ is given, and multiply it by itself.\"*\n\nLet us test a few inputs:\n\n* If input $x = 2$, then output $f(2) = 2^2 = 4$\n* If input $x = 3$, then output $f(3) = 3^2 = 9$\n* If input $x = -2$, then output $f(-2) = (-2)^2 = 4$\n\nNotice the relationship:\n\n```text\nInput (x)   →   Function Rule (x²)   →   Output y = f(x)\n   2        →           x²          →         4\n   3        →           x²          →         9\n  -2        →           x²          →         4\n```\n\n> **Key Takeaway:** Two different inputs ($2$ and $-2$) can produce the *same* output ($4$). This is completely valid for a function! However, a single input can **never** produce two different outputs.\n\n---\n\n## Section 4 — Formal Definition\n\nNow that we have established the intuitive concept, let us state the formal mathematical definition:\n\n> **Definition:** A **real-valued function of a real variable** $f$ is a rule that assigns to each element $x$ in a set $A subseteq mathbb{R}$ (the domain) exactly one real number $y = f(x)$ in a set $B subseteq mathbb{R}$ (the codomain).\n\nWe write this symbolically as:\n\n$f: A \rightarrow B, quad \text{where } A subseteq mathbb{R} \text{ and } B subseteq mathbb{R}$\n\n### Decoding the Formal Notation\nLet us dissect each component of the formal statement so nothing feels mysterious:\n* **$f$**: The name of the function (the rule).\n* **$A$**: The **[[domain|domain]]**, representing the set of valid inputs $x$.\n* **$B$**: The **[[codomain|codomain]]**, representing the target set of real numbers $mathbb{R}$.\n* **$\rightarrow$**: Reads as *\"maps to\"*.\n* **$mathbb{R}$**: Symbol for the set of all **[[real-number|real numbers]]**.\n* **$y = f(x)$**: Reads as *\"$y$ equals $f$ of $x$\"*. It signifies that $y$ is the output resulting from applying $f$ to input $x$.\n\n### The Uniqueness Requirement (Vertical Line Test)\nGeometrically, if you plot a real-valued function on the Cartesian coordinate plane, any vertical line drawn through the domain must intersect the graph at **at most one point**. If a vertical line touches the graph twice, the relation assigns two outputs to one input and is therefore **not a function**.\n\n---\n\n## Section 5 — Domain and Range\n\nUnderstanding how to find the domain and range of a real-valued function is one of the most critical skills in calculus.\n\n### 1. Domain ($\text{Dom}(f)$)\nThe domain is the set of all real numbers $x$ for which $f(x)$ is a real number. \n\nWhen determining the domain of a function in $mathbb{R}$, watch out for three algebraic restrictions:\n\n1. **Division by Zero:** Denominators must never equal zero.\n   $\text{If } f(x) = \frac{P(x)}{Q(x)}, quad \text{then } Q(x) \neq 0$\n2. **Negative Square Roots:** Expressions under an even root (like $sqrt{g(x)}$) must be non-negative.\n   $\text{If } f(x) = sqrt{g(x)}, quad \text{then } g(x) ge 0$\n3. **Logarithms:** Arguments of logarithms must be strictly positive ($g(x) > 0$).\n\n#### Domain Worked Examples:\n* **Example A:** $f(x) = \frac{1}{x - 2}$\n  * Denominator cannot be zero: $x - 2 \neq 0 implies x \neq 2$.\n  * Domain: $\text{Dom}(f) = mathbb{R} setminus {2} = (-infty, 2) cup (2, infty)$.\n\n* **Example B:** $g(x) = sqrt{4 - x^2}$\n  * Quantity under square root must be non-negative: $4 - x^2 ge 0 implies x^2 le 4 implies -2 le x le 2$.\n  * Domain: $\text{Dom}(g) = [-2, 2]$.\n\n### 2. Range ($\text{Ran}(f)$)\nThe range is the set of all output values $y$ produced as $x$ varies across the domain.\n\n* For $f(x) = x^2$, since any real number squared is non-negative, the range is $[0, infty)$.\n* For $g(x) = sqrt{4 - x^2}$ on domain $[-2, 2]$, minimum output occurs at $x = pm 2$ ($g(pm 2) = 0$), and maximum output occurs at $x = 0$ ($g(0) = 2$). Range is $[0, 2]$.\n\n---\n\n## Section 6 — Types and Forms of Functions\n\nCalculus deals with several fundamental families of functions:\n\n### 1. Polynomial Functions\nFunctions of the form:\n$f(x) = a_n x^n + a_{n-1} x^{n-1} + dots + a_1 x + a_0$\n* Domain is always all real numbers: $mathbb{R} = (-infty, infty)$.\n* Examples include linear functions ($f(x) = 3x + 1$) and quadratics ($f(x) = x^2 - 4x + 3$).\n\n### 2. Rational Functions\nRatios of two polynomials:\n$f(x) = \frac{P(x)}{Q(x)}$\n* Domain consists of all real numbers except the roots of $Q(x)$.\n\n### 3. Piecewise Functions\nFunctions defined by different rules over different intervals of $x$:\n$f(x) = \begin{cases} x^2, & x ge 0 \\ -x, & x < 0 end{cases}$\n\n### 4. Even and Odd Functions (Symmetry)\n* **Even Function:** Symmetric about the y-axis. Satisfies $f(-x) = f(x)$ for all $x$. (e.g. $f(x) = x^2, cos(x)$)\n* **Odd Function:** Symmetric about the origin. Satisfies $f(-x) = -f(x)$ for all $x$. (e.g. $f(x) = x^3, sin(x)$)\n\n### 5. Composite Functions\nCombining two functions $f$ and $g$ where the output of $g$ becomes the input of $f$:\n$(f circ g)(x) = f(g(x))$\n\n---\n\n## Section 7 — Worked Examples\n\n### Worked Example 1: Domain and Range Determination\n**Problem:** Find the domain and range of $f(x) = \frac{3}{x + 4}$.\n\n* **Reasoning:**\n  1. The function is a rational expression. The denominator $x + 4$ must not be zero.\n  2. To find the range, set $y = \frac{3}{x+4}$ and solve for $x$ in terms of $y$ to identify restricted $y$ values.\n\n* **Mathematical Working:**\n  $\text{For domain: } x + 4 \neq 0 implies x \neq -4$\n  $\text{For range: } y = \frac{3}{x+4} implies y(x + 4) = 3 implies x + 4 = \frac{3}{y} implies x = \frac{3}{y} - 4$\n  Since $y$ appears in the denominator of $\frac{3}{y}$, $y$ cannot be $0$.\n\n* **Answer:**\n  * **Domain:** $\text{Dom}(f) = (-infty, -4) cup (-4, infty)$\n  * **Range:** $\text{Ran}(f) = (-infty, 0) cup (0, infty)$\n\n---\n\n### Worked Example 2: Piecewise Function Evaluation\n**Problem:** Given $g(x) = \begin{cases} 2x + 1, & x < 1 \\ x^2 - 3, & x ge 1 end{cases}$, evaluate $g(-2)$, $g(1)$, and $g(3)$.\n\n* **Reasoning:**\n  Determine which interval condition applies to each input value $x$.\n\n* **Mathematical Working:**\n  1. For $x = -2$: Since $-2 < 1$, use top rule $2x + 1$:\n     $g(-2) = 2(-2) + 1 = -4 + 1 = -3$\n  2. For $x = 1$: Since $1 ge 1$, use bottom rule $x^2 - 3$:\n     $g(1) = (1)^2 - 3 = 1 - 3 = -2$\n  3. For $x = 3$: Since $3 ge 1$, use bottom rule $x^2 - 3$:\n     $g(3) = (3)^2 - 3 = 9 - 3 = 6$\n\n* **Answer:** $g(-2) = -3$, $g(1) = -2$, $g(3) = 6$.\n\n---\n\n### Worked Example 3: Function Composition\n**Problem:** Let $f(x) = sqrt{x}$ and $g(x) = 2x + 6$. Find $(f circ g)(x)$ and state its domain.\n\n* **Reasoning:**\n  Composition $(f circ g)(x) = f(g(x)) = sqrt{2x + 6}$. The square root requires $2x + 6 ge 0$.\n\n* **Mathematical Working:**\n  $2x + 6 ge 0 implies 2x ge -6 implies x ge -3$\n\n* **Answer:** $(f circ g)(x) = sqrt{2x + 6}$ with domain $[-3, infty)$.\n\n---\n\n## Section 8 — Practice Questions\n\nTest your understanding with these progressive practice problems. Click \"Show Solution\" to reveal the step-by-step reasoning!\n\n### Question 1 (Recognition — Easy)\n**Question:** Which of the following set of ordered pairs represents a valid function?\n* Set A: ${(1, 5), (2, 8), (3, 8), (4, 10)}$\n* Set B: ${(1, 4), (2, 7), (1, 9), (3, 12)}$\n\n<details class=\"think-block\">\n<summary>💡 Show Solution & Reasoning</summary>\n<div class=\"think-content\">\n<strong>Answer: Set A is a function. Set B is not.</strong><br/><br/>\n<strong>Reasoning:</strong> In Set A, every input (1, 2, 3, 4) has exactly one unique output (even though inputs 2 and 3 share output 8). In Set B, input 1 is mapped to two different outputs (4 and 9), violating the definition of a function.\n</div>\n</details>\n\n---\n\n### Question 2 (Basic Understanding — Medium)\n**Question:** Find the domain of $h(x) = \frac{sqrt{x - 1}}{x - 5}$.\n\n<details class=\"think-block\">\n<summary>💡 Show Solution & Reasoning</summary>\n<div class=\"think-content\">\n<strong>Answer: $[1, 5) cup (5, infty)$</strong><br/><br/>\n<strong>Reasoning:</strong>\n1. Square root restriction: $x - 1 ge 0 implies x ge 1$.\n2. Denominator restriction: $x - 5 \neq 0 implies x \neq 5$.\nCombining both: $x ge 1$ and $x \neq 5$, giving interval $[1, 5) cup (5, infty)$.\n</div>\n</details>\n\n---\n\n### Question 3 (Application — Hard)\n**Question:** Determine whether $f(x) = \frac{x^3}{x^2 + 1}$ is an even function, an odd function, or neither.\n\n<details class=\"think-block\">\n<summary>💡 Show Solution & Reasoning</summary>\n<div class=\"think-content\">\n<strong>Answer: $f(x)$ is an Odd Function.</strong><br/><br/>\n<strong>Reasoning:</strong> Replace $x$ with $-x$:\n$f(-x) = \frac{(-x)^3}{(-x)^2 + 1} = \frac{-x^3}{x^2 + 1} = -left( \frac{x^3}{x^2 + 1} \right) = -f(x)$\nSince $f(-x) = -f(x)$, the function is odd (symmetric with respect to the origin).\n</div>\n</details>\n\n---\n\n### Question 4 (Problem Solving — Advanced)\n**Question:** A rectangular study garden is to be enclosed along a straight lecture hall wall using 100 meters of fencing. Express the enclosed area $A$ as a function of the garden's width $w$, state its domain, and find the width that maximizes the area.\n\n<details class=\"think-block\">\n<summary>💡 Show Solution & Reasoning</summary>\n<div class=\"think-content\">\n<strong>Answer: $A(w) = 100w - 2w^2$, Domain: $(0, 50)$, Maximum area occurs at $w = 25\text{ m}$.</strong><br/><br/>\n<strong>Reasoning:</strong>\n1. Let $w$ be width and $l$ be length. With one side wall: $l + 2w = 100 implies l = 100 - 2w$.\n2. Area $A = l \times w = (100 - 2w)w = 100w - 2w^2$.\n3. Physical dimensions require $w > 0$ and $l > 0 implies 100 - 2w > 0 implies w < 50$. Domain is $(0, 50)$.\n4. $A(w)$ is a downward-opening parabola ($a = -2 < 0$). Maximum vertex occurs at $w = \frac{-b}{2a} = \frac{-100}{2(-2)} = 25\text{ m}$.\n</div>\n</details>",
      },
      {
        id: "mth201-t2",
        title:
          "Revision of differentiation and integration and their applications",
        notes:
          "# Revision of differentiation and integration and their applications\n\n## 1. Definition\nDifferentiation measures how a function changes locally; integration measures accumulation over an interval. Together, derivatives and integrals connect rates of change with total change and area through the Fundamental Theorem of Calculus.\n\n## 2. Purpose and Significance\nDifferentiation models instantaneous rates such as velocity, marginal cost, and slope. Integration calculates accumulated quantities such as displacement, area, and total work. These methods let a mathematical model answer questions about change and total effect.\n\n## 3. Fundamental Components\nReview limits and derivative rules: power, product, quotient, and chain rules, plus standard trigonometric, exponential, and logarithmic derivatives. Indefinite integrals represent antiderivatives and include a constant of integration. Definite integrals represent signed accumulation. The Fundamental Theorem relates a definite integral to an antiderivative when its conditions hold.\n\n## 4. Illustrative Example\nFor f(x)=x^2, the derivative is f\u0027(x)=2x. The definite integral from 0 to 2 of x dx is [x^2/2] from 0 to 2, which equals 2. The first result is an instantaneous rate; the second is accumulated signed area.\n\n## 5. Counterexample or Common Error\nWriting the indefinite integral of 2x as x^2 without + C gives only one antiderivative. Every function x^2+C has derivative 2x, so the arbitrary constant must be included.\n\n## 6. Related Distinction\nA derivative at a point is a local rate; a definite integral over an interval is a total signed accumulation. Geometric area may require splitting intervals or taking absolute values when the function crosses the axis.\n\n## 7. Conceptual Model\nThe derivative describes the rate on a speedometer; integrating that rate over time accumulates the distance travelled. The Fundamental Theorem explains why an antiderivative can compute that accumulated change.\n\n## 8. Related Terminology\n- **Derivative:** Instantaneous rate of change.\n- **Antiderivative:** A function whose derivative is the integrand.\n- **Definite integral:** Signed accumulation over specified bounds.\n- **Critical point:** A point where a derivative is zero or undefined.\n- **Substitution:** An integration method reversing the chain rule.\n- **Integration by parts:** An integration method reversing the product rule.\n\n## 9. Common Misconception\nA definite integral is not always ordinary geometric area. It counts area below the horizontal axis negatively, so signed accumulation and total area may differ.\n\n## 10. Precise Definition\n\u003e Differentiation assigns a local rate of change to a function, while integration accumulates function values over a domain; under suitable conditions the Fundamental Theorem connects these operations.\n\n## 11. Knowledge Check\n**Question:** If velocity is v(t), what does the definite integral of v from time a to b represent?\n\n**Answer:** The net displacement over that time interval. Total distance requires accounting for changes in the sign of velocity.",
      },
      {
        id: "mth201-t3",
        title: "Mean value theorem",
        notes:
          "# Mean value theorem\n\n## 1. Definition\nThe Mean Value Theorem states that if f is continuous on [a,b] and differentiable on (a,b), then there is at least one c in (a,b) such that f\u0027(c)=(f(b)-f(a))/(b-a). At some interior point, the instantaneous derivative equals the average rate of change over the interval.\n\n## 2. Purpose and Significance\nThe theorem connects local derivatives to an overall change. It supports results about monotonicity, error bounds, and the behavior of functions, and it formalizes the geometric idea that a tangent can be parallel to a secant.\n\n## 3. Fundamental Components\nContinuity is required on the closed interval, differentiability on the open interval, and the secant slope is computed from the endpoint values. Rolle\u0027s Theorem is a special case when f(a)=f(b); it guarantees a point with derivative zero.\n\n## 4. Illustrative Example\nLet f(x)=x^2 on [1,3]. Its average rate is (9-1)/(3-1)=4. Since f\u0027(x)=2x, choosing c=2 gives f\u0027(2)=4, as guaranteed by the theorem.\n\n## 5. Counterexample or Common Error\nFor f(x)=|x| on [-1,1], the function is continuous but not differentiable at 0. Its average slope is 0, yet f\u0027(x) is -1 for x\u003c0 and 1 for x\u003e0, so no interior point has derivative 0. The theorem does not apply because a hypothesis fails.\n\n## 6. Related Distinction\nAverage rate of change is the secant slope across the whole interval; instantaneous rate is the tangent slope at a point. The theorem guarantees equality at at least one point, not that the function has constant rate everywhere.\n\n## 7. Conceptual Model\nImagine travelling between two points. Your average speed over the trip is total distance divided by elapsed time. Under the theorem\u0027s conditions, your instantaneous speed matched that average at some moment.\n\n## 8. Related Terminology\n- **Secant line:** A line through two points on a graph.\n- **Tangent line:** A line representing local slope at a point.\n- **Rolle\u0027s Theorem:** The equal-endpoint special case of the Mean Value Theorem.\n- **Differentiability:** Existence of a derivative at a point or throughout an interval.\n- **Monotonicity:** Whether a function increases or decreases over an interval.\n\n## 9. Common Misconception\nThe theorem guarantees at least one suitable c, not a unique one. A function may have several points where its derivative equals the average slope.\n\n## 10. Precise Definition\n\u003e If f is continuous on [a,b] and differentiable on (a,b), then some c in (a,b) satisfies f\u0027(c)=(f(b)-f(a))/(b-a).\n\n## 11. Knowledge Check\n**Question:** Which conditions must be checked before applying the Mean Value Theorem?\n\n**Answer:** f must be continuous on the closed interval [a,b] and differentiable on the open interval (a,b).",
      },
      {
        id: "mth201-t4",
        title: "Taylor series",
        notes:
          "# Taylor series\n\n## 1. Definition\nA Taylor polynomial approximates a sufficiently differentiable function near a centre a using its derivatives at a. Its degree-n form is T_n(x)=sum from k=0 to n of f^(k)(a)(x-a)^k/k!. A Taylor series is the corresponding infinite power series; at a=0 it is called a Maclaurin series.\n\n## 2. Purpose and Significance\nTaylor polynomials replace a difficult function with a polynomial that is often easier to calculate and analyze near the centre. They support numerical approximation, local modeling, and the study of function behavior.\n\n## 3. Fundamental Components\nThe centre a determines where derivatives are evaluated. Higher derivatives supply successive coefficients. The remainder measures error after truncation. An infinite Taylor series represents the function only where it converges to that function; convergence radius and endpoints must be considered separately.\n\n## 4. Illustrative Example\nFor e^x about a=0, the first degree-three Maclaurin polynomial is 1+x+x^2/2+x^3/6. At x=0.1 it gives a nearby approximation to e^0.1; adding terms generally improves local accuracy, though the error should be bounded when precision matters.\n\n## 5. Counterexample or Common Error\nA function having derivatives of every order does not guarantee its Taylor series equals the function everywhere. A Taylor expansion is local, and equality depends on convergence and the function\u0027s behavior.\n\n## 6. Related Distinction\nA Taylor polynomial is a finite approximation; a Taylor series is an infinite sum. Taylor\u0027s theorem includes a remainder term that bounds the finite approximation error, while a convergent series describes a limiting process.\n\n## 7. Conceptual Model\nAt the centre, the polynomial matches the function\u0027s value, slope, curvature, and higher-order local behavior through its derivatives. Farther away, omitted higher-order terms can matter more.\n\n## 8. Related Terminology\n- **Centre:** The point a about which the expansion is formed.\n- **Maclaurin series:** A Taylor series centred at zero.\n- **Remainder:** The difference between the function and its finite Taylor polynomial.\n- **Radius of convergence:** Distance from the centre within which a power series converges.\n- **Truncation:** Replacing an infinite series with finitely many terms.\n\n## 9. Common Misconception\nMore terms do not make an approximation automatically reliable at every input. The input\u0027s distance from the centre and the remainder bound determine whether the approximation is adequate.\n\n## 10. Precise Definition\n\u003e A Taylor expansion expresses a function locally through a power series whose coefficients are determined by derivatives at a chosen centre, with a remainder describing finite-order error.\n\n## 11. Knowledge Check\n**Question:** What distinguishes a Maclaurin series from a general Taylor series?\n\n**Answer:** A Maclaurin series is centred at zero; a general Taylor series may be centred at any point a.",
      },
      {
        id: "mth201-t5",
        title: "Real-valued functions of two or more variables",
        notes:
          "# Real-valued functions of two or more variables\n\n## 1. Definition\nA real-valued function of n real variables maps each allowed input tuple in a domain D subset R^n to exactly one real output. For two variables we write f(x,y); for three, f(x,y,z).\n\n## 2. Purpose and Significance\nMany quantities depend on several independent inputs. Temperature may depend on location, while production may depend on labor and capital. Multivariable functions let calculus describe change and accumulation in such models.\n\n## 3. Fundamental Components\nThe domain is a region in the input plane or space; the range is the set of outputs. For two inputs, the graph z=f(x,y) is a surface. A level curve f(x,y)=k joins points with the same output. Domain restrictions arise from denominators, even roots, and logarithms just as in one-variable functions.\n\n## 4. Illustrative Example\nFor f(x,y)=sqrt(9-x^2-y^2), the radicand must be nonnegative, so the domain is the disk x^2+y^2\u003c=9. The graph is the upper hemisphere of radius 3, and its level curves are concentric circles.\n\n## 5. Counterexample or Common Error\nFor f(x,y)=x*y/(x-y), the input pairs with x=y are excluded because the denominator is zero. Treating the entire plane as the domain would include inputs for which the function has no value.\n\n## 6. Related Distinction\nThe graph of a function of two variables is generally a surface, while a level curve is a subset of the input plane where the output is fixed. A contour map shows level curves, not the full surface itself.\n\n## 7. Conceptual Model\nImagine a landscape: each ground location (x,y) has an elevation f(x,y). The domain is the map area, the graph is the terrain, and a contour line connects locations of equal elevation.\n\n## 8. Related Terminology\n- **Independent variable:** An input that may vary in the model.\n- **Domain:** Allowed input tuples.\n- **Range:** Output values attained.\n- **Level set:** Inputs giving a fixed output value.\n- **Surface:** The graph of a two-variable real function.\n- **Continuity:** Agreement of nearby values with the function\u0027s value at a point.\n\n## 9. Common Misconception\nA function of several variables still assigns one output to each allowed input tuple. Multiple inputs do not mean that a single input tuple can map to multiple outputs.\n\n## 10. Precise Definition\n\u003e A real-valued function of several real variables is a mapping from a subset of R^n to R that assigns exactly one real output to every input tuple in its domain.\n\n## 11. Knowledge Check\n**Question:** What condition restricts the domain of f(x,y)=ln(x-y)?\n\n**Answer:** The logarithm\u0027s argument must be positive, so x-y\u003e0, or equivalently x\u003ey.",
      },
      {
        id: "mth201-t6",
        title: "Partial derivatives",
        notes:
          "# Partial derivatives\n\n## 1. Definition\nA partial derivative measures how a multivariable function changes with respect to one input while the other inputs are held fixed. For f(x,y), f_x and f_y describe change along the coordinate directions.\n\n## 2. Purpose and Significance\nPartial derivatives quantify how a quantity responds to one factor when other factors are controlled. They are used in physical models, economics, optimization, tangent-plane approximations, and the multivariable chain rule.\n\n## 3. Fundamental Components\nThe partial derivative with respect to x is the limit of [f(x+h,y)-f(x,y)]/h as h approaches 0; for f_y, vary y and hold x fixed. Higher partial derivatives differentiate again. Under suitable continuity conditions, mixed partials f_xy and f_yx agree. The gradient collects first partials into a vector.\n\n## 4. Illustrative Example\nFor f(x,y)=x^2*y+3*x*y^2, hold y fixed to obtain f_x=2*x*y+3*y^2. Hold x fixed to obtain f_y=x^2+6*x*y. At (1,2), these are 16 and 13, respectively.\n\n## 5. Counterexample or Common Error\nWhen differentiating with respect to x, y is treated as a constant, not as another function of x. If y actually depends on x through a curve, the multivariable chain rule is needed to account for that dependence.\n\n## 6. Related Distinction\nA partial derivative measures change along one coordinate direction with other inputs fixed. A directional derivative measures change along a chosen direction, and the gradient can be used to calculate it by a dot product with that direction.\n\n## 7. Conceptual Model\nView the graph z=f(x,y) as a surface. Fixing y and varying x traces a curve across it; f_x is the slope of that trace at a point. Fixing x gives the corresponding y-direction slope.\n\n## 8. Related Terminology\n- **First partial:** Derivative with respect to one input.\n- **Mixed partial:** Derivative taken successively with respect to different inputs.\n- **Gradient:** Vector of first partial derivatives.\n- **Directional derivative:** Rate of change in a specified direction.\n- **Critical point:** A point where first derivatives vanish or fail to exist.\n\n## 9. Common Misconception\nA partial derivative is not the total change when several inputs vary together. It answers a controlled, one-coordinate-at-a-time question.\n\n## 10. Precise Definition\n\u003e The partial derivative of f with respect to one variable is the ordinary derivative obtained by varying that variable while holding all other independent variables fixed.\n\n## 11. Knowledge Check\n**Question:** When finding f_y(x,y), which variable is held constant?\n\n**Answer:** x is held constant while y varies.",
      },
      {
        id: "mth201-t7",
        title: "Chain rule, extrema, Lagrange multipliers",
        notes:
          "# Chain rule, extrema, Lagrange multipliers\n\n## 1. Definition\nThe multivariable chain rule differentiates a composite function by accounting for every dependency path between changing inputs and the final output. Extrema are maximum or minimum values. Lagrange multipliers locate candidates for extrema subject to an equality constraint.\n\n## 2. Purpose and Significance\nThese tools analyze how linked quantities change and where a function is largest or smallest. They apply to related rates, sensitivity analysis, resource allocation, and optimization under constraints such as a fixed budget or fixed production level.\n\n## 3. Fundamental Components\nIf z=f(x,y), where x=x(t) and y=y(t), then dz/dt=f_x*dx/dt+f_y*dy/dt. At an interior differentiable extremum, the gradient is zero. For a two-variable critical point, use D=f_xx*f_yy-(f_xy)^2: D\u003e0 with f_xx\u003e0 indicates a local minimum; D\u003e0 with f_xx\u003c0 a local maximum; D\u003c0 a saddle; D=0 is inconclusive. For g(x,y)=c, solve grad f=lambda*grad g together with the constraint, assuming a regular constraint point.\n\n## 4. Illustrative Example\nMaximize f(x,y)=x*y subject to x+y=10 with x,y positive. Set grad f=(y,x), grad g=(1,1), so y=lambda and x=lambda. Together with x+y=10, this gives x=y=5, the constrained maximum candidate with value 25.\n\n## 5. Counterexample or Common Error\nA point where grad f=0 is only a candidate, not automatically a maximum or minimum; it could be a saddle. Likewise, a Lagrange multiplier solution must be checked against other candidates and boundary behavior before claiming a global optimum.\n\n## 6. Related Distinction\nUnconstrained extrema are sought among points in the domain without an equality restriction. Constrained extrema must also satisfy the constraint; at a regular candidate, the objective and constraint gradients are parallel.\n\n## 7. Conceptual Model\nThe chain rule follows each route by which a change can travel to the output and adds the contributions. For constrained optimization, imagine sliding along the constraint curve: at an interior optimum, moving along that curve cannot give a first-order increase in the objective.\n\n## 8. Related Terminology\n- **Critical point:** Candidate point where first-order change may vanish.\n- **Hessian test:** Classification using second partial derivatives.\n- **Saddle point:** A point that increases in some directions and decreases in others.\n- **Constraint:** An equation restricting allowed inputs.\n- **Lagrange multiplier:** Scalar relating objective and constraint gradients at a candidate.\n- **Boundary candidate:** A possible extremum on the edge of a closed feasible region.\n\n## 9. Common Misconception\nThe equation grad f=lambda*grad g does not by itself certify a global maximum or minimum. It produces candidates under regularity assumptions; compare their values and check boundaries where applicable.\n\n## 10. Precise Definition\n\u003e The multivariable chain rule composes derivatives along dependencies; the Lagrange multiplier method finds regular constrained-extremum candidates by requiring the objective gradient to be parallel to the constraint gradient.\n\n## 11. Knowledge Check\n**Question:** What additional equation must be used with grad f=lambda*grad g for a constraint g(x,y)=c?\n\n**Answer:** The constraint itself, g(x,y)=c, and candidate solutions must then be checked and compared.",
      },
      {
        id: "mth201-t8",
        title: "Differentials and linear approximations",
        notes:
          "# Differentials and linear approximations\n\n## 1. Definition\nA differential estimates the change in a function caused by small changes in its inputs. A linear approximation uses the tangent line or tangent plane near a known point to estimate nearby function values.\n\n## 2. Purpose and Significance\nLinearization gives quick estimates without evaluating a complicated function exactly. Differentials also estimate how measurement uncertainty in inputs can affect a result, which is useful in physical measurement, engineering, and numerical computation.\n\n## 3. Fundamental Components\nFor y=f(x), dy=f\u0027(a)dx and f(a+dx) is approximated by f(a)+f\u0027(a)dx. For z=f(x,y), dz=f_x dx+f_y dy, and near (a,b), f(a+dx,b+dy) is approximated by f(a,b)+f_x(a,b)dx+f_y(a,b)dy. The neglected terms are higher order and control the approximation error.\n\n## 4. Illustrative Example\nFor f(x,y)=x*y near (2,3), f(2,3)=6, f_x=3, and f_y=2. With dx=0.1 and dy=-0.05, dz=3(0.1)+2(-0.05)=0.2, so the linear estimate is f(2.1,2.95) approximately 6.2.\n\n## 5. Counterexample or Common Error\nA tangent-plane estimate is local, not an exact formula for distant inputs. For a large change, higher-order terms may be significant and the linear approximation can be poor.\n\n## 6. Related Distinction\nThe total differential dz is a linear estimate of change, while the actual finite change is f(x+dx,y+dy)-f(x,y). They are close for sufficiently small increments near a differentiable point, but are not generally identical.\n\n## 7. Conceptual Model\nA smooth curve or surface looks nearly flat when viewed close to a point. The tangent line or plane is the local flat model; differentials calculate how far that model predicts the output will move for small input changes.\n\n## 8. Related Terminology\n- **Increment:** A finite change in an input, such as dx.\n- **Differential:** A first-order predicted change.\n- **Linearization:** The tangent-line or tangent-plane approximation.\n- **Total differential:** Sum of first-order changes from all independent inputs.\n- **Error propagation:** Estimating output uncertainty from input uncertainty.\n\n## 9. Common Misconception\nThe differential is not automatically the exact change. It is a first-order approximation whose accuracy depends on the input change being small and the function behaving smoothly nearby.\n\n## 10. Precise Definition\n\u003e The total differential is the linear part of a differentiable function\u0027s local change, formed by summing each partial derivative multiplied by its corresponding input increment.\n\n## 11. Knowledge Check\n**Question:** For z=f(x,y), what first-order estimate does dz provide?\n\n**Answer:** dz=f_x dx+f_y dy, evaluated at the point of approximation, estimates the change in z caused by small changes dx and dy.",
      },
      {
        id: "mth201-t9",
        title: "Evaluation of line and multiple integrals",
        notes:
          "# Evaluation of line and multiple integrals\n\n## 1. Definition\nA line integral accumulates a scalar or vector quantity along a curve. A multiple integral accumulates a function over a region in two or more dimensions, generalizing definite integration from intervals to areas and volumes.\n\n## 2. Purpose and Significance\nThese integrals compute quantities distributed along paths or across regions, including work, mass, area, volume, and total density. They connect geometric domains with accumulated physical or mathematical quantities.\n\n## 3. Fundamental Components\nFor a parametrized curve r(t), a scalar line integral is integral f(r(t))*|r\u0027(t)| dt; a vector line integral is integral F(r(t)) dot r\u0027(t) dt and depends on orientation. A double integral uses bounds describing a plane region; a triple integral describes a volume. Changing coordinates requires the appropriate Jacobian factor, such as r in polar area integration.\n\n## 4. Illustrative Example\nLet C be the segment r(t)=(t,0), 0\u003c=t\u003c=1, and let f(x,y)=x. Since |r\u0027(t)|=1, the scalar line integral of f along C is integral from 0 to 1 of t dt=1/2.\n\n## 5. Counterexample or Common Error\nFor a scalar line integral, omitting |r\u0027(t)| changes the arc-length element and gives the wrong result unless the parametrization has unit speed. For a vector line integral, reversing the path orientation changes the sign.\n\n## 6. Related Distinction\nA scalar line integral accumulates values with respect to arc length; a vector line integral accumulates a field\u0027s component along the direction of travel. A double integral accumulates over area rather than along a curve.\n\n## 7. Conceptual Model\nBreak a curve or region into tiny pieces. Evaluate the quantity contributed by each small piece, multiply by its length, area, or volume element, and add the contributions through integration.\n\n## 8. Related Terminology\n- **Parametrization:** A rule describing points on a curve using a parameter.\n- **Arc-length element:** The small path length ds.\n- **Orientation:** The direction in which a curve is traversed.\n- **Iterated integral:** Multiple integration performed one variable at a time.\n- **Jacobian:** Factor adjusting area or volume under a coordinate transformation.\n- **Region of integration:** The curve, area, or volume over which accumulation occurs.\n\n## 9. Common Misconception\nChanging the order of integration does not mean changing the region or the quantity being accumulated. Bounds must still describe the same region, and changing coordinate systems requires the correct Jacobian.\n\n## 10. Precise Definition\n\u003e A line or multiple integral is the limit of sums of local contributions along a curve or over a higher-dimensional region, evaluated using the correct geometric element and bounds.\n\n## 11. Knowledge Check\n**Question:** What factor converts a polar-coordinate area element from dr d(theta) to the correct dA?\n\n**Answer:** The Jacobian factor r, so dA=r dr d(theta).",
      },
    ],
  },
  {
    id: "ENT211",
    title: "Entrepreneurship Studies",
    description:
      "Business opportunity spotting, planning, and startup fundamentals.",
    topics: [
      {
        id: "ent211-t1",
        title: "Introduction to Entrepreneurship",
        notes: "# Introduction to Entrepreneurship\n\n## 1. Definition\nEntrepreneurship is the process of identifying an opportunity, organizing resources, and creating value through a new or improved venture. It includes starting an independent business and innovating within an existing organization, often called intrapreneurship.\n\n## 2. Purpose and Significance\nEntrepreneurship can address unmet needs, create livelihoods and employment, and introduce useful products or services. In Nigeria, ventures may respond to local challenges such as food storage, transport, digital payments, or reliable power, while adapting to uncertainty and limited resources.\n\n## 3. Fundamental Components\nThe process involves recognizing a real need, developing a feasible solution, testing whether customers value it, mobilizing people and finance, managing risk, and learning from results. Innovation can mean a new product, a better process, or a new way to deliver existing value.\n\n## 4. Illustrative Example\nA small food processor notices that nearby farmers lose part of a seasonal harvest because buyers cannot purchase it quickly. The entrepreneur interviews farmers and retailers, tests a small-batch dried product, calculates storage and transport costs, and adjusts the offer based on customer response.\n\n## 5. Counterexample or Common Error\nA creative idea is not automatically a viable opportunity. If customers do not need the solution, cannot access it, or will not support its cost, enthusiasm alone cannot make the venture sustainable.\n\n## 6. Related Distinction\nEntrepreneurship creates or develops a venture; intrapreneurship pursues innovation within an existing organization using its resources and structures. Both involve opportunity seeking, but ownership, available resources, and personal financial exposure differ.\n\n## 7. Conceptual Model\nTreat entrepreneurship as a cycle: observe a problem, form a value proposition, test the riskiest assumptions, organize resources, deliver a solution, and learn from evidence. Progress comes from reducing uncertainty, not merely writing a business idea.\n\n## 8. Related Terminology\n- **Opportunity recognition:** Identifying a need that may support a solution.\n- **Value proposition:** The benefit offered to a target customer.\n- **Intrapreneurship:** Innovation within an existing organization.\n- **Risk:** Uncertainty that may affect outcomes.\n- **Venture:** An organized effort to deliver a product or service.\n- **Innovation:** A new or improved way to create or deliver value.\n\n## 9. Common Misconception\nEntrepreneurs are not simply people who take reckless risks. Effective entrepreneurs identify important uncertainties, gather evidence, and make informed decisions about which risks to accept.\n\n## 10. Precise Definition\n\u003e Entrepreneurship is the organized pursuit of an opportunity to create value by mobilizing resources, testing assumptions, and managing uncertainty.\n\n## 11. Knowledge Check\n**Question:** What evidence would help distinguish a promising business opportunity from an interesting idea?\n\n**Answer:** Evidence that a real group experiences the problem, values the proposed solution, can access it, and can support a sustainable way of delivering it.",
      },
      {
        id: "ent211-t2",
        title: "The Nigerian Business Environment",
        notes: "# The Nigerian Business Environment\n\n## 1. Definition\nThe business environment is the set of internal and external conditions that influence an organization\u0027s decisions and performance. Internal conditions include resources and skills; external conditions include economic, social, technological, legal, political, and environmental factors.\n\n## 2. Purpose and Significance\nUnderstanding the environment helps entrepreneurs assess risk, choose realistic strategies, and adapt operations. Factors such as transport access, energy reliability, customer income, digital connectivity, inflation, and regulation can affect costs and demand differently across Nigerian regions and industries.\n\n## 3. Fundamental Components\nInternal analysis considers people, finance, equipment, processes, and organizational culture. External analysis examines customers, competitors, suppliers, infrastructure, public policy, economic conditions, technology, and social or environmental change. The importance of each factor depends on the venture and location.\n\n## 4. Illustrative Example\nA small cold-chain business serving food sellers might examine electricity reliability, fuel or backup-power costs, road access, refrigeration maintenance, customer purchasing patterns, and local food-handling requirements. The analysis helps decide where to operate and how to price service.\n\n## 5. Counterexample or Common Error\nPlanning with a single national assumption can hide important local differences. Customer access, infrastructure, regulations, and costs may vary by state, city, sector, and time; assumptions should be checked where the venture will actually operate.\n\n## 6. Related Distinction\nThe internal environment includes factors the organization can influence directly, such as staffing or procedures. The external environment includes conditions it usually cannot control, such as exchange-rate movements or public infrastructure, but it can still monitor and respond to them.\n\n## 7. Conceptual Model\nUse environmental scanning as a recurring feedback loop: observe changes, decide which ones matter to the venture, estimate their effect, adapt a decision, and monitor what happens. A list of trends is useful only when connected to choices.\n\n## 8. Related Terminology\n- **PESTLE:** Political, economic, social, technological, legal, and environmental factors.\n- **Stakeholder:** A person or group affected by or able to affect a venture.\n- **Infrastructure:** Systems such as power, transport, and communications.\n- **Competitive environment:** Customers, rivals, substitutes, and suppliers.\n- **Assumption:** A belief used in planning that needs evidence.\n- **Adaptation:** A change made in response to conditions or feedback.\n\n## 9. Common Misconception\nExternal challenges do not affect every business in the same way. Their impact depends on the venture\u0027s customers, location, resources, and operating model, so analysis must be specific rather than generic.\n\n## 10. Precise Definition\n\u003e The business environment is the combination of internal capabilities and external conditions that shape a venture\u0027s choices, constraints, opportunities, and results.\n\n## 11. Knowledge Check\n**Question:** Is unstable electricity an internal or external factor for a small food processor, and what can the business do about it?\n\n**Answer:** Electricity reliability is an external condition. The business cannot control the grid, but it can assess alternatives such as operating hours, backup options, equipment efficiency, or a different location.",
      },
      {
        id: "ent211-t3",
        title: "Identifying Business Opportunities",
        notes: "# Identifying Business Opportunities\n\n## 1. Definition\nA business opportunity is a situation in which a defined group has a meaningful need and a venture can deliver a solution that customers value in a sustainable way. A useful first test asks whether the need exists, whether the solution can be delivered, and whether the economics can work.\n\n## 2. Purpose and Significance\nCareful opportunity identification reduces the chance of investing heavily in an unwanted product. It helps entrepreneurs focus on customer problems, gather evidence, and choose which ideas deserve further testing.\n\n## 3. Fundamental Components\nIdentify a target customer, describe the problem in the customer\u0027s terms, learn how it is currently handled, propose a solution, and test demand and feasibility. Evidence may come from observation, interviews, prototypes, pre-orders, or small pilots; stated interest alone is weaker than observed behavior.\n\n## 4. Illustrative Example\nStudents near a campus report difficulty getting affordable meals after evening classes. An entrepreneur interviews students and food vendors, tests a limited delivery window with a small group, tracks repeat orders and delivery costs, and improves the service before expanding.\n\n## 5. Counterexample or Common Error\nAssuming that friends\u0027 compliments prove demand is weak evidence. People may praise an idea without paying for it or using it regularly. Test actual behavior and willingness to pay with a realistic offer.\n\n## 6. Related Distinction\nAn idea is a possible solution; an opportunity has evidence of a real need, a reachable customer group, and a plausible way to create value. Feasibility asks whether the solution can be delivered; viability asks whether it can be sustained economically.\n\n## 7. Conceptual Model\nTreat opportunity discovery as a set of hypotheses: who has the problem, how often it occurs, what they use now, and what improvement they would value. Test the riskiest assumption cheaply, learn, and revise the offer.\n\n## 8. Related Terminology\n- **Target market:** The group a venture aims to serve.\n- **Customer discovery:** Learning about customers and their needs.\n- **Pain point:** A problem or frustration experienced by a customer.\n- **Prototype:** An early version used to test an idea.\n- **Minimum viable product:** A limited offer used to learn from initial customers.\n- **Willingness to pay:** The amount or commitment customers show for a solution.\n\n## 9. Common Misconception\nA large population does not automatically mean a large reachable market. A venture must identify the specific customers it can serve, how to reach them, and whether enough of them value the offer.\n\n## 10. Precise Definition\n\u003e A business opportunity is an evidence-supported customer need that a venture can address with a deliverable and potentially sustainable value proposition.\n\n## 11. Knowledge Check\n**Question:** Why is a small pilot often more useful than immediately launching a full service?\n\n**Answer:** A pilot tests demand, delivery, and cost assumptions with limited resources, allowing the entrepreneur to learn and adjust before scaling.",
      },
      {
        id: "ent211-t4",
        title: "Feasibility Studies and Business Planning",
        notes: "# Feasibility Studies and Business Planning\n\n## 1. Definition\nA feasibility study evaluates whether a proposed venture or project is practical and worth pursuing. A business plan documents how the venture intends to create and deliver value, organize operations, reach customers, and manage finances.\n\n## 2. Purpose and Significance\nFeasibility analysis reduces uncertainty before major commitments of money and time. A plan turns findings into coordinated action and communication for founders, staff, lenders, partners, or investors.\n\n## 3. Fundamental Components\nAssess market feasibility (customers and competition), technical feasibility (technology and skills), operational feasibility (suppliers, processes, and infrastructure), legal requirements, and financial feasibility (costs, revenue, funding, and cash flow). A plan commonly describes the offer, market, operations, team, risks, and financial assumptions.\n\n## 4. Illustrative Example\nBefore opening a small poultry operation, an entrepreneur estimates demand and selling channels, feed and equipment costs, reliable water and power needs, veterinary support, permits, staffing, and working capital. The analysis can reveal which assumptions need a pilot or a revised scale.\n\n## 5. Counterexample or Common Error\nA detailed business plan cannot make an untested assumption true. Projected sales without evidence of customer demand, or budgets that ignore operating costs, can create a polished but misleading document.\n\n## 6. Related Distinction\nA feasibility study asks whether the proposal should proceed and under what conditions. A business plan explains how it will proceed. Feasibility findings should inform the plan rather than being replaced by optimistic projections.\n\n## 7. Conceptual Model\nMove from assumptions to evidence, from evidence to a decision, and from the decision to an operating plan. Revisit the plan as market feedback, costs, and external conditions change.\n\n## 8. Related Terminology\n- **Market feasibility:** Evidence that customers and demand exist.\n- **Technical feasibility:** Whether the solution can be built or supplied.\n- **Operational feasibility:** Whether the venture can deliver reliably.\n- **Cash flow:** Timing of money received and paid.\n- **Break-even point:** Activity level where revenue equals total costs.\n- **Business plan:** A written model and roadmap for the venture.\n\n## 9. Common Misconception\nA business plan is not a guarantee of success or a fixed document that should never change. Its value depends on realistic assumptions, evidence, and regular revision.\n\n## 10. Precise Definition\n\u003e A feasibility study tests whether a proposal is workable and worthwhile; a business plan translates a supported proposal into an organized operating and financial roadmap.\n\n## 11. Knowledge Check\n**Question:** How does market feasibility differ from financial feasibility?\n\n**Answer:** Market feasibility tests customer demand and access; financial feasibility tests whether projected income, costs, funding, and cash timing can support the venture.",
      },
      {
        id: "ent211-t5",
        title: "Financing a Startup",
        notes: "# Financing a Startup\n\n## 1. Definition\nStartup financing is the process of obtaining and managing money needed to establish and operate a venture. Funding may come from founders, customers, lenders, investors, grants, or other sources, each with different costs, risks, and conditions.\n\n## 2. Purpose and Significance\nA venture needs funds for setup, inventory, equipment, staffing, marketing, and ongoing expenses. Matching the funding source to the venture\u0027s stage and cash needs can reduce financial pressure and avoid unsuitable obligations.\n\n## 3. Fundamental Components\nEstimate startup and operating costs, identify timing of cash needs, compare funding sources, and plan repayment or ownership consequences. Personal savings and customer revenue preserve ownership but may be limited; loans require repayment; equity funding shares ownership; grants may have eligibility and reporting conditions. Track revenue, costs, profit, and cash flow separately.\n\n## 4. Illustrative Example\nA small tailoring business estimates machine, rent, fabric, transport, and initial marketing costs. It compares buying a machine with savings, renting equipment, or borrowing, then checks expected orders and cash timing to see whether it can meet monthly costs and any repayments.\n\n## 5. Counterexample or Common Error\nA business can report sales and still run out of cash if customers pay late while rent, wages, or suppliers must be paid now. Revenue is not the same as profit, and profit on paper does not guarantee available cash.\n\n## 6. Related Distinction\nDebt provides capital that must be repaid under agreed terms; equity exchanges part ownership for investment. Revenue is money earned from sales, profit is revenue minus costs under an accounting measure, and cash flow tracks actual cash entering and leaving over time.\n\n## 7. Conceptual Model\nThink of startup finance as matching money to timing and risk. Estimate how much is needed, when it is needed, how it will be used, and what the source requires in return. Monitor actual cash movement against the plan.\n\n## 8. Related Terminology\n- **Startup cost:** One-time expense required to begin operations.\n- **Operating cost:** Repeated expense of running the venture.\n- **Working capital:** Funds available for day-to-day operations.\n- **Debt:** Borrowed money that must be repaid.\n- **Equity:** Ownership interest exchanged for investment.\n- **Cash-flow forecast:** Estimate of future cash receipts and payments.\n\n## 9. Common Misconception\nTaking the largest available loan is not necessarily the best financing decision. The amount, repayment schedule, cost, collateral, and reliability of expected cash flow all matter.\n\n## 10. Precise Definition\n\u003e Startup financing is the deliberate selection and management of capital sources to meet a venture\u0027s costs and timing needs while accounting for repayment, ownership, and risk.\n\n## 11. Knowledge Check\n**Question:** A startup has positive sales but cannot pay a supplier because customers have not paid their invoices. What financial concept explains the problem?\n\n**Answer:** Cash flow. Sales create revenue, but the timing of customer payments may not match the timing of expenses.",
      },
      {
        id: "ent211-t6",
        title: "Ethics and Social Responsibility",
        notes: "# Ethics and Social Responsibility\n\n## 1. Definition\nBusiness ethics is the application of principles such as honesty, fairness, respect, and accountability to business decisions. Social responsibility concerns how a business\u0027s actions affect workers, customers, communities, and the environment.\n\n## 2. Purpose and Significance\nEthical conduct protects people from avoidable harm and supports trust among customers, workers, suppliers, and communities. Responsible practices can also reduce disputes, reputational damage, and operational risk over time.\n\n## 3. Fundamental Components\nConsider stakeholders, truthful communication, fair pricing, safe working conditions, privacy, responsible use of resources, and compliance with applicable rules. When interests conflict, identify likely harms, obligations, and alternatives, then document the reasoning and decision.\n\n## 4. Illustrative Example\nA delivery company collects customer phone numbers and locations to complete orders. Responsible practice is to explain why the information is collected, restrict access, protect it, use it only for appropriate purposes, and avoid retaining it longer than needed.\n\n## 5. Counterexample or Common Error\nAdvertising a product with benefits the business cannot substantiate may increase short-term sales but misleads customers and damages trust. Claims should be accurate, understandable, and supported by evidence.\n\n## 6. Related Distinction\nLegal compliance sets minimum obligations; ethical judgment can require care beyond the minimum, such as being transparent or avoiding exploitative practices. Social responsibility considers broader impacts, while business ethics applies to individual decisions and relationships as well.\n\n## 7. Conceptual Model\nFor a difficult decision, identify who is affected, what duties and interests apply, what harms each option may cause, and whether a less harmful alternative exists. Review the outcome and take responsibility for correcting mistakes.\n\n## 8. Related Terminology\n- **Stakeholder:** A person or group affected by a business decision.\n- **Transparency:** Communicating relevant information clearly and honestly.\n- **Privacy:** Respecting appropriate control over personal information.\n- **Fair labor:** Treatment that respects workers\u0027 rights and safety.\n- **Corporate social responsibility:** Attention to a business\u0027s wider social and environmental effects.\n- **Accountability:** Taking responsibility for decisions and consequences.\n\n## 9. Common Misconception\nEthics and social responsibility are not limited to donations or public relations. They also concern daily choices about product safety, data, pricing, working conditions, and truthful communication.\n\n## 10. Precise Definition\n\u003e Business ethics guides decisions and conduct using moral principles; social responsibility evaluates and addresses the effects a business has on people and the wider environment.\n\n## 11. Knowledge Check\n**Question:** Why should a business explain how it uses customer location data?\n\n**Answer:** Transparency helps customers understand the purpose and supports responsible, limited handling of their personal information.",
      },
    ],
  },
  {
    id: "CSC299",
    title: "Industrial Training (SIWES)",
    description: "Applied learning and real-world technology practice.",
    topics: [
      {
        id: "csc299-t1",
        title: "Practical exposure to computing environments",
        notes:
          "# Practical exposure to computing environments\n\n## 1. Definition\nPractical exposure to computing environments is supervised experience working with real or realistic computing systems, tools, processes, and teams. SIWES connects classroom learning with workplace practice through assigned duties, observation, and documented reflection.\n\n## 2. Purpose and Significance\nThe placement helps students understand how technical work is organized, apply concepts to real tasks, develop professional habits, and identify skills to strengthen. It also introduces workplace expectations such as communication, safety, confidentiality, and collaboration.\n\n## 3. Fundamental Components\nA useful placement includes agreed learning objectives, an appropriate host organization, supervision, meaningful technical activities, a log of work, feedback, and a final report or presentation. Activities may include software testing, help-desk support, network operations, data handling, or equipment maintenance, depending on the placement.\n\n## 4. Illustrative Example\nA student assigned to an IT support unit records a recurring printer fault, asks the supervisor about approved diagnostic steps, checks connections and queue status, documents the resolution, and explains what the incident taught them about troubleshooting and user support.\n\n## 5. Counterexample or Common Error\nSimply being present at a workplace does not demonstrate learning. A placement record that lists attendance but gives no tasks, observations, evidence, or reflection makes it difficult to show how classroom knowledge was applied.\n\n## 6. Related Distinction\nObservation helps a student understand a process; supervised practice involves carrying out an approved task; independent work requires authorization and appropriate competence. Students should not exceed their role or access systems without permission.\n\n## 7. Conceptual Model\nTreat SIWES as a learning cycle: agree on objectives, observe and perform suitable work, record evidence, seek feedback, reflect on learning, and connect experience to coursework.\n\n## 8. Related Terminology\n- **Host organization:** Workplace providing the placement.\n- **Supervisor:** Person guiding and reviewing the student\u0027s work.\n- **Logbook:** Record of activities, dates, and learning.\n- **Learning objective:** A skill or understanding the placement aims to develop.\n- **Evidence:** A verifiable record supporting a report of work.\n- **Reflection:** Analysis of what was learned and what should improve.\n\n## 9. Common Misconception\nIndustrial training is not only a period of employment or observation. It is a structured learning experience that should connect activities to stated objectives and be supported by accurate evidence.\n\n## 10. Precise Definition\n\u003e SIWES practical exposure is supervised, documented workplace learning through which a student applies academic knowledge and develops relevant technical and professional skills.\n\n## 11. Knowledge Check\n**Question:** What should a student record after completing an assigned technical task?\n\n**Answer:** The task and date, approved steps taken, outcome or evidence, relevant learning, and any follow-up, while respecting confidentiality and supervisor guidance.",
      },
      {
        id: "csc299-t2",
        title: "Software development practices",
        notes: "# Software development practices\n\n## 1. Definition\nSoftware development practices are the methods teams use to plan, design, build, test, release, and maintain software. They include process models as well as day-to-day techniques for collaboration and quality.\n\n## 2. Purpose and Significance\nA consistent development process helps teams deliver software that meets requirements, works reliably, and can be maintained. Practices such as version control, code review, testing, and documentation reduce avoidable defects and make teamwork more effective.\n\n## 3. Fundamental Components\nThe software development lifecycle commonly includes requirements, analysis, design, implementation, testing, deployment, and maintenance. Waterfall organizes work into sequential phases; Agile organizes it into iterative increments with frequent feedback. Git tracks versions; reviews examine changes; unit, integration, and regression tests check behavior.\n\n## 4. Illustrative Example\nFor a student registration feature, a team clarifies requirements, designs the data flow, implements a small change on a branch, reviews the code, runs relevant tests, merges the approved change, and records how to deploy or maintain it.\n\n## 5. Counterexample or Common Error\nMaking an unreviewed change directly in a shared production branch without tests can introduce defects that affect users and be difficult to trace. A passing test suite also cannot prove every possible case is correct; tests must be chosen to match risks and requirements.\n\n## 6. Related Distinction\nWaterfall emphasizes ordered phases and is suited to stable, well-understood requirements; Agile emphasizes short cycles and adapts through feedback. Neither label guarantees quality: requirements, communication, testing, and disciplined implementation still matter.\n\n## 7. Conceptual Model\nView development as a feedback loop: understand a need, make a small change, check its behavior, learn from review or user feedback, and improve the product. Version history preserves what changed and why.\n\n## 8. Related Terminology\n- **Requirement:** A needed behavior or constraint.\n- **Version control:** Tracking and coordinating changes to files.\n- **Branch:** An isolated line of development.\n- **Code review:** Examination of a proposed change by others.\n- **Unit/integration test:** Check of an individual component or connected components.\n- **Deployment:** Releasing software into a target environment.\n\n## 9. Common Misconception\nAgile does not mean having no plan or documentation. It means adapting plans through short cycles and evidence while retaining enough documentation and testing to support reliable work.\n\n## 10. Precise Definition\n\u003e Software development practices are repeatable methods for collaboratively transforming requirements into tested, deployable, and maintainable software.\n\n## 11. Knowledge Check\n**Question:** Why run regression tests after changing a feature?\n\n**Answer:** To check that the change has not unintentionally broken behavior that previously worked.",
      },
      {
        id: "csc299-t3",
        title: "Hardware maintenance and troubleshooting",
        notes: "# Hardware maintenance and troubleshooting\n\n## 1. Definition\nHardware maintenance is the care and servicing of physical computer components to keep them operating safely and reliably. Troubleshooting is a systematic process for identifying a fault, testing likely causes, and confirming a repair.\n\n## 2. Purpose and Significance\nReliable hardware supports computing services and protects equipment and data. A disciplined approach reduces downtime, avoids unnecessary replacements, and limits risks such as electrical damage, data loss, or harm to people.\n\n## 3. Fundamental Components\nA computer may include a CPU, RAM, storage, motherboard, power supply, cooling system, display, and input/output devices. Safe troubleshooting begins with symptoms and context, checks simple causes first, isolates components, uses approved diagnostic tools, records findings, and verifies operation after a fix. Follow site procedures for power isolation and electrostatic-discharge protection.\n\n## 4. Illustrative Example\nIf a desktop will not start, first record the symptoms and recent changes. Check the power source, cable, and visible indicators; follow the organization\u0027s safety procedure before opening the case; then test components systematically with approved methods and document the confirmed cause.\n\n## 5. Counterexample or Common Error\nReplacing several components at once without recording tests makes it hard to identify the actual fault and can create new problems. Opening energized equipment or handling components without required precautions can also cause injury or damage.\n\n## 6. Related Distinction\nPreventive maintenance is scheduled care intended to reduce failures; corrective maintenance responds to a fault. Diagnosis gathers evidence about the cause; repair changes or replaces a component; verification checks that the system now works as expected.\n\n## 7. Conceptual Model\nUse a controlled loop: observe, record, form a testable hypothesis, change or test one factor, compare the result with the symptom, and verify the final system. Change one variable at a time whenever practical.\n\n## 8. Related Terminology\n- **Symptom:** Observable sign of a fault.\n- **Diagnosis:** Evidence-based identification of a cause.\n- **Preventive maintenance:** Scheduled work to reduce failure likelihood.\n- **Electrostatic discharge:** Sudden static transfer that can damage components.\n- **Component isolation:** Testing a part separately from suspected causes.\n- **Verification:** Confirming the repair resolved the reported issue.\n\n## 9. Common Misconception\nA computer that powers on is not necessarily healthy. It may still have intermittent faults, overheating, storage errors, or unstable performance, so verification should match the original symptom.\n\n## 10. Precise Definition\n\u003e Hardware troubleshooting is a safety-conscious, evidence-based process for locating a hardware fault, correcting it appropriately, and confirming reliable operation.\n\n## 11. Knowledge Check\n**Question:** Why should a technician record symptoms and test one likely cause at a time?\n\n**Answer:** A clear record preserves evidence, while controlled tests help identify the true cause and avoid unnecessary changes.",
      },
      {
        id: "csc299-t4",
        title: "Networking basics",
        notes: "# Networking basics\n\n## 1. Definition\nA computer network is a set of connected devices that exchange data and share services through communication links and agreed protocols. Networking basics describe how devices are identified, connected, and able to communicate.\n\n## 2. Purpose and Significance\nNetworks support internet access, messaging, shared files, printers, and organizational systems. Understanding their components helps IT staff configure access, diagnose connectivity problems, and protect systems from unauthorized use.\n\n## 3. Fundamental Components\nA network includes end devices, network interfaces, wired or wireless links, switches, routers, and protocols. LANs connect devices in a limited area; WANs span larger areas. IP addresses identify network interfaces for communication. Client-server systems separate service requesters from service providers.\n\n## 4. Illustrative Example\nA laptop accessing a campus web service connects through Wi-Fi to an access point, then through network equipment and a router to the server. Addressing and protocols let the request reach the correct service and allow a response to return.\n\n## 5. Counterexample or Common Error\nBeing connected to Wi-Fi does not prove internet or server access is working. The wireless link may be active while address configuration, name resolution, routing, or the remote service has a fault.\n\n## 6. Related Distinction\nA switch connects devices within a local network; a router forwards traffic between networks. A private IP address is used within a local network, while public addressing supports communication across the wider internet, usually through an organization\u0027s network services.\n\n## 7. Conceptual Model\nThink of network communication like delivering a letter: the data is divided into addressed messages, devices forward them along a path, and protocols define how endpoints interpret and respond to them.\n\n## 8. Related Terminology\n- **LAN/WAN:** Local-area and wide-area networks.\n- **IP address:** Logical address used to identify a network interface.\n- **Switch:** Connects devices within a local network.\n- **Router:** Forwards packets between networks.\n- **Protocol:** Rules governing communication.\n- **DNS:** Service that maps domain names to network addresses.\n\n## 9. Common Misconception\nA network problem is not always a faulty cable or Wi-Fi signal. Name resolution, addressing, permissions, routing, server health, and application configuration can also prevent access.\n\n## 10. Precise Definition\n\u003e A computer network is an interconnected system of devices and communication links that exchange information using shared addressing and protocol rules.\n\n## 11. Knowledge Check\n**Question:** If a laptop is connected to Wi-Fi but cannot open a website, what should be checked besides the wireless connection?\n\n**Answer:** Check address configuration, DNS/name resolution, routing or internet access, permissions, and whether the website\u0027s server is reachable.",
      },
      {
        id: "csc299-t5",
        title: "Documentation and reporting",
        notes: "# Documentation and reporting\n\n## 1. Definition\nTechnical documentation records how a system, process, or task works. Reporting communicates activities, evidence, results, and learning to a defined audience, such as a supervisor or SIWES assessor.\n\n## 2. Purpose and Significance\nClear records support knowledge transfer, maintenance, audits, troubleshooting, and accountability. A well-supported report lets another person understand what was done, why it was done, what happened, and what remains unresolved.\n\n## 3. Fundamental Components\nDocumentation may include system descriptions, procedures, configuration records, user guides, test results, and incident logs. A work report typically identifies objectives, activities, methods, evidence, outcomes, challenges, and conclusions. Good records are accurate, dated, organized, relevant, and respectful of confidentiality.\n\n## 4. Illustrative Example\nAfter resolving a network connectivity incident, a trainee records the reported symptom, checks performed, relevant non-sensitive observations, confirmed cause, approved fix, verification result, and any recommendation for follow-up.\n\n## 5. Counterexample or Common Error\nA report that says only “network fixed” does not explain the original issue, evidence, or steps taken. Including passwords, personal data, or confidential system details without authorization is also inappropriate.\n\n## 6. Related Distinction\nDocumentation is an ongoing record used by people who operate or maintain a system. A report is usually a focused communication about a task, period, or investigation. A logbook records dated activity; a final report synthesizes evidence and learning across work.\n\n## 7. Conceptual Model\nWrite for the next person who needs to act. State context, record verifiable facts, explain steps in order, distinguish observation from interpretation, and make the result or next action easy to find.\n\n## 8. Related Terminology\n- **Logbook:** Dated record of activities and learning.\n- **Procedure:** Ordered instructions for performing a task.\n- **Incident report:** Record of an unexpected event and response.\n- **Evidence:** Verifiable material supporting a conclusion.\n- **Version history:** Record of changes to a document or system.\n- **Confidentiality:** Restricting sensitive information to authorized use.\n\n## 9. Common Misconception\nDocumentation is not merely paperwork completed after technical work. It is part of reliable work: recording decisions and results while they are fresh can prevent repeated effort and unsafe guesswork.\n\n## 10. Precise Definition\n\u003e Technical documentation and reporting are structured records that preserve accurate system or task information and communicate evidence, outcomes, and required follow-up.\n\n## 11. Knowledge Check\n**Question:** What details make a troubleshooting report useful to the next technician?\n\n**Answer:** The symptoms, context, tests performed, evidence, confirmed cause, authorized fix, verification result, and unresolved follow-up, while excluding unauthorized sensitive information.",
      },
      {
        id: "csc299-t6",
        title: "Professional ethics in IT",
        notes: "# Professional ethics in IT\n\n## 1. Definition\nProfessional ethics in IT is the application of moral principles and professional responsibilities when developing, operating, or supporting information systems. It concerns how technical decisions affect users, employers, colleagues, and the public.\n\n## 2. Purpose and Significance\nIT professionals can access sensitive information and systems that many people depend on. Ethical practice protects privacy, security, safety, intellectual property, and public trust, while helping professionals handle conflicts responsibly.\n\n## 3. Fundamental Components\nImportant duties include confidentiality, privacy, security, honesty, competence, respect for intellectual property, fair treatment, and responsible disclosure. Apply least privilege, follow organizational rules, obtain authorization, document significant decisions, and escalate risks through approved channels.\n\n## 4. Illustrative Example\nA trainee discovers that a shared folder exposes student records to people who do not need access. The trainee avoids copying or sharing the records, records only the minimum necessary details, and reports the issue promptly to the authorized supervisor or security contact.\n\n## 5. Counterexample or Common Error\nUsing another person\u0027s credentials to “quickly fix” a system without permission violates access controls and obscures accountability. Good intentions do not replace authorization or established incident procedures.\n\n## 6. Related Distinction\nLegal rules establish formal obligations; professional ethics also guides conduct where rules are incomplete or a choice has wider consequences. Confidentiality protects information from unauthorized disclosure; security includes the controls that protect systems and data from misuse or loss.\n\n## 7. Conceptual Model\nBefore acting, identify who may be affected, what information or systems are involved, what permissions and duties apply, and what harm could result. Choose the least harmful authorized action, preserve evidence appropriately, and seek guidance when unsure.\n\n## 8. Related Terminology\n- **Least privilege:** Give an account only the access required for its task.\n- **Confidentiality:** Protect information from unauthorized disclosure.\n- **Privacy:** Respect appropriate control over personal information.\n- **Intellectual property:** Protected creations such as software, text, and designs.\n- **Responsible disclosure:** Reporting a vulnerability through an appropriate process.\n- **Conflict of interest:** A personal interest that may improperly influence professional judgment.\n\n## 9. Common Misconception\nAccess to data for work does not mean permission to browse, copy, or share it for unrelated purposes. Authorization is limited by role, task, policy, and applicable obligations.\n\n## 10. Precise Definition\n\u003e IT professional ethics is the reasoned practice of fulfilling duties of honesty, competence, privacy, security, and accountability while minimizing harm to affected people and systems.\n\n## 11. Knowledge Check\n**Question:** What should a trainee do after discovering a security weakness in a system they support?\n\n**Answer:** Avoid exploiting or publicizing it, preserve only necessary evidence, and report it promptly through the authorized supervisor or security process.",
      },
    ],
  },
];

function buildMentalModelNotes(topicTitle, sourceNotes) {
  const notes = String(sourceNotes ?? "").trim();
  if (!notes) return notes;

  const headings = [...notes.matchAll(/^#{2,4}\s+(.+)$/gm)]
    .map((match) => match[1].trim())
    .filter(
      (heading) =>
        !/practice|exam|question|summary|review|reference/i.test(heading),
    );
  const paragraphs = notes
    .replace(/^#{1,4}\s+.*$/gm, "")
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(
      (part) =>
        part &&
        !part.startsWith("```") &&
        !part.startsWith("|") &&
        !part.startsWith("-") &&
        !part.startsWith("*"),
    );
  const clean = (text, limit = 520) =>
    text.replace(/\s+/g, " ").trim().slice(0, limit);
  const opening = clean(
    paragraphs[0] || `The notes introduce the main ideas in ${topicTitle}.`,
  );
  const mechanism = clean(
    paragraphs.find((part) =>
      /how|process|works|steps?|cycle|operation|mechanism/i.test(part),
    ) ||
      paragraphs[1] ||
      opening,
  );
  const example = clean(
    paragraphs.find((part) =>
      /example|for instance|consider|imagine|e\.g\.?|context/i.test(part),
    ) ||
      paragraphs[2] ||
      mechanism,
    650,
  );
  const distinction = clean(
    paragraphs.find((part) =>
      /difference|versus|\bvs\.?\b|distinguish|contrast|alternative/i.test(
        part,
      ),
    ) ||
      "The formal notes distinguish the related ideas through their definitions, conditions, and uses.",
  );
  const visual =
    /```|truth table|flowchart|state diagram|table|sequence|cycle/i.test(notes)
      ? `\n\`\`\`text\n${headings.slice(0, 6).join(" -> ")}\n\`\`\`\n`
      : "";
  const compactSections = headings
    .slice(0, 8)
    .map((heading, index) => {
      const sectionStart = notes.indexOf(heading);
      const nextStart =
        index + 1 < headings.length
          ? notes.indexOf(headings[index + 1], sectionStart + heading.length)
          : notes.length;
      const sectionText = notes
        .slice(sectionStart + heading.length, nextStart)
        .replace(/^\s+/, "");
      const summary = clean(
        sectionText.split(/\n\s*\n/).find((part) => part.trim()) || "",
      );
      return summary ? `### ${heading}\n${summary}` : `### ${heading}`;
    })
    .join("\n\n");

  return `# ${topicTitle}

## The central idea
${opening}

## Why it matters
The notes introduce this concept because the situation described above needs a clearer, more reliable way to be handled. Focus on the limitation the concept removes and what would be difficult without it.

## How the idea develops
The main ideas develop in this order:

${headings.slice(0, 6).join(" -> ") || topicTitle}

Each later idea adds a capability, condition, or consequence to the earlier one.

## How it works
${mechanism}
${visual}

## In practice
${example}

## Related ideas
${compactSections}

## Keep this distinction in mind
${distinction}

## Where it is useful
Use this knowledge when you need to explain, design, calculate, compare, troubleshoot, or predict the behavior described in the notes. The correct application depends on the conditions and purpose of the problem.

## Think it through
1. What problem is this concept solving?
2. How does its mechanism produce the result?
3. What would change if one important condition were removed?
4. How is it connected to another idea in this topic?
5. Which similar concept could be confused with it, and how would you distinguish them?`;
}

const cos201Expansions = {
  "cos201-t1": `

## Extending the mental model

Programming is best understood as **turning a desired result into a controlled chain of state changes**. The requirement describes the result, the algorithm describes the reasoning, and the code expresses that reasoning in a language the computer can execute. If a program gives the wrong answer, the mistake may therefore be in the requirement, the algorithm, or the code; debugging only the final code can miss the real cause.

### A useful distinction

An algorithm is not the same thing as a program. The algorithm is the language-independent plan. A program is one implementation of that plan. For example, “calculate a student's CGPA from grade points and credit units” is an algorithmic problem. C, Python, and JavaScript can each implement the solution differently while preserving the same underlying logic.

### Worked reasoning: CGPA

The key relationship is **weighted average**, not ordinary average. A three-credit course should influence the result more than a one-credit course:

\`\`\`text
totalPoints = sum(gradePoint * creditUnit)
totalUnits  = sum(creditUnit)
CGPA        = totalPoints / totalUnits
\`\`\`

This example shows why requirement analysis matters: if the programmer averages grade points without considering credit units, the program may run perfectly while producing the wrong academic result.`,
  "cos201-t2": `

## Extending the mental model

Variables solve the problem of giving a changing value a stable name. A data type adds a second promise: it tells the program what kind of value is allowed and what operations make sense. Together, the name and type let the program reason about stored information safely.

### Why the choice matters

Choosing a type is a modeling decision, not merely a syntax decision. A phone number looks numeric, but it represents an identifier rather than a quantity, so addition and subtraction are meaningless. Storing it as an integer can also remove a leading zero. A CGPA, by contrast, represents a measured quantity and may need fractional precision.

### Common confusion

Declaration, initialization, and assignment describe different moments in a variable's life. Declaration introduces the name and type. Initialization gives its first value. Assignment changes a value later. Keeping these moments separate helps explain bugs involving uninitialized data, accidental overwrites, and values that have the wrong type.

The deeper connection is that data types constrain the operations a program can perform. A Boolean supports logical decisions, an integer supports whole-number arithmetic, and a string supports text operations. Modeling the data correctly makes later algorithms simpler and safer.`,
  "cos201-t3": `

## Extending the mental model

Control structures exist because real problems do not follow one fixed straight-line path. **Sequence** describes what always happens, **selection** describes choosing between possible paths, and **iteration** describes repeating a path while a condition remains true. These are three different ways a program controls time and decision-making.

### How to choose a structure

Use selection when the question is “which path should happen?” Use a loop when the question is “how many times should this action happen?” A FOR loop is appropriate when the count is known. A WHILE loop is appropriate when continuation depends on a condition and the count is uncertain. A DO-WHILE loop is useful when the action must happen once before its condition can be checked, such as requesting an input.

### Failure case

Every loop needs progress toward a stopping condition. If the value tested by the condition never changes, the loop becomes infinite. This is why the condition, the work inside the loop, and the update that moves toward termination must be understood as one mechanism rather than memorized as separate syntax.

Logical operators then combine smaller facts into a decision. Parentheses and clear conditions matter because a small change in grouping can change who is admitted, billed, or denied by the program.`,
  "cos201-t4": `

## Extending the mental model

Functions solve the scaling problem created when one program contains too many responsibilities. A useful function has a clear boundary: it receives known inputs, performs one understandable task, and returns a result or produces a deliberate side effect. That boundary lets the rest of the program use the function without needing to understand every internal step.

### Why modularity works

The main program can be read as a set of meaningful actions, while each function hides implementation detail behind a name. In the BVN example, the registration flow does not need to know how length validation or an external API request works; it only needs the result returned by each function. This reduces duplication and limits the area affected by a change.

### Connection: scope and parameters

Parameters are the controlled doorway into a function. Local variables stay inside that boundary, which makes accidental interference less likely. Global variables remove that protection: any function can change them, so a bug may appear far from the code that caused it. Pass-by-value and pass-by-reference are two different answers to the question of whether the function receives a copy or access to the original data.`,
  "cos201-t5": `

## Extending the mental model

An array is useful because it turns many separately named values into one ordered structure that a rule can process. The index is the bridge between the abstract collection and one concrete element. Once the index and loop are connected, the same algorithm can process five scores or fifty thousand scores without changing its basic shape.

### Worked reasoning: average score

The average algorithm has three moving parts: a collection, an accumulator, and a traversal rule. The loop visits each valid index, adds the current element to the accumulator, and divides only after every element has been visited. Starting at index 0 is not an arbitrary convention; it represents the first offset from the array's starting location.

### Common confusion

An array's position is not the same as its value. In scores[2], 2 identifies the third position; it is not the score itself. A string builds on the same idea: it is a sequence of characters, so indexing and traversal explain operations such as length, comparison, and substring extraction.`,
  "cos201-t6": `

## Extending the mental model

Recursion is a way to describe a problem using a smaller instance of the same problem. It works only when two conditions are connected: the recursive case must make the input simpler, and the base case must provide a definite answer when the simplification reaches its end.

### Trace the mechanism

For factorial(4), the calls form a chain: factorial(4) waits for factorial(3), which waits for factorial(2), which waits for factorial(1). The base case returns first, and the waiting calls resolve backward. This explains both the elegance and the cost of recursion: every unresolved call occupies space on the call stack.

### Recursion versus iteration

The choice is about the shape of the problem. A loop is usually clearer for a simple repeated count. Recursion becomes natural when the data itself is nested, such as a family tree, directory structure, or search tree. The recursive solution should still be tested for a valid base case and for progress toward it; otherwise the elegant-looking definition becomes a stack overflow.`,
  "cos201-t7": `

## Extending the mental model

File handling exists because program memory is temporary. The file lifecycle is therefore a resource-management agreement with the operating system: open a resource, use it for a defined purpose, then close it so changes are committed and the resource is released.

### The mode determines the risk

Read mode protects the existing contents by treating the file as input. Write mode treats the file as a fresh output and can destroy what was there. Append mode preserves the existing records and adds new data at the end. The correct mode follows from the problem: replacing a generated report is different from recording another student or transaction.

### Connection to reliability

Closing a file is not just tidy syntax. It can flush buffered data, release locks, and ensure other processes can access the file. A robust program also considers missing files, invalid data, interrupted writes, and permissions. The NYSC example makes the central point visible: persistent storage protects information from the loss of RAM when a program ends or power fails.`,
  "cos201-t8": `

## Extending the mental model

Testing and debugging answer different questions. Testing asks whether the program behaves correctly across situations. Debugging begins after a failure and investigates why the behavior occurred. A test can reveal a problem without explaining it; debugging supplies the explanation and the fix.

### Use input categories as evidence

Normal data checks the expected path. Boundary data checks the edges where conditions change, such as exactly 40 marks or exactly 18 years. Abnormal data checks whether the program handles invalid input safely. Together, these cases test the assumptions hidden inside the algorithm.

### Why logical errors are dangerous

Syntax errors stop execution, and runtime errors often identify a point of failure. A logical error can preserve both valid syntax and a running program while violating the intended rule. In the banking example, adding the transfer amount to the sender's balance is dangerous precisely because the computer is faithfully executing an incorrect instruction. A good debugging process therefore compares actual results with expected results, isolates the smallest failing case, fixes the cause, and repeats earlier tests for regression.`,
};

const csc203Expansions = {
  "csc203-t1": `

## Extending the mental model

Number systems are different ways of assigning meaning to the same positional pattern. The base tells you how many symbols are available and what each position is worth. Binary is not “hard decimal”; it is a representation designed around two reliable electronic states.

### Why the conversions matter

Conversion is useful because different people and hardware layers prefer different representations. Humans usually calculate in decimal, circuits naturally operate in binary, and hexadecimal gives programmers a compact way to read groups of four bits. The value has not changed; only the way it is grouped and named has changed.

### Worked reasoning: binary to decimal

For 101101₂, each 1 contributes the value of its position: 32 + 8 + 4 + 1 = 45. The zeros are still important because they preserve the positions between those contributions. This is the same positional idea used by 2,457 in decimal; only the base changes.

The later sections depend on this model. Arithmetic, memory addresses, character encodings, and RGB colors all reuse positional representation, so mastering the meaning of a bit is more useful than memorizing isolated conversion tricks.`,
  "csc203-t2": `

## Extending the mental model

Boolean algebra exists to describe decisions that have only two states, while logic gates are the physical circuits that carry out those decisions. An expression such as A AND B is therefore both a rule about truth and a design for combining electrical signals.

### Why simplification matters

Two Boolean expressions can produce the same output while requiring different numbers of gates. Simplification removes unnecessary work: fewer gates usually means less hardware, less power, less delay, and fewer places for a fault to occur. This is why algebraic laws are engineering tools, not just examination rules.

### Common confusion

Boolean symbols resemble ordinary arithmetic, but their meaning depends on the operation. In Boolean algebra, “+” means OR and multiplication-like adjacency means AND. The meaning must be read from the logic operation, not from ordinary numerical arithmetic.

NAND and NOR are called universal because their structure can be combined to recreate the basic gates. That connects algebra to hardware manufacturing: one reusable building block can be cheaper and easier to produce than many unrelated gate designs.`,
  "csc203-t3": `

## Extending the mental model

Combinational circuits solve problems where the output can be calculated entirely from the current inputs. They do not need to remember yesterday's input. This makes them the natural building blocks for arithmetic, selection, routing, and decoding.

### Follow the data path

In a full adder, the input bits and carry-in enter logic that produces a sum and a carry-out. Chaining full adders extends a one-bit operation into a multi-bit operation. The ripple-carry limitation follows directly from that design: each stage must wait for the previous carry before its result is final.

The same input-to-output model explains a multiplexer, decoder, and encoder. A MUX selects one input, a decoder activates one output, and an encoder compresses an active input into a code. These are different routing directions built from the same idea of mapping combinations of signals to outputs.

### Visual reasoning

For any combinational circuit, ask: what are the inputs, what transformation happens, and which output is produced? If a past value is needed to determine the result, the circuit is no longer purely combinational; memory has entered the design.`,
  "csc203-t4": `

## Extending the mental model

Sequential circuits exist because a computer must preserve information across moments. A combinational circuit can answer “what should the output be now?” A sequential circuit must also answer “what was the system remembering before now?”

### Why the clock helps

The clock gives state changes a shared timing boundary. Without that boundary, propagation delays could cause one part of a circuit to react while another part is still changing. Flip-flops make the update discrete: capture the input at the relevant edge, then hold the result until the next permitted update.

### Connection from one bit to a system

One flip-flop stores one bit. A group of flip-flops forms a register. Registers can be arranged into counters or state machines. This is the scale connection: memory elements become useful systems when their state transitions are designed together.

The distinction between a latch and a flip-flop is about *when* the value may change. A level-sensitive latch can follow its input during an enabled interval; an edge-triggered flip-flop samples at a boundary. Confusing those timing models makes race conditions and unexpected state changes difficult to explain.`,
  "csc203-t5": `

## Extending the mental model

CPU organization becomes clearer when viewed as a repeated movement of information. The PC identifies what to fetch, memory supplies the instruction, the IR holds it while the CU interprets it, registers provide fast working values, and the ALU performs the requested operation. The result is then stored so the next instruction can use it.

### Fetch-decode-execute as a control story

The cycle is not merely a list of CPU parts. Each stage answers a different question: Where is the next instruction? What does it mean? Which data and operation are required? Where should the result go? The control unit coordinates these answers, while the ALU performs the calculation.

### Common confusion

The control unit is not the component that adds numbers. The ALU computes; the control unit directs. Registers are not the same as RAM either: both store bits, but registers are much smaller and faster and sit directly in the CPU's working path.

Pipelining improves throughput by overlapping stages, not by making one instruction finish instantly. Hazards occur when that overlap creates a dependency, branch uncertainty, or resource conflict. This connects CPU performance to the earlier ideas of registers, combinational circuits, sequential state, and system buses.`,
};

const csc215Expansions = {
  "csc215-t1": `

## Extending the mental model

Digital logic begins with representation: before a circuit can process information, the information must be encoded as patterns of bits. Decimal, binary, octal, hexadecimal, BCD, ASCII, and two's complement are not unrelated topics; they are different agreements about how bit patterns should be interpreted.

### Why two's complement wins

Signed-number systems must represent positive values, negative values, and zero while allowing the same hardware to perform addition and subtraction. Sign-magnitude and one's complement create two versions of zero, which complicates comparison and arithmetic. Two's complement uses one zero and makes subtraction equivalent to adding a transformed operand, so the ALU can reuse its addition circuitry.

### Connection to later circuits

The bit patterns introduced here become inputs to logic gates, adders, registers, and memory. A wrong interpretation at the representation layer produces a wrong result even when every later circuit is working correctly. Always separate the bit pattern from the meaning assigned to it.`,
  "csc215-t2": `

## Extending the mental model

Boolean algebra provides the language for describing digital decisions, while gates provide the physical implementation. The truth table is the bridge between them: it lists every possible input combination and makes the required output explicit before a circuit is built.

### Why simplify a function

Simplification is a design optimization. If two circuits produce the same truth table, the simpler one is usually cheaper, faster, uses less power, and is easier to verify. De Morgan's theorems matter because they let a designer reorganize a circuit while preserving its behavior.

### Common confusion

XOR is not ordinary OR. OR accepts one or both true inputs; XOR accepts exactly one true input. XNOR reverses that test and becomes an equality detector. These distinctions become important when gates are combined into adders, comparators, and control logic.`,
  "csc215-t3": `

## Extending the mental model

Combinational logic is a pure mapping from current inputs to current outputs. The circuit has no stored state, so changing an input changes the result after the circuit's propagation delay. This makes combinational circuits appropriate for calculations and routing decisions that do not depend on history.

### Follow the signal path

In a half adder, XOR produces the sum because the sum bit is 1 when the inputs differ, while AND produces the carry because a carry occurs only when both inputs are 1. A full adder adds carry-in to that same reasoning. Chaining full adders extends one-bit addition to wider numbers, but also creates ripple delay as each carry waits for the previous stage.

A MUX chooses one path, a decoder expands a code into one active line, and an encoder compresses one active line into a code. Seeing these as routing transformations is more useful than memorizing their names independently.`,
  "csc215-t4": `

## Extending the mental model

Sequential logic solves a limitation that combinational logic cannot: a purely current-input circuit cannot remember a previous answer, count events, or follow a multi-step state machine. Sequential circuits add storage and use that stored state when producing the next output.

### From a bit to a controller

A flip-flop stores one bit. Several flip-flops form a register. A register with feedback and a carefully designed next-state rule can become a counter or a finite state machine. This is the path from a simple memory element to a traffic-light controller, processor register, or digital clock.

### Timing matters

The clock does not perform the computation; it coordinates when state is allowed to change. Synchronous counters update together, avoiding the staggered propagation of ripple counters. A state-machine diagram makes the same mechanism visible: current state plus input determines the next state and output.`,
  "csc215-t5": `

## Extending the mental model

Memory devices exist because computation needs information to survive beyond the instant it is produced. The main differences between RAM, ROM, cache, and secondary storage are not just their names; they are trade-offs among speed, capacity, volatility, cost, and whether the CPU can update them directly.

### Why the hierarchy exists

Fast storage is expensive and limited, while large storage is slower and farther from the CPU. A memory hierarchy places frequently needed data in smaller, faster layers and less frequently needed data in larger, slower layers. Cache works because programs often reuse nearby instructions and data.

The earlier flip-flop and register concepts explain how fast storage is built, while addressing and buses explain how the CPU selects and transfers data. Memory is therefore a system of coordinated choices, not one interchangeable box.`,
  "csc215-t6": `

## Extending the mental model

Registers and counters are specialized uses of sequential storage. A register preserves a group of bits for later use; a counter changes its stored value according to a predictable sequence of clock events. Both depend on flip-flops, but their next-state rules serve different purposes.

### How to distinguish them

Ask whether the stored value is being held as data or advanced as a count. A CPU register may hold an instruction or address until another operation uses it. A counter may advance through 0, 1, 2, 3 to measure events or generate timing. Shift registers add another behavior: moving bits between positions rather than simply replacing the entire value.

The choice between ripple and synchronous counters follows the same timing trade-off as other circuits: simple hardware versus predictable high-speed updates.`,
  "csc215-t7": `

## Extending the mental model

Memory devices are the practical answer to the question “where does information wait when the processor is not currently using it?” The answer depends on how quickly it must return, how much can be stored, and whether it must survive power loss.

### Compare by behavior

RAM is useful as active working space but is volatile. ROM preserves fixed instructions and configuration. Cache keeps likely-to-be-reused data close to the processor. Secondary storage offers much greater capacity and persistence but with slower access. These are complementary roles, not competing labels where one device is simply “better.”

When analyzing a memory design, trace the request: the CPU asks for an address, the system checks the closest available layer, and the data moves through the appropriate bus or controller. That movement explains why capacity and speed cannot be maximized independently.`,
};

const ent211Expansions = {
  "ent211-t1": `

## Extending the mental model

Entrepreneurship is not simply “having a business idea.” It is a process for turning an observed problem into value that can be delivered sustainably. Opportunity recognition identifies the need, resource mobilization makes a solution possible, and value creation explains why customers or society should care.

### Why execution matters

An idea is only a possibility until it survives contact with customers, costs, competitors, and operations. The entrepreneurial process therefore moves from discovery to testing, then to launch and improvement. Failure at an early test is useful because it prevents larger losses later.

The Nigerian examples in the notes show how local constraints can become design information. Power, transport, payments, and access to finance are not background details; they shape what solution is practical and what value customers will recognize.`,
  "ent211-t2": `

## Extending the mental model

The business environment is the set of conditions a venture must work within. Internal factors affect what the business can control, while external factors create constraints and opportunities it must respond to. A strong entrepreneur does not treat the environment as an excuse or an afterthought; it becomes part of the business model.

### Connect conditions to decisions

Unstable electricity changes operating costs. Exchange-rate movement changes import prices. Demographics change who can buy and how they prefer to be reached. Regulation changes what can legally be offered. Each environmental factor becomes useful analysis only when it is connected to a decision about pricing, location, product design, technology, or partnerships.

This explains why a market woman and a technology startup can face the same environment but choose different adaptations. Their resources, customers, and delivery models transform the same external conditions into different business choices.`,
  "ent211-t3": `

## Extending the mental model

A business opportunity is a problem with three parts: someone experiences an unmet need, a solution can realistically be delivered, and the customer is willing and able to pay. A clever idea that lacks one of these parts may be interesting without being a viable opportunity.

### Test before committing

Customer interviews reveal whether the problem is real, but stated interest is not the same as payment. A prototype, pilot, pre-order, or minimum viable product creates stronger evidence by observing behavior. The goal is not to prove that every assumption is correct; it is to discover the riskiest assumption early and test it cheaply.

Feasibility and viability then ask different questions. Feasibility asks whether the solution can be built and delivered. Viability asks whether doing so can create sustainable value and revenue. Both are needed before a full launch.`,
  "ent211-t4": `

## Extending the mental model

A feasibility study reduces uncertainty before significant resources are committed. It examines whether the idea can be built, funded, wanted, and operated. A business plan then turns the evidence into a coordinated roadmap for action and communication.

### Why the sections depend on one another

Market feasibility without operational feasibility may identify eager customers that the business cannot serve reliably. Financial projections without market evidence are just numbers. Technical feasibility without a revenue model may produce a working product that cannot support the organization. The four feasibility areas must therefore reinforce one another.

The Nigerian context adds concrete assumptions such as power backup, registration, exchange rates, permits, and supply reliability. Including them makes the plan less optimistic but more useful because it represents the conditions under which the business will actually operate.`,
  "ent211-t5": `

## Extending the mental model

Startup finance is a matching problem. The entrepreneur must match the source of money to the stage, risk, cash-flow pattern, and control needs of the business. Debt creates repayment obligations; equity exchanges ownership for capital; grants avoid repayment but may impose eligibility and reporting requirements.

### Revenue is not profit

Revenue shows money received from customers. Profit remains only after costs are removed. A business can grow sales while losing money if its margins, expenses, repayment obligations, or cash timing are misunderstood. Cash-flow planning therefore asks not only whether the business is profitable on paper, but whether it can pay its bills when they fall due.

The Nigerian examples make risk visible: inflation, currency changes, high interest, unreliable infrastructure, and informal financing expectations can change the real cost of capital. Good financing decisions explain what could go wrong and how much buffer is needed.`,
  "ent211-t6": `

## Extending the mental model

Business ethics concerns how value is created and distributed, especially when the business has more information or power than a customer, worker, or community. Social responsibility widens the analysis beyond immediate profit to include people and environments affected by the business.

### Why ethics is practical

Honest pricing, privacy, safe work, truthful marketing, and responsible disposal reduce hidden costs such as disputes, regulation, damaged reputation, staff turnover, and loss of trust. Ethics is therefore not separate from sustainability; it influences whether relationships remain strong enough for the business to survive.

When faced with a dilemma, identify the stakeholders, the possible harms, the duties or rights involved, and the longer-term consequences. This makes ethical reasoning more reliable than simply asking whether an action is profitable or legal.`,
};

const csc299Expansions = {
  "csc299-t1": `

## Extending the mental model

Practical exposure matters because classroom knowledge describes tools and principles, while a workplace combines them under constraints. A computing environment includes people, procedures, hardware, software, users, security rules, and service expectations. A system can be technically correct and still fail if nobody can operate or support it reliably.

### From theory to responsibility

Working in a lab, help desk, network unit, or development team teaches the boundaries between roles. A support technician diagnoses symptoms, communicates with users, records changes, and escalates issues when the risk is beyond their authority. The technical action is only one part of the professional task.

SIWES is therefore a feedback loop: observe a real process, connect it to classroom concepts, perform a controlled task, receive feedback, and document what was learned. That loop turns isolated knowledge into practical judgment.`,
  "csc299-t2": `

## Extending the mental model

Software development practices exist to reduce the risks of changing a complex system. Requirements explain what value is needed, design explains the structure, implementation creates it, testing supplies evidence, and maintenance continues after release. Version control and documentation make the history of those decisions visible to the team.

### Why collaboration practices matter

Git is more than a place to store files. Commits provide small, understandable checkpoints; branches isolate work; reviews create a second reasoning pass; and tests reveal whether a change affects existing behavior. Agile does not mean “no planning”; it means planning in shorter feedback cycles so assumptions can be corrected earlier.

The practices reinforce one another. A change that is reviewed but not tested has incomplete evidence. A test without version history is harder to trace. A fast team becomes reliable when speed is paired with feedback, documentation, and clear ownership.`,
  "csc299-t3": `

## Extending the mental model

Troubleshooting is evidence-based elimination, not guessing. A symptom is an observation, not a diagnosis. The method begins by reproducing the problem, separating possible causes, testing one hypothesis at a time, and verifying the fix under the original conditions.

### Why divide and conquer works

If a computer will not start, checking the outlet, cable, power supply, motherboard, and memory as one vague problem creates confusion. Testing the simplest likely causes first narrows the search space. Substitution with a known-good component is useful because it changes one variable while keeping the rest of the system stable.

Documentation completes the process. Recording symptoms, tests, findings, and the confirmed fix turns one technician's experience into reusable knowledge and makes repeated failures easier to recognize.`,
  "csc299-t4": `

## Extending the mental model

Networking exists to move information between devices under agreed rules. Hardware creates paths, addressing identifies destinations, protocols describe how messages are formed and delivered, and security controls who may use those paths. A network problem can therefore occur at several layers even when the user only sees “the internet is not working.”

### Trace a request

When a user opens a website, DNS helps find an address, IP routes packets, transport protocols manage delivery behavior, and HTTP or HTTPS carries the web request. A router connects networks, a switch connects devices within a local network, and an access point provides wireless access. Separating these roles makes diagnosis more precise.

TCP and UDP represent a trade-off between delivery assurance and speed. Security is not a separate decoration added afterward; encryption, authentication, updates, and firewall rules affect how the communication system can safely operate.`,
  "csc299-t5": `

## Extending the mental model

Documentation preserves the reasoning behind a system so another person can understand, operate, repair, or extend it. Good documentation answers more than “what button do I press?” It explains purpose, assumptions, dependencies, expected results, failure signs, and recovery options.

### Reports as evidence

An incident report separates what happened from why it happened. The timeline records observations, impact describes who or what was affected, root cause explains the underlying failure, resolution records the response, and prevention identifies changes that reduce recurrence. Mixing these categories makes it difficult to learn from the incident.

The same reasoning applies to project reports and code reviews. Clear documentation supports handover, remote collaboration, audits, disaster recovery, and honest evaluation of what was actually achieved.`,
  "csc299-t6": `

## Extending the mental model

Professional ethics exists because technology gives practitioners access to systems, data, and decisions that affect other people. Technical ability answers what can be built; ethics asks what should be built, who may be harmed, who has a right to know, and what responsibility follows from the decision.

### Applying ethical principles

Privacy concerns appropriate collection and use of personal information. Security concerns protecting systems and data from unauthorized access or loss. They overlap but are not identical: a system can be secure from outsiders while still collecting more user data than necessary. Least privilege, responsible disclosure, honesty, accessibility, and social responsibility turn broad values into practical design constraints.

When a dilemma appears, identify stakeholders, likely harms, competing duties, and less harmful alternatives. Ethical judgment is stronger when it is documented and discussed rather than hidden behind claims that the technology is neutral.`,
};

function appendTopicExpansion(topicId, notes) {
  const expansion = cos201Expansions[topicId];
  return expansion && !notes.includes("## Extending the mental model")
    ? `${notes}${expansion}`
    : notes;
}

for (const course of coursesData) {
  for (const topic of course.topics ?? []) {
    const noteText = topic.notes ?? "";
    const hasRequestedStructure =
      /^## 1\. Definition\s*$/m.test(noteText) &&
      /^## 11\. Knowledge Check\s*$/m.test(noteText);
    const hasExistingStructuredNotes =
      /## Why it matters|## Plain explanation|## Key terms & glossary/i.test(
        noteText,
      ) || hasRequestedStructure;
    if (!hasExistingStructuredNotes && topic.notes) {
      topic.notes = buildMentalModelNotes(topic.title, topic.notes);
    }
  }
}

export { coursesData };

export function getCourseById(courseId) {
  return coursesData.find((course) => course.id === courseId);
}

export function getTopicById(courseId, topicId) {
  const course = getCourseById(courseId);
  if (!course) return null;
  return course.topics.find((topic) => topic.id === topicId);
}
