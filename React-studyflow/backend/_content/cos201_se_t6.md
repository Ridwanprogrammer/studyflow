# Software Testing and Quality Assurance

## Testing looks for evidence that behaviour is wrong

A test is an experiment: provide inputs or actions, observe the result, and compare it with an expectation. Testing can reveal defects, but no finite set of tests proves that a complex program has no defects.

A **defect** is a flaw in an artifact; a **failure** is observable incorrect behaviour when the defect is activated. A system may contain a defect that a particular test never reaches.

## Test at several levels

- **Unit tests** check a small component, often a function or class, in isolation.
- **Integration tests** check that components work together, such as a service and database.
- **System tests** check the complete application against its requirements.
- **Acceptance tests** give evidence that the system meets user or customer needs.

Lower-level tests are usually faster and more focused; higher-level tests show broader behaviour but may be slower and harder to diagnose.

## Choose cases that expose meaningful boundaries

For a function that accepts ages from 0 through 120, test ordinary values and boundary values such as 0, 120, -1, and 121. **Boundary-value analysis** focuses on edges where mistakes commonly occur. **Equivalence partitioning** divides inputs into groups expected to behave similarly and tests representatives from each group.

For authentication, useful cases include correct credentials, incorrect password, unknown account, missing fields, expired token, and a user without permission. A test should assert the intended outcome, not only that the page did not crash.

## Regression testing and automation

When a defect is fixed, add or retain a test that would have detected it. A **regression test** checks that previously working behaviour remains intact after changes. Automated tests can run repeatedly and provide fast feedback, but they must be maintained as the product changes.

Test-driven development is a cycle: write a failing test for a small behaviour, implement the simplest code that passes, then refactor while keeping tests green. It is one development practice, not a substitute for other validation.

## Quality assurance is broader than testing

**Quality assurance (QA)** includes planned activities to prevent and detect quality problems throughout development: coding standards, reviews, build checks, risk analysis, process improvement, and testing. Testing is one QA activity; quality cannot be “tested in” at the very end.

Reviews can detect defects before code runs. Static analysis finds certain suspicious patterns without executing the program. Dynamic tests execute it under chosen conditions. Different techniques catch different classes of problem.

**Pause and choose:** A total displayed on an invoice is wrong only when a discount and tax are both applied. A unit test for each calculation separately may miss the interaction; an integration or system test should exercise the combined path.

## A practical testing routine

1. Start from an observable requirement.
2. Choose representative, boundary, invalid, and interaction cases.
3. State expected results before running the test.
4. Record failures clearly enough to reproduce them.
5. Retest the fix and run relevant regression checks.

**Practice:** Write three tests for a course search: one matching result, one no-result query, and one empty query. State what the user should see in each case.
