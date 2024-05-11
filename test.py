import smtplib  
sender_email = "heroku2arinsharma@gmail.com"
sender_password = "dimy zttw exkt bfly"
recipient_email = "ai.himanshuarora@gmail.com" 
def send_email_notification():
    message ="modi chai wala"
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:  
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, message)
send_email_notification()