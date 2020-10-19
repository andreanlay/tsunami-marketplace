$(document).ready(function() {

    // TODO: Implement more efficient Method

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


    createSelection(categories, $('#category-selector-add'));
    createSelection(automotive, $('#automotive-subcat-add'));
    createSelection(beauty, $('#beauty-subcat-add'));
    createSelection(books, $('#books-subcat-add'));
    createSelection(electronic, $('#electronic-subcat-add'));
    createSelection(fashion, $('#fashion-subcat-add'));
    createSelection(food_drink, $('#food-drink-subcat-add'));
    createSelection(household, $('#household-subcat-add'));
    createSelection(kitchen, $('#kitchen-subcat-add'));
    createSelection(health, $('#health-subcat-add'));
    createSelection(sport, $('#sport-subcat-add'));

    $('.subcategories-add select').hide();

    $('#category-selector-add').on('change', function() {
        let id = $(this).find(':selected').attr('id');
        $('.subcategories-add select').filter('.' + id).fadeIn(400).siblings('select').hide();
    });

    createSelection(categories, $('#category-selector-edit'));
    createSelection(automotive, $('#automotive-subcat-edit'));
    createSelection(beauty, $('#beauty-subcat-edit'));
    createSelection(books, $('#books-subcat-edit'));
    createSelection(electronic, $('#electronic-subcat-edit'));
    createSelection(fashion, $('#fashion-subcat-edit'));
    createSelection(food_drink, $('#food-drink-subcat-edit'));
    createSelection(household, $('#household-subcat-edit'));
    createSelection(kitchen, $('#kitchen-subcat-edit'));
    createSelection(health, $('#health-subcat-edit'));
    createSelection(sport, $('#sport-subcat-edit'));

    $('.subcategories-edit select').hide();

    $('#category-selector-edit').on('change', function() {
        let id = $(this).find(':selected').attr('id');
        $('.subcategories-edit select').filter('.' + id).fadeIn(400).siblings('select').hide();
    });
});