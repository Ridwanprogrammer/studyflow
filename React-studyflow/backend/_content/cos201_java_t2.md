# Classes, Objects, Encapsulation, and Constructors

## A class describes a kind of thing; an object is one instance

A class is like a plan for a type of object. A class `Student` may describe the data every student object has and the operations it can perform. An object is one concrete student with its own values.

```java
class Student {
    String name;
    int level;
}
```

`name` and `level` are fields. Creating an object with `new Student()` allocates an instance; each instance has its own field values.

## Encapsulation protects an object's state

If any code can change a student's level arbitrarily, the object cannot protect its own rules. **Encapsulation** keeps implementation details inside a class and exposes controlled operations.

```java
class Student {
    private String name;
    private int level;

    public Student(String name, int level) {
        this.name = name;
        setLevel(level);
    }

    public void setLevel(int level) {
        if (level < 100 || level > 500) {
            throw new IllegalArgumentException("Invalid level");
        }
        this.level = level;
    }

    public int getLevel() {
        return level;
    }
}
```

`private` prevents direct access from unrelated classes; public methods provide the allowed interface. A setter is useful when it enforces a rule, not simply because every field must have a setter.

## A constructor establishes a valid starting state

A constructor runs when an object is created. It has the class name and no return type. The constructor above receives initial values and checks the level before the object is used.

The keyword `this` refers to the current object. In `this.name = name`, the left side is the field and the right side is the parameter. Constructors can be overloaded, but each path should leave the object in a valid state.

## Reference variables and object identity

A variable holding an object stores a reference to it, not the object contents directly. Two variables may refer to the same object. Updating the object through one reference is visible through the other. Assigning `null` means a reference points to no object; calling a method through null causes a `NullPointerException`.

## Build a small use

```java
Student student = new Student("Amina", 200);
student.setLevel(300);
System.out.println(student.getLevel());
```

The caller requests a valid change through the public operation without reaching into the private field. If it asks for level 900, the setter rejects the change and prevents an invalid state.

**Practice:** Why make `level` private if the setter is public? The method controls which values can enter the state and can preserve the class's invariant.
