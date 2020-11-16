import { name, internet } from "faker";

const user = {
    name: name.findName(),
    email: internet.email(),
    password: internet.password(),
};

it("registers a new user and redirects to homepage", () => {
    cy.visit("/register");
    cy.findByLabelText("Name").type(user.name);
    cy.findByLabelText("Email Address").type(user.email);
    cy.findByLabelText("Password").type(user.password);
    cy.findByRole("button").click();
    cy.location("pathname").should("eq", "/");
    cy.getCookie("qid").should("exist");
});

it("login with a registered user", () => {
    cy.visit("/login");
    cy.findByLabelText("Email Address").type(user.email);
    cy.findByLabelText("Password").type(user.password);
    cy.findByRole("button").click();
    cy.location("pathname").should("eq", "/");
    cy.getCookie("qid").should("exist");
});

it("login with a registered user, revisit login page and redirect home", () => {
    cy.visit("/login");
    cy.findByLabelText("Email Address").type(user.email);
    cy.findByLabelText("Password").type(user.password);
    cy.findByRole("button").click();
    cy.location("pathname").should("eq", "/");
    cy.getCookie("qid").should("exist");
    cy.visit("/login");
    cy.location("pathname").should("eq", "/");
});

it("registers a new user and generate API key", () => {
    cy.visit("/login");
    cy.findByLabelText("Email Address").type(user.email);
    cy.findByLabelText("Password").type(user.password);
    cy.findByRole("button").click();
    cy.location("pathname").should("eq", "/");
    cy.getCookie("qid").should("exist");
    cy.visit("/account/settings");
    cy.findByRole("button", { name: /generate api key/i }).click();
    cy.findByText(/your api key is:/i).should("exist");
});
