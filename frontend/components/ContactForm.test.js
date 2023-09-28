import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const h1 = screen.queryByText(/contact form/i);
    expect(h1).toBeInTheDocument();

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, "no");

    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    
    const butt = screen.getByRole("button");
    userEvent.click(butt);

    await waitFor(() => {
        const errorMessage = screen.queryAllByTestId('error');
        expect(errorMessage).toHaveLength(3);
    })


});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const fName = screen.getByLabelText(/First Name*/i);
    userEvent.type(fName, "Robert");

    const lName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lName, "Jimson");

    const butt = screen.getByRole('button');
    userEvent.click(butt);

    const errorMessage = await screen.getAllByTestId('error');
    expect(errorMessage).toHaveLength(1);

    const email = screen.getByLabelText(/email/i);
   



});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
