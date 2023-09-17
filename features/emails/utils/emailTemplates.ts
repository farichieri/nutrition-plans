const getMessageToNewsletterSubscriber = () => {
  const message = {
    subject: "Welcome to nutritionplans.co!",
    html: `
    <p>We are happy to have you as a new reader of our newsletter!</p>
    <p>We send the best tips about Nutrition and Dieting every week!</p>
    <br>
    <p>Nutrition Plans Team</p>
    <a href="https://www.nutritionplans.co" target="_blank">nutritionplans.co</a>
    `,
  };
  return message;
};

const getEmailToNewUser = (name: string) => {
  const message = {
    subject: "Welcome to nutritionplans.co!",
    html: `<p>Hi ${name},</p>
    <p>I'm Fabricio, Founder of <a href="https://www.nutritionplans.co" target="_blank">nutritionplans.co</a>. Just wanted to reach out and introduce myself.</p>
    <p>Would you like to tell me about your expectations with our website?</p>
    <p>Best regards</p>
    <br>
    <p>Fabricio Richieri</p>
    `,
  };
  return message;
};

export { getMessageToNewsletterSubscriber, getEmailToNewUser };
