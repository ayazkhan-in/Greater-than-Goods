# Mock product database with categories, prices, and deals

products = {
    'fruits': {
        'apple': {
            'name': 'Fresh Red Apples',
            'price': 249.99,
            'unit': 'per kg',
            'description': 'Sweet and crispy red apples, perfect for snacking or baking',
            'image': 'apple.png',
            'deal': 'Buy 1 kg get 0.5 kg free'
        },
        'avocado': {
            'name': 'Ripe Avocados',
            'price': 165.99,
            'unit': 'each',
            'description': 'Creamy and rich avocados, ready to eat',
            'image': 'avocado.png',
            'deal': '4 for ₹415'
        }
    },
    'vegetables': {
        'tomato': {
            'name': 'Vine Tomatoes',
            'price': 289.99,
            'unit': 'per kg',
            'description': 'Juicy vine-ripened tomatoes',
            'image': 'tomato.png',
            'deal': None
        },
        'potato': {
            'name': 'Russet Potatoes',
            'price': 82.99,
            'unit': 'per kg',
            'description': 'Premium quality russet potatoes',
            'image': 'potato.png',
            'deal': '2.5 kg bag for ₹165.99'
        },
        'onion': {
            'name': 'Yellow Onions',
            'price': 107.99,
            'unit': 'per kg',
            'description': 'Fresh yellow onions',
            'image': 'onion.png',
            'deal': '1.5 kg bag for ₹249.99'
        }
    },
    'dairy': {
        'eggs': {
            'name': 'Farm Fresh Eggs',
            'price': 415.99,
            'unit': 'dozen',
            'description': 'Large grade A eggs',
            'image': 'eggs.png',
            'deal': '2 dozens for ₹665'
        }
    },
    'specialty': {
        'honey': {
            'name': 'Pure Raw Honey',
            'price': 749.99,
            'unit': '500g jar',
            'description': 'Local raw honey, unfiltered and pure',
            'image': 'honey.png',
            'deal': None
        }
    }
}

navigation_help = {
    'home': 'Browse our main categories and featured deals',
    'market': 'View all available products and special offers',
    'chat': 'Get personalized assistance and product recommendations',
    'account': 'Manage your account settings and view order history',
    'cart': 'Review your shopping cart and proceed to checkout'
}

special_deals = [
    'Buy 1 kg of apples get 0.5 kg free',
    '4 avocados for ₹415',
    '2.5 kg bag of potatoes for ₹165.99',
    '1.5 kg bag of onions for ₹249.99',
    '2 dozens of eggs for ₹665'
]

def get_product_by_name(name):
    """Search for a product by name across all categories"""
    name = name.lower()
    for category in products.values():
        for product_id, product in category.items():
            if name in product['name'].lower():
                return product
    return None

def get_products_by_category(category):
    """Get all products in a category"""
    return products.get(category.lower(), {})

def get_all_deals():
    """Get all current special deals"""
    return special_deals

def get_navigation_help(page):
    """Get navigation help for a specific page"""
    return navigation_help.get(page.lower(), 'Page not found')