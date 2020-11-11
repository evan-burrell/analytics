import { name, internet } from "faker";

it("fills in the register form", () => {
    cy.visit("/register");
    cy.findByLabelText("Name").type(name.findName());
    cy.findByLabelText("Email Address").type(internet.exampleEmail());
    cy.findAllByLabelText("Password").type(internet.password());
    cy.findByRole("button").click();
    cy.location("pathname").should("eq", "/");
});
