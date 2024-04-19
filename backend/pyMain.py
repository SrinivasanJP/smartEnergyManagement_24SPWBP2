import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_email(sender_email, sender_password, receiver_email, subject, body):
    # Set up the MIME
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = subject

    # Attach the body to the MIME message
    message.attach(MIMEText(body, 'plain'))

    # Create SMTP session for sending the mail
    session = smtplib.SMTP('smtp.gmail.com', 587) # Use your email provider's SMTP server
    session.starttls() # Enable security
    session.login(sender_email, sender_password) # Login with your email and password
    text = message.as_string()
    session.sendmail(sender_email, receiver_email, text)
    session.quit()

# Example usage
sender_email = "your_email@gmail.com"  # Your email
sender_password = "your_password"  # Your email password
receiver_email = "recipient_email@example.com"  # Recipient's email
subject = "Test Email"
body = "This is a test email from Python."

send_email(sender_email, sender_password, receiver_email, subject, body)
