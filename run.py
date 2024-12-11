from backend import create_app
from dotenv import load_dotenv
import os
load_dotenv()  # loads the .env file

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
WANIKANI_API_KEY = os.getenv('WANIKANI_API_KEY')

app = create_app()



if __name__ == '__main__':
    app.run(debug=True)