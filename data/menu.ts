
import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // MAIN DISHES
  {
    id: 'm1', nameKa: "საქონლის გულაში", nameEn: "Beef Goulash", nameRu: "Говяжий гуляш", price: 9.50,
    descriptionKa: "ნაზი საქონლის ხორცი სოუსში", descriptionEn: "Tender beef in a savory sauce", descriptionRu: "Нежная говядина в соусе", category: "Main", isSpecial: true
  },
  {
    id: 'm2', nameKa: "ქათმის კოტლეტი", nameEn: "Chicken Cutlet", nameRu: "Куриная котлета", price: 4.80,
    descriptionKa: "სახლური წვნიანი ქათმის კოტლეტი", descriptionEn: "Juicy homemade chicken cutlet", descriptionRu: "Сочная домашняя куриная котлета", category: "Main"
  },
  {
    id: 'm3', nameKa: "საქონლის კოტლეტი", nameEn: "Beef Cutlet", nameRu: "Говяжья котлета", price: 5.50,
    descriptionKa: "შერეული ხორცის კლასიკური კოტლეტი", descriptionEn: "Classic mixed meat cutlet", descriptionRu: "Классическая мясная котлета", category: "Main"
  },
  {
    id: 'm4', nameKa: "ქათამი მეგრულად", nameEn: "Chicken Megrelian Style", nameRu: "Курица по-мегрельски", price: 11.00,
    descriptionKa: "ქათმის ხორცი ნიგვზიან სოუსში", descriptionEn: "Chicken in a rich walnut sauce", descriptionRu: "Курица в ореховом соусе", category: "Main", isSpecial: true
  },
  {
    id: 'm5', nameKa: "თევზი შემწვარი", nameEn: "Fried Fish", nameRu: "Рыба жареная", price: 8.50,
    descriptionKa: "სეზონური თევზი ლიმონით", descriptionEn: "Seasonal fish served with lemon", descriptionRu: "Сезонная рыба с лимоном", category: "Main"
  },
  // SIDE DISHES
  {
    id: 's1', nameKa: "კარტოფილის ფიურე", nameEn: "Mashed Potatoes", nameRu: "Картофельное пюре", price: 4.00,
    descriptionKa: "კარაქით და რძით მომზადებული", descriptionEn: "Made with butter and milk", descriptionRu: "Приготовлено с маслом и молоком", category: "Sides"
  },
  {
    id: 's2', nameKa: "წიწიბურა", nameEn: "Buckwheat", nameRu: "Гречка", price: 3.50,
    descriptionKa: "ფანტაჟია წიწიბურა კარაქით", descriptionEn: "Fluffy buckwheat with butter", descriptionRu: "Рассыпчатая гречка с маслом", category: "Sides"
  },
  {
    id: 's3', nameKa: "ბრინჯი ბოსტნეულით", nameEn: "Rice with Vegetables", nameRu: "Рис с овощами", price: 4.00,
    descriptionKa: "ორთქლზე მომზადებული ბრინჯი", descriptionEn: "Steamed rice with mixed vegetables", descriptionRu: "Рис на пару с овощами", category: "Sides"
  },
  // SOUPS
  {
    id: 'sp1', nameKa: "ბორში", nameEn: "Borscht", nameRu: "Борщ", price: 7.50,
    descriptionKa: "ტრადიციული წითელი ბორში არაჟნით", descriptionEn: "Traditional red borscht with sour cream", descriptionRu: "Традиционный красный борщ со сметаной", category: "Soups"
  },
  {
    id: 'sp2', nameKa: "ხარჩო", nameEn: "Kharcho", nameRu: "Харчо", price: 8.50,
    descriptionKa: "ცხარე მეგრული ხარჩო საქონლის ხორცით", descriptionEn: "Spicy Megrelian beef soup", descriptionRu: "Острый мегрельский харчо с говядиной", category: "Soups", isSpecial: true
  },
  {
    id: 'sp3', nameKa: "ჩიხირთმა", nameEn: "Chikhirtma", nameRu: "Чихиртма", price: 9.00,
    descriptionKa: "ქათმის წვნიანი კვერცხით და ძმრით", descriptionEn: "Chicken soup with egg and vinegar", descriptionRu: "Куриный суп с яйцом и уксусом", category: "Soups"
  },
  // SALADS
  {
    id: 'sl1', nameKa: "ოლივიე", nameEn: "Olivier Salad", nameRu: "Оливье", price: 6.50,
    descriptionKa: "კლასიკური რეცეპტი", descriptionEn: "A classic recipe", descriptionRu: "Классический рецепт", category: "Salads"
  },
  {
    id: 'sl2', nameKa: "ვინეგრეტი", nameEn: "Vinaigrette", nameRu: "Винегрет", price: 5.50,
    descriptionKa: "ჯანსაღი ბოსტნეულის სალათი", descriptionEn: "Healthy vegetable salad", descriptionRu: "Полезный овощной салат", category: "Salads"
  },
  {
    id: 'sl3', nameKa: "კიბორჩხალის სალათი", nameEn: "Crab Salad", nameRu: "Крабовый салат", price: 6.00,
    descriptionKa: "ბრინჯით და სიმინდით", descriptionEn: "With rice and corn", descriptionRu: "С рисом и кукурузой", category: "Salads"
  },
  // BAKERY
  {
    id: 'b1', nameKa: "იმერული ხაჭაპური", nameEn: "Imeretian Khachapuri", nameRu: "Имеретинский хачапури", price: 13.00,
    descriptionKa: "ორმაგი ყველით", descriptionEn: "With double cheese", descriptionRu: "С двойным сыром", category: "Bakery"
  },
  {
    id: 'b2', nameKa: "ლობიანი", nameEn: "Lobiani", nameRu: "Лобиани", price: 10.00,
    descriptionKa: "რაჭული ლობიო სვანური მარილით", descriptionEn: "Rachuli beans with Svanetian salt", descriptionRu: "Рачинское лобио со сванской солью", category: "Bakery"
  }
];

export const CATEGORIES = {
  Main: { ka: "მთავარი კერძები", en: "Main Dishes", ru: "Основные блюда" },
  Sides: { ka: "გარნირი", en: "Side Dishes", ru: "Гарниры" },
  Soups: { ka: "წვნიანები", en: "Soups", ru: "Супы" },
  Salads: { ka: "სალათები", en: "Salads", ru: "Салаты" },
  Bakery: { ka: "ცომეული", en: "Bakery", ru: "Выпечка" }
};
