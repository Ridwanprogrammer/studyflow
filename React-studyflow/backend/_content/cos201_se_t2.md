# Software Process Models

## A process model is a route through uncertain work

Building software is like organizing a journey: some destinations and constraints are known early, while other details become clear only along the way. A software process model describes how a team organizes activities such as requirements, design, coding, testing, delivery, and feedback.

No model is best for every project. The right choice depends on how stable the requirements are, how costly a mistake would be, how quickly users need working software, and how much feedback is available.

## Sequential development: the waterfall model

The waterfall model organizes work into ordered phases, often requirements, design, implementation, testing, deployment, and maintenance. Each phase is expected to produce information or artifacts used by the next.

This can work when requirements are stable, approvals are formal, and the cost of changing a design late is high. It makes dependencies and documentation visible. Its weakness is that working software and user feedback may arrive late; incorrect assumptions can survive through several phases before they are discovered.

The model is not literally “never go back.” Real projects revisit decisions, but extensive backtracking can be expensive because later work depends on earlier assumptions.

## Iterative and incremental development

**Iterative** development revisits and improves a solution through repeated cycles. **Incremental** development delivers parts of the product in useful slices. A team may do both: release a small working capability, learn from its use, and improve it in the next cycle.

For a course portal, an early increment might support viewing courses; later increments add progress tracking and reminders. Each delivery gives users something testable before the entire product is finished.

## Agile methods and feedback

Agile is a family of approaches that values short feedback loops, collaboration, and adapting plans as learning occurs. It does not mean “no planning” or “no documentation.” It means planning is revisited as evidence changes.

In Scrum, a team works in time-boxed **sprints**, selects work for a sprint, produces a usable increment, and inspects progress and obstacles. A **product backlog** is an ordered list of work. The product owner helps prioritize value; the Scrum Master supports the process; developers create the increment. These are accountabilities, not simply job titles.

Kanban visualizes work as it moves through stages and limits work in progress. Limiting simultaneous work helps reveal bottlenecks and encourages finishing tasks before starting too many new ones.

## Risk-driven development: the spiral model

The spiral model organizes development into repeated cycles that emphasize identifying and reducing risk. Each cycle sets objectives, examines alternatives and risks, develops or evaluates a solution, and plans the next cycle.

This can be useful for large, high-risk systems where an unknown—technical feasibility, safety, or performance—must be investigated early. It requires skilled risk analysis and may be excessive for a small, well-understood project.

## Choose a process by asking practical questions

| Project situation | Process tendency |
|---|---|
| Stable requirements, formal approval, predictable deliverables | More sequential planning |
| Frequent user feedback and changing priorities | Iterative or agile cycles |
| Major technical or safety risks | Risk-driven prototyping and review |
| Continuous stream of small changes | Kanban or continuous delivery practices |

These are tendencies, not rigid rules. A regulated project may use agile iteration while retaining formal records and approvals.

**Pause and decide:** A team is unsure whether students will use a new course-search feature and can test a simple version with them next week. Waiting until the entire portal is built hides the most important risk. An early prototype or increment would produce useful evidence sooner.

## Measure outcomes, not ceremony

Meetings, documents, and charts are useful only when they help the team coordinate, make decisions, or improve quality. A process should be evaluated by whether it helps deliver valuable software reliably and learn from change—not by how closely its ceremonies resemble a textbook diagram.

**Practice:** For a small payroll system whose rules are fixed by law, name one reason to plan carefully up front. For an experimental student-support app, name one reason to release an early increment. A good answer connects the process choice to risk, requirement stability, or feedback.
