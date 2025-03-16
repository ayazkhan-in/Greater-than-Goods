from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
from product_data import get_product_by_name, get_products_by_category, get_all_deals, get_navigation_help

app = Flask(__name__)
CORS(app)

# Configure the Gemini API
GEMINI_API_KEY = 'AIzaSyBZIJInav0dk11nyOfinAN1vceJwCWur9o'  # Replace with your actual API key
generation_config = {
    "temperature": 0.7,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)
genai.configure(api_key=GEMINI_API_KEY)

# Context template for the chatbot
CONTEXT_TEMPLATE = """
You are a helpful shopping assistant for Greater Than Goods marketplace. Your role is to:
1. Help users find products and deals
2. Provide navigation assistance
3. Make product recommendations
4. Answer questions about our products and services

Available product categories: fruits, vegetables, dairy, specialty
Current special deals: {deals}

User query: {query}
"""

@app.route('/')
def home():
    return app.send_static_file('chat.html')

@app.route('/get', methods=['POST'])
def get_bot_response():
    try:
        user_message = request.form['msg'].lower()
        
        # Get relevant context based on user message
        deals = get_all_deals()
        context = CONTEXT_TEMPLATE.format(deals=deals, query=user_message)
        
        # Add product information if user is asking about specific products
        if any(category in user_message for category in ['fruits', 'vegetables', 'dairy', 'specialty']):
            products = get_products_by_category(next(cat for cat in ['fruits', 'vegetables', 'dairy', 'specialty'] if cat in user_message))
            context += f"\nRelevant products: {products}"
        
        # Add navigation help if user asks about website sections
        if any(page in user_message for page in ['home', 'market', 'chat', 'account', 'cart']):
            for page in ['home', 'market', 'chat', 'account', 'cart']:
                if page in user_message:
                    help_text = get_navigation_help(page)
                    context += f"\nNavigation help for {page}: {help_text}"
        
        # Generate response using Gemini with context
        response = model.generate_content(context)
        
        return response.text
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True, port=5000)