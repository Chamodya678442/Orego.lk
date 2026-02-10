from dotenv import load_dotenv
load_dotenv()

import os
print("DATABASE_URL =", os.getenv("DATABASE_URL"))


from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
