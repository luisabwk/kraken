---
description: "This rule provide standards and frameworks for building a plan whenever we're building something"
alwaysApply: true
---

# PLAN RULES

This document contains all the rules whenever you need to plan projects and tasks. 

## Basic principles

You should always write a plan, even if it is a simple one, considering how can we do what is proposed in my request. To do that, you should decompose what I'm asking in not more than 10 objective steps. 

In you decomposing process, you must ask yourself: 
```
    - What is the goal of this request? 
    - What are the logic steps to achieve that? 
    - This request have any dependency not specified by the user?
    - Is there any MCP, rule or tool related to this request? If yes, which one?
    - Do I have all the data I need to proceed? If not, I must ask the user.
```

This is an example of a request and the resulting objective steps.

**Example:**
```
Request:
I want to build a simple preview system for HTML e-mail templates that combines the template, which contains {{variables}} and a JSON file containing the values for this variables. 

Steps:
    1. Create a backend that searches for the template and the JSON file
    2. Create a frontend that renders the HTML with the data provided by the JSON
    3. Run a code review 
    4. Test the code for lints, types and units
    5. Commit and sync using GitHub MCP

Note: You can be more specific if you want to. This is a generic example. 
```

## Frameworks

Besides this principles, you must ALWAYS use the frameworks below. 

- **K.I.S.S (Keep It Simple, Stupid):** Do not make things more complicated than they really are or need to be. Give clear names for methods, variables and functions. Apply the unique responsibility concept. Keep your code always organized and objective. If the file is getting more than 500 lines, you should start a new one. 

- **Y.A.G.N.I (You Aren't Gonna Need It):** If you're not going to used right now, don't add it to the code. If we're going to do something based on this in the future, leave it for our future selves. If it is not needed now, then don't create it. 

- **D.R.Y (Don't Repeat Yourself):** Repeating code is forbidden here. Reutilize what we have already built whenever is possible. Build modules, components and other structures you can use again. This makes changes and updates easy.

## Plan structure and output

The output of this should be a plan containing the outline below, in a Markdown file in the /plans folder.

```
File name: 001 - [Project title] - [Date].md

1. Objective
What are trying to achieve here?
2. Resources needed
What tools, permissions, contexts and even people do we need to achieve what we need? 
3. Constraints 
What limitations do we have? Is there anything that we must careful?
4. Milestones
This will guide and group the tasks we're creating later. Create no more than 5 milestones. 
5. Tasks
This section will be updated after the plan is approved by the user. 
```

## Task and progress management

Whenever running through your task list in the `5. Tasks` section at the PRD, you must always keep track of what you've already done. Your tasks will be listed as follows: 

```
## Task section name

[X] 001 - Task name describing what is to be done in a straight forward language
    Here you can add the task description/details if needed. Keep it short, but informative. Larger contexts must be stored at `/tasks` folder. Referentiate the file here, mentioning it.

[ ] 002- Task name describing what is to be done in a straight forward language
    Here you can add the task description/details if needed. Keep it short, but informative. Larger contexts must be stored at `/tasks` folder. Referentiate the file here, mentioning it.

[ ] 003- Task name describing what is to be done in a straight forward language
    Here you can add the task description/details if needed. Keep it short, but informative. Larger contexts must be stored at `/tasks` folder. Referentiate the file here, mentioning it.      
```

Also, when you need to go deeper in your contextualization or documentation of the task, you must create a .md file at the `/tasks` folder, using the same ID of the task.