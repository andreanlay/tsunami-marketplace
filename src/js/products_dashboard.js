$(document).ready(function() {

    categories = ['Automotive', 'Beauty', 'Books', 'Electronic', 'Fashion', 'Food/Drink', 'Household', 'Kitchen', 'Health', 'Sport'];
    automotive = ['Accessories', 'Car', 'Cleaning Kit', 'Helmets','Repair Kit', 'Spareparts','Wheel'];
    beauty = ['Hair Accessories', 'Body/face paint', 'Eye Make Up','Facial Mask', 'Hair Styling Tools','Lip Color / Nail','Nail Art'];
    books = ['Action / Adventure', 'Children', 'Fantasy', 'Food','History', 'Politics', 'Self-help', 'Science-fiction'];
    electronic = ['Air Conditioner', 'Audio', 'Household Electronic','Kitchen Electronic', 'Lights', 'Television', 'Vaporizer'];
    fashion = ['Male', 'Female', 'Swimming', 'Unisex'];
    food_drink = ['Cooking ingredients', 'Diary', 'Indonesian Cuisine', 'Lovely Liquid', 'Meat', 'Snacks', 'Package of Snacks'];
    household = ['Bedroom', 'Decoration', 'Furniture', 'Hygiene', 'Toilet', 'Other'];
    kitchen = ['Baking tools', 'Cooking tools', 'Cutlery', 'Dish washer tool', 'Kitchen Accessories', 'Food Storage'];
    health = ['Supplement', 'Mask', 'Medicine', 'Medical tools', 'Vitamins'];
    sport = ['Badminton', 'Basketball', 'Boxing', 'Gym','Sport Accessories', 'Fishing', 'Football', 'Golf', ];

    function createSelection(vars, elements) {
        for(let i=0; i<vars.length; i+=1) {
            $('<option>', {
                value: vars[i], text: vars[i], id: vars[i]
            }).appendTo(elements);
        }
    }


    createSelection(categories, $('#category-selector'));
    createSelection(automotive, $('#automotive-subcat'));
    createSelection(beauty, $('#beauty-subcat'));
    createSelection(books, $('#books-subcat'));
    createSelection(electronic, $('#electronic-subcat'));
    createSelection(fashion, $('#fashion-subcat'));
    createSelection(food_drink, $('#food-drink-subcat'));
    createSelection(household, $('#household-subcat'));
    createSelection(kitchen, $('#kitchen-subcat'));
    createSelection(health, $('#health-subcat'));
    createSelection(sport, $('#sport-subcat'));

    $('.subcategories select').hide();

    $('#category-selector').on('change', function() {
        let id = $(this).find(':selected').attr('id');
        $('.subcategories select').filter('.' + id).fadeIn(400).siblings('select').hide();
    });
});