# Playwright AI Agents Test Automation

AI-assisted end-to-end test automation project using **Playwright, TypeScript, custom testing agents, MCP-based browser tooling, test planning, automated test generation, test healing, and GitHub Actions CI/CD**.

## Project Objective

This project demonstrates how AI agents can support the software testing lifecycle by helping with:

- Test planning
- Test case generation
- Browser exploration
- Playwright test creation
- Failure analysis
- Test healing
- End-to-end execution
- CI/CD integration

The application under test is **SauceDemo / Swag Labs**.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- AI Testing Agents
- Playwright MCP
- Git
- GitHub
- GitHub Actions
- HTML Test Reporting

---

## AI Agents Used

The project contains three specialized testing agents.

### 1. Playwright Test Planner Agent

Responsible for:

- Exploring the web application
- Understanding user journeys
- Identifying functional flows
- Designing positive and negative scenarios
- Creating a structured test plan

### 2. Playwright Test Generator Agent

Responsible for:

- Reading the test plan
- Executing browser interactions
- Generating Playwright automation tests
- Writing reusable automated test scenarios

### 3. Playwright Test Healer Agent

Responsible for:

- Running failing Playwright tests
- Debugging failures
- Inspecting selectors and application state
- Identifying root causes
- Updating broken test automation
- Re-running tests after remediation

---

## Architecture

```text
Web Application
      ↓
AI Test Planner Agent
      ↓
Test Plan
      ↓
AI Test Generator Agent
      ↓
Playwright Test Cases
      ↓
Playwright Test Runner
      ↓
Test Failure
      ↓
AI Test Healer Agent
      ↓
Updated Test
      ↓
Re-execution
      ↓
HTML Report / CI Pipeline


Project Structure
Playwright-AI-Agents-Test-Automation
│
├── .github/
│   ├── agents/
│   │   ├── playwright-test-planner.agent.md
│   │   ├── playwright-test-generator.agent.md
│   │   └── playwright-test-healer.agent.md
│   │
│   └── workflows/
│       ├── playwright.yml
│       └── copilot-setup-steps.yml
│
├── specs/
│   ├── README.md
│   └── sauce-demo-test-plan.md
│
├── tests/
│   ├── sauce-demo-authentication.spec.ts
│   ├── sauce-demo-login-validation.spec.ts
│   ├── sauce-demo-product-detail.spec.ts
│   ├── sauce-demo-sorting.spec.ts
│   ├── sauce-demo-cart-state.spec.ts
│   ├── sauce-demo-checkout-validation.spec.ts
│   ├── sauce-demo-checkout-cancel.spec.ts
│   ├── sauce-demo-complete-purchase.spec.ts
│   ├── sauce-demo-logout.spec.ts
│   ├── sauce-demo-navigation-drawer.spec.ts
│   └── sauce-demo-order-pdf.spec.ts
│
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md

Test Coverage

The current suite contains automated scenarios covering:

Successful authentication
Invalid login validation
Locked-out user validation
Product detail verification
Product sorting
Add/remove cart state
Checkout required-field validation
Checkout cancellation
Complete purchase workflow
Logout
Navigation drawer
PDF order generation
Test Plan Coverage

The AI-assisted test plan includes broader coverage across:

Authentication
Valid login
Invalid credentials
Required-field validation
Locked-out user
Logout
Protected-page access
Inventory
Product listing
Product details
Product sorting
Add/remove cart operations
Reset application state
Cart and Checkout
Cart validation
Empty cart behavior
Checkout validation
Checkout totals
Complete purchase
Checkout cancellation
Navigation and Resilience
Navigation drawer
About link
PDF order generation
Refresh behavior
Session consistency
Running the Project

Install dependencies:

npm install

Install Playwright browser:

npx playwright install

Run all tests:

npx playwright test

Run tests in headed mode:

npx playwright test --headed

Open the HTML report:

npx playwright show-report
CI/CD

GitHub Actions is configured to:

Checkout the repository
Set up Node.js
Install dependencies
Install Playwright browsers
Execute the automated tests
Upload the Playwright HTML report as an artifact
Key Concepts Demonstrated
AI-assisted software testing
Agent-based QA workflows
Test planning automation
Automated test generation
AI-assisted test healing
Playwright browser automation
End-to-end testing
Negative testing
GitHub Actions CI/CD
HTML reporting
MCP-based browser interaction
Current Status

The repository contains:

AI test planner agent
AI test generator agent
AI test healer agent
Structured SauceDemo test plan
11 Playwright automated test files
Chromium execution configuration
GitHub Actions workflow
Playwright HTML reporting

Further refinement will focus on improving CI stability, expanding agent workflows, and strengthening test coverage.
