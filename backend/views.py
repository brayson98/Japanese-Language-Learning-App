from flask import Blueprint, jsonify, request, Response
from flask_cors import CORS, cross_origin
from flask_login import current_user, login_required
import json
import os
import requests 
from google.cloud import texttospeech
from dotenv import load_dotenv
load_dotenv()

RANDOM_WORD_API_URL = "https://jlpt-vocab-api.vercel.app/api/words/random?level=1"

views = Blueprint('views', __name__)




DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), 'japanese_characters.json')



def load_japanese_characters():
    with open(DATA_FILE_PATH, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

@views.route('/')
def home():
    return jsonify({"message": "Welcome to the Japanese Learning App!"})

@views.route('/api/japanese/characters', methods=['GET'])
def get_japanese_characters():
    try:
        
        data = load_japanese_characters()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@views.route('/api/japanese/random_word', methods=['GET'])
def get_random_word():
    try:
        
        
        response = requests.get(f"{RANDOM_WORD_API_URL}")
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch data from Jisho API"}), 500
        
        data = response.json()
        

        word = data.get('word', 'N/A')
        meaning = data.get('meaning', 'N/A')
        furigana = data.get('furigana', 'N/A')
        romaji = data.get('romaji', 'N/A')
        

        return jsonify({"word": word, "reading": furigana, "definition": meaning, "romaji" : romaji}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@views.route('/current_user', methods=['GET'])
@login_required
def get_current_user():
    return jsonify({'user': {'username': current_user.username}})

client = texttospeech.TextToSpeechClient()

text_to_speech_api_key = os.getenv("API_KEY")

@views.route('/speech', methods=['POST'])
def generate_speech():
    data = request.get_json()
    word = data['word']

    synthesis_input = texttospeech.SynthesisInput(text=word)
    voice = texttospeech.VoiceSelectionParams(
        language_code='ja-JP', name='ja-JP-Wavenet-A'
    )
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    return Response(response.audio_content, content_type='audio/mpeg')

@views.route('/vocab', methods=['GET'])
def get_vocab():
    level = request.args.get('level')  # Retrieve level from query params
    
    if not level:
        return jsonify({"error": "Level is required"}), 400
    
    # Validate level format (should be an integer between 1 and 5)
    if level not in ['1', '2', '3', '4', '5']:
        return jsonify({"error": "Invalid level. Must be one of: 1, 2, 3, 4, 5."}), 400

    # Construct URL with level parameter
    url = f"https://jlpt-vocab-api.vercel.app/api/words?level={level}"

    try:
        response = requests.get(url)
       
        
        # Check if the response status is OK
        
        if response.status_code == 200:
            data = response.json()
            vocab_items = data.get("words", [])
            return jsonify(vocab_items)
        else:
            return jsonify({"error": f"Failed to fetch data from JLPT Vocab API. Status code: {response.status_code}"}), response.status_code
    except Exception as e:
        return jsonify({"error": f"Error fetching data: {str(e)}"}), 500

DATA_FILE_PATH_2 = os.path.join(os.path.dirname(__file__), 'japanese_words.json')


def load_japanese_words():
    with open(DATA_FILE_PATH_2, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

@views.route('/api/japanese-words', methods=['GET'])
def get_words_by_category():
    category = request.args.get('category')  # Get the category parameter from the query string
    try:
        data = load_japanese_words()

        # If a category is specified, filter by that category
        if category:
            if category in data:
                return jsonify(data[category]), 200
            else:
                return jsonify({"error": f"Category '{category}' not found"}), 404
        else:
            return jsonify(data), 200  # Return all words if no category is specified

    except Exception as e:
        return jsonify({"error": str(e)}), 500
        

   
    
